import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import CommentForm from './CommentForm'
import { sendDeleteComment, editComment, sendVoteComment, sendEditComment} from "../actions/index"


/**
 * @description show a single comment
 * @constructor
 *
 */
class SingleComment extends Component {
    render() {
        const {id, parentId, voteScore,author, body} = this.props.comment

        return (
            <div>

                { ( this.props.editing && id === this.props.target.id ) ? <CommentForm/> :
                   <div className="comment-text">
                       <div className="row">
                           <div className="col-sm text-left">
                               <button className="btn btn-sm btn-outline-danger" onClick={() => this.props.deleteComment(id, parentId)}>Delete</button>
                           </div>
                           <div className="col-sm ">
                               <button className="btn btn-sm btn-outline-warning" onClick={() => this.props.editComment(this.props.comment)}>Edit</button>
                           </div>
                           <div>
                               {/*<span>Score: {voteScore}</span>*/}
                               <span>Store Score: { (this.props.commentStore || {}).voteScore }</span>
                           </div>
                           <div className="col-sm-1">
                               <span className="voting" onClick={() => this.props.voteComment(this.props.comment, 1)}>&#9650;</span>
                               <span className="voting" onClick={() => this.props.voteComment(this.props.comment, -1)}>&#9660;</span>
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


function mapStateToProps(state, props) {
    return {
        editing : state.comments.commentEditing,
        target : _.cloneDeep( state.comments.targetComment ),
        commentStore : _.cloneDeep((state.comments[props.comment.parentId + '-comments'] || []).find( (obj) => obj.id === props.comment.id))
    }
}

function mapDispatchToProps(dispatch) {
    return{
        deleteComment : (id, parentId) => dispatch(sendDeleteComment(id, parentId)),
        editComment : (comment) => dispatch(editComment(comment)),
        voteComment : (comment, increment) => dispatch(sendVoteComment(comment, increment))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleComment)
