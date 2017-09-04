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
                <h2> single post componenet </h2>
                {
                    <div>
                        <table className="table table-sm table-responsive" key= {this.props.id}>
                        <thead>
                        <tr>
                        <th className="post-author">By: {this.props.author}</th>
                        <th className="post-category">Category: {this.props.category}</th>
                        <th className="post-votes">Votes: {this.props.voteScore}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td colSpan={3} className="post-title">{this.props.title}</td></tr>
                        <tr><td colSpan={3} className="post-body">{this.props.body}</td></tr>
                        </tbody>
                        <tfoot>
                        <tr className="table-info">
                        <td colSpan={2}>{this.props.id}</td><td>{this.props.timestamp}</td>
                        </tr>
                        </tfoot>
                        </table>
                    <Comments postId={this.props.id} />
                    </div>
                    
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(state);
    // state.posts.openTarget
    let targetPost =   state.posts.items.find((item) => item.id === state.posts.openTarget)
    console.log(targetPost);
    return targetPost
}

export default connect(mapStateToProps)(SinglePost);