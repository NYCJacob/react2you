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

    submit = ( values ) => {
        console.log( values  );
    }

    render() {
        const { title, author, category, voteScore, body, id, timestamp } = this.props.postData;
        const { handleSubmit } = this.props;

        return (

            <div className="editPost-view">
                { this.props.editable || this.props.newPostForm }
                {    <div className="container-fluid">

                        <form  onSubmit={handleSubmit}>

                            <table className="table table-sm table-responsive">
                                <thead>
                                <tr><th colSpan={3}>
                                    <label htmlFor="title">Post Title</label>
                                    <Field name="title" component="input" type="text" />
                                </th></tr>
                                <tr>
                                    <th className="post-author">By: {author}</th>
                                    <th className="post-category">Category: {category}</th>
                                    <th className="post-votes">Votes: {voteScore}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr><td colSpan={3} className="post-body">
                                    <label htmlFor="body">Post Body</label>
                                    <Field name="body" component="textarea" type="text" />
                                </td></tr>
                                </tbody>
                                <tfoot>
                                <tr className="table-info">
                                    <td colSpan={2}>{id}</td><td>{timestamp}</td>
                                </tr>
                                <tr>
                                    <td><button type="submit">Save</button></td>
                                    <td><button onClick={this.props.cancelEdit}>Cancel</button></td>
                                </tr>
                                </tfoot>
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
    // console.log(state);
    // let postToEdit = state.posts.items.find
    // let targetPost =   state.posts.items.find((item) => item.id === state.posts.openTarget)
    // console.log( targetPost );
    return { editable : state.posts.editing, initialValues :  state.posts.items.find((item) => item.id === state.posts.openTarget) }
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