from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

current_user_routes = Blueprint('current_user', __name__)


@current_user_routes.route("/")
def get_user():
    print("WE ARE HITTING THE CURRENT_USER ROUTE")
    print(current_user)
    user_id = current_user.id
    print("CURRENT USER ID --------->", user_id)
    user = User.query.filter(User.id == user_id).first()
    print("THIS SHOULD BE OUR CURRENT USER -------------------->", user)
    return { "user": user.to_dict()}