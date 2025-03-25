from flask import make_response, request
from config import app, db
from models.models import CartFood

@app.route("/api/cart_foods", methods=["GET", "POST"])
def cart_foods():
    if request.method == "GET":
        cfs = [cf.to_dict() for cf in CartFood.query.all()]
        return make_response(
            cfs,
            200
        )
    elif request.method == "POST":
        data = request.get_json()
        quantity = data.get('quantity')
        cart_id = data.get('cart_id')
        food_id = data.get('food_id')
        cf = CartFood(quantity=quantity, cart_id=cart_id, food_id=food_id)
        db.session.add(cf)
        db.session.commit()
        return make_response(
            cf.to_dict(),
            201
        )
    
@app.route("/api/cart_food/<int:id>", methods=["GET", "PATCH", "DELETE"])
def cart_food(id):
    cf = CartFood.query.filter(CartFood.id == id).first()
    if not cf:
        return make_response({"error": "CartFood not found"}, 404)
    if request.method == "GET":
        return make_response(
            cf.to_dict(),
            200
        )
    elif request.method == "PATCH":
        data = request.get_json()
        for key in data.keys():
            if hasattr(cf, key):
                setattr(cf, key, data[key])
        db.session.add(cf)
        db.session.commit()
        return make_response(
            cf.to_dict(),
            200
        )
    elif request.method == "DELETE":
        db.session.delete(cf)
        db.session.commit()
        return make_response(
            {},
            204
        )