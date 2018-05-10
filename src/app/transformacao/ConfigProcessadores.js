import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import Card, { CardContent } from 'material-ui/Card';

import ReorderList from '../componentes/dnd/ReorderList';

const styles = theme => ({
    root: {
        margin: '20px 4px'
    }
});

const ConfigProcessadores = (props) => {
    const { classes, processadores, handleListChange } = props;

    return (
        <Card className={classes.root}>
            <CardContent style={{ 'flexGrow': 1 }}>
                <Typography gutterBottom variant="subheading">
                    {'Processadores'}
                </Typography>
                <Divider />
                <ReorderList items={processadores} onItemsChange={handleListChange} />
            </CardContent>
        </Card>
    );
}

ConfigProcessadores.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigProcessadores);