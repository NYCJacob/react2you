import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { closeCommentForm } from "../actions/index"
// redux form import
import { Field, reduxForm } from 'redux-form'
import {renderField, required, maxLength15, minLength2, alphaNumeric} from "../utils/formValidation"


/**
 * @description
 * @constructor
 */

// POST /comments
// USAGE:
//     Add a comment to a post
//
// PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
// author: String
// parentId: Should match a post id in the database.

class CommentForm extends Component {

    render() {

        return (

            <div className="commentForm-view">
                    <div className="container-fluid">

                        <form>
                       <h3>Comment form</h3>
                            <div className="row comment-text">
                                <div className="col-sm comment-author">By: </div>
                                <div className="col-sm comment-body" > -body- </div>
                                <div>
                                    <button className="btn btn-sm btn-outline-dark" onClick={() => this.props.closeCommentForm()}>X</button>
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    id
                                </div>
                                <div>
                                    parentId
                                </div>
                                <div>
                                    timestamp
                                </div>
                            </div>
                    </form>
                </div>

            </div>
        )
    }
}

//TODO: figure out how to use tenary statment for returns
function mapStateToProps(state) {
    return {
        // initialValues :  state.posts.items.find((item) => item.id === state.posts.openTarget),
        initialValues :  state.posts.target,

    }
}

function mapDispatchToProps(dispatch){
    return {
        closeCommentForm : () => dispatch(closeCommentForm())
    }
}

CommentForm = reduxForm({
    // a unique name for the form
    form: 'commentForm'
})(CommentForm)


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);