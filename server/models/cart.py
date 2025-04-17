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
    total_price = db.Column(db.Numeric(precision=10, scale=2))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    special_instructions = db.Column(db.Text, nullable=True)

    user = db.relationship("User", back_populates="carts")
    foods = db.relationship("Food", secondary="cart_foods", back_populates="carts")
    cart_foods = db.relationship("CartFood", back_populates="cart", cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Cart id={self.id} total_price={self.total_price}, special_instructions={self.special_instructions}>'