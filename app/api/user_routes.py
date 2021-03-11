from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    print("HITTING USER ROUTE")
    users = User.query.all()
    print(users)
    return {"users": {user.id: user.to_dict() for user in users}}

@user_routes.route('/<user>')
def searched_user(user):
    users = User.query.filter(User.username.ilike(f"%{user}%"))
    return {"searched_users": {user.id: user.to_dict() for user in users }}



@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
