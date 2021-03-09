from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

current_user_routes = Blueprint('current_user', __name__)


@current_user_routes.route("/")
def get_user():
    user_id = current_user.id
    user = User.query.filter(User.id == user_id).first()
    return { "user": user.to_dict()}