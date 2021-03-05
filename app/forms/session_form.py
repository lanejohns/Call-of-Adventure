from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField, FloatField, SelectField
from wtforms.validators import DataRequired
from app.models import Session

state = [("AL"), ("AK"), ("AZ"), ("AR"), ("CA"), ("CO"), ("CT"), ("DE"), ("FL"), ("GA"), ("HI"), ("ID"), ("IL"), ("IN"), ("IA"), ("KS"), ("KY"), ("LA"), ("ME"), ("MD"), ("MA"), ("MI"), ("MN"), ("MS"),
         ("MO"), ("MT"), ("NE"), ("NV"), ("NH"), ("NJ"), ("NM"), ("NY"), ("NC"), ("ND"), ("OH"), ("OK"), ("OR"), ("PA"), ("RI"), ("SC"), ("SD"), ("TN"), ("TX"), ("UT"), ("VT"), ("VA"), ("WA"), ("WV"), ("WI"), ("WY")]

class SessionForm(FlaskForm):
    party_id = IntegerField("party_id", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    date = StringField("date", validators=[DataRequired()])
    time = StringField("time", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = SelectField("state", choices=state, validators=[DataRequired()])
    zipcode = IntegerField("zipcode", validators=[DataRequired()])
    latitude = FloatField("latitude")
    longitude = FloatField("longitude")
    in_person = BooleanField("in_person", validators=[DataRequired()])
