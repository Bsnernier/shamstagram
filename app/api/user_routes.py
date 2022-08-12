from crypt import methods
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import delete
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

@user_routes.route('/<int:id>/follow')
@login_required
def check_if_following_user(id):
    user = User.query.get(id)
    if current_user != user:
        test = db.session.query(User).filter_by(id = id).first()
        test_result = test.followers
        if not test_result:
            return {'Unsuccessful': 'Not Following'}
        for x in test_result:
            if x.id == current_user.id:
                return {'Success': current_user.id}
    else:
        return {"error": "User cannot follow self"}

@user_routes.route('/<int:id>/unfollow', methods=["POST"])
@login_required
def unfollow_user(id):
    user = User.query.get(id)
    if current_user != user:
        db.session.query(follows).filter_by(curr_user_id = current_user.id).filter_by(target_user_id = id).delete()
        db.session.commit()
        return {'Success': current_user.id}
