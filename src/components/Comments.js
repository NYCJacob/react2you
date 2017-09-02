import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComments} from "../actions/index"
import SingleComment from './SingleComment'


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */

class Comments extends Component {
    componentDidMount() {
        this.props.dispatch(fetchComments(this.props.postId))
    }

    render() {

        return (
            <div>
                <SingleComment/>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    console.log( state.comments )
}

export default connect(mapStateToProps)(Comments)