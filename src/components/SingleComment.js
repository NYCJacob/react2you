import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


/**
 * @description show a single comment
 * @constructor
 *
 */

// POST /comments
// USAGE:
//     Add a comment to a post
//
// PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
// author: String
// parentId: Should match a post id in the database.

class SingleComment extends Component {

    render() {

        return (
            <div>
                {
                   <div className="comment-text">
                       <div className="comment-author">By: {this.props.comment.author}</div>
                       <div className="comment-body" >{this.props.comment.body}</div>
                   </div>

                }
            </div>
        )
    }
}



export default SingleComment