import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import ShipEditor from './ship-editor/ShipEditor';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="Space Farm Logo" />
                        <h2>Space Farm: Manufactory</h2>
                    </div>
                    <Route exact path="/" component={ShipEditor}/>
                </div>
            </Router>
        );
    }
}

export default App;
