from flask import request, jsonify
from extensions import db
from app import app
import stripe
import os
from models.cart import Cart
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart


load_dotenv()

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route("/api/create-checkout-session", methods=["POST"])
def create_checkout_session():
    cart_id = request.json['cart_id']
    cart = db.session.query(Cart).filter_by(id=cart_id).first()

    currentUser = request.json.get('currentUser')
    # tax_rate_id = "txcd_40060003"
    
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
            # 'tax_rates': [tax_rate_id],
        }],
        mode = 'payment',
        ui_mode = 'embedded',
        customer_email = currentUser['email'],
        return_url = 'http://localhost:5173/checkout-loading?session_id={CHECKOUT_SESSION_ID}',
     
    )


    return jsonify(clientSecret=session.client_secret, session=session)


@app.route('/api/session-status', methods=["GET"])
def session_status():
    session_id = request.args.get('session_id')
    if not session_id:
        return jsonify({"error": "Session ID is required"}), 400

    try:
        # Retrieve the session from Stripe
        session = stripe.checkout.Session.retrieve(session_id)

        if session.status == 'complete':
            # Check if the email has already been sent
            if session.metadata.get('email_sent') == 'true':
                return jsonify(status=session.status, customer_email=session.customer_details.email)

            try:
                sender_email = "adriangduran236@gmail.com"
                receiver_email = session.customer_details.email
                password = os.getenv('EMAIL_PASSWORD')

                # Create the email content
                message = MIMEMultipart("alternative")
                message["Subject"] = "Order Confirmation"
                message["From"] = sender_email
                message["To"] = receiver_email

                html = f"""
                <html>
                <body>
                    <h1>Thank you for your order!</h1>
                    <p>Your order total is ${session.amount_total / 100:.2f}.</p>
                    <p>Your order will arrive in approximately 15 to 20 minutes.</p>
                </body>
                </html>
                """
                message.attach(MIMEText(html, "html"))

                # Connect to the SMTP server and send the email
                with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                    server.login(sender_email, password)
                    server.sendmail(sender_email, receiver_email, message.as_string())

                # Update the session metadata to mark the email as sent
                stripe.checkout.Session.modify(
                    session.id,
                    metadata={'email_sent': 'true'}
                )

            except Exception as e:
                print(f"Error sending email: {e}")

        return jsonify(status=session.status, customer_email=session.customer_details.email)

    except stripe.error.StripeError as e:
        return jsonify({"error": str(e)}), 400




