import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';

import Categories from './Categories';
import Posts from './Posts';


class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPosts())
    }

    render() {
        console.log('Props: ', this.props);

        return (
            <div className="App">
                <div>
                    <h1>Post, listen, react</h1>
                    <Categories/>
                </div>
                <div>
                    <Posts/>
                </div>

            </div>
        );
    }
}

export default App