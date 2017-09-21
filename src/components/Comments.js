import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom'
import {Spinner} from 'react-spinner'
import PropTypes from 'prop-types';
import { fetchComments, newComment} from "../actions/index"
import SingleComment from './SingleComment'
import CommentForm from './CommentForm'


/**
 * @description
 * @constructor
 */

class Comments extends Component {
    static propTypes = {
        comments : PropTypes.array.isRequired,
        commentForm: PropTypes.bool.isRequired
    }

    //TODO: somehow I could not dispatch in componentDidMount when using mapdispatchtoprops
    componentDidMount() {
        if (this.props.postId) {
            this.props.dispatch(fetchComments(this.props.postId))
            //TODO: this still does not solve refresh error for comments, shows no comments and lists number of comment as 1
            // {console.log(this.props.match.params.postId)}
            //  this.props.dispatch(fetchComments(this.props.match.params.postId))
        } else {
            this.props.history.push("/404.html")
        }

    }

    render() {
        const {category, postId} = this.props;

        return (

            <div className="commentsDiv">
                { this.props.commentForm ? <CommentForm /> :
                    <div className="row comments-info">
                        <div className="comments-total text-right">
                            {(this.props.comments.length !== 0) && `${this.props.comments.length} comments`}
                        </div>
                        <div className="col-sm text-right">
                            <button className="btn btn-sm btn-outline-success" onClick={() => this.props.dispatch(newComment())}>Add Comment</button>
                        </div>

                    </div>
                }

                {
                   this.props.comments.length !== 0 ? this.props.comments.map( (comment,idx) => (
                        <SingleComment comment={comment} editing={false} key={idx} />
                    )) : <p>no comments</p>
                }

            </div>
        )
    }
}

function mapStateToProps( state, props ) {
    let commentsKey = props.postId + '-comments';
    let postComments = [];
    if (state.comments[commentsKey]){
        postComments = state.comments[commentsKey];
    } else {
        postComments.push({'body': 'no comments'});
    }

    return { comments : postComments, commentForm : state.posts.commentForm };
}



export default connect(mapStateToProps)(withRouter(Comments))