import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComments} from "../actions/index"
import SingleComment from './SingleComment'
import CommentForm from './CommentForm'


/**
 * @description
 * @constructor
 */

class Comments extends Component {
    componentDidMount() {
        this.props.dispatch(fetchComments(this.props.postId))
    }

    render() {
        const {category, postId} = this.props;

        return (
            <div className="commentsDiv">
                <Link to={`/${category}/${postId}/newcomment`}>
                    <button className="btn btn-sm">New Comment</button>
                </Link>
                <Switch>
                    <Route path={`/${category}/${postId}/newcomment`} component={CommentForm}/>
                </Switch>
                {
                   this.props.comments.length !== 0 ? this.props.comments.map( (comment,idx) => (
                        <SingleComment comment={comment} key={idx} />
                    )) : <p>no comments</p>
                }

            </div>
        )
    }
}

function mapStateToProps( state, props ) {
    let commentsKey = props.postId + '-comments';
    console.log( state.comments[commentsKey] );
    let postComments = [];
    if (state.comments[commentsKey]){
        postComments = state.comments[commentsKey];
    } else {
        postComments.push({'body': 'no comments'});
    }
    console.log( postComments);
    return { comments : postComments };
}

export default connect(mapStateToProps)(Comments)