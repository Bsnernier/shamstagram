from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from app.models import User, Post, Comment, db
from ..forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()

    comment_data = json.loads(request.form["new_comment"])

    comment = Comment(
        postId=comment_data["postId"],
        userId=comment_data["userId"],
        text=comment_data["text"]
    )
    db.session.add(comment)
    db.session.flush()
    db.session.refresh(comment)
    db.session.commit()

    comment = {"id": comment.id,
            "postId": comment.postId,
            "userId": comment.userId,
            "text": comment.text
            }
    return comment

# @post_routes.route('/')
# @login_required
# def get_all_posts():
#     posts = db.session.query(Post).join(User, Image).all()

#     postDict = {post.id: post.to_dict() for post in posts}

#     return postDict

# @post_routes.route('/<int:pageId>')
# @login_required
# def get_post(pageId):
#     posts = db.session.query(Post).join(User, Image).all()
#     postDict = {post.id: post.to_dict() for post in posts}
#     return postDict


# @post_routes.route('/<int:id>/delete', methods=["POST"])
# @login_required
# def delete_post(id):
#     post = Post.query.get(id)
#     if current_user.id == post.userId:
#         db.session.delete(post)
#         db.session.commit()
#         return {'Success': id}

#     return {'Fail': "This is not your post"}

# @post_routes.route('/<int:id>/edit', methods=["POST"])
# @login_required
# def edit_post(id):
#     postId = request.form["postId"]
#     description = request.form["description"]
#     if len(description) <= 140:
#         # post form should be modified to editForm
#         post = Post.query.get(postId)
#         post.description = description
#         db.session.commit()
#         return {'Success': 'Success!'}
#     return {'failure':"It is over 140"}
