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
            .then((result) => {
                if (result.data instanceof Array) {
                    this.setErrorText(result.data);
                } else {
                    var fileName = result.data;
                    axios.get('http://localhost:8080/processador/download/' + fileName, {
                        responseType: 'blob'
                    }).then((result) => {
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(result.data)
                        link.download = fileName.split('_')[0] + 'Processada.xlsx';
                        link.click()
                    }).catch((error) => this.setErrorText(error.message));
                }
            }).catch((error) => this.setErrorText(error.message))
    }

    setErrorText = (error) => {
        this.setState({
            errorText: error
        })
    }

    render() {
        const { classes } = this.props;
        const { errorText, showConfig } = this.state;

        return (
            <div>
                {errorText && <ErrorDialog title="Erro" text={errorText} handleClose={this.handleAlertClose} />}
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