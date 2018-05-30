import React, { Component } from 'react';

import { MuiThemeProvider } from "material-ui/styles/index";
import { createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';

import Tabs, { Tab } from 'material-ui/Tabs';

import AppBar from 'material-ui/AppBar'
import MenuAppBar from './componentes/MenuAppBar';

import Transformacao from './Transformacao';
import LandingPage from './Landing'

import FirebaseService from './servicos/FirebaseService';
import RemoverDuplicados from './RemoverDuplicados';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

export default class App extends Component {
  state = {
    selectedTab: 'transf',
    isSignedIn: false
  };

  componentDidMount = () => {
    FirebaseService.onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user, user })
    });
  }

  handleTabChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab, isSignedIn, user } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <MenuAppBar user={user} />

          {!isSignedIn && <LandingPage isSignedIn={isSignedIn} />}

          {isSignedIn && (
            <div>
              <AppBar position="static" color="default">
                <Tabs value={selectedTab} onChange={this.handleTabChange}>
                  <Tab value="transf" label="Transformação de planilha" />
                  <Tab value="dedupl" label="Remoção de duplicados" />
                </Tabs>
              </AppBar>
              {selectedTab === 'transf' && <Transformacao />}
              {selectedTab === 'dedupl' && <RemoverDuplicados />}
            </div>
          )}
        </div>
      </MuiThemeProvider >
    );
  }
}