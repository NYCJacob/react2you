import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comments from './Comments'
import { sortVote} from "../actions/index"


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Posts extends Component {

    sortPostsByVote = () => {
        this.props.dispatch(sortVote())
    };

    render() {
        return (
            <div id="post-view">
                <div className="row">
                    <div className="col-sm-6">Title</div>
                    <div className="col-sm">Category</div>
                    <div className="col-sm"><a onClick={this.sortPostsByVote()}>Vote Score</a></div>
                </div>
                {/*{*/}
                {/*this.props.postsArray.map( (post) => (*/}
                    {/*<div className="post-listing container-fluid" >*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-sm-8">{post.title}</div>*/}
                            {/*<div className="col-sm">{post.category}</div>*/}
                            {/*<div className="col-sm">{post.voteScore}</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*))*/}
                {/*}*/}


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