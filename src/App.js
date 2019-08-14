import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Album from './components/Album';
import Landing from './components/Landing';
import Library from './components/Library';

class App extends Component {
    render() {
        return ( < div className = "App" >
            <
            header >
            <
            h1 id = "site-title" > Bloc Jams < /h1>  <
            nav className = "nav-links" >
            <
            Link to = '/' > Landing < /Link> 

            <
            Link to = '/library' > Library < /Link> < /nav >
            <
            /header> <
            main >
            <
            Route exact path = "/album/:slug"
            component = { Album }
            /> <
            Route exact path = "/"
            component = { Landing }
            /> <
            Route path = "/library"
            component = { Library }
            /> < /
            main > <
            /div>
        );
    }
}

export default App;