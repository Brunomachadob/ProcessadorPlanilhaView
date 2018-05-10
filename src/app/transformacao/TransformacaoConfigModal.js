import React from 'react';

import TextField from 'material-ui/TextField';

import Card, { CardContent } from 'material-ui/Card';

import { withStyles } from 'material-ui/styles';

import ConfigModal from '../componentes/config/ConfigModal';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    colunas: {
        flexGrow: 1
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

let TransformacaoConfig = (props) => {
    const { classes, handleCancel, handleConfirm } = props;

    return (
       <ConfigModal handleCancel={handleCancel} handleConfirm={handleConfirm}>
           {(configProps) => {
                return <YAMLEditor />
           }}
       </ConfigModal>
   )
}

export default withStyles(styles)(TransformacaoConfig);