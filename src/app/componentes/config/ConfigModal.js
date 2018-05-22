import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import YAMLCodeMirror from './YAMLCodeMirror';
import PreViewConfigModal from './PreviewConfigModal';
import ConfigsList from './ConfigsList';

import FirebaseService from '../../servicos/FirebaseService';

import SeletorArquivo from '../../componentes/SeletorArquivo';

const styles = theme => ({
    codeMirror: {
        flexGrow: 1,
        margin: '10px'
    },
    stepLabel: {
        cursor: 'pointer'
    }
});

class ConfigModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firebaseCollection: props.firebaseCollection,
            activeStep: 0,
            configList: []
        };
    }

    componentDidMount = () => {
        FirebaseService.getDataList(this.state.firebaseCollection, (configList) => {
            this.setState({
                configList
            })
        });
    }

    handleSelectStep = (activeStep) => {
        this.setState({
            activeStep
        })
    }

    handleCriarConfig = () => {
        this.setState({
            activeStep: 1,
            config: '',
            configBkp: ''
        })
    }

    handleSelectConfig = (config, key) => {
        this.setState({
            activeStep: 1,
            configKey: key,
            configBkp: config,
            config: config
        });
    }

    handleConfirm = event => {
        this.props.handleConfirm(this.state.config, this.state.configKey);
    }

    handleUpdateConfig = (config) => {
        this.setState({
            config: config
        });
    }

    handleResetConfigBkp = () => {
        let bkp = this.state.configBkp;

        this.setState({
            config: bkp
        });
    }

    handlePreViewConfig = (item) => {
        this.setState({
            preViewConfig: item.config
        })
    }

    handleClosePreviewConfig = () => {
        this.setState({
            preViewConfig: null
        })
    }

    render() {
        const { config, configList, preViewConfig } = this.state;

        const {
            handleCancel,
            classes
        } = this.props;

        return (
            <Dialog
                fullScreen
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Configuração do processamento'}
                </DialogTitle>
                <DialogContent>
                    <Stepper activeStep={this.state.activeStep} orientation="vertical">

                        <Step key={0}>
                            <StepLabel onClick={() => this.handleSelectStep(0)} className={classes.stepLabel}>{'Crie ou selecione uma configuração'}</StepLabel>
                            <StepContent>
                                <Grid container direction="row" spacing={16}>
                                    <Grid item xs={6}>
                                        <Grid container direction="column" spacing={16}>
                                            <Grid item style={{ display: 'flex' }}>
                                                <Button onClick={this.handleCriarConfig} color="primary" autoFocus>
                                                    {'CRIAR NOVA'}
                                                </Button>
                                            </Grid>
                                            <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                                {'OU'}
                                            </Grid>
                                            <Grid item>
                                                <SeletorArquivo fileDesc={'CONFIGURAÇÃO'} fileTypes={['.yml', '.yaml']} asString={true} onSelect={this.handleSelectConfig} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container direction="column" spacing={16}>
                                            <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                                {'OU SELECIONE UMA CONFIGURAÇÃO SALVA ABAIXO'}
                                            </Grid>
                                            <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                                {preViewConfig && <PreViewConfigModal config={preViewConfig} handleClosePreviewConfig={this.handleClosePreviewConfig} />}
                                                <ConfigsList data={configList} handleClick={(item) => this.handleSelectConfig(item.config, item.key)} handleViewConfig={this.handlePreViewConfig} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>

                        <Step key={1}>
                            <StepLabel>{'Configuração'}</StepLabel>
                            <StepContent>
                                <Grid container spacing={16}>
                                    <YAMLCodeMirror value={config} onChange={this.handleUpdateConfig} className={classes.codeMirror} />
                                </Grid>
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary" autoFocus>
                        {'CANCELAR'}
                    </Button>
                    <Button onClick={this.handleConfirm} color="primary" variant="raised" autoFocus>
                        {'CONFIRMAR'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ConfigModal);