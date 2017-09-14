import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { closeCommentForm, closeCommentEditForm, sendNewComment } from "../actions/index"
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
        return (

            <div className="commentForm-view">
                    <div className="container-fluid">
                        {
                            <form
                                onSubmit={this.props.handleSubmit(data => this.props.submitCommentData(data, parentId))}>
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

//TODO: figure out how to use tenary statment for returns
function mapStateToProps(state) {
    return {
        // initialValues :  state.posts.items.find((item) => item.id === state.posts.openTarget),
        // initialValues :  state.posts.target,
        parentId : state.posts.target.id
    }
}

function mapDispatchToProps(dispatch){
    return {
        closeCommentForm : () => {dispatch(closeCommentForm());
                                    dispatch(closeCommentEditForm()) },
        submitCommentData : ( data, parentId ) => {
            dispatch(sendNewComment(data, parentId))
        }
    }
}

CommentForm = reduxForm({
    // a unique name for the form
    form: 'commentForm'
})(CommentForm)


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
