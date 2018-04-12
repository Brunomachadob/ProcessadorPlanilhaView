import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Switch from 'material-ui/Switch';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Tooltip from 'material-ui/Tooltip';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from 'material-ui/Grid';
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

const styles = theme => ({
    colunas: {
        flexGrow: 1
    }
});

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
            config: {
                nome: '',
                colunas: []
            }
        })
    }

    handleImportarConfig = (config) => {
        config = Object.assign({
            nome: '',
            colunas: []
        }, config);

        this.setState({
            expanded: 'changeConfig',
            config: config
        })
    }

    updateConfig = (config) => {
        this.setState({
            config: {
                ...this.state.config, ...config
            }
        })
    }


    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.updateConfig({
            [name]: value
        });
    };

    onSelectColuna = coluna => {
        this.setState({
            colunaSelecionada: coluna
        })
    }

    handleConfirm = event => {
        this.props.handleConfirm(this.state.config);
    }

    render() {
        const { config, colunaSelecionada } = this.state;

        const {
            classes,
            handleCancel,
            children,
        } = this.props;

        const {
            handleConfirm,
            handleInputChange,
            handleCriarConfig,
            handleImportarConfig,
            isPanelExpanded,
            handleExpandedChange,
            onSelectColuna
        } = this;

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
                            <Grid container spacing={16}>
                                <Button onClick={handleCriarConfig} color="primary" autoFocus>
                                    {'NOVA'}
                                </Button>
                                <SeletorArquivo fileDesc={'CONFIGURAÇÃO'} fileTypes={['.json']} parseJson={true} onSelect={handleImportarConfig} />
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel disabled={!config} expanded={isPanelExpanded('changeConfig')} onChange={handleExpandedChange('changeConfig')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Configuração</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container className={classes.root} spacing={16}>
                                {config &&
                                    <Grid
                                        container
                                        spacing={16}
                                        alignItems="flex-start"
                                        direction="column"
                                        justify="flex-start">
                                        <Grid item>
                                            <TextField
                                                name="nome"
                                                label="Nome"
                                                value={config.nome}
                                                onChange={handleInputChange}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch name="temCabecalho"
                                                        checked={config.temCabecalho}
                                                        onChange={handleInputChange}
                                                    />
                                                } label="Tem cabeçalho" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <ListaColunas classes={classes} config={config} onSelectColuna={onSelectColuna} />
                                        </Grid>
                                        {colunaSelecionada &&
                                            <Grid item xs={12} sm={6}>
                                                {children(colunaSelecionada)}
                                            </Grid>
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary" autoFocus>
                        {'CANCELAR'}
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant="raised" autoFocus>
                        {'OK'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const ListaColunas = (props) => {
    const { classes, config, onSelectColuna } = props;

    const onSelectColunaBuilder = coluna => event => {
        return onSelectColuna(coluna);
    }

    return (
        <Grid className={classes.colunas} container>
            <Paper elevation={4}>
                <List>
                    <ListItem>
                        <ListItemText primary="Colunas" />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Comments">
                                <Tooltip title="Nova coluna">
                                    <AddCircleIcon />
                                </Tooltip>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {
                        config.colunas.map(col => {
                            return (
                                <ListItem key={col.nome} button onClick={onSelectColunaBuilder(col)}>
                                    <ListItemText primary={col.nome} />
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Paper>
        </Grid>
    )
}

export default withStyles(styles)(ConfigModal);