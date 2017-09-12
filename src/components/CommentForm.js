import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { } from "../actions/index"
// redux form import
import { Field, reduxForm } from 'redux-form'
import {renderField, required, maxLength15, minLength2, alphaNumeric} from "../utils/formValidation"


/**
 * @description
 * @constructor
 */
class CommentForm extends Component {

    render() {

        return (

            <div className="commentForm-view">
                    <div className="container-fluid">

                    <form>

                       <h1>Comment form</h1>
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

    }
}

CommentForm = reduxForm({
    // a unique name for the form
    form: 'commentForm'
})(CommentForm)


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);