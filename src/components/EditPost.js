import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {cancelEdit} from "../actions/index"


/**
 * @description
 * @constructor
 */
class EditPost extends Component {


    render() {
        const { title, author, category, voteScore, body, id, timestamp } = this.props.postData;

        return (

            <div className="editPost-view">
                { this.props.editable &&
                    <div>
                        {/*<button className="btn btn-sm" onClick={this.props.closeSinglePost}>X</button>*/}

                        <table className="table table-sm table-responsive">
                            <thead>
                            <tr><th colSpan={3}><h3 className="post-title"><input value={title}></input> </h3></th></tr>
                            </thead>
                            <tbody>
                            <tr><td colSpan={3} className="post-body"><textarea value={body} ></textarea></td></tr>
                            <tr><td><button className="btn-sm" >Save</button> </td> <td><button className="btn-sm" onClick={this.props.cancelEdit}>Cancel</button> </td></tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th className="post-author">By: {author}</th>
                                <th className="post-category">Category: {category}</th>
                                <th className="post-votes">Votes: {voteScore}</th>
                            </tr>
                            <tr className="table-info">
                                <td colSpan={2}>{id}</td><td>{timestamp}</td>
                            </tr>
                            </tfoot>
                        </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);