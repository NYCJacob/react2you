import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import {
    setTargetAction, newPost, SendNewPost, createPost, sendVote, setSortKey, receivePosts,
    editPost, deletePostAction
} from "../actions/index"
import SinglePost from './SinglePost'
import EditPost from './EditPost'

/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Posts extends Component {
    // handleSubmit = (data) => {
    //     console.log(data);
    //     this.props.sendNewPost(data);
    // }


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
                             <div className="col-sm">Title</div>
                             <div className="col-sm text-right">
                                 <span>Category</span>
                                 <span className="voting" onClick={() => this.props.sorter( 2, this.props.items)}>&#9650;</span>
                                 <span>|</span>
                                 <span className="voting" onClick={() => this.props.sorter( -2, this.props.items)}>&#9660;</span>
                             </div>
                             <div className="col-sm text-left">
                                 <span>Votes</span>
                                 <span className="voting" onClick={() => this.props.sorter( 1, this.props.items)}>&#9650;</span>
                                 <span>|</span>
                                 <span className="voting" onClick={() => this.props.sorter( -1, this.props.items)}>&#9660;</span>
                             </div>
                         </div>
                        {
                            this.props.items.map((post) => (
                            <div className="post-listing container-fluid" key={post.id}>
                                <div className="row">
                                    <div className="col-sm-7 text-left">
                                        <Link to={`/${post.category}/${post.id}`} onClick={() => this.props.setTarget(post)} >{post.title}</Link>
                                        {/*<Link to={`/${post.category}/${post.id}`} onClick={() => this.props.openPost(post)} >{post.title}</Link>*/}
                                    </div>
                                    <div className="col-sm-1 text-left">{post.category}</div>
                                    <div className="col-sm-1 text-right">{post.voteScore}</div>
                                    <div className="col-sm-1">
                                        <span onClick={() => this.props.vote(post.id, 1)}>&#9650;</span>
                                        <span onClick={() => this.props.vote(post.id, -1)}>&#9660;</span>
                                    </div>
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


function mapStateToProps({ posts, categories }) {
    console.log( posts );
    // https://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array#26166303
    // let postsArray =  Object.keys( posts ).map(key => posts[key]);

    return  { 'sortKey' : posts.sortKey, 'open' : posts.openPost, 'newPostForm' : posts.newPostForm, 'items': posts.items}
}

function mapDispatchToProps(dispatch) {
    return{
        // openPost : (post) => dispatch(getPostDetails(post)),
        setTarget : (post) => dispatch(setTargetAction(post)),
        newPost : () => dispatch(newPost()),
        // sendNewPost : (data) => dispatch(SendNewPost(data)),
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