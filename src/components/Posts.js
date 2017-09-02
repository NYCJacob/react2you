import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comments from './Comments'
/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */

class Posts extends Component {
    //TODO: need to move getRand to Provider
    getRandomInt = (min = 1, max = 999999) =>  {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    render() {
        console.log('Posts Props: ', this.props.posts);
        return (
            <div id="post-view">

                {
                this.props.postsArray.map( (post) => (
                    <table className="table table-responsive" key= {post.id}>
                        <thead>
                        <tr>
                            <th>By: {post.author}</th>
                            <th>Category: {post.category}</th>
                            <th>Votes: {post.voteScore}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={3}>{post.title}</td></tr>
                            <tr><td colSpan={3}>{post.body}</td></tr>
                        </tbody>
                        <tfoot>
                        <tr className="table-info">
                            <td colSpan={2}>{post.id}</td><td>{post.timestamp}</td>
                        </tr>
                        </tfoot>
                    </table>

                ))}

            </div>
    )
    }
}


function mapStateToProps({ posts, categories }) {
    // console.log( posts );
    // https://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array#26166303
    let postsArray =  Object.keys( posts ).map(key => posts[key]);
    console.log( typeof postsArray )
    // posts.posts.map((post) => postsArray.push(post));

    return { postsArray, categories }
}

export default connect(mapStateToProps)(Posts);