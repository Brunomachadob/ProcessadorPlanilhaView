import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import FirebaseService from './servicos/FirebaseService';

import ErrorDialog from './componentes/ErrorDialog';
import SeletorArquivo from './componentes/SeletorArquivo';
import ConfigModal from './componentes/config/ConfigModal';
import ErrosProcessamentoDialog from './componentes/ErrosProcessamentoDialog'

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
        });
    }

    handleAlertClose = () => {
        this.setState({
            errorText: ''
        });
    }

    handleConfigClose = () => {
        this.setState({
            showConfig: false
        });
    }

    handleCloseErrosProcessamento = () => {
        this.setState({
            errosProcessamento: null
        });
    }

    handleConfigConfirm = (config) => {
        const data = new FormData();

        data.set('file', this.planilha);
        data.set('config', config.value);

        axios.post(process.env.REACT_APP_API_URL + '/processador', data)
            .then((result) => {
                if (result.data instanceof Array) {
                    this.setErrorText(result.data);
                } else {
                    var fileName = result.data;

                    axios.get(process.env.REACT_APP_API_URL + '/processador/download/' + fileName, {
                        responseType: 'blob'
                    }).then((result) => {
                        this.downloadFile(fileName, result.data);

                        if (config.name) {
                            this.upsertConfig(config);
                        }
                    }).catch((error) => this.setErrorText(error.message));
                }
            }).catch((error) => this.setErrorText(error.message))
    }

    downloadFile = (fileName, data) => {
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(data)
        link.download = fileName.split('_')[0] + 'Processada.xlsx'
        link.click()
    }

    upsertConfig = (config) => {
        const model = {
            name: config.name,
            config: config.value,
            updated: Date.now()
        };

        if (config.key) {
            FirebaseService.updateData(config.key, 'configProcessamentos/' + FirebaseService.currentUser().uid, model);
        } else {
            FirebaseService.pushData('configProcessamentos/' + FirebaseService.currentUser().uid, model);
        }
    }

    setErrorText = (error) => {
        this.setState({
            errorText: error
        })
    }

    render() {
        const { classes } = this.props;
        const { errorText, showConfig, errosProcessamento } = this.state;

        return (
            <div>
                <ErrorDialog open={Boolean(errorText)} title="Erro" text={errorText} handleClose={this.handleAlertClose} />
                {showConfig && <ConfigModal handleCancel={this.handleConfigClose} handleConfirm={this.handleConfigConfirm} firebaseCollection={"configProcessamentos/" + FirebaseService.currentUser().uid} />}
                <ErrosProcessamentoDialog open={Boolean(errosProcessamento)} erros={errosProcessamento} handleClose={this.handleCloseErrosProcessamento} />
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