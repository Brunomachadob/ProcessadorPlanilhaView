import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import ErrorDialog from '../componentes/ErrorDialog';
import SeletorArquivo from '../componentes/SeletorArquivo';
import TransformacaoConfigModal from './TransformacaoConfigModal'

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
        })
    }

    handleAlertClose = () => {
        this.setState({
            errorText: ''
        })
    }

    handleConfigClose = () => {
        this.setState({
            showConfig: false
        })
    }

    render() {
        const { classes } = this.props;
        const { errorText, showConfig } = this.state;

        return (
            <div>
                { errorText && <ErrorDialog title="Campos obrigatórios" text={errorText} handleClose={this.handleAlertClose} /> }
                { showConfig && <TransformacaoConfigModal handleClose={this.handleConfigClose}/> }
                <Grid
                    container
                    className={classes.container}
                    justify="center"
                    alignItems="center"
                    direction="column"
                >
                    <Card>
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <SeletorArquivo onSelect={this.onSelectPlanilha} />
                            </form>
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