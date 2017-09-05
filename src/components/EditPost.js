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
        console.log( values );
    }

    render() {
        const { title, author, category, voteScore, body, id, timestamp } = this.props.postData;
        // const { handleSubmit } = this.props;

        return (

            <div className="editPost-view">
                { this.props.editable &&
                    <div>
                        <form onSubmit={ this.submit }>
                            <div>
                                <label htmlFor="firstName">Post Title</label>
                                <Field name="title" component="input" type="text" />
                            </div>
                            <div>
                                <label htmlFor="lastName">Post Body</label>
                                <Field name="body" component="input" type="text" />
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
    // let postToEdit = state.posts.items.find
    let targetPost =   state.posts.items.find((item) => item.id === state.posts.openTarget)
    console.log( targetPost );
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

//  redux form example init from state
// You have to connect() to any reducers that you wish to connect to yourself
// InitializeFromStateForm = connect(
//     state => ({
//         initialValues: state.account.data // pull initial values from account reducer
//     }),
//     { load: loadAccount } // bind account loading action creator
// )(InitializeFromStateForm)


export default connect(mapStateToProps, mapDispatchToProps)(EditPost);