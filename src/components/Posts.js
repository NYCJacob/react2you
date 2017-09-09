import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortVote, getPostDetails, newPost, SendNewPost, postVoting} from "../actions/index"
import SinglePost from './SinglePost'
import EditPost from './EditPost'

/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Posts extends Component {
    handleSubmit = (data) => {
        console.log(data);
        this.props.sendNewPost(data);
    }

    render() {
        return (
            <div>
                { (!this.props.open && !this.props.newPostForm) && <div id="posts-view">
                         <div className="row">
                             <div className="col-sm text-left">
                                 <button className="btn btn-sm btn-primary" onClick={() => this.props.newPost()}>New Post</button>
                             </div>
                             <div className="col-sm">Title</div>
                             <div className="col-sm text-right"><span>Category</span><span>&#9650;&#9660;</span></div>
                             <div className="col-sm"><a>Votes</a><span onClick={() => this.props.sortPostsByVote(this.props.items, this.props.voteSort)}>&#9650;&#9660;</span></div>
                         </div>

                        {
                            this.props.items.map((post) => (
                            <div className="post-listing container-fluid" key={post.id}>
                                <div className="row">
                                    <div className="col-sm-7 text-left"><a href="#"
                                    onClick={() => this.props.openPost(post.id)}>{post.title}</a>
                                    </div>
                                    <div className="col-sm-2 text-left">{post.category}</div>
                                    <div className="col-sm-2 text-right">{post.voteScore}</div>
                                    <div className="col-sm-1">
                                        <span onClick={() => this.props.vote(post.id, 1)}>&#9650;</span>
                                        <span onClick={() => this.props.vote(post.id, -1)}>&#9660;</span>
                                    </div>
                                </div>
                            </div>
                            ))
                        }

                    </div>
                }
                {this.props.open &&
                    <div>
                        <SinglePost/>
                    </div>
                }
                {this.props.newPostForm &&
                    <div className="newPostForm-container">
                        new post form
                        <EditPost onSubmit={this.handleSubmit.bind(this)} newPost={this.props.newPostForm} postData={ {
                            title: '',
                            author: '',
                            category: '',
                            voteScore: '',
                            body: '',
                            id: '',
                            timestamp: ''
                        }}/>
                    </div>
                }


            </div>
    )
    }
}


function mapStateToProps({ posts, categories }) {
    console.log( posts );
    // https://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array#26166303
    let postsArray =  Object.keys( posts ).map(key => posts[key]);

    return  { 'open' : posts.openPost, 'newPostForm' : posts.newPostForm, 'items': posts.items}
}

function mapDispatchToProps(dispatch) {
    return{
        openPost : (postId) => dispatch(getPostDetails(postId)),
        newPost : () => dispatch(newPost()),
        sortPostsByVote : (items, voteSort) => dispatch(sortVote( items, voteSort )),  //items is the array of posts in the posts reducer
        sendNewPost : (data) => dispatch(SendNewPost(data)),
        vote : (postId, vote) => dispatch( postVoting(postId, vote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);