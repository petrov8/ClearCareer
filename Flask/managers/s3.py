import inspect
import os

import shortuuid

from managers.kraken_io import save_new_img
from services.aws_s3 import S3Service
from utils.constants import TEMP, avatar_use_cases
from utils.support import decode_picture


def add_pic_to_s3(entry_info):
    caller_func = inspect.stack()[1].function
    picture = entry_info.pop("picture")
    extension = entry_info.pop("extension")
    file_path, file_name = generate_image(picture, extension, pic_use_case(caller_func))
    photo_url = S3Service().upload_picture(file_path, file_name)
    entry_info["picture_url"] = photo_url
    entry_info["picture_name"] = file_name
    return entry_info, file_path


def delete_pic_from_s3(file_name):
    S3Service().delete_picture(file_name)
    return


def pic_use_case(caller):
    if caller in avatar_use_cases:
        return avatar_use_cases[caller]
    return


def generate_image(pic, ext, use_case):
    name = f"{str(shortuuid.random(30))}.{ext}"
    path = os.path.join(TEMP, name)
    decode_picture(path, pic)
    save_new_img(path, use_case)
    return path, name
