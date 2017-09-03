import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


/**
 * @description show a single comment
 * @constructor
 */

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