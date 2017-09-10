import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import Categories from './Categories';
import Posts from './Posts';
import {fetchCategories} from "../actions/index";
import SinglePost from "./SinglePost";


class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPosts())
        this.props.dispatch(fetchCategories())
    }

    render() {

        return (

            <div className="App">
                <div>
                    <h1>Post, listen, react</h1>
                    <Categories/>
                </div>
                    <Route exact path="/" component={Posts}/>
                    <Route path="/:category/:postId" component={SinglePost} />


            </div>
        );
    }
}


export default connect()(App);



