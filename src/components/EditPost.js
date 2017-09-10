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
    compoenentDidMount() {

    }


    handleSubmit = (data) => {
        console.log(data);
        this.props.sendNewPost(data);
    }

    render() {
        const { author='', category='', voteScore='', id='', timestamp='' } = this.props.postData;
        // const { handleSubmit } = this.props;

        return (

            <div className="editPost-view">
                { this.props.editable || this.props.newPostForm }
                {    <div className="container-fluid">

                        <form  onSubmit={this.handleSubmit}>

                            <table className="table table-sm table-responsive">
                                <thead>
                                {this.props.newPost &&
                                <tr>
                                    <th colSpan={3}>
                                        <label htmlFor="title">Post Title</label>
                                        <Field name="title" component="input" size="50" type="text"/>
                                    </th>
                                </tr>
                                }
                                {this.props.editable &&
                                <tr>
                                    <th colSpan={3}>
                                        <label htmlFor="title">Post Title</label>
                                        <Field name="title" component="input" size="50" type="text"/>
                                    </th>
                                </tr>
                                }
                                {this.props.editable &&
                                    <tr>
                                        <th className="post-author">By: {author}</th>
                                        <th className="post-category">Category: {category}</th>
                                        <th className="post-votes">Votes: {voteScore}</th>
                                    </tr>
                                }
                                {this.props.newPost &&
                                <tr>
                                    <th className="post-author">
                                        <label htmlFor="author">Author</label>
                                        <Field name="author" component="input" type="text" />
                                    </th>
                                    <th className="post-category">
                                        <label htmlFor="category"></label>
                                        <Field name="category" component="select">
                                            <option>Select Category</option>
                                            {this.props.categories.map((category) => (
                                                <option value={category.name}>{category.name}</option>
                                            ))
                                            }
                                        </Field>
                                    </th>

                                </tr>
                                }
                                </thead>
                                <tbody>
                                <tr><td colSpan={3} className="post-body">
                                    <label htmlFor="body">Post Body</label>
                                    <Field name="body" component="textarea" cols="50" rows="5" type="text" />
                                </td></tr>
                                </tbody>
                                <tfoot>
                                {this.props.editable &&
                                    <tr className="table-info">
                                        <td colSpan={2}>{id}</td>
                                        <td>{timestamp}</td>
                                    </tr>
                                }
                                {/*{this.props.newPost &&*/}
                                {/*<tr className="table-info">*/}
                                    {/*<td>*/}
                                        {/*<label htmlFor="postId">Post ID</label>*/}
                                        {/*<Field name="postId" component="input" type="number" />*/}
                                    {/*</td>*/}
                                    {/*<td><label htmlFor="timeStamp">TimeStamp</label>*/}
                                        {/*<Field name="timeStamp" component="input" type="number" /></td>*/}
                                {/*</tr>*/}
                                {/*}*/}

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
    return { editable : state.posts.editing,
        initialValues :  state.posts.items.find((item) => item.id === state.posts.openTarget),
        categories: Object.keys( state.categories ).map(key => state.categories[key])
    }
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