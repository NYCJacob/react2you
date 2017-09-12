import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {cancelEdit, handleSubmit, updatePost, SendNewPost} from "../actions/index"
// redux form import
import { Field, reduxForm } from 'redux-form'
import {renderField, required, maxLength15, minLength2, alphaNumeric} from "../utils/formValidation"


/**
 * @description
 * @constructor
 */
class EditPost extends Component {

    render() {

        return (

            <div className="editPost-view">
                {    <div className="container-fluid">

                        <form  onSubmit={this.props.handleSubmit(data => this.props.submitData(data, this.props.editable))}>

                            <table className="table table-sm table-responsive">
                                <thead>
                                    <tr>
                                        <th colSpan={3}>
                                            <Field
                                                name="title"
                                                type="text"
                                                component={renderField}
                                                label="title"
                                                validate={[required, maxLength15, minLength2]}
                                                warn={alphaNumeric}
                                            />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="post-author">
                                            <label htmlFor="author">Author</label>
                                            <Field name="author" component="input" type="text" />
                                        </th>
                                        <th className="post-category">
                                            <label htmlFor="category"></label>
                                            <Field name="category" component="select">
                                                <option>Select Category</option>
                                                {this.props.categories.map((category, idx) => (
                                                    <option key={idx} value={category.name}>{category.name}</option>
                                                ))
                                                }
                                            </Field>
                                        </th>
                                        <th className="post-voteScore">
                                            <label htmlFor="voteScore">Votes</label>
                                            <Field name="voteScore" component="input" type="text" size="2" readOnly/>
                                        </th>

                                    </tr>

                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={3} className="post-body">
                                            <label htmlFor="body">Post Body</label>
                                            <Field name="body" component="textarea" cols="50" rows="5" type="text" />
                                        </td>
                                    </tr>
                                    {this.props.editing &&
                                    <tr className="table-info">
                                        <td>
                                            <label htmlFor="id">ID</label>
                                            <Field name="id" component="input" type="text" readOnly/>
                                        </td>
                                        <td colSpan={2}>
                                            <label htmlFor="timestamp">TimeStamp</label>
                                            <Field name="timestamp" component="input" type="number" readOnly/>
                                        </td>
                                    </tr>
                                    }
                                    <tr>
                                        <td><button type="submit">Save</button></td>
                                        <td>
                                            <Link to="/">
                                                <button onClick={this.props.cancelEdit}>Cancel</button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>


                            </table>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

//TODO: figure out how to use tenary statment for returns
function mapStateToProps(state) {
    return { editable : state.posts.editing,
            newPost : state.posts.newPostForm,
        // initialValues :  state.posts.items.find((item) => item.id === state.posts.openTarget),
        initialValues :  state.posts.target,
        categories: Object.keys( state.categories ).map(key => state.categories[key]),
    }
}

function mapDispatchToProps(dispatch){
    return {
        cancelEdit : () => dispatch(cancelEdit()),
        // sendNewPost : (data) => dispatch(SendNewPost(data)),
        submitData : ( data, editing ) => {
            editing ? dispatch(updatePost(data)) : dispatch(SendNewPost(data))
        }
        // submitData : ( data ) => dispatch(handleSubmit(data))
    }
}

EditPost = reduxForm({
    // a unique name for the form
    form: 'EditPostForm'
})(EditPost)


export default connect(mapStateToProps, mapDispatchToProps)(EditPost);