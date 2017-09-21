import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import {cancelEdit, updatePost, SendNewPost} from "../actions/index"
// redux form import
import { Field, reduxForm } from 'redux-form'
import {
    renderField, renderFieldcommentBody, renderFieldTitle, renderFieldcommentAuthor, required, maxLength15, minLength2,
    alphaNumeric, renderFieldAuthor, renderFieldBody, renderFieldSelect
} from "../utils/formValidation"


/**
 * @description
 * @constructor
 */
class EditPost extends Component {

    closeForm = () => this.props.history.push("/");

    render() {

        return (

            <div className="editPost-view">
                {    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3>Post Form</h3>
                                <form  onSubmit={
                                    this.props.handleSubmit((data) => this.props.submitData(data, this.props.editable))
                                }>

                                    <table className="table table-sm table-responsive">

                                        <tbody>
                                            <tr className="row">
                                                <td colSpan={3} className="col-sm">
                                                    <Field
                                                        name="title"
                                                        type="text"
                                                        component={renderFieldTitle}
                                                        label="title"
                                                        validate={[required, minLength2]}
                                                    />
                                                </td>
                                                { ( this.props.newPostForm === false ) &&
                                                <td className="post-voteScore col-sm">
                                                    <label htmlFor="voteScore">Votes</label>
                                                    <Field name="voteScore" component="input" type="text" size="2"
                                                           readOnly/>
                                                </td>
                                                }
                                            </tr>
                                            <tr className="row">
                                                <td className="post-author col-sm">
                                                    <Field
                                                        name="author"
                                                        type="text"
                                                        component={renderFieldAuthor}
                                                        label="author"
                                                        validate={[required, maxLength15, minLength2]}
                                                        warn={alphaNumeric}
                                                    />
                                                </td>
                                                <td className="post-category col-sm">
                                                    <label htmlFor="category"></label>
                                                    <Field
                                                        name="category"
                                                        component={renderFieldSelect}
                                                        label="select category">
                                                        { this.props.categories.map((category, idx) => (
                                                            <option key={idx} value={category.name}>{category.name}</option>
                                                        ))
                                                        }
                                                    </Field>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="col-sm">
                                                    <Field
                                                        name="body"
                                                        type="text"
                                                        label="post body"
                                                        component={renderFieldBody}
                                                        validate={[required, minLength2]}
                                                    />
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
                                                <td>
                                                    <button type="submit">Save</button>
                                                </td>
                                                <td>
                                                    <Link to="/">
                                                        <button>Cancel</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>


                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { editable : state.posts.editing,
            newPost : state.posts.newPostForm,
            initialValues :  state.posts.target,
            categories: Object.keys( state.categories ).map(key => state.categories[key]),
    }
}

function mapDispatchToProps(dispatch){
    return {
        submitData : ( data, editing ) => {
            editing ? dispatch(updatePost(data)) : dispatch(SendNewPost(data))
        }
    }
}

EditPost = reduxForm({
    // a unique name for the form
    form: 'EditPostForm',
    onSubmitSuccess: (result, dispatch, props) => {props.history.push("/")}
})(EditPost)


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));