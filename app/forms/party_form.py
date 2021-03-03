from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Party

class PartyForm(FlaskForm):
    party_name = StringField("party_name", validators=[DataRequired()])
    party_size = IntegerField("party_size", validators=[DataRequired()])
    open_to_request = BooleanField("open_to_request", validators=[DataRequired()])