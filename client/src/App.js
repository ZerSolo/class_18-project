import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';

import HousesList from './components/HouseList';

import House from './components/HouseDetails';
import AddHouse from './components/AddHouse';
class App extends Component {
    render() {
        return (
            <div className="App">
                <ul>
                    <li>
                        <Link to="/"> Home </Link>
                    </li>
                    <li>
                        <Link to="/houses">Houses </Link>
                    </li>
                    <li>
                        <Link to="/contribute/add">Add Your house </Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" render={() => <div> Home</div>} />
                    <Route exact path="/houses" component={HousesList} />
                    <Route exact path="/houses/:id" component={House} />
                    <Route exact path="/contribute/add" component={AddHouse} />
                    <Route render={<div> 404</div>} />
                </Switch>
            </div>
        );
    }
}

export default App;
