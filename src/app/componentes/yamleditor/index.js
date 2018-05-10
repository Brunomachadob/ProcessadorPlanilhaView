

import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

var CodeMirror = require('react-codemirror');

const styles = theme => ({

});
class YAMLEditor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Editor aqui</div>
        );
    }
}

export default withStyles(styles)(YAMLEditor);