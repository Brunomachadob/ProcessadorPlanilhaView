import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Grid from 'material-ui/Grid';

import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import Paper from 'material-ui/Paper';

import HelpIcon from '@material-ui/icons/Help';

import YAMLCodeMirror from './YAMLCodeMirror';
import PreViewConfigModal from './PreviewConfigModal';
import ConfigsList from './ConfigsList';

import FirebaseService from '../../servicos/FirebaseService';

import SeletorArquivo from '../../componentes/SeletorArquivo';
import { TextField } from 'material-ui';

const styles = theme => ({
    codeMirror: {
        flexGrow: 1,
        margin: '10px'
    },
    stepLabel: {
        cursor: 'pointer'
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20,
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
        this.handleSelectConfig('', null, '');
    }

    handleSelectConfig = (config, key, name) => {
        this.setState({
            activeStep: 1,
            config: {
                key: key,
                name: name || '',
                value: config
            },
            configBkp: config,
        });
    }

    handleConfirm = event => {
        var { config } = this.state;

        if (!config || !config.value) {
            return;
        }

        this.props.handleConfirm(config);
    }

    handleUpdateConfig = (value) => {
        this.setState({
            config: {
                ...this.state.config,
                value: value
            }
        });
    }

    handleUpdateConfigName = (e) => {
        this.setState({
            config: {
                ...this.state.config,
                name: e.target.value
            }
        });
    }

    handlePreViewConfig = (item) => {
        this.setState({
            preViewConfig: item.config
        })
    }

    handleDeleteConfig = (item) => {
        FirebaseService.remove(item.key, this.state.firebaseCollection);
    }

    handleClosePreviewConfig = () => {
        this.setState({
            preViewConfig: null
        })
    }

    render() {
        const { config, configList, preViewConfig } = this.state;
        const enableConfirm = config && config.value;

        const {
            handleHelp,
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
                                        <Paper style={{ flexGrow: 1 }} elevation={4}>
                                            <Grid container direction="column" spacing={16} style={{padding: '10px'}}>
                                                <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                                    <Typography variant="headline" component="h5">
                                                        {'Ou selecione uma configuração abaixo'}
                                                    </Typography>
                                                </Grid>
                                                <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                                    {preViewConfig && <PreViewConfigModal config={preViewConfig} handleClosePreviewConfig={this.handleClosePreviewConfig} />}
                                                    <ConfigsList data={configList} handleClick={(item) => this.handleSelectConfig(item.config, item.key, item.name)} handleViewConfig={this.handlePreViewConfig} handleDeleteConfig={this.handleDeleteConfig} />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>

                        <Step key={1}>
                            <StepLabel>{'Configuração'}</StepLabel>
                            <StepContent>
                                {
                                    config &&
                                    <Grid container direction="column" spacing={16}>
                                        <Grid item>
                                            <Grid container direction="row" spacing={16}>
                                                <Grid item>
                                                    <TextField
                                                        label="Nome"
                                                        helperText="Informe um nome para salvar sua configuração"
                                                        value={config.name}
                                                        onChange={this.handleUpdateConfigName}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                {handleHelp && <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button className={classes.button} variant="raised" color="primary" onClick={handleHelp}>
                                                        {'Ajuda'}
                                                        <HelpIcon className={classes.rightIcon} />
                                                    </Button>
                                                </Grid>}
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <YAMLCodeMirror value={config.value} onChange={this.handleUpdateConfig} className={classes.codeMirror} />
                                        </Grid>
                                    </Grid>
                                }
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary" autoFocus>
                        {'CANCELAR'}
                    </Button>
                    <Button onClick={this.handleConfirm} color="primary" disabled={!enableConfirm} variant="raised" autoFocus>
                        {'CONFIRMAR'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ConfigModal);