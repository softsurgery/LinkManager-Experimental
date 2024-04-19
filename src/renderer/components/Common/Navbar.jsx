import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import PropTypes from "prop-types";

export const Navbar = ({ isRoot, content }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!isRoot && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="go back"
              onClick={handleGoBack}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "1rem" }}
          >
            Link Manager
          </Typography>
          {content}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Navbar.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  content: PropTypes.node,
};
