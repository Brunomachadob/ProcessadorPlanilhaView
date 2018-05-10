import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import ErrorDialog from '../componentes/ErrorDialog';
import SeletorArquivo from '../componentes/SeletorArquivo';
import ConfigModal from '../componentes/config/ConfigModal';

const styles = theme => ({
    container: {
        height: 240
    }
});

class Transformacao extends Component {
    planilha;

    state = {
        errorText: ''
    }

    onSelectPlanilha = file => {
        this.planilha = file;
    }

    processar = e => {
        this.setState({
            errorText: this.planilha ? '' : 'Informe a planilha a ser processada',
            showConfig: this.planilha ? true : false
        })
    }

    handleAlertClose = () => {
        this.setState({
            errorText: ''
        })
    }

    handleConfigClose = () => {
        this.setState({
            showConfig: false
        })
    }

    handleConfigConfirm = (config) => {
        const data = new FormData();

        data.set('file', this.planilha);
        data.set('config', config);

        axios.post('http://localhost:8080/processador', data)
            .then(function (result) {
                var blob = new Blob([result.data]);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "myFileName.xlsx";
                link.click();
            }).catch(console.error)
    }

    render() {
        const { classes } = this.props;
        const { errorText, showConfig } = this.state;

        return (
            <div>
                {errorText && <ErrorDialog title="Campos obrigatórios" text={errorText} handleClose={this.handleAlertClose} />}
                {showConfig && <ConfigModal handleCancel={this.handleConfigClose} handleConfirm={this.handleConfigConfirm} />}
                <Grid
                    container
                    className={classes.container}
                    justify="center"
                    alignItems="center"
                    direction="column"
                >
                    <Card>
                        <CardContent>
                            <SeletorArquivo onSelect={this.onSelectPlanilha} />
                        </CardContent>
                        <CardActions>
                            <Button variant="raised" color="primary" onClick={this.processar}>PROCESSAR</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>

        )
    }
}

export default withStyles(styles)(Transformacao);