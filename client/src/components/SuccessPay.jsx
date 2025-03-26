import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import { CartFoodsContext } from "../context/CartFoodsContext";
import { Container, Typography, Button } from "@mui/material";

const SuccessPay = () => {
    const { currentUser } = useContext(UsersContext);
    const { cartFoods, deleteAllCartFood } = useContext(CartFoodsContext);
    const navigate = useNavigate();

    // Clear the user's cart after successful payment
    useEffect(() => {
        const userCartFoods = currentUser
            ? cartFoods.filter((cartFood) => cartFood.cart.user_id === currentUser.id)
            : [];

        if (userCartFoods.length > 0) {
            deleteAllCartFood(userCartFoods);
        }
    }, [currentUser, deleteAllCartFood, cartFoods]);

    // Redirect to menu
    const handleGoToMenu = () => {
        navigate("/menu");
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                backgroundColor: "#f8f1e4",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                marginTop: "2rem",
                textAlign: "center",
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontFamily: "'Dancing Script', cursive",
                    color: "#8b0000",
                }}
            >
                Order Successful!
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontFamily: "'Roboto', sans-serif",
                    color: "#4b2c20",
                    marginBottom: "1.5rem",
                }}
            >
                Thank you for your order! We hope you enjoy your meal.
            </Typography>
            <Button
                type="button"
                onClick={handleGoToMenu}
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
                Back to Menu
            </Button>
        </Container>
    );
};

export default SuccessPay;