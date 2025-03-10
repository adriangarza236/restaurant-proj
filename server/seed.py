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
    lasagna = Food(name="Lasagna", price="13.99", image="https://www.google.com/imgres?q=lasagna&imgurl=https%3A%2F%2Fcafedelites.com%2Fwp-content%2Fuploads%2F2018%2F01%2FMamas-Best-Lasagna-IMAGE-43.jpg&imgrefurl=https%3A%2F%2Fcafedelites.com%2Fbest-lasagna%2F&docid=W_2VVXyj3R5uFM&tbnid=htXMLTWexwS5YM&vet=12ahUKEwi6o7SahYCMAxWgGtAFHRyiE7AQM3oECH8QAA..i&w=1600&h=2400&hcb=2&ved=2ahUKEwi6o7SahYCMAxWgGtAFHRyiE7AQM3oECH8QAA")
    spaghetti = Food(name="Sphagetti", price="10.99", image="https://www.google.com/imgres?q=spaghetti&imgurl=https%3A%2F%2Fwww.onceuponachef.com%2Fimages%2F2019%2F09%2FSpaghetti-and-Meatballs-1200x1554.jpg&imgrefurl=https%3A%2F%2Fwww.onceuponachef.com%2Frecipes%2Fspaghetti-and-meatballs.html&docid=hleCPKTl9BJVnM&tbnid=35vJPgqKK0E2bM&vet=12ahUKEwiMlsTUhYCMAxUNMtAFHSTXBnsQM3oECBcQAA..i&w=1200&h=1554&hcb=2&ved=2ahUKEwiMlsTUhYCMAxUNMtAFHSTXBnsQM3oECBcQAA")
    ravioli = Food(name="Ravioli", price="11.99", image="https://www.google.com/imgres?q=ravioli&imgurl=https%3A%2F%2Fwww.thecountrycook.net%2Fwp-content%2Fuploads%2F2012%2F06%2Fthumbnail-Baked-Ravioli-Casserole.png&imgrefurl=https%3A%2F%2Fwww.thecountrycook.net%2Fravioli-casserole%2F&docid=GP3HvnkyVoPx8M&tbnid=5E7UEV5mi2nkUM&vet=12ahUKEwiz9vn6hYCMAxXk8MkDHR3RClsQM3oECFkQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiz9vn6hYCMAxXk8MkDHR3RClsQM3oECFkQAA")

    db.session.add_all([lasagna, spaghetti, ravioli])
    db.session.commit()

    print("Creating Carts...")
    kirby_cart = Cart(total_price=25.98, payment_status=False)
    rocco_cart = Cart(total_price=24.98, payment_status=False)

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