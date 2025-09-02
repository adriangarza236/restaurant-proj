from flask import request, make_response, g
from extensions import db
from models.models import Cart
from .helpers import *

def register_cart_routes(app):
    @app.route("/api/carts", methods=["GET", "POST"], endpoint="carts")
    def carts():
        if request.method == "GET":
            carts = [cart.to_dict() for cart in Cart.query.all()]
            return make_response(
                carts,
                200
            )
        elif request.method == "POST":
            data = request.get_json()
            total_price = data.get('total_price')
            special_instructions = data.get('special_instructions')
            user_id = current_user().id
            cart = Cart(total_price=total_price, user_id=user_id, special_instructions=special_instructions)
            db.session.add(cart)
            db.session.commit()
            return make_response(
                cart.to_dict(only=('total_price', 'id', 'user_id', 'special_instructions')),
                201
            )

    @app.route("/api/cart/<int:id>", methods=["GET", "PATCH", "DELETE"], endpoint="cart")
    def cart(id):
        if request.method == "GET":
            return make_response(
                g.cart.to_dict(),
                200
            )
        elif request.method == "PATCH":
            data = request.get_json()
            for key in data.keys():
                if hasattr(g.cart, key):
                    setattr(g.cart, key, data[key])
            db.session.add(g.cart)
            db.session.commit()
            return make_response(
                g.cart.to_dict(only=('total_price', 'id', 'user_id', 'special_instructions')),
                200
            )
        elif request.method == "DELETE":
            db.session.delete(g.cart)
            db.session.commit()
            return make_response(
                {},
                204
            )