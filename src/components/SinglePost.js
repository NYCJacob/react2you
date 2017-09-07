import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comments from './Comments'
import EditPost from './EditPost'
import { closePost, editPost, updatePost} from '../actions'


/**
 * @description
 * @constructor
 */
class SinglePost extends Component {

    handleSubmit = (data) => {
        console.log(data);
        this.props.updatePost(data);
    }

    render() {
        const { title, author, category, voteScore, body, id, timestamp } = this.props.targetPost;

        return (

            <div className="singlePost-view">
                { !this.props.editable &&
                    <div>
                        <button className="btn btn-sm" onClick={this.props.closeSinglePost}>X</button>
                        {/*<div>*/}
                            {/*<svg viewBox="0 0 100 100" class="icon ">*/}
                                {/*<use xlink:href="#window-close"></use>*/}
                            {/*</svg>*/}

                        {/*</div>*/}

                        <table className="table table-sm table-responsive">
                        <thead>
                        <tr><th colSpan={3}><h3 className="post-title">{title} </h3></th></tr>
                        <tr>
                        <th className="post-author">By: {author}</th>
                        <th className="post-category">Category: {category}</th>
                        <th className="post-votes"><button className="btn btn-sm btn-primary">Votes: {voteScore}</button></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td colSpan={3} className="post-body">{body}</td></tr>
                        <tr><td><button className="btn-sm" onClick={this.props.editPost}>Edit</button> </td></tr>
                        </tbody>
                        <tfoot>
                        <tr className="table-info">
                        <td colSpan={2}>{id}</td><td>{timestamp}</td>
                        </tr>
                        </tfoot>
                        </table>
                    <Comments postId={id}/>

                    </div>
                }

                { this.props.editable &&
                <div>

                    <EditPost onSubmit={this.handleSubmit} postData={ {
                        title: title,
                        author: author,
                        category: category,
                        voteScore: voteScore,
                        body: body,
                        id: id,
                        timestamp: timestamp
                    }}/>

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
    let editable = { editable : state.posts.editing};
    console.log(editable);
    return { targetPost, editable : state.posts.editing }
}

function mapDispatchToProps(dispatch) {
    return{
        closeSinglePost : () => dispatch(closePost()),
        editPost : () => dispatch(editPost()),
        updatePost : () => dispatch(updatePost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);