from config import app
from models.models import *
from routes.routes import *
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy import MetaData
from config import Config, naming_convention

metadata = MetaData(naming_convention=naming_convention)

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
    )
app.config.from_object(Config)


db = SQLAlchemy(app, metadata=metadata)

migrate = Migrate(app, db=db)

bcrypt = Bcrypt(app)

api = Api(app)

CORS(app)


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


# if __name__ == "__main__":
#   app.run(port=5555, debug=True)
