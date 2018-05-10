import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import EditIcon from "@material-ui/icons/Edit";

import Card, { CardContent, CardHeader } from 'material-ui/Card';

const styles = theme => ({
});

const ResumoConfig = (props) => {
    const { config, onEditConfig } = props;

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton onClick={onEditConfig}>
                        <Tooltip title="Editar">
                            <EditIcon />
                        </Tooltip>
                    </IconButton>
                }
                title="Resumo da configuração"
            />
            <CardContent style={{ 'flexGrow': 1 }}>
                {JSON.stringify(config, undefined, 2)}
            </CardContent>
        </Card>
    );
}

ResumoConfig.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResumoConfig);