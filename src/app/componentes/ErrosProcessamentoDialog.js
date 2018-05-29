import React from 'react';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import Table, {
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from 'material-ui/Table';

const styles = theme => ({
    table: {
    },
});

function ErrosProcessamentoDialog({ open, classes, erros, handleClose }) {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Erros de processamento'}
            </DialogTitle>
            <DialogContent>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="none">Identificador</TableCell>
                            <TableCell>Mensagem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {erros && erros.map((erro, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell padding="none" component="th" scope="row">
                                        {erro.identificador}
                                    </TableCell>
                                    <TableCell>{erro.mensagem}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" autoFocus>
                    {'FECHAR'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(ErrosProcessamentoDialog)