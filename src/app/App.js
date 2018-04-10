import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactFileReader from 'react-file-reader';

import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  handleToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  handleFiles = files => {
    let splitted = files.base64.split(',');

    if (splitted.length === 2) {
      let config = JSON.parse(atob(splitted[1]));
      console.log(config);
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Menu"
            onLeftIconButtonClick={this.handleToggle} />
          <Drawer
            onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
            width={200} docked={false}
            open={this.state.drawerOpen}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
          <div>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={[".json"]} base64={true} multipleFiles={false}>
              <RaisedButton label="UPLOAD" />
            </ReactFileReader>
          </div>
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
