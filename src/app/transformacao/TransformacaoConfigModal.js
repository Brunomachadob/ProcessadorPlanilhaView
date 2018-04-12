import React, { Component } from 'react';

import ConfigModal from '../componentes/ConfigModal'

class TransformacaoConfig extends Component {

    handleClose = () => {
        this.props.handleClose();
    }

    render() {
        const { handleClose } = this;

        return (
            <ConfigModal handleClose={handleClose}>
                {(config) => {
                    return <h1>{'child'}</h1>
                }}
            </ConfigModal>
        )
    }
}

export default TransformacaoConfig;