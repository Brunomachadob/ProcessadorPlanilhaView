import React, { Component } from 'react';
import update from 'immutability-helper';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from 'material-ui/Tooltip';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    flexGrow1: {
        flexGrow: 1
    },
    flexGrow0: {
        flexGrow: 0
    },
    selectedItem: {
        backgroundColor: theme.palette.primary.main,
        '& h3': {
            color: theme.palette.common.white,
        },
    }
});
class ConfigEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            config: props.config
        };
    }

    onSelectColuna = coluna => {
        const newState = {
            colunaSelecionada: {
                $set: coluna
            },
            colunaSelecionadaIndex: {
                $set: this.state.config.colunas.indexOf(coluna)
            }
        };

        // if (this.state.colunaSelecionada) {
        //     const origCol = this.state.config.colunas.find((col) => {
        //         return col.nome === this.state.colunaSelecionada.nome;
        //     });

        //     if (origCol) {
        //         const origIndex = this.state.config.colunas.indexOf(origCol);

        //         newState.config = {
        //             colunas: {
        //                 $splice: [[origIndex, 1, this.state.colunaSelecionada]]
        //             }
        //         }
        //     }
        // }


        this.updateState(newState);
    }

    buildUpdateInfo = (path, value, operator) => {
        let obj = {};
        let currObj = obj;

        path.split(".").forEach(function (name) {
            currObj = currObj[name] = {};
        });

        currObj[operator || "$set"] = value;

        return obj;
    };

    updateState = updateInfo => {
        this.setState(update(this.state, updateInfo));
    };


    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.updateState(this.buildUpdateInfo(name, value));
    };

    handleProcessadoresChange = processadores => {
        this.updateState({
            colunaSelecionada: {
                processadores: {
                    $set: processadores
                }
            }
        });
    }

    render() {
        let { config, colunaSelecionada } = this.state;

        let {
            classes,
            children,
            handleCancelEdition,
            handleConfirmEdition
        } = this.props;

        return (
            <Card style={{ 'flexGrow': 1 }}>
                <CardHeader title="Editando configuração" />
                <CardContent style={{ 'flexGrow': 1 }}>
                    <Grid container spacing={24} direction="row">
                        <Grid container item direction="column" className={classes.flexGrow0} xs>
                            <Grid item>
                                <TextField
                                    name="config.nome"
                                    label="Nome"
                                    value={config.nome}
                                    onChange={this.handleInputChange}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch name="config.temCabecalho"
                                            checked={config.temCabecalho}
                                            onChange={this.handleInputChange}
                                        />
                                    } label="Tem cabeçalho" />
                            </Grid>
                            <Grid item xs>
                                <ListaColunas config={config} colunaSelecionada={colunaSelecionada} onSelectColuna={this.onSelectColuna} />
                            </Grid>
                        </Grid>

                        {colunaSelecionada &&
                            <Grid container item xs>
                                {children({
                                    colunaSelecionada: colunaSelecionada,
                                    index: config.colunas.indexOf(colunaSelecionada),
                                    handleInputChange: this.handleInputChange,
                                    handleProcessadoresChange: this.handleProcessadoresChange

                                })}
                            </Grid>
                        }
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary" onClick={handleCancelEdition}>
                        {'Cancelar'}
                    </Button>
                    <Button size="small" color="primary" onClick={() => handleConfirmEdition(config)}>
                        {'Salvar'}
                    </Button>
                </CardActions>
            </Card>

        );
    }
}

const ListaColunas = withStyles(styles)((props) => {
    const { classes, config, onSelectColuna, colunaSelecionada } = props;

    return (
        <Grid className={classes.flexGrow1} container item xs>
            <Paper elevation={4} className={classes.flexGrow1}>
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
                                <ListItem className={(colunaSelecionada && colunaSelecionada.nome) === col.nome ? classes.selectedItem : undefined} key={col.nome} button onClick={() => onSelectColuna(col)}>
                                    <ListItemText primary={col.nome} />
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Paper>
        </Grid>
    )
})

export default withStyles(styles)(ConfigEditor);