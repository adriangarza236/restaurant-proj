from flask import make_response
from config import app
from models.models import User

@app.route("/api/users")
def users():
    users = [user.to_dict() for user in User.query.all()]
    return make_response(
        users,
        200
    )