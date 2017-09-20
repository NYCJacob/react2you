import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as _ from "lodash";

import {
    setTargetAction, newPost, SendNewPost, createPost, sendVote, setSortKey, receivePosts,
    editPost, deletePostAction
} from "../actions/index"


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Posts extends Component {
    static propTypes = {
        items : PropTypes.array.isRequired,
        sorter: PropTypes.func.isRequired,
        editPost : PropTypes.func.isRequired,
        deletePost : PropTypes.func.isRequired,
        createPost : PropTypes.func.isRequired,
        vote : PropTypes.func.isRequired,
        setTarget : PropTypes.func.isRequired
    }

    calcAge = (timeStamp) => {
        let timeDiff = Date.now() - timeStamp;
        let totalHours = Math.floor(timeDiff/(1000*60*60));
        let days = Math.trunc(totalHours/24);
        let hours = totalHours % 24;
        if (days > 365) {
            let years = Math.trunc(days/365);
            days = years % 365;
            return `${years}+ year(s)`
        } else {
            return `${days} days ${hours} hour(s)`
        }


    }

    render() {
        return (
            <div>
                <div id="posts-view">
                    <div className="row">
                            <div className="col-sm text-left">
                                <Link to="/newpost">
                                    <button className="btn btn-sm btn-outline-success" onClick={() => this.props.createPost()}>New Post</button>
                                </Link>
                            </div>
                        </div>

                         <div className="row">
                             <div className="col-sm-2"><u>Title</u></div>

                             <div className="col-sm-2 text-left">
                                 <span><u>Category</u></span>
                                 <span className="voting" onClick={() => this.props.sorter( 2, this.props.items)}>&#9650;</span>
                                 <span>|</span>
                                 <span className="voting" onClick={() => this.props.sorter( -2, this.props.items)}>&#9660;</span>
                             </div>
                             <div className="col-sm-2 text-left">
                                 <span><u>Votes</u></span>
                                 <span className="voting" onClick={() => this.props.sorter( 1, this.props.items)}>&#9650;</span>
                                 <span>|</span>
                                 <span className="voting" onClick={() => this.props.sorter( -1, this.props.items)}>&#9660;</span>
                             </div>
                             <div className="col-sm-2 text-left">
                                 <span><u>Posted</u></span>
                                 <span className="posted" onClick={() => this.props.sorter( 3, this.props.items)}>&#9650;</span>
                                 <span>|</span>
                                 <span className="posted" onClick={() => this.props.sorter( -3, this.props.items)}>&#9660;</span>
                             </div>
                             <div className="col-sm-1"><u>Author</u></div>
                             <div className="col-sm-1"><u>Comments</u></div>
                         </div>
                        {
                            this.props.items.map((post) => (
                            <div className="post-listing container-fluid" key={post.id}>
                                <div className="row">
                                    <div className="col-sm-2 text-left">
                                        <Link to={`/${post.category}/${post.id}`} onClick={() => this.props.setTarget(post)} >{post.title}</Link>
                                        {/*<Link to={`/${post.category}/${post.id}`} onClick={() => this.props.openPost(post)} >{post.title}</Link>*/}
                                    </div>
                                    <div className="col-sm-1 text-left">{post.category}</div>
                                    <div className="col-sm-2 text-right">{post.voteScore}</div>
                                    <div className="col-sm-1">
                                        <span onClick={() => this.props.vote(post.id, 1)}>&#9650;</span>
                                        <span onClick={() => this.props.vote(post.id, -1)}>&#9660;</span>
                                    </div>
                                    <div className="col-sm-2">
                                        {this.calcAge(post.timestamp)}
                                    </div>
                                    <div className="col-sm-1 text-left">{post.author}</div>
                                    <div className="col-sm-1 text-right">{post.commentTotal}</div>
                                    <div className="col-sm-1">
                                        <Link to="/editpost" onClick={() => this.props.editPost(post)}>
                                            [Edit]
                                        </Link>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/" onClick={() => this.props.deletePost(post.id)}>
                                            [X]
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            ))
                        }

                </div>

            </div>
    )
    }
}


function mapStateToProps({ posts }) {

    return  { 'sortKey' : posts.sortKey, 'open' : posts.openPost, 'newPostForm' : posts.newPostForm, 'items': _.cloneDeep(posts.items)}
}

function mapDispatchToProps(dispatch) {
    return{
        setTarget : (post) => dispatch(setTargetAction(post)),
        newPost : () => dispatch(newPost()),
        createPost : () => dispatch(createPost()),
        editPost : (post) => dispatch(editPost(post)),
        deletePost : (postId) => dispatch(deletePostAction( postId )),
        vote : (postId, vote) => dispatch( sendVote(postId, vote)),
        sorter : (sortKey, posts) => {
            dispatch( setSortKey(sortKey));  // setting sort key did not trigger a render
            dispatch(receivePosts(posts));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);