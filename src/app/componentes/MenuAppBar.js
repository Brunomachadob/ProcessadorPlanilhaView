import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from 'material-ui/Avatar';


import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { GoogleAuthProvider, firebaseAuth } from '../utils/firebaseUtils'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends Component {
    state = {
        anchorEl: null,
    };

    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            GoogleAuthProvider,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSair = () => {
        this.handleClose();
        firebaseAuth.signOut();
    };
    render() {
        const { classes, user } = this.props;
        const { anchorEl } = this.state;

        const auth = Boolean(user);
        const open = auth && Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {'Processador de Planilhas'}
                        </Typography>
                        {!auth && (
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebaseAuth} />
                        )}
                        {auth && (
                            <div>
                                <UserIcon photoURL={user.photoURL} open={open} handleMenu={this.handleMenu} />
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleSair}>Sair</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

function UserIcon({ open, photoURL, handleMenu }) {
    return (
        photoURL ? <Avatar alt="Remy Sharp"
            src={photoURL}
            onClick={handleMenu}
        />
            : <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
    )
}

export default withStyles(styles)(MenuAppBar);