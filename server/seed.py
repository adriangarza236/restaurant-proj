from config import app, db
from models.models import *

with app.app_context():
    print("Seeding Data...")

    print("Deleting...")
    User.query.delete()
    Food.query.delete()
    Cart.query.delete()
    CartFood.query.delete()

    print("Creating Users...")
    kirby = User(email="kirby@testing.com")
    rocco = User(email="rocco@testing.com")

    kirby.password_hash = "testtest"
    rocco.password_hash = "testtest"

    db.session.add_all([kirby, rocco])
    db.session.commit()

    print("Creating Foods...")
    lasagna = Food(name="Lasagna", price="13.99", image="https://thestayathomechef.com/wp-content/uploads/2024/03/Most-Amazing-Lasagna_Square-2.jpg")
    spaghetti = Food(name="Sphagetti", price="10.99", image="https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs-1200x1554.jpg")
    ravioli = Food(name="Ravioli", price="11.99", image="https://www.thecountrycook.net/wp-content/uploads/2012/06/thumbnail-Baked-Ravioli-Casserole.png")

    db.session.add_all([lasagna, spaghetti, ravioli])
    db.session.commit()

    print("Creating Carts...")
    kirby_cart = Cart(total_price=25.98, payment_status=False, user_id=kirby.id)
    rocco_cart = Cart(total_price=24.98, payment_status=False, user_id=rocco.id)

    db.session.add_all([kirby_cart, rocco_cart])
    db.session.commit()

    print("Creating Cart Foods...")
    kirb_food_1 = CartFood(food_id=lasagna.id, cart_id=kirby_cart.id)
    kirb_food_2 = CartFood(food_id=ravioli.id, cart_id=kirby_cart.id)
    roc_food_1 = CartFood(food_id=lasagna.id, cart_id=rocco_cart.id)
    roc_food_2 = CartFood(food_id=spaghetti.id, cart_id=rocco_cart.id)

    db.session.add_all([kirb_food_1, kirb_food_2, roc_food_1, roc_food_2])
    db.session.commit()

    print("Finishing Seeding Data")