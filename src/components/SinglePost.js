import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from "lodash";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Comments from './Comments'
import { closePost, editPost, deletePostAction, sendVote} from '../actions'


/**
 * @description
 * @constructor
 */
class SinglePost extends Component {
    static propTypes = {
        thisPost : PropTypes.array.isRequired,
        editable: PropTypes.bool.isRequired
    }

    componentDidMount() {

    }

    render() {
        if (!this.props.thisPost) {
            this.props.history.push("/404")
        }

        const { title, author, category, voteScore, body, id, timestamp } = this.props.thisPost;

        return (

            <div className="singlePost-view">
                    <div>
                        <Link to="/">
                            <button className="btn btn-sm btn-outline-dark" onClick={this.props.closeSinglePost}>X</button>
                        </Link>

                        <table className="table table-sm table-responsive">
                        <thead>
                        <tr><th colSpan={3}><h3 className="post-title">{title} </h3></th></tr>
                        <tr>
                            <th className="post-author">By: {author}</th>
                            <th className="post-category">Category: {category}</th>
                            <th className="post-votes">Votes: {voteScore} </th>
                            <th>
                                <span className="voting" onClick={() => this.props.vote(id, 1)}>&#9650;</span>
                                <span>||</span>
                                <span className="voting" onClick={() => this.props.vote(id, -1)}>&#9660;</span>
                            </th>
                        </tr>
                        </thead>
                            <tbody>
                            <tr>
                                <td colSpan={3} className="post-body">{body}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-left">
                                    <Link to="/editpost">
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => this.props.editPost(this.props.thisPost)}>Edit</button>
                                    </Link>
                                </td>
                                <td colSpan={2} className="text-right">
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => this.props.deletePost(id)}>Delete</button>
                                </td>
                            </tr>
                            <tr className="table-info">
                                <td colSpan={2}>{id}</td><td>{timestamp}</td>
                            </tr>
                            </tbody>
                        </table>

                        <Comments postId={id} category={category}/>

                    </div>

            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return { thisPost : _.cloneDeep((state.posts.items || []).find( (obj) => obj.id === state.posts.target.id)),
            editable : state.posts.editing }
}

function mapDispatchToProps(dispatch) {
    return{
        closeSinglePost : () => dispatch(closePost()),
        editPost : (post) => dispatch(editPost(post)),
        deletePost : (postId) => dispatch(deletePostAction(postId)),
        vote : (postId, vote) => dispatch( sendVote(postId, vote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)