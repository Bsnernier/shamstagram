from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, ForeignKey("posts.id"), nullable=False)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    text = db.Column(db.String(140))

    user = relationship("User", back_populates="comments")
    posts = relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
            "text": self.text,
            "username": self.user.username
        }
