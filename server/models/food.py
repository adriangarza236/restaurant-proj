from config import db
from sqlalchemy_serializer import SerializerMixin

class Food(db.Model, SerializerMixin):
    __tablename__ = "foods"

    serialize_rules=()

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    def __repr__(self):
        return f'<Food id={self.id} name={self.name} image={self.image} price={self.price}>'
    