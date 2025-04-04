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
    spaghetti = Food(name="Spaghetti", price="10.99", image="https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs-1200x1554.jpg")
    ravioli = Food(name="Ravioli", price="11.99", image="https://www.thecountrycook.net/wp-content/uploads/2012/06/thumbnail-Baked-Ravioli-Casserole.png")
    meatball = Food(name="Meatballs", price="8.99", image="https://www.flavcity.com/wp-content/uploads/2018/06/meatballs-tomato-sauce.jpg")
    alfredo = Food(name="Chicken Alfredo", price="14.99", image="https://iwashyoudry.com/wp-content/uploads/2022/08/Chicken-Alfredo-Low-Res-21.jpg")
    scampi = Food(name="Shrimp Scampi", price = "14.99", image="https://www.savingdessert.com/wp-content/uploads/2019/03/Shrimp-Scampi-1.jpg")
    chicken = Food(name="Chicken Parmigiana", price = "13.99", image="https://www.allrecipes.com/thmb/NqzCcC9X9Eal2WMhnqtmTTpQQrU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8975-chicken-parmigiana-ddmfs-4448-4x3-beauty-0288bb95d4b643b79619b10059b4df55.jpg")
    marsala = Food(name="Chicken Marsala", price="12.99", image="https://modernmealmakeover.com/wp-content/uploads/2021/02/IMG_0039-2.jpg")
    ziti = Food(name="Baked Ziti", price="12.99", image="https://sugarspunrun.com/wp-content/uploads/2025/01/Baked-Ziti-Recipe-1-of-1-2.jpg")
    shrimp = Food(name="Shrimp Carbonara", price="13.99", image="https://www.allrecipes.com/thmb/oiSmmvizuvo4TZJ_4lWa1CA5fEs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5296156-shrimp-carbonara-Bren-4x3-1-0f1767cf78514e8ba1c7219729f4626a.jpg")



    db.session.add_all([lasagna, spaghetti, ravioli, meatball, alfredo, scampi, chicken, marsala, ziti, shrimp])
    db.session.commit()

    print("Creating Carts...")
    kirby_cart = Cart(total_price=25.98, user_id=kirby.id)
    rocco_cart = Cart(total_price=24.98, user_id=rocco.id)

    db.session.add_all([kirby_cart, rocco_cart])
    db.session.commit()

    print("Creating Cart Foods...")
    kirb_food_1 = CartFood(quantity=1, food_id=lasagna.id, cart_id=kirby_cart.id)
    kirb_food_2 = CartFood(quantity=3, food_id=ravioli.id, cart_id=kirby_cart.id)
    roc_food_1 = CartFood(quantity=2, food_id=lasagna.id, cart_id=rocco_cart.id)
    roc_food_2 = CartFood(quantity=1, food_id=spaghetti.id, cart_id=rocco_cart.id)

    db.session.add_all([kirb_food_1, kirb_food_2, roc_food_1, roc_food_2])
    db.session.commit()

    print("Finishing Seeding Data")