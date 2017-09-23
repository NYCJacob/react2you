import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { closeCommentForm, closeCommentEditForm, sendNewComment, sendEditComment } from "../actions/index"
// redux form import
import { Field, reduxForm } from 'redux-form'
import {renderField, renderFieldcommentBody, renderFieldcommentAuthor, required, maxLength15, minLength2, alphaNumeric} from "../utils/formValidation"


/**
 * @description
 * @constructor
 */

class CommentForm extends Component {

    render() {
        const  parentId  = this.props.parentId;
        const editing = this.props.commentEditing;

        return (

            <div className="commentForm-view">
                    <div className="container-fluid">
                        {
                            <form
                                onSubmit={this.props.handleSubmit(data => this.props.submitCommentData(data, parentId, editing))}>
                                <div className="row">
                                    <div className="col-sm-8 text-left">
                                        <button type="submit" className="btn btn-sm btn-outline-success">Submit</button>
                                    </div>
                                    <div className="col-sm-4 text-right">
                                        <button className="btn btn-sm btn-outline-dark"
                                                onClick={() => this.props.closeCommentForm()}>X
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm comment-author">
                                        <Field
                                            name="author"
                                            label="comment author"
                                            component={renderFieldcommentAuthor}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm comment-body">
                                        <Field
                                            name="body"
                                            label="body"
                                            component={renderFieldcommentBody}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </form>
                        }
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // initialValues :  state.comments.targetComment,
        parentId : state.posts.target.id,
        commentEditing : state.comments.commentEditing
    }
}

function mapDispatchToProps(dispatch){
    return {
        closeCommentForm : () => { dispatch(closeCommentEditForm()) },
        submitCommentData : ( data, parentId, editing ) => {
            editing ? dispatch(sendEditComment( data ))  : dispatch(sendNewComment(data, parentId))
        }
    }
}

CommentForm = reduxForm({
    // a unique name for the form
    form: 'commentForm'})(CommentForm)


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
