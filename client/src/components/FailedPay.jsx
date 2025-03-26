import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const FailedPay = () => {
    // Define navigate
    const navigate = useNavigate();

    // Redirect to cart to attempt payment again
    const handleClick = (e) => {
        e.preventDefault();
        navigate("/cart");
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
                Payment Failed
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontFamily: "'Roboto', sans-serif",
                    color: "#4b2c20",
                    marginBottom: "1.5rem",
                }}
            >
                Something went wrong with your payment. Please try again.
            </Typography>
            <Button
                type="button"
                onClick={handleClick}
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
                Retry
            </Button>
        </Container>
    );
};

export default FailedPay;