import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import Categories from './Categories';
import Posts from './Posts';
import {fetchCategories} from "../actions/index";


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
                <div>
                    <Posts/>
                </div>

            </div>
        );
    }
}


// const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPosts }, dispatch);


export default connect()(App);



