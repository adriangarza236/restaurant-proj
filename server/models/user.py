from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules=(
        "-carts.user",
        "-carts.foods",
        "-carts.cart_foods"
    )

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Integer, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    carts = db.relationship("Cart", back_populates="user", cascade="all, delete-orphan")

    @validates("email")
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Email not valid, must contain @ character")
        elif '.com' not in email:
            raise ValueError("Email must end with '.com'")
        
        return email
    
    @hybrid_property
    def password_hash(self):
        raise Exception("Unauthorized")
    
    @password_hash.setter
    def password_hash(self, password):
        gen_password = bcrypt.generate_password_hash(password)
        self._password_hash = gen_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __repr__(self):
        return f'<User id={self.id} email="{self.email}">'
    