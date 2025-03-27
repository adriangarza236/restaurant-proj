import React, { useContext } from "react";
import { CartFoodsContext } from "../context/CartFoodsContext";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

function CartFoodCards({ cartFood }) {
    const { deleteCartFood } = useContext(CartFoodsContext);

    // Remove cartFood from db.
    const handleRemove = (e, cartFood) => {
        e.preventDefault();
        if (cartFood) {
            fetch("/api/cart_food/" + cartFood.id, { method: "DELETE" });
            deleteCartFood(cartFood);
        }
    };

    return (
        <Card
            sx={{
                display: "flex",
                margin: "1rem",
                backgroundColor: "#f8f1e4",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={cartFood.food.image}
                alt={cartFood.food.name}
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Dancing Script', cursive",
                        color: "#8b0000",
                    }}
                >
                    {cartFood.food.name}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#4b2c20",
                    }}
                >
                    Price: ${cartFood.food.price.toFixed(2)}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#4b2c20",
                    }}
                >
                    Quantity: {cartFood.quantity}
                </Typography>
                <Box sx={{ marginTop: "1rem" }}>
                    <Button
                        onClick={(e) => handleRemove(e, cartFood)}
                        variant="contained"
                        sx={{
                            backgroundColor: "#8b0000",
                            color: "#f8f1e4",
                            fontFamily: "'Dancing Script', cursive",
                            "&:hover": {
                                backgroundColor: "#a30000",
                            },
                        }}
                    >
                        Remove from Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default CartFoodCards;