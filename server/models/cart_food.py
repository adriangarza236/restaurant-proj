from config import db 
from sqlalchemy_serializer import SerializerMixin

class CartFood(db.Model, SerializerMixin):
    __tablename__ = "cart_foods"

    serialize_rules=()

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id"))
    food_id = db.Column(db.Integer, db.ForeignKey("foods.id"))

    def __repr__(self):
        return f'<CartFood id={self.id}>'