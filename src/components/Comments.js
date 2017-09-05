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
                   this.props.comments.length !== 0 ? this.props.comments.map( (comment,idx) => (
                        <SingleComment comment={comment} key={idx} />
                    )) : <p>no comments</p>
                }

            </div>
        )
    }
}

function mapStateToProps( state, props ) {
    console.log( state.comments );
    let commentsArray =  Object.keys( state.comments ).map(key => state.comments[key]);
    // console.log(commentsArray);
    let commentsKey = props.postId + '-comments';
    console.log( state.comments[commentsKey] );
    let postComments = [];
    if (state.comments[commentsKey]){
        postComments = state.comments[commentsKey];
    } else {
        postComments.push({'body': 'no comments'});
    }
    console.log( postComments);
    return { comments : postComments };
}

export default connect(mapStateToProps)(Comments)