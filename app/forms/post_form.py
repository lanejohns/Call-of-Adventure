from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Post

class PostForm(FlaskForm):
    body = StringField("body", validators=[DataRequired()])