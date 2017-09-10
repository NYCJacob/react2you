import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';
import { connect } from 'react-redux'
import Categories from './Categories';
import Posts from './Posts';
import {fetchCategories, fetchPosts} from "../actions/index";


class Main extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPosts())
        this.props.dispatch(fetchCategories())
    }

    render() {

        return (
            <div className="main-layout">
                <header>Post, Think, React</header>
                <Categories/>

            </div>
        );
    }
}


export default connect()(Main);