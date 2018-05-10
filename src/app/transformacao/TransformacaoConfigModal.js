import React from 'react';

import TextField from 'material-ui/TextField';

import Card, { CardContent } from 'material-ui/Card';

import { withStyles } from 'material-ui/styles';

import ConfigModal from '../componentes/config/ConfigModal';
import ConfigProcessadores from './ConfigProcessadores';

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
                return <ConfigColuna
                    {...configProps}
                    classes={classes}
                />
            }}
        </ConfigModal>
    )
}

let ConfigColuna = (props) => {
    const { classes, colunaSelecionada, handleProcessadoresChange, handleInputChange } = props;

    return (
        <Card style={{ 'flexGrow': 1, 'padding': '20px', 'display': 'flex', 'flexDirection': 'column' }}>

            <CardContent style={{ 'flexGrow': 1 }}>
                <TextField
                    style={{ 'width': '35px' }}
                    className={classes.textField}
                    name="colunaSelecionada.nome"
                    disabled
                    inputProps={{ maxLength: 1 }}
                    label="Célula"
                    value={colunaSelecionada.nome}
                    onChange={handleInputChange}
                />
                <TextField
                    style={{ 'width': '250px' }}
                    className={classes.textField}
                    name="colunaSelecionada.descricao"
                    label="Descrição"
                    value={colunaSelecionada.descricao}
                    onChange={handleInputChange}
                />
                <ConfigProcessadores processadores={colunaSelecionada.processadores} handleListChange={handleProcessadoresChange} />
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(TransformacaoConfig);