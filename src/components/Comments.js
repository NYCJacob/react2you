import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComments, newComment} from "../actions/index"
import SingleComment from './SingleComment'
import CommentForm from './CommentForm'


/**
 * @description
 * @constructor
 */

class Comments extends Component {
    //TODO: somehow I could not dispatch in componentDidMount when using mapdispatchtoprops
    componentDidMount() {
        this.props.dispatch(fetchComments(this.props.postId))
        // this.getComments(this.props.postId);
    }


    render() {
        const {category, postId} = this.props;

        return (
            <div className="commentsDiv">

                { this.props.commentForm ? <CommentForm /> :
                    <div className="row">
                        {(this.props.comments.length !== 0) && `${this.props.comments.length} comments`}

                        <div className="col-sm">
                            <button className="btn btn-sm btn-outline-success" onClick={() => this.props.dispatch(newComment())}>Add Comment</button>
                        </div>

                    </div>
                }

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
    let commentsKey = props.postId + '-comments';
    console.log( state.comments[commentsKey] );
    let postComments = [];
    if (state.comments[commentsKey]){
        postComments = state.comments[commentsKey];
    } else {
        postComments.push({'body': 'no comments'});
    }

    return { comments : postComments, commentForm : state.posts.commentForm };
}



export default connect(mapStateToProps)(Comments)