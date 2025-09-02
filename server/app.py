# server/app.py
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy import MetaData
from config import Config, naming_convention
from extensions import db, bcrypt

metadata = MetaData(naming_convention=naming_convention)

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)
app.config.from_object(Config)

db.init_app(app)
bcrypt.init_app(app)

migrate = Migrate(app, db=db)
api = Api(app)
CORS(app)

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

# Import models first
from models.models import *

# Import and register all routes
from routes.carts import register_cart_routes
from routes.users import register_user_routes
from routes.foods import register_food_routes
from routes.cart_foods import register_cart_food_routes
from routes.checkout import register_checkout_routes

# Register all routes
register_cart_routes(app)
register_user_routes(app)
register_food_routes(app)
register_cart_food_routes(app)
register_checkout_routes(app)


if __name__ == "__main__":
    app.run(port=5555, debug=True)