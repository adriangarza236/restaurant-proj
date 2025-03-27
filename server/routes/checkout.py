from flask import request, jsonify
from config import app, db
import stripe
import os
from models.cart import Cart
from dotenv import load_dotenv


load_dotenv()

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route("/api/create-checkout-session", methods=["POST"])
def create_checkout_session():
    cart_id = request.json['cart_id']
    cart = db.session.query(Cart).filter_by(id=cart_id).first()
    
    if not cart:
        return jsonify({"error": "Cart not found"}), 404
    session = stripe.checkout.Session.create(
        line_items = [{
            'price_data': {
                'currency': 'usd',
                'unit_amount': int(cart.total_price * 100),  
                'product_data': {
                    'name': 'Cart Total'
                }
            },
            'quantity': 1,
        }],
        mode = 'payment',
        ui_mode = 'embedded',
        return_url = 'http://localhost:5173/checkout-loading?session_id={CHECKOUT_SESSION_ID}',
     
    )

    return jsonify(clientSecret=session.client_secret, session=session)


@app.route('/api/session-status', methods=["GET"])
def session_status():
    session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

    return jsonify(status=session.status, customer_email=session.customer_details.email)




