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

    post_data = request.form["postId"]
    user_data = request.form["userId"]
    text_data = request.form["text"]

    print("comment_data", post_data, ",", user_data, ",", text_data)

    comment = Comment(
        postId=post_data,
        userId=user_data,
        text=text_data
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

@comment_routes.route('/<int:postId>')
@login_required
def get_all_comments(postId):
    comments = db.session.query(Comment).filter_by(postId = postId).join(Post, User).all()

    commentDict = {comment.id: comment.to_dict() for comment in comments}

    return commentDict

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
