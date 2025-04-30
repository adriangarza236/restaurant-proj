import React, { useContext } from "react";
import { UsersContext } from "../context/UsersContext";
import { CartFoodsContext } from "../context/CartFoodsContext";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const FoodCards = ({ food, currentUser }) => {
    const { loggedIn } = useContext(UsersContext);
    const { addToCart, updateCartFood, cartFoods } = useContext(CartFoodsContext);
    

    //defnining cartfoods that already exist in the users cart
    const existingCartFood = currentUser
        ? cartFoods.find(cartFood => cartFood.food_id === food.id && cartFood.cart_id === currentUser.id)
        : null;

    //if a cartfood exists it will update the quantity if not it will create a new cartFood
    const handleAddFood = (e) => {
        e.preventDefault();

        if (existingCartFood) {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: existingCartFood.quantity + 1,
                }),
            };

            fetch(`/api/cart_food/${existingCartFood.id}`, options)
                .then(resp => resp.json())
                .then(data => {
                    updateCartFood(data);
                });
        } else {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    food_id: food.id,
                    cart_id: currentUser.id,
                    quantity: 1,
                }),
            };

            fetch("/api/cart_foods", options)
                .then(resp => resp.json())
                .then(data => {
                    addToCart(data);
                });
        }
    };

    return (
        <Card
            sx={{
                width: 345, // Fixed width
                height: 450, // Fixed height
                margin: "1rem",
                backgroundColor: "#f8f1e4",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={food.image}
                alt={food.name}
            />
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        fontFamily: "'Dancing Script', cursive",
                        color: "#8b0000",
                        textAlign: "center",
                    }}
                >
                    {food.name}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#4b2c20",
                        textAlign: "center",
                    }}
                >
                    ${food.price}
                </Typography>
                {loggedIn && (
                    <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
                        <Button
                            onClick={handleAddFood}
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
                            {existingCartFood
                                ? `In Cart (${existingCartFood.quantity})`
                                : "Add to Cart"}
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default FoodCards;