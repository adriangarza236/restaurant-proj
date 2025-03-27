import React from "react";
import { Typography, Box, Container } from "@mui/material";

function Home() {
    return (
        <Container
            maxWidth="md"
            sx={{
                textAlign: "center",
                backgroundColor: "#f8f1e4",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                marginTop: "2rem",
            }}
        >
            <Box
                sx={{
                    backgroundImage: "url('/path-to-italian-background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "2rem",
                    borderRadius: "8px",
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontFamily: "'Dancing Script', cursive",
                        color: "#8b0000",
                    }}
                >
                    Welcome to Olive Lawn!
                </Typography>
                <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                        fontFamily: "'Roboto', sans-serif",
                        color: "#4b2c20",
                    }}
                >
                    Come and order some of your favorite Italian cuisines.
                </Typography>
            </Box>
        </Container>
    );
}

export default Home;