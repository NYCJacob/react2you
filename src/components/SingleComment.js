import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm'
import { sendDeleteComment, editComment, sendEditComment} from "../actions/index"


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
                { this.props.editing ? <CommentForm/> :
                   <div className="comment-text">
                       <div className="row">
                           <div className="col-sm text-left">
                               <button className="btn btn-sm btn-outline-danger" onClick={() => this.props.deleteComment(id, parentId)}>Delete</button>
                           </div>
                           <div className="col-sm ">
                               <button className="btn btn-sm btn-outline-warning" onClick={() => this.props.editComment()}>Edit</button>
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

function mapStateToProps(state) {
    return { editing : state.comments.commentEditing }
}

function mapDispatchToProps(dispatch) {
    return{
        deleteComment : (id, parentId) => dispatch(sendDeleteComment(id, parentId)),
        editComment : () => dispatch(editComment())
    }
}


export default connect(null, mapDispatchToProps)(SingleComment)
