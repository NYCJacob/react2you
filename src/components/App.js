import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// App.css imports Bootsrap4 css files
import '../styles/App.css';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import Categories from './Categories';
import Posts from './Posts';
import EditPost  from './EditPost'
import {fetchCategories} from "../actions/index";
import SinglePost from "./SinglePost";
import { NoMatch } from  './404.js'

var Spinner = require('react-spinkit');


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
                {/*switch forces only matching first child*/}
                <Switch>
                    <Route exact path="/newpost" component={EditPost} />
                    <Route path="/editpost" component={EditPost} />
                    <Route exact path="/" component={Posts}/>
                    <Route path="/:category/:postId" component={SinglePost} />
                    {/*cagtegory views routes*/}
                    <Route path="/:category" component={Posts} />
                    <Route component={NoMatch} />
                </Switch>


            </div>
        );
    }
}


export default connect()(App);



