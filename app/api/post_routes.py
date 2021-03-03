from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, Post
from app.forms import PostForm

post_routes = Blueprint("posts", __name__)

@post_routes.route("/<id>")
def all_posts(id):
    posts = Post.query.filter(Post.party_id == id)
    return {"all_posts": {post.id: post.to_dict() for post in posts}}


@post_routes.route("/<id>", methods=["POST"])
def add_post(id):
    form = PostForm()
    if form.validate_on_submit():
        post = Post(
            party_id=id,
            user_id=current_user.id,
            body=form.data["body"]
        )
        db.session.add(post)
        db.session.commit()
        return {"post": post.to_dict()}
    return {"errors": "set errors here"}

