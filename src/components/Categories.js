import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {fetchCategoryPosts, fetchPosts, masterFetchPosts} from "../actions/index"


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Categories extends Component {
    // generate random integer for key index where no unique value available
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomInt = (min = 1, max = 999999) =>  {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    render() {
        return (
            <div id="cat-view">
                <div>
                    <nav id="cat-list" className="nav nav-pills flex-column flex-sm-row">
                        <NavLink to="/" className="flex-sm-fill text-sm-center nav-link" href="#" onClick={() => this.props.handleCategoryPosts(null)}>
                            All
                        </NavLink>
                        {
                            this.props.categories.map( (category, idx) => (
                                <NavLink to={`/${category.name}`} key={idx} className="flex-sm-fill text-sm-center nav-link" href="#" onClick={() => this.props.handleCategoryPosts(category.name)}>
                                    { category.name }
                                </NavLink>
                            ) )
                        }
                    </nav>
                </div>

            </div>
        )
    }
}

// mapStateToProps must return a plain object
function mapStateToProps(state ) {
    let catArray =  Object.keys( state.categories ).map(key => state.categories[key]);
    return { categories : catArray }
}

function mapDispatchToProps(dispatch) {
    return{
        handleCategoryPosts : (category) => {
            category !== null ? dispatch(fetchCategoryPosts(category)) : dispatch(fetchPosts())
            // dispatch(masterFetchPosts(category))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
