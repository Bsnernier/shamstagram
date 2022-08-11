from crypt import methods
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, follows, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def follow_user(id):
    user = User.query.get(id)
    if current_user != user:
        current_user.following.append(user)
        db.session.commit()
        return user.to_dict()
    else:
        return {"error": "User cannot follow self"}
