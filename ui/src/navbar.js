import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@mui/material/MenuItem";

const pages = [
  {
    id: "validate",
    display: "Validate",
  },
  {
    id: "render",
    display: "Render",
  },
  {
    id: "fragment",
    display: "Fragment",
  },
  {
    id: "convert",
    display: "CDA↔FHIR",
  },
  {
    id: "about",
    display: "About",
  },
];

export class ResponsiveAppBar extends Component {
  state = {
    anchorElNav: false,
  };

  handleOpenNavMenu = (event) => {
    if (this.state.anchorElNav) {
      this.setState({
        anchorElNav: false,
      });
    } else {
      this.setState({
        anchorElNav: true,
      });
    }
  };

  handleCloseNavMenu = () => {};

  changeUrl = (event) => {
    // console.log(event.target.id);
    this.props.navigate(event.target.id);
  };

  about = () => {
    this.props.navigate("about");
  };

  render() {
    return (
      <AppBar position="static" style={{ backgroundColor: "#2E8B57" }}>
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="a"
              href="#"
              sx={{
                mr: 28,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                backgroundColor: "#2E8B57",
              }}
              onClick={this.about}
            >
              ccda.io
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(this.state.anchorElNav)}
                onClick={this.handleOpenNavMenu}
                onClose={this.handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    id={page.id}
                    key={page.display}
                    onClick={this.changeUrl}
                  >
                    <Typography
                      textAlign="center"
                      id={page.id}
                      key={page.display}
                      onClick={this.changeUrl}
                    >
                      {page.display}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ccda.io
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  id={page.id}
                  key={page.display}
                  onClick={this.changeUrl}
                  sx={{
                    my: 2,
                    mr: 4,
                    color: this.props.active[page.id] ? "white" : "lightgray",
                    display: "block",
                    fill: "blue",
                    fontWeight: this.props.active[page.id] ? 700 : 400
                  }}
                >
                  {page.display}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default ResponsiveAppBar;

/*


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


*/
