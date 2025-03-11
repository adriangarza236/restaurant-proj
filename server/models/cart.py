from config import db
from sqlalchemy_serializer import SerializerMixin

class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    serialize_rules=(
        "-user.carts",
        "-foods.carts",
        "-foods.cart_foods",
        "-cart_foods.cart",
        "-cart_foods.food"
    )

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float)
    payment_status = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="carts")
    foods = db.relationship("Food", secondary="cart_foods", back_populates="carts")
    cart_foods = db.relationship("CartFood", back_populates="cart", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Cart id={self.id} total_price={self.total_price} payment_status={self.payment_status}>'