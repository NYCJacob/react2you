import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortVote, getPostDetails} from "../actions/index"
import SinglePost from './SinglePost'


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Posts extends Component {

    sortPostsByVote = () => {
        this.props.dispatch(sortVote())
    };

    openPost(postId)  {
        this.props.dispatch(getPostDetails(postId))
    }

    render() {
        return (
            <div>
                { !this.props.open && <div id="posts-view">

                            <div className="row">
                                <div className="col-sm-6">Title</div>
                                <div className="col-sm">Category</div>
                                <div className="col-sm"><a onClick={this.sortPostsByVote()}>Vote Score</a></div>
                            </div>

                        {
                            this.props.items.map((post) => (
                            <div className="post-listing container-fluid" key={post.id}>
                                <div className="row">
                                    <div className="col-sm-8"><a href="#"
                                    onClick={() => this.openPost(post.id)}>{post.title}</a>
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

    return  { 'open' : posts.openPost, 'items': posts.items}
    // return { posts, categories }
}

export default connect(mapStateToProps)(Posts);