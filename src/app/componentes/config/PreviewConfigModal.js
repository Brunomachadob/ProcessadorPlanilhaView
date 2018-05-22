import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';

import YAMLCodeMirror from './YAMLCodeMirror';

export default function PreViewConfigModal({ config, handleClosePreviewConfig }) {
    return (
        <Dialog
            style={{ flexGrow: 1 }}
            open={true}
            onClose={handleClosePreviewConfig}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Visualização de configuração'}
            </DialogTitle>
            <DialogContent>
                <YAMLCodeMirror value={config} options={{ readOnly: true }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePreviewConfig} color="secondary" autoFocus>
                    {'FECHAR'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}