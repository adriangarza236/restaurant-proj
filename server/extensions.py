from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()
api = Api()
cors = CORS()