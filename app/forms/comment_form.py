from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class CommentForm(FlaskForm):
    text = StringField("text")
