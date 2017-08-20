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
                    <thead>
                    <tr>
                        <th>Author</th>
                        <th>Category</th>
                        <th>voteScore</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr><td>Post Title</td></tr>
                        <tr><td>this will be the post text</td></tr>
                    </tbody>
                    <tfoot>
                    <tr className="table-info">
                        <td>id</td><td>timestamp</td>
                    </tr>
                    </tfoot>
                </table>

            </div>
    )
    }
}
export default Posts