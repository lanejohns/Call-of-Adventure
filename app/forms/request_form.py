from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Request

class RequestForm(FlaskForm):
    message = StringField("message")