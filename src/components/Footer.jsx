import { Box, Container, Typography, Grid, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              TodoList
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Making your daily tasks manageable.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" align="center">
              Links
            </Typography>
            <Button
              color="inherit"
              href="#!"
              sx={{ display: "block", textAlign: "center" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              href="#!"
              sx={{ display: "block", textAlign: "center" }}
            >
              About
            </Button>
            <Button
              color="inherit"
              href="#!"
              sx={{ display: "block", textAlign: "center" }}
            >
              Services
            </Button>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" align="center">
              Resources
            </Typography>
            <Button
              color="inherit"
              href="#!"
              sx={{ display: "block", textAlign: "center" }}
            >
              FAQ
            </Button>
            <Button
              color="inherit"
              href="#!"
              sx={{ display: "block", textAlign: "center" }}
            >
              Help
            </Button>
            <Button
              color="inherit"
              href="#!"
              sx={{ display: "block", textAlign: "center" }}
            >
              Contact
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Follow Us
            </Typography>
            <Box textAlign="center">
              <Button color="inherit" href="#!">
                Facebook
              </Button>
              <Button color="inherit" href="#!">
                Twitter
              </Button>
              <Button color="inherit" href="#!">
                LinkedIn
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} TodoList. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
