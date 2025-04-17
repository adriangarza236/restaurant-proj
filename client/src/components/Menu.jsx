import React, { useContext } from "react";
import FoodCards from "./FoodCards";
import { FoodsContext } from "../context/FoodsContext";
import { UsersContext } from "../context/UsersContext";
import { Container, Grid, Typography } from "@mui/material";

function Menu() {
    const { currentUser } = useContext(UsersContext);
    const { foods } = useContext(FoodsContext);

    // Mapping over foods and passing them to FoodCards
    const foodCards = foods.map((food) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
            <FoodCards food={food} currentUser={currentUser} />
        </Grid>
    ));

    return (
        <Container
            sx={{
                marginTop: "2rem",
                textAlign: "center",
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                    fontFamily: "'Dancing Script', cursive",
                    color: "#8b0000",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font sizes
                }}
            >
                Menu
            </Typography>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch" // Ensures items stretch to fill available space
                wrap="wrap" // Ensures proper wrapping on smaller screens
            >
                {foodCards}
            </Grid>
        </Container>
    );
}

export default Menu;