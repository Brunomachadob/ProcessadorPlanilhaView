import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import ConfigModal from '../componentes/ConfigModal';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    colunas: {
        flexGrow: 1
    }
});

class TransformacaoConfig extends Component {

    render() {
        const { classes, handleCancel, handleConfirm } = this.props;

        return (
            <ConfigModal handleCancel={handleCancel} handleConfirm={handleConfirm}>
                {(coluna) => {
                    return (
                        <ConfigColuna coluna={coluna} className={classes.name} />
                    )
                }}
            </ConfigModal>
        )
    }
}

const ConfigColuna = (props) => {
    const { coluna } = props;

    return (
        <Paper elevation={4}>
            {JSON.stringify(coluna)}
        </Paper>
    )
}

export default withStyles(styles)(TransformacaoConfig);