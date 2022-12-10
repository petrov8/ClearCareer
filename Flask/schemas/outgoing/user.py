from marshmallow import fields
from marshmallow_enum import EnumField

from models.enum import UserTypes
from schemas.base import BaseUserSchema


class UserProfileResponse(BaseUserSchema):
    id = fields.Integer(required=True)
    entry_date = fields.DateTime(required=True)
    full_name = fields.Str(required=True)
    picture_url = fields.Str(required=True)
    role = EnumField(UserTypes, by_value=True)
