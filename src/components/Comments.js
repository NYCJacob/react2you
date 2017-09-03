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
            <div className="commentsDiv">
                {
                    this.props.comments.map( (comment) => (
                        <SingleComment comment={comment} />
                    ))
                }

            </div>
        )
    }
}

function mapStateToProps( state ) {
    console.log( state.comments )
    let commentsArray =  Object.keys( state.comments ).map(key => state.comments[key]);
    console.log(commentsArray)
    return { comments : commentsArray }
}

export default connect(mapStateToProps)(Comments)