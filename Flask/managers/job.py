import os

from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import FailedDependency, BadRequest, Conflict

from managers.s3 import delete_pic_from_s3, add_pic_to_s3
from models.job import JobModel
from schemas.outgoing.job import NewJobSchemaResponse, DetailsJobResponse
from utils.decors import check_ownership_decorator
from utils.support import return_current_user, return_current_job, db_commit, db_delete


class JobManagement:
    @staticmethod
    def add_new_job(job_info):
        job_info, path = add_pic_to_s3(job_info)
        current_user = return_current_user()
        job_info["recruiter_id"] = current_user.id
        job_info["recruiter_email"] = current_user.email
        try:
            new_job = JobModel(**job_info)
            db_commit(new_job)
            return NewJobSchemaResponse().dump(new_job)
        except IntegrityError as ex:
            delete_pic_from_s3(job_info["picture_name"])
            raise Conflict("Job title already exists.")
        except Exception as ex:
            delete_pic_from_s3(job_info["picture_name"])
            raise FailedDependency(
                "Picture upload failed. Job entry was not recorded in database."
            )
        finally:
            os.remove(path)
            return


    @staticmethod
    def show_all_jobs():
        offers = JobModel.query.all()
        offers = sorted(
            [offer for offer in offers], key=lambda x: x.entry_date, reverse=True
        )
        return NewJobSchemaResponse().dump(offers, many=True)

    @staticmethod
    def show_job_details(job_id):
        offer = return_current_job(job_id)
        return DetailsJobResponse().dump(offer)

    @staticmethod
    @check_ownership_decorator
    def edit_job_details(offer, to_edit):
        try:
            if "picture" in to_edit.keys():
                delete_pic_from_s3(offer.picture_name)
                data, path = add_pic_to_s3(to_edit)
                offer.picture_url = data["picture_url"]
                offer.picture_name = data["picture_name"]
                os.remove(path)
        except Exception:
            raise BadRequest("Picture upload failed.")
        finally:
            offer.title = to_edit["title"]
            offer.category = to_edit["category"]
            offer.description = to_edit["description"]
            offer.requirements = to_edit["requirements"]
            offer.salary = to_edit["salary"]
            db_commit()
            return

    @staticmethod
    @check_ownership_decorator
    def delete_posting(offer):
        delete_pic_from_s3(offer.picture_name)
        db_delete(offer)
        return
