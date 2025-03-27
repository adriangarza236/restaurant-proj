import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CartsContext } from "../context/CartsContext";
import { UsersContext } from "../context/UsersContext";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Signup = () => {
    const { loggedIn, login_user } = useContext(UsersContext);

    // Define navigate
    const navigate = useNavigate();

    const { createCart } = useContext(CartsContext);

    // Navigate after signup
    useEffect(() => {
        if (loggedIn) {
            navigate("/menu");
        }
    }, [loggedIn]);

    // Define initial values for formik 
    const initialValues = {
        email: "",
        password: "",
    };

    // Define yup validations
    const validationSchema = yup.object({
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(10, "Password cannot exceed 10 characters"),
    });

    // Handle creating a user
    const handleSubmit = async (values) => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        const resp = await fetch("api/signup", options);
        if (resp.status === 201) {
            const user = await resp.json();
            login_user(user);
            await createCart(user.id);
        }
    };

    // Defining formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

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
                Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ marginBottom: "1rem" }}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.email)}
                        helperText={formik.errors.email}
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "4px",
                        }}
                    />
                </Box>
                <Box sx={{ marginBottom: "1rem" }}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Create Password"
                        type="password"
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.password)}
                        helperText={formik.errors.password}
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "4px",
                        }}
                    />
                </Box>
                <Button
                    type="submit"
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
                    Create Account
                </Button>
            </form>
        </Container>
    );
};

export default Signup;