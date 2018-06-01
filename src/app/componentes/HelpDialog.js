import React from 'react';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-gist.css';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';


const styles = theme => ({
});

const highlight = (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(lang, str).value;
        } catch (err) {
            console.error(err);
        }
    }

    try {
        return hljs.highlightAuto(str).value;
    } catch (err) {
        console.error(err);
    }

    return '';
};

function HelpDialog({ classes, helpText, handleClose }) {
    return (
        <Dialog
            fullScreen
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Ajuda'}
            </DialogTitle>
            <DialogContent>
                <Markdown options={{ highlight }} source={helpText} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" autoFocus>
                    {'FECHAR'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(styles)(HelpDialog)