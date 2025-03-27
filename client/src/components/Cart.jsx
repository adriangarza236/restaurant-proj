import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartFoodCards from "./CartFoodCards";
import { CartsContext } from "../context/CartsContext";
import { UsersContext } from "../context/UsersContext";
import { CartFoodsContext } from "../context/CartFoodsContext";
import { Container, Typography, Button, Box } from "@mui/material";

const Cart = () => {
    const navigate = useNavigate();
    const { updateCart } = useContext(CartsContext);
    const { currentUser, loggedIn } = useContext(UsersContext);
    const { cartFoods } = useContext(CartFoodsContext);

    // Filter cartFoods for the current user
    const filteredCartFoods = cartFoods.filter(
        (cartFood) => currentUser && cartFood.cart.user_id === currentUser.id
    );

    // Group cartFoods by food_id and sum quantities
    const groupedCartFoods = filteredCartFoods.reduce((accumulator, cartFood) => {
        const existingCartFood = accumulator.find((item) => item.food_id === cartFood.food_id);
        if (existingCartFood) {
            existingCartFood.quantity += 1;
        } else {
            accumulator.push({ ...cartFood });
        }
        return accumulator;
    }, []);

    // Map cartFood info to individual cards
    const cartFoodCards = groupedCartFoods.map((cartFood) => (
        <CartFoodCards key={cartFood.food_id} cartFood={cartFood} />
    ));

    // Use quantity to calculate correct total price
    const prices = filteredCartFoods.map((cartFood) => cartFood.food.price * cartFood.quantity)
    const total = prices.reduce((sum, price) => sum + price, 0);

    // Update cart total in the backend
    useEffect(() => {
        if (filteredCartFoods.length > 0) {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    total_price: total,
                }),
            };
            fetch("/api/cart/" + filteredCartFoods[0].cart_id, options)
                .then((resp) => resp.json())
                .then((data) => {
                    updateCart(data);
                });
        }
    }, [total]);

    // Navigate to checkout
    const handleCheckout = (e) => {
        e.preventDefault();
        navigate("/checkout");
    };

    return (
        <Container
            sx={{
                marginTop: "2rem",
                backgroundColor: "#f8f1e4",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontFamily: "'Dancing Script', cursive",
                    color: "#8b0000",
                    textAlign: "center",
                }}
            >
                Cart
            </Typography>
            {loggedIn ? (
                cartFoodCards
            ) : (
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#4b2c20",
                        textAlign: "center",
                    }}
                >
                    Loading...
                </Typography>
            )}
            <Typography
                variant="h5"
                sx={{
                    fontFamily: "'Roboto', sans-serif",
                    color: "#4b2c20",
                    textAlign: "center",
                    marginTop: "1rem",
                }}
            >
                Total: ${filteredCartFoods.length > 0 ? total.toFixed(2) : "0.00"}
            </Typography>
            {total > 0 && (
                <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button
                        onClick={handleCheckout}
                        variant="contained"
                        sx={{
                            backgroundColor: "#8b0000",
                            color: "#f8f1e4",
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: "1.2rem",
                            "&:hover": {
                                backgroundColor: "#a30000",
                            },
                        }}
                    >
                        Checkout
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default Cart;