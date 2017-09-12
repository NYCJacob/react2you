import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Comments from './Comments'
import { closePost, editPost, deletePostAction, sendVote} from '../actions'


/**
 * @description
 * @constructor
 */
class SinglePost extends Component {



    render() {
        const { title, author, category, voteScore, body, id, timestamp } = this.props.target;

        return (

            <div className="singlePost-view">
                    <div>
                        <Link to="/">
                            <button className="btn btn-sm" onClick={this.props.closeSinglePost}>X</button>
                        </Link>

                        <table className="table table-sm table-responsive">
                        <thead>
                        <tr><th colSpan={3}><h3 className="post-title">{title} </h3></th></tr>
                        <tr>
                            <th className="post-author">By: {author}</th>
                            <th className="post-category">Category: {category}</th>
                            <th className="post-votes">Votes: {voteScore} </th>
                            <span className="voting" onClick={() => this.props.vote(id, 1)}>&#9650;</span>
                            <span>||</span>
                            <span className="voting" onClick={() => this.props.vote(id, -1)}>&#9660;</span>
                        </tr>
                        </thead>
                            <tbody>
                            <tr>
                                <td colSpan={3} className="post-body">{body}</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to="/editpost">
                                        <button className="btn-sm" >Edit</button>
                                        {/*<button className="btn-sm" onClick={this.props.editPost}>Edit</button> */}
                                    </Link>
                                </td>
                                <td><button className="btn-sm" onClick={() => this.props.deletePost(id)}>Delete</button> </td>
                            </tr>
                            <tr className="table-info">
                                <td colSpan={2}>{id}</td><td>{timestamp}</td>
                            </tr>
                            </tbody>
                        </table>

                        <Comments postId={id}/>

                    </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state);
    // state.posts.openTarget
    // let targetPost =   state.posts.items.find((item) => item.id === state.posts.openTarget)
    let editable = { editable : state.posts.editing};
    console.log(editable);
    return { target : state.posts.target, editable : state.posts.editing }
}

function mapDispatchToProps(dispatch) {
    return{
        closeSinglePost : () => dispatch(closePost()),
        editPost : (targetPost) => dispatch(editPost(targetPost)),
        deletePost : (postId) => dispatch(deletePostAction(postId)),
        vote : (postId, vote) => dispatch( sendVote(postId, vote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)