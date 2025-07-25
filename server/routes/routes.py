from app import app
from flask import request, g
from models.models import *
from .helpers import *

@app.before_request
def before_routes():
    if request.endpoint in ("carts"):
        if not is_logged_in():
            return { "error": "Unauthorized" }, 401
        elif request.endpoint == "cart":
            id = request.view_args.get('id')
            g.cart = Cart.query.get(id)
            if not is_logged_in() or not is_owner(g.cart.user_id):
                return { "error": "Unauthorized" }, 401
            
from routes.users import *
from routes.carts import *
from routes.foods import *
from routes.cart_foods import *
from routes.checkout import *