import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendDeleteComment} from "../actions/index"


/**
 * @description show a single comment
 * @constructor
 *
 */

class SingleComment extends Component {

    render() {
        const {id, parentId, voteScore,author, body} = this.props.comment;
        return (
            <div>
                {
                   <div className="comment-text">
                       <div className="row">
                           <div className="col-sm text-left">
                               <button className="btn btn-sm btn-outline-danger" onClick={() => this.props.deleteComment(id, parentId)}>Delete Comment</button>
                           </div>
                           <div>
                               <span>Score: {voteScore}</span>
                           </div>
                           <div className="col-sm-1">
                               <span>&#9650;</span>
                               <span>&#9660;</span>
                           </div>
                       </div>
                       <div className="comment-author">By: {author}</div>
                       <div className="comment-body" >{body}</div>
                   </div>

                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        // closeSinglePost : () => dispatch(closePost()),
        // editPost : (targetPost) => dispatch(editPost(targetPost)),
        // deletePost : (postId) => dispatch(deletePostAction(postId)),
        // vote : (postId, vote) => dispatch( sendVote(postId, vote))
        deleteComment : (id, parentId) => dispatch(sendDeleteComment(id, parentId))
    }
}


export default connect(null, mapDispatchToProps)(SingleComment)
