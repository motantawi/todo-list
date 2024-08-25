import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "@hooks/useUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const renderLinks = () => (
    <List>
      <ListItem button onClick={() => handleNavigation(user ? "/todos" : "/")}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation("/about")}>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation("/contact")}>
        <ListItemText primary="Contact" />
      </ListItem>
      {!user ? (
        <>
          <ListItem button onClick={() => handleNavigation("/login")}>
            <ListItemText primary="Sign-In" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/register")}>
            <ListItemText primary="Sign-Up" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={() => handleNavigation("/profile")}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              logout();
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        flexGrow: 1,
        display:
          location.pathname === "/login" || location.pathname === "/register"
            ? "none"
            : "block",
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", marginRight: 2 }}
              onClick={() => navigate(user ? "/todos" : "/")}
            >
              TODO LIST
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate(user ? "/todos" : "/")}
              >
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate("/about")}>
                About
              </Button>
              <Button color="inherit" onClick={() => navigate("/contact")}>
                Contact
              </Button>
              {user && (
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {!user ? (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Sign-In
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  Sign-Up
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "100%",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {renderLinks()}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
