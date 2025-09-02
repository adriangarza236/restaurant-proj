from flask import make_response
from models.models import Food

def register_food_routes(app):
    @app.route("/api/foods")
    def foods():
        foods = [food.to_dict() for food in Food.query.all()]
        return make_response(
            foods,
            200
        )