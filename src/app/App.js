import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';

import Transformacao from './transformacao/Transformacao'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'transf'
    };
  }

  handleTabChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Processador de Planilhas
          </Typography>
          </Toolbar>
        </AppBar>

        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleTabChange}>
            <Tab value="transf" label="Transformação de planilha" />
            <Tab value="dedupl" label="Remoção de duplicados" />
          </Tabs>
        </AppBar>
        {selectedTab === 'transf' && <Transformacao />}
        {selectedTab === 'dedupl' && <div>dedupl</div>}
      </div>
    );
  }
}