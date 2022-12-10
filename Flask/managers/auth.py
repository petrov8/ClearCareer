from datetime import datetime, timedelta

import jwt
from decouple import config
from flask_httpauth import HTTPTokenAuth
from jwt.exceptions import ExpiredSignatureError, DecodeError
from werkzeug.exceptions import Unauthorized


# ----------------------------------------------------------------
from models.user import VisitorModel, RecruiterModel, AdminModel

# must be here for eval to instantiate corresponding user model class
# -----------------------------------------------------------------


class AuthManager:
    @staticmethod
    def create_token(user):
        payload = {
            "sub": user.id,
            "exp": datetime.utcnow() + timedelta(days=1),
            "type": user.__class__.__name__,
        }
        token = jwt.encode(payload, key=config("JWT_SECRET_KEY"), algorithm="HS256")
        return token

    @staticmethod
    def decode_token(token):
        if not token:
            raise Unauthorized("Missing token")
        try:
            payload = jwt.decode(
                token, key=config("JWT_SECRET_KEY"), algorithms=["HS256"]
            )
            return payload["sub"], payload["type"]
        except ExpiredSignatureError:
            raise Unauthorized("Expired token")
        except DecodeError:
            raise Unauthorized("Invalid token")


auth = HTTPTokenAuth(scheme="Bearer")


@auth.verify_token
def verify(token):
    user_id, user_type = AuthManager.decode_token(token)
    user = eval(f"{user_type}.query.filter_by(id={user_id}).first()")
    return user
