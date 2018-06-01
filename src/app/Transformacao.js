import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import FirebaseService from './servicos/FirebaseService';

import { downloadFile } from './utils/appUtils';

import ErrorDialog from './componentes/ErrorDialog';
import SeletorArquivo from './componentes/SeletorArquivo';
import ConfigModal from './componentes/config/ConfigModal';
import ErrosProcessamentoDialog from './componentes/ErrosProcessamentoDialog'
import HelpDialog from './componentes/HelpDialog';
import TransformacaoHelp from './help/TransformacaoHelp';

const styles = theme => ({
    container: {
        height: 240
    }
});

const CONFIG_PREFIX = 'configProcessamentos/';

class Transformacao extends Component {
    planilha;

    state = {
        errorText: ''
    }

    onSelectPlanilha = file => {
        this.planilha = file;

        this.setState({
            planilhaError: false
        });
    }

    processar = e => {
        const selecionouPlanilha = Boolean(this.planilha);

        this.setState({
            planilhaError: !selecionouPlanilha,
            showConfig: selecionouPlanilha
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

        data.set('file', this.planilha);
        data.set('config', config.value);

        axios.post(process.env.REACT_APP_API_URL + '/processador', data)
            .then((result) => {
                if (result.data instanceof Array) {
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
        })
    }

    toggleHelpDialog = (error) => {
        this.setState({
            showAjuda: !this.state.showAjuda
        })
    }

    render() {
        const { classes } = this.props;
        const { showAjuda, errorText, planilhaError, showConfig, errosProcessamento } = this.state;

        return (
            <div>
                <ErrorDialog open={Boolean(errorText)} title="Erro" text={errorText} handleClose={this.handleAlertClose} />
                {showAjuda && <HelpDialog helpText={TransformacaoHelp} handleClose={this.toggleHelpDialog} />}
                {showConfig && <ConfigModal handleHelp={this.toggleHelpDialog} handleCancel={this.handleConfigClose} handleConfirm={this.handleConfigConfirm} firebaseCollection={CONFIG_PREFIX + FirebaseService.currentUser().uid} />}
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
                            <SeletorArquivo error={planilhaError} onSelect={this.onSelectPlanilha} />
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