from marshmallow import fields, validate, validates, ValidationError

from schemas.base import BaseUserSchema, check_if_string
from utils.constants import allowed_profile_types


def check_password(value):
    lower, upper, digit, special = 0, 0, 0, 0
    special_chars = ["@", "_", "-", "?", "!", "$", "#"]
    if 8 <= len(value) < 50:
        for char in str(value):
            if char.islower():
                lower += 1
            if char.isupper():
                upper += 1
            if char.isdigit():
                digit += 1
            if char in special_chars:
                special += 1
    if lower == 0 or upper == 0 or digit == 0 or special == 0:
        raise ValidationError("Password does not meet requirements.")


class LoginSchema(BaseUserSchema):
    password = fields.Str(required=True, validate=check_password)


class EditUserSchema(BaseUserSchema):
    full_name = fields.Str(
        required=True, validate=validate.And(validate.Length(min=2, max=20))
    )
    picture = fields.Raw(type="file")
    extension = fields.String()

    @validates("full_name")
    def validate_full_name(self, value):
        print(value)
        try:
            first, last = value.split(" ")
            check_if_string(first + last)
        except ValueError:
            raise ValidationError("Both `first` and `last` names are required.")

        if len(first) < 2 or len(last) < 2:
            raise ValidationError("Names are too short. Initial are not accepted.")


class RegisterSchema(EditUserSchema):
    password = fields.Str(required=True, validate=check_password)
    profile_type = fields.Str(required=True)

    @validates("profile_type")
    def validate_profile_type(self, value):
        if value not in allowed_profile_types.keys():
            raise ValidationError("Invalid profile type.")
