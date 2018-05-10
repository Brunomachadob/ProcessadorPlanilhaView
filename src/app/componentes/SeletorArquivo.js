import React, { Component } from 'react';

import ReactFileReader from 'react-file-reader';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
    formControl: {
        'display': 'flex',
        'flex-direction': 'row',
        'align-items': 'center',
    },
    input: {
        'width': '400px',
        'margin-right': '10px'
    }
});

class SeletorArquivo extends Component {
    state = {
        selectedFileName: ''
    };

    onSelectPlanilha = files => {
        let selectedFile;
        let content;

        if (this.props.asString) {
            selectedFile = files.fileList[0];
            let splitted = files.base64.split(',');

            if (splitted.length === 2) {
                content = atob(splitted[1]);
              }
        } else if (this.props.parseJson) {
            selectedFile = files.fileList[0];
            let splitted = files.base64.split(',');

            if (splitted.length === 2) {
              content = JSON.parse(atob(splitted[1]));
            }
        } else {
            selectedFile = files[0];
            content = selectedFile;
        }

        this.setState({
            selectedFileName: selectedFile.name
        });

        this.props.onSelect(content);
    }

    render() {
        const { classes, fileDesc, fileTypes, parseJson, asString } = this.props;
        const { selectedFileName } = this.state;

        return (
            <FormControl className={classes.formControl}>
                <ReactFileReader handleFiles={this.onSelectPlanilha} base64={parseJson || asString} fileTypes={fileTypes} multipleFiles={false}>
                    <div>
                        <InputLabel htmlFor="file">{fileDesc}</InputLabel>
                        <Input required className={classes.input} disabled id="file" value={selectedFileName} />
                        <Button variant="raised" color="primary">{'SELECIONE A ' + fileDesc.toUpperCase() } </Button>
                    </div>
                </ReactFileReader>
            </FormControl>
        )
    }
}

SeletorArquivo.defaultProps = {
    fileDesc: 'Planilha',
    fileTypes: [".xlsx"],
    parseJson: false
};

export default withStyles(styles)(SeletorArquivo);