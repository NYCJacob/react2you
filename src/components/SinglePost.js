import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comments from './Comments'
import { closePost, editPost } from '../actions'


/**
 * @description
 * @constructor
 */
class SinglePost extends Component {


    render() {
        return (

            <div className="singlePost-view">
                {
                    <div>
                        <button className="btn btn-sm" onClick={this.props.closeSinglePost}>X</button>

                        <table className="table table-sm table-responsive">
                        <thead>
                        <tr><th colSpan={3} contentEditable={this.props.editable}><h3 className="post-title">{this.props.targetPost.title} </h3></th></tr>
                        <tr>
                        <th className="post-author">By: {this.props.targetPost.author}</th>
                        <th className="post-category">Category: {this.props.targetPost.category}</th>
                        <th className="post-votes">Votes: {this.props.targetPost.voteScore}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td colSpan={3} className="post-body" contentEditable={this.props.editable}>{this.props.targetPost.body}</td></tr>
                        <tr><td><button className="btn-sm" onClick={this.props.editPost}>Edit</button> </td> <td><button className="btn-sm">Save</button> </td></tr>
                        </tbody>
                        <tfoot>
                        <tr className="table-info">
                        <td colSpan={2}>{this.props.targetPost.id}</td><td>{this.props.targetPost.timestamp}</td>
                        </tr>
                        </tfoot>
                        </table>
                    <Comments postId={this.props.targetPost.id}/>

                    </div>
                    
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state);
    // state.posts.openTarget
    let targetPost =   state.posts.items.find((item) => item.id === state.posts.openTarget)
    let editable = state.posts.editPost;
    console.log(targetPost, state.posts.editPost);
    return { targetPost, editable}
}

function mapDispatchToProps(dispatch){
    return{
        closeSinglePost : () => dispatch(closePost()),
        editPost : () => dispatch(editPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);