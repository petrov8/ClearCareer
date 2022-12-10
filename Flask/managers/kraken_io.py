from io import BytesIO

import requests
from PIL import Image

from services.kraken_io import KrakenIoService


def save_new_img(file_path, use_case):
    resized_img_url = KrakenIoService().upload_image(file_path, use_case)
    response = requests.get(resized_img_url)
    img = Image.open(BytesIO(response.content))
    img.save(file_path)
