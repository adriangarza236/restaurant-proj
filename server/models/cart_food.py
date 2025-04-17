from config import db 
from sqlalchemy_serializer import SerializerMixin

class CartFood(db.Model, SerializerMixin):
    __tablename__ = "cart_foods"

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id"))
    food_id = db.Column(db.Integer, db.ForeignKey("foods.id"))

    cart = db.relationship("Cart", back_populates="cart_foods")
    food = db.relationship("Food", back_populates="cart_foods")

    def __repr__(self):
        return f'<CartFood id={self.id}, quantity={self.quantity}>'