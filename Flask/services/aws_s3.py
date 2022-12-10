import boto3

from decouple import config
from werkzeug.exceptions import InternalServerError


class S3Service:
    def __init__(self):
        self.key = config("AWS_KEY")
        self.secret_key = config("AWS_SECRET_KEY")
        self.region = config("AWS_REGION")
        self.bucket_name = config("AWS_S3_BUCKET_NAME")
        self.client = boto3.client(
            "s3",
            region_name=self.region,
            aws_access_key_id=self.key,
            aws_secret_access_key=self.secret_key,
        )

    def upload_picture(self, path, file_name):
        try:
            self.client.upload_file(path, self.bucket_name, file_name)
            return (
                f"https://{self.bucket_name}.s3.{self.region}.amazonaws.com/{file_name}"
            )
        except Exception:
            raise InternalServerError(f"S3 - saving {file_name} failed.")

    def delete_picture(self, file_name):
        try:
            self.client.delete_object(Bucket=self.bucket_name, Key=file_name)
        except Exception:
            raise InternalServerError(f"S3 - deleting failed.")
