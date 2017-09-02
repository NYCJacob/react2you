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
                   <div>
                       <div>By: {this.props.comment.author}</div>
                       <div>{this.props.comment.body}</div>
                   </div>

                }
            </div>
        )
    }
}



export default SingleComment