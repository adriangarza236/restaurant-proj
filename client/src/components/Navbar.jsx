import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const { loggedIn, logout_user, currentUser } = useContext(UsersContext);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Handle logging out via navbar
    const handleClick = (event) => {
        event.preventDefault();

        fetch("/api/logout", { method: "DELETE" })
            .then(() => logout_user())
            .then(() => navigate("/"));
    };

    // Toggle drawer for mobile menu
    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    // Links for navigation
    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Menu", to: "/menu" },
        ...(loggedIn
            ? [
                  { label: "Cart", to: "/cart" },
                  { label: "Logout", action: handleClick },
              ]
            : [
                  { label: "Sign Up", to: "/signup" },
                  { label: "Login", to: "/login" },
              ]),
    ];

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#8b0000", // Deep red for Italian theme
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Toolbar>
                {/* Brand Name */}
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

                {/* Desktop Navigation */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        gap: "1rem",
                    }}
                >
                    {navLinks.map((link, index) =>
                        link.action ? (
                            <Button
                                key={index}
                                onClick={link.action}
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: "1.2rem",
                                }}
                            >
                                {link.label}
                            </Button>
                        ) : (
                            <Button
                                key={index}
                                component={Link}
                                to={link.to}
                                sx={{
                                    color: "#f8f1e4",
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: "1.2rem",
                                }}
                            >
                                {link.label}
                            </Button>
                        )
                    )}
                    {loggedIn && (
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
                    )}
                </Box>

                {/* Mobile Navigation */}
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: "block", md: "none" } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{
                            width: 250,
                        }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {navLinks.map((link, index) =>
                                link.action ? (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={link.action}>
                                            <ListItemText primary={link.label} />
                                        </ListItemButton>
                                    </ListItem>
                                ) : (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={link.to}
                                        >
                                            <ListItemText primary={link.label} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;