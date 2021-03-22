from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Post

class PostForm(FlaskForm):
    body = StringField("body", validators=[DataRequired()])
    party_id = IntegerField("party_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])