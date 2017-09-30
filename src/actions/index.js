import * as ActionType from './types'
const uuidv4 = require('uuid/v4');


export function allPosts () {
    return {
        type: ActionType.ALL_POSTS
    }
}


export  function addCategory( newCategory) {
    return {
        type: ActionType.ADD_CATEGORY,
        newCategory : newCategory,
    }
}


function receiveCategories(categories) {
    return {
        type: ActionType.RECEIVE_CATEGORIES,
        categories: categories,
        receivedAt: Date.now()
    }
}


export function fetchCategories() {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    const fetchParams = {
        method : 'GET',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default'
    }
    return dispatch => {
        return fetch('http://localhost:5001/categories', fetchParams)
            .then(response => {
                return response.json()
            })
            .then(data => {
                dispatch(receiveCategories( data ))
            })
    }

}
// end fetchCategories()

export function fetchCategoryPosts(category) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    const fetchParams = {
        method : 'GET',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default'
    }
    return dispatch => {
        return fetch(`http://localhost:5001/${category}/posts`, fetchParams)
            .then(response => {
                return response.json()
            })
            .then(data => {
                dispatch(receivePosts( data ))
            })
    }
}

export function postVoting(postId, vote) {
    return {
        type : ActionType.POST_VOTE,
        vote : vote,
        postId : postId
    }
}


export function setSortKey(sortKey) {
    return {
        type: ActionType.SET_SORTKEY,
        key : sortKey
    }
}

export function cancelEdit() {
    return {
        type: ActionType.CANCEL_EDIT
    }
}

export function editPost(post) {
    console.log(post)
    return {
        type: ActionType.EDIT_POST,
        postData: post
    }
}


export function closePost() {
    return {
        type: ActionType.CLOSE_POST
    }
}


export function setTargetAction( post ) {
    return{
        type: ActionType.SET_TARGET,
        target : post
    }
}

export function receivePosts(posts) {

    return {
        type: ActionType.RECEIVE_POSTS,
        posts: posts,
        receivedAt: Date.now()
    }
}

function postCommentTotal( id, commentTotal) {
    return {
        type: ActionType.POST_COMMENT_TOTAL,
        id : id,
        commentTotal : commentTotal
    }
}


//  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export function fetchPosts() {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    const fetchParams = {
        method : 'GET',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default'
    }
    return dispatch => {
        return fetch('http://localhost:5001/posts', fetchParams)
            .then(response => {
                return response.json()
            })
            .then(data => {
                data.forEach(post => dispatch(fetchComments(post.id)))
                return data;
            })
            .then(data => {
                dispatch(receivePosts( data ));
                return data;
            })
    }
}
// end fetchPosts()


// updatedPost is dispatached by updatePost
function  updatedPost( updated ) {
    return {
        type : ActionType.UPDATED_POST,
        updatedPost : updated,
        updatedAt : Date.now()
    }

}


//
function  deletePost( postId ) {
    return {
        type : ActionType.DELETE_POST,
        deletePostId : postId,
        updatedAt : Date.now()
    }

}

export function sendVote(postId, vote) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    let dataBody;
    vote === 1 ? dataBody = {option : 'upVote'} : dataBody = {option: 'downVote'};

    const fetchParams = {
        method : 'POST',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
        body : JSON.stringify( dataBody )
    };
    let url = `http://localhost:5001/posts/${postId}`;
    return dispatch => {
        return fetch(url, fetchParams)
            .then(() => {
                dispatch(postVoting(postId, vote))
            })
            .then(dispatch(fetchPosts()))
    }
}

export function updatePost(data) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');
    let dataBody = { title: data.title, body: data.body };
    const fetchParams = {
        method : 'PUT',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
        body : JSON.stringify( dataBody)
    }
    let url = `http://localhost:5001/posts/${data.id}`;
    return dispatch => {
        return fetch(url, fetchParams)
            .then(() => {
                // console.log('put success');
                dispatch(updatedPost( data ))
            })
            .then(() => {
            dispatch(fetchPosts())
            })   // fetch returns saved object and re-writes store so need to fetch again
    }
}


export function newPost(data) {
    return {
        type: ActionType.NEW_POST
    }
}

export function createPost( data ){
    return {
        type: ActionType.CREATE_POST,
        newPost : data
    }
}

