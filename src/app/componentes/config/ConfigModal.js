import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/oceanic-next.css'
import 'codemirror/mode/yaml/yaml';

import Grid from 'material-ui/Grid';

import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

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
    state = {
        activeStep: 0
    };

    handleSelectStep = (step) => {
        this.setState({
            activeStep: step
        })
    }

    handleCriarConfig = () => {
        this.setState({
            activeStep: 1,
            config: '',
            configBkp: ''
        })
    }

    handleImportarConfig = (config) => {
        this.setState({
            activeStep: 1,
            configBkp: config,
            config: config
        })
    }

    handleConfirm = event => {
        this.props.handleConfirm(this.state.config);
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

    render() {
        const { config } = this.state;

        const {
            handleCancel,
            classes
        } = this.props;

        const codeMirrorOpts = {
            mode: 'yaml',
            theme: 'oceanic-next',
            lineNumbers: true
        };

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
                                <Grid direction="column" container spacing={16}>
                                    <Grid item style={{ display: 'flex' }}>
                                        <Button onClick={this.handleCriarConfig} color="primary" autoFocus>
                                            {'CRIAR NOVA'}
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                        {'OU'}
                                    </Grid>
                                    <Grid item>
                                        <SeletorArquivo fileDesc={'SELECIONAR CONFIGURAÇÃO'} fileTypes={['.yml', '.yaml']} asString={true} onSelect={this.handleImportarConfig} />
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>{'Configuração'}</StepLabel>
                            <StepContent>
                                <Grid container spacing={16}>
                                    <CodeMirror value={config} onChange={this.handleUpdateConfig} options={codeMirrorOpts} className={classes.codeMirror} />
                                    {/* <Button onClick={this.handleResetConfigBkp} color="primary">
                                        {'RESETAR'}
                                    </Button> */}
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