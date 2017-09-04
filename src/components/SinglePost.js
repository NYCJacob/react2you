import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Comments from './Comments'
import { closePost } from '../actions'


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
                        <button onClick={this.props.closeSinglePost}>Close</button>
                        <h3 className="post-title">{this.props.title} </h3>

                        <table className="table table-sm table-responsive">
                        <thead>
                        <tr>
                        <th className="post-author">By: {this.props.author}</th>
                        <th className="post-category">Category: {this.props.category}</th>
                        <th className="post-votes">Votes: {this.props.voteScore}</th>
                        </tr>
                        </thead>
                        <tbody>
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

function mapDispatchToProps(dispatch){
    return{
        closeSinglePost : () => dispatch(closePost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);