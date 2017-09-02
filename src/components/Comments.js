import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */

class Comments extends Component {

    render() {

        return (
            <div id="comment-view">
                <p>This is a comment</p>
            </div>
        )
    }
}


export default Comments;