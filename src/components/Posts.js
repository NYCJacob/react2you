import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description Creates a list of all posts ordered by voteScore (highest score first)
 * @constructor
 */
class Posts extends Component {

    render() {
        return (
            <div id="post-view">

                <table className="table table-sm table-responsive">
                    <tbody>
                        <thead>
                            <tr>
                                <th><td>Author</td></th>
                                <th><td>Category</td></th>
                                <th><td>voteScore</td></th>
                            </tr>
                        </thead>
                        <tr><td>Post Title</td></tr>
                        <tr><td>this will be the post text</td></tr>
                        <tr className="table-info">
                            <td>id</td><td>timestamp</td>
                        </tr>
                    </tbody>
                </table>

            </div>
    )
    }
}
export default Posts