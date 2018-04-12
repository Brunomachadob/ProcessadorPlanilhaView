import React, { Component } from 'react';

import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import SeletorArquivo from '../componentes/SeletorArquivo';

class ConfigModal extends Component {
    state = {
        expanded: 'selectConfig',
    };

    handleExpandedChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    isPanelExpanded = (panel) => {
        return this.state.expanded === panel;
    }

    handleCriarConfig = () => {
        this.setState({
            expanded: 'changeConfig',
            config: {}
        })
    }

    handleImportarConfig = (config) => {
        console.log(config);
        
        this.setState({
            expanded: 'changeConfig',
            config: config
        })
    }

    render() {
        const { handleClose, children } = this.props;
        const { handleCriarConfig, handleImportarConfig, isPanelExpanded, handleExpandedChange } = this;
        const { config } = this.state;

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
                    <ExpansionPanel expanded={isPanelExpanded('selectConfig')} onChange={handleExpandedChange('selectConfig')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Selecione uma configuração</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Button onClick={handleCriarConfig} color="primary" autoFocus>
                                {'CRIAR'}
                            </Button>
                            <SeletorArquivo fileDesc={'CONFIGURAÇÃO'} fileTypes={['.json']} parseJson={true} onSelect={handleImportarConfig} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel disabled={!config} expanded={isPanelExpanded('changeConfig')} onChange={handleExpandedChange('changeConfig')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Configuração</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                config ? children(config) : ''
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        {'OK'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ConfigModal;