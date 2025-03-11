from flask import make_response, request, session, jsonify
from config import app, db
from models.models import User
from sqlalchemy.exc import IntegrityError

@app.route("/api/users")
def users():
    if request.method == "GET":
        users = [user.to_dict() for user in User.query.all()]
        return make_response(
            users,
            200
        )
    
@app.route("/api/check_current_user")
def check_current_user():
    user_id = session.get("user_id")
    if user_id:
        user = User.query.get(user_id)
        return make_response(
            user.to_dict(),
            200
            )
    else:
        return make_response(
            {},
            204
        )
    
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    try:
        user = User(email=email)
        user.password_hash = password
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return make_response(
            user.to_dict(),
            201
            )
    except IntegrityError as error:
        if "UNIQUE" in str(error):
            return make_response(
                { "error": "Email must be unique" },
                422
            )
        else:
            return make_response(
                { "error": "Email must exist"},
            422
            )
    except ValueError as error:
        return make_response(
            { "error": str(error) },
            422
        )
    
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.authenticate(password):
        session['user_id'] = user.id
        return make_response(jsonify(user.to_dict())), 200
    else:
        return make_response({"error": "email or password did not match"}), 422
    
@app.route("/api/logout", methods=["DELETE"])
def logout():
    session.clear()
    return make_response(
        {},
        204
    )