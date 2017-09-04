import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comments from './Comments'


/**
 * @description
 * @constructor
 */
class SinglePost extends Component {


    render() {
        return (
            <div className="singlePost-view">
                {
                    <div>
                        <p>single post details</p>
                    </div>

                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state);

    return state
}

export default connect(mapStateToProps)(SinglePost);