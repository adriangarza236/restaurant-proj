from flask import make_response
from app import app
from models.models import Food

@app.route("/api/foods")
def foods():
    foods = [food.to_dict() for food in Food.query.all()]
    return make_response(
        foods,
        200
    )