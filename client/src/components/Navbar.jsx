import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
    const { loggedIn, logout_user, currentUser } = useContext(UsersContext);

    // Define navigate
    const navigate = useNavigate();

    // Handle logging out via navbar
    const handleClick = (event) => {
        event.preventDefault();

        fetch("/api/logout", { method: "DELETE" })
            .then(() => logout_user())
            .then(() => navigate("/"));
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#8b0000", // Deep red for Italian theme
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: "1.8rem",
                    }}
                >
                    Olive Lawn
                </Typography>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Button
                        component={Link}
                        to="/"
                        sx={{
                            color: "#f8f1e4",
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: "1.2rem",
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/menu"
                        sx={{
                            color: "#f8f1e4",
                            fontFamily: "'Dancing Script', cursive",
                            fontSize: "1.2rem",
                        }}
                    >
                        Menu
                    </Button>
                    {loggedIn ? (
                        <>
                            <Button
                                onClick={handleClick}
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: "1.2rem",
                                }}
                            >
                                Logout
                            </Button>
                            <Button
                                component={Link}
                                to="/cart"
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: "1.2rem",
                                }}
                            >
                                Cart
                            </Button>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Roboto', sans-serif",
                                    alignSelf: "center",
                                }}
                            >
                                {currentUser.email} is logged in
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/signup"
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: "1.2rem",
                                }}
                            >
                                Sign Up
                            </Button>
                            <Button
                                component={Link}
                                to="/login"
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: "1.2rem",
                                }}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;