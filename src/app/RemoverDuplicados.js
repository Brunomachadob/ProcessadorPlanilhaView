import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import FirebaseService from './servicos/FirebaseService';

import { downloadFile } from './utils/appUtils'

import ErrorDialog from './componentes/ErrorDialog';
import SeletorArquivo from './componentes/SeletorArquivo';
import ConfigModal from './componentes/config/ConfigModal';
import ErrosProcessamentoDialog from './componentes/ErrosProcessamentoDialog'

const styles = theme => ({
    container: {
        height: 240
    }
});

const CONFIG_PREFIX = 'configRemoveDupl/';

class RemoverDuplicados extends Component {
    planilhaAntiga;
    planilhaNova;

    state = {
        errorText: ''
    }

    onSelectPlanilha = nome => file => {
        this[nome] = file;

        this.setState({
            [nome + 'Error']: false
        })
    }

    processar = e => {
        const selecionouPlanilhaAntiga = Boolean(this.planilhaAntiga);
        const selecionouPlanilhaNova = Boolean(this.planilhaNova)

        this.setState({
            planilhaAntigaError: !selecionouPlanilhaAntiga,
            planilhaNovaError: !selecionouPlanilhaNova,
            showConfig: selecionouPlanilhaAntiga && selecionouPlanilhaNova
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

    setErrosProcessamento = (erros) => {
        this.setState({
            errosProcessamento: erros
        });
    }

    handleConfigConfirm = (config) => {
        const data = new FormData();

        data.set('planilhaAntiga', this.planilhaAntiga);
        data.set('planilhaNova', this.planilhaNova);
        data.set('config', config.value);

        axios.post(process.env.REACT_APP_API_URL + '/removerDupls', data)
            .then((result) => {
                if (result.data === true) {
                    this.setErrorText('As duas planilhas são iguais.');

                    if (config.name) {
                        this.upsertConfig(config);
                    }
                } else if (result.data instanceof Array) {
                    this.setErrosProcessamento(result.data);
                } else {
                    downloadFile(result.data)
                        .then(() => {
                            if (config.name) {
                                this.upsertConfig(config);
                            }
                        }).catch((error) => this.setErrorText(error.message));
                }
            }).catch((error) => this.setErrorText(error.message))
    }

    upsertConfig = (config) => {
        const model = {
            name: config.name,
            config: config.value,
            updated: Date.now()
        };

        if (config.key) {
            FirebaseService.updateData(config.key, CONFIG_PREFIX + FirebaseService.currentUser().uid, model);
        } else {
            FirebaseService.pushData(CONFIG_PREFIX + FirebaseService.currentUser().uid, model);
        }
    }

    setErrorText = (error) => {
        this.setState({
            errorText: error
        });
    }

    render() {
        const { classes } = this.props;
        const { errorText, showConfig, errosProcessamento, planilhaNovaError, planilhaAntigaError } = this.state;

        return (
            <div>
                <ErrorDialog open={Boolean(errorText)} title="Erro" text={errorText} handleClose={this.handleAlertClose} />
                {showConfig && <ConfigModal handleCancel={this.handleConfigClose} handleConfirm={this.handleConfigConfirm} firebaseCollection={CONFIG_PREFIX + FirebaseService.currentUser().uid} />}
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
                            <SeletorArquivo fileDesc="Planilha antiga" onSelect={this.onSelectPlanilha('planilhaAntiga')} error={planilhaAntigaError} />
                            <SeletorArquivo fileDesc="Planilha nova" onSelect={this.onSelectPlanilha('planilhaNova')} error={planilhaNovaError} />
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

export default withStyles(styles)(RemoverDuplicados);