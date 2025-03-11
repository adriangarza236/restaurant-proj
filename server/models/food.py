from config import db
from sqlalchemy_serializer import SerializerMixin

class Food(db.Model, SerializerMixin):
    __tablename__ = "foods"

    serialize_rules=(
        "-carts.user",
        "-carts.foods",
        "-cart.cart_foods",
        "-cart_foods"
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    image = db.Column(db.String)
    price = db.Column(db.Float)

    carts = db.relationship("Cart", secondary="cart_foods", back_populates="foods")
    cart_foods = db.relationship("CartFood", back_populates="food", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Food id={self.id} name={self.name} image={self.image} price={self.price}>'
    