from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField, FloatField
from wtforms.validators import DataRequired
from app.models import Session

class SessionForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    date = StringField("date", validators=[DataRequired()])
    time = StringField("time", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    zipcode = IntegerField("zipcode", validators=[DataRequired()])
    latitude = FloatField("latitude")
    longitude = FloatField("longitude")
    in_person = BooleanField("in_person", validators=[DataRequired()])
