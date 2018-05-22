import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        flex: '1 0 100%',
    },
    hero: {
        minHeight: '80vh',
        flex: '0 0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main,
    },
    content: {
        paddingBottom: theme.spacing.unit * 8,
        paddingTop: theme.spacing.unit * 8,
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing.unit * 12,
        },
    },
    headline: {
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit,
        textAlign: 'center',
    },
});

class Landing extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.hero}>
                    <div className={classes.content}>
                        <div className={classes.text}>
                            <Typography
                                variant="headline"
                                component="h2"
                                color="inherit"
                                gutterBottom
                                className={classes.headline}
                            >
                                {"Processador de planilhas criado para realizar pequenas operações em planilhas XLSX"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Landing);