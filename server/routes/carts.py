from flask import request, make_response, g
from config import app, db
from models.models import Cart
from .helpers import *

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
        user_id = current_user().id
        cart = Cart(total_price=total_price, user_id=user_id)
        db.session.add(cart)
        db.session.commit()
        return make_response(
            cart.to_dict(only=('total_price', 'id', 'user_id')),
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
            g.cart.to_dict(only=('total_price', 'id', 'user_id')),
            200
        )
    elif request.method == "DELETE":
        db.session.delete(g.cart)
        db.session.commit()
        return make_response(
            {},
            204
        )