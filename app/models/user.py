from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .post import Post

follows = db.Table('follows',
    db.Column('curr_user_id', db.Integer, ForeignKey('users.id')),
    db.Column('target_user_id', db.Integer, ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = relationship("Post", back_populates="user")
    likes = relationship("Like", back_populates="user")
    comments = relationship("Comment", back_populates="user")

    following = relationship('User',
                        secondary=follows,
                        primaryjoin=id==follows.c.curr_user_id,
                        secondaryjoin=id==follows.c.target_user_id,
                        backref='followers'
                        )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
