import React, { Component } from 'react';
import './App.sass';
import { Link, Route, Switch } from 'react-router-dom';

import HousesList from './components/HouseList';
import House from './components/HouseDetails';
import AddHouse from './components/AddHouseFull';
import './App.sass';
import navSlide from './components/NavSlide';
import Home from './components/Homepage';
class App extends Component {
    render() {
        return (
            <div>
                <div className="homePage ">
                    <nav>
                        <ul className="nav-links ">
                            <li>
                                <Link to="/"> Home </Link>
                            </li>
                            <li>
                                <Link to="/houses">Houses </Link>
                            </li>

                            <li>
                                <Link to="/contribute/add">Contribute </Link>
                            </li>
                            <li>
                                <Link to="/">Documentaion </Link>
                            </li>
                        </ul>

                        <div className="burger" onClick={navSlide}>
                            <div className="line1" />
                            <div className="line2" />
                            <div className="line3" />
                        </div>
                    </nav>
                </div>

                <Switch>
                    <Route exact path="/" component={Home} />
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
