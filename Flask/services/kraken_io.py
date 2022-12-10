from decouple import config
from krakenio import Client
from werkzeug.exceptions import InternalServerError


class KrakenIoService:
    def __init__(self):
        self.key = config("KRAKEN_KEY")
        self.secret_key = config("KRAKEN_SECRET_KEY")

    def auth(self):
        return Client(self.key, self.secret_key)

    def upload_image(self, path, use_case):
        if use_case == "avatar":
            data = KrakenIoService.avatar_dimensions()
        else:
            data = KrakenIoService.job_dimensions()

        api = self.auth()
        result = api.upload(path, data)
        try:
            return result["kraked_url"]
        except Exception:
            raise InternalServerError("Image resizing failed.")

    @staticmethod
    def job_dimensions():
        data = {
            "wait": True,
            "resize": {"width": 150, "height": 150, "strategy": "exact"},
        }
        return data

    @staticmethod
    def avatar_dimensions():
        data = {
            "wait": True,
            "resize": {"width": 640, "height": 480, "strategy": "portrait"},
        }
        return data
