from config import db
from sqlalchemy_serializer import SerializerMixin

class Cart(db.Model, SerializerMixin):
    __tablename__ = "carts"

    serialize_rules=()

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float)
    payment_status = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Cart id={self.id} total_price={self.total_price} payment_status={self.payment_status}>'