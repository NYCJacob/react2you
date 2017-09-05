import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {cancelEdit} from "../actions/index"
// redux form import
import { Field, reduxForm } from 'redux-form'

/**
 * @description
 * @constructor
 */
class EditPost extends Component {


    render() {
        const { title, author, category, voteScore, body, id, timestamp } = this.props.postData;
        const { handleSubmit } = this.props;

        return (

            <div className="editPost-view">
                { this.props.editable &&
                    <div>
                        <form onSubmit={ handleSubmit }>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" component="input" type="text" />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" component="input" type="text" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field name="email" component="input" type="email" />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state);
    return { editable : state.posts.editing }
}

function mapDispatchToProps(dispatch){
    return {
        cancelEdit : () => dispatch(cancelEdit()),
    }
}

EditPost = reduxForm({
    // a unique name for the form
    form: 'EditPostForm'
})(EditPost)

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);