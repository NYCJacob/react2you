import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortVote, getPostDetails, newPost, SendNewPost} from "../actions/index"
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
                             <div className="col-sm-3 text-left">
                                 <button className="btn btn-sm btn-primary" onClick={() => this.props.newPost()}>New Post</button>
                             </div>
                             <div className="col-sm-3">Title</div>
                             <div className="col-sm-3">Category</div>
                             <div className="col-sm-3"><a onClick={() => this.props.sortPostsByVote()}>Vote Score</a></div>
                         </div>

                        {
                            this.props.items.map((post) => (
                            <div className="post-listing container-fluid" key={post.id}>
                                <div className="row">
                                    <div className="col-sm-8"><a href="#"
                                    onClick={() => this.props.openPost(post.id)}>{post.title}</a>
                                    </div>
                                    <div className="col-sm">{post.category}</div>
                                    <div className="col-sm">{post.voteScore}</div>
                                </div>
                            </div>
                            ))
                        }

                    </div>
                }
                {this.props.open &&
                <div>
                    {/*<PostTree />*/}
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
    console.log( typeof postsArray )
    // posts.posts.map((post) => postsArray.push(post));

    return  { 'open' : posts.openPost, 'newPostForm' : posts.newPostForm, 'items': posts.items}
    // return { posts, categories }
}

function mapDispatchToProps(dispatch) {
    return{
        openPost : (postId) => dispatch(getPostDetails(postId)),
        newPost : () => dispatch(newPost()),
        sortPostsByVote : () => dispatch(sortVote()),
        sendNewPost : (data) => dispatch(SendNewPost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);