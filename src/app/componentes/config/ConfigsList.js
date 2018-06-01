import React, { Component } from 'react';

import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { Divider, IconButton } from 'material-ui';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';



import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'

export default class ConfigsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            configToDelete: null
        };
    }

    handleDelete = (config) => {
        this.setState({
            configToDelete: config
        })
    }

    cancelDelete = () => {
        this.setState({
            configToDelete: null
        })
    }

    confirmDelete = (config) => {
        this.setState({
            configToDelete: null
        });

        this.props.handleDeleteConfig(config);
    }

    render() {
        const { configToDelete } = this.state;
        const { handleDeleteConfig, data, ...otherProps } = this.props;

        var Component = !data || data.length === 0 ? EmptyListComponent : ListComponent;

        return (
            <div style={{ flexGrow: 1 }}>
                {configToDelete && <ConfirmDeleteDialog config={configToDelete} handleDelete={this.confirmDelete} handleCancel={this.cancelDelete} />}
                <Component data={data} handleDeleteConfig={this.handleDelete} {...otherProps} />
            </div>
        )
    }
}

function EmptyListComponent() {
    return <div>{'Não existem configurações salvas'}</div>;
}

function ListComponent({ data, handleClick, handleViewConfig, handleDeleteConfig }) {
    return <List style={{ flexGrow: 1 }}>
        {data.map(item => {
            return <div key={item.key}>
                <ListItem
                    role={undefined}
                    dense
                    button
                    onClick={() => handleClick(item)}
                >
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="View" onClick={() => handleViewConfig(item)}>
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton aria-label="View" onClick={() => handleDeleteConfig(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </div>
        })}
    </List>
}

function ConfirmDeleteDialog({ config, handleDelete, handleCancel }) {
    return (
        <Dialog
            open={true}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
        >
            <DialogTitle id="confirmation-dialog-title">Deletar configuração</DialogTitle>
            <DialogContent>
                {'Deseja deletar a configuração ' + config.name + '?'}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    {'Cancelar'}
                </Button>
                <Button onClick={() => handleDelete(config)} color="secondary">
                    {'Deletar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}