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

import SeletorArquivo from '../../componentes/SeletorArquivo';
import ResumoConfig from './ResumoConfig';
import ConfigEditor from './ConfigEditor';


const styles = theme => ({
});

class ConfigModal extends Component {
    state = {
        expanded: 'selectConfig',
        activeStep: 0
    };

    handleCriarConfig = () => {
        this.setState({
            activeStep: 1,
            expanded: 'changeConfig',
            config: {
                nome: '',
                colunas: []
            }
        })
    }

    handleImportarConfig = (config) => {
        this.setState({
            activeStep: 1,
            expanded: 'changeConfig',
            config: Object.assign({
                nome: '',
                colunas: []
            }, config)
        })
    }

    handleConfirm = event => {
        this.props.handleConfirm(this.state.config);
    }

    handleEditConfig = () => {
        this.setState({
            editedConfig: {
                ...this.state.config
            }
        })
    }

    handleCancelConfigEdition = () => {
        this.setState({
            editedConfig: null
        });
    }

    handleConfirmConfigEdition = (config) => {
        console.log('config', config);
        this.setState({
            editedConfig: null,
            config: config
        });
    }

    render() {
        const { editedConfig, config } = this.state;

        const {
            handleCancel,
            children,
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
                            <StepLabel>{'Selecione uma configuração'}</StepLabel>
                            <StepContent>
                                <Grid direction="row" container spacing={16}>
                                    <Grid item style={{ display: 'flex' }}>
                                        <Button onClick={this.handleCriarConfig} color="primary" autoFocus>
                                            {'NOVA'}
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ 'alignItems': 'center', display: 'flex', padding: '10px' }}>
                                        {'OU'}
                                    </Grid>
                                    <Grid item>
                                        <SeletorArquivo fileDesc={'CONFIGURAÇÃO'} fileTypes={['.json']} parseJson={true} onSelect={this.handleImportarConfig} />
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>{'Configuração'}</StepLabel>
                            <StepContent>
                                <Grid container spacing={16}>
                                    {
                                        !editedConfig && config && <ResumoConfig onEditConfig={this.handleEditConfig} config={config} />
                                    }
                                    {
                                        editedConfig && <ConfigEditor
                                            config={editedConfig}
                                            children={children}
                                            handleCancelEdition={this.handleCancelConfigEdition}
                                            handleConfirmEdition={this.handleConfirmConfigEdition}
                                        />
                                    }
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
                        {'OK'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}



export default withStyles(styles)(ConfigModal);