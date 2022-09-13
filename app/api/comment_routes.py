from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from sqlalchemy import desc
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
    comments = db.session.query(Comment).filter_by(postId = postId).order_by(Comment.id.desc()).all()

    commentDict = {comment.id: comment.to_dict() for comment in comments}

    return commentDict

@comment_routes.route('/')
@login_required
def get_entire_comments():
    comments = db.session.query(Comment).all()

    commentDict = {comment.id: comment.to_dict() for comment in comments}

    return commentDict

@comment_routes.route('/<int:id>/delete', methods=["POST"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if current_user.id == comment.userId:
        db.session.delete(comment)
        db.session.commit()
        return {'Success': id}

    return {'Fail': "This is not your post"}

@comment_routes.route('/<int:id>/edit', methods=["POST"])
@login_required
def edit_comment(id):
    commentId = request.form["commentId"]
    text = request.form["text"]
    if len(text) <= 140:
        # post form should be modified to editForm
        comment = Comment.query.get(commentId)
        comment.text = text
        db.session.commit()
        return {'Success': 'Success!'}
    return {'failure':"It is over 140"}