export function SendNewPost(data) {
    console.log( data );
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    // when user does not make a selection eventhough react selected in ui by default empty string is passed
    if (data.category === "") {
        data.category = "react";
    }
    const dataBody = {
        id : uuidv4(),
        timestamp : Date.now(),
        title : data.title,
        body : data.body,
        author : data.author,
        category : data.category
    };

    const fetchParams = {
        method : 'POST',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
        body : JSON.stringify( dataBody)
    };

    let url = `http://localhost:5001/posts`;
    return dispatch => {
        return fetch(url, fetchParams)
            // .then(dispatch(newPost(data)))
            .then(dispatch( createPost( data )))
            .then(dispatch(fetchPosts()))
            .then(dispatch(cancelEdit()))
    }

}

// editing it passed along to handle direct to correspondeing fetch funtion update/new
export function handleSubmit(data, editing) {
    if (editing === false) {
        SendNewPost(data)
    } else{
        updatePost(data)
    }
}

export function deletePostAction( postId) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');
    const fetchParams = {
        method : 'DELETE',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
    }
    let url = `http://localhost:5001/posts/${postId}`;
    return dispatch => {
        return fetch(url, fetchParams)
            .then(() => {
                console.log("will deletPost", postId);
                dispatch(deletePost( postId))
            })
            // .then(dispatch(fetchPosts()))   // fetch returns saved object and re-writes store so need to fetch again
    }
}


function receiveComments(id, comments) {
    console.log('received comments', comments)
    return {
        type: ActionType.RECEIVE_COMMENTS,
        comments : comments.filter((comment) => comment.deleted === false),
        parentId : id,
        receivedAt: Date.now()
    }
}


export function fetchComments(id) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');


    const fetchParams = {
        method : 'GET',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default'
    }
    return dispatch => {
        return fetch(`http://localhost:5001/posts/${id}/comments`, fetchParams)
            .then(response => {
                return response.json()
            })
            .then(data => {
                dispatch(receiveComments( id, data ));
                dispatch(postCommentTotal( id, data.length))
            })
    }

}
// end fetchComments()


export function newComment() {
    return {
        type : ActionType.NEW_COMMENT
    }
}

function addComment(comment) {
    return {
        type : ActionType.ADD_COMMENT,
        comment : comment
    }
}

function updateComment( comment ) {
    return {
        type : ActionType.UPDATE_COMMENT,
        comment : comment
    }
}

function deleteComment(id, parentId) {
    return {
        type : ActionType.DELETE_COMMENT,
        id: id,
        parentId : parentId
    }
}

export function editComment(comment) {
    return {
        type : ActionType.EDIT_COMMENT,
        id : comment.id,
        comment : comment
    }
}

export function closeCommentForm(){
    return {
        type: ActionType.CLOSE_COMMENT_FORM
    }
}

export function closeCommentEditForm() {
    return {
        type : ActionType.CLOSE_COMMENT_EDIT
    }

}

function commentVote(votedComment) {
    return {
        type : ActionType.COMMENT_VOTE,
        votedComment : votedComment
    }
    
}

export function sendVoteComment(comment, vote) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    let {id} = comment;
    let dataBody;
    vote === 1 ? dataBody = {option : 'upVote'} : dataBody = {option: 'downVote'};

    const fetchParams = {
        method : 'POST',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
        body : JSON.stringify( dataBody )
    };
    let url = `http://localhost:5001/comments/${id}`;
    return dispatch => {
        return fetch(url, fetchParams)
            .then((data) => data.json())
            .then((data) => dispatch(commentVote(data)))
    }

}

export function sendDeleteComment(id, parentId) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    const fetchParams = {
        method : 'DELETE',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
    }
    return dispatch => {
        return fetch(`http://localhost:5001/comments/${id}`, fetchParams)
            .then( dispatch(deleteComment(id, parentId)))
    }
}

export function sendNewComment( data, parentId ) {
    console.log(data, parentId);
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

    const dataBody = {
        id : uuidv4(),
        timestamp : Date.now(),
        body : data.body,
        author : data.author,
        parentId : parentId
    }
    const fetchParams = {
        method : 'POST',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
        body : JSON.stringify( dataBody)
    }

    return dispatch => {
        return fetch(`http://localhost:5001/comments`, fetchParams)
            .then(response => {
                return response.json()
            })
            .then(data => {
                dispatch(addComment(data))
            })
            .then(dispatch(closeCommentForm()))
    }
}


export function sendEditComment( data ) {
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');
    let dataBody = { timestamp: Date.now(), body: data.body };
    const fetchParams = {
        method : 'PUT',
        headers : fetchHeaders,
        mode : 'cors',
        cache : 'default',
        body : JSON.stringify( dataBody)
    }
    let url = `http://localhost:5001/comments/${data.id}`;
    return dispatch => {
        return fetch(url, fetchParams)
            .then(() => {
                dispatch(updateComment( data ))
            })
            .then(dispatch(closeCommentEditForm()))
    }
}