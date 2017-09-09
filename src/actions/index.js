const uuidv4 = require('uuid/v4');

export const ALL_POSTS = 'ALL_POSTS'
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FETCH_POSTS = 'FETCH_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SORT_VOTES = 'SORT_VOTES'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const CLOSE_POST = 'CLOSE_POST'
export const EDIT_POST = 'EDIT_POST'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const UPDATED_POST = 'UPDATED_POST'
export const NEW_POST = 'NEW_POST'
export const DELETE_POST = 'DELETE_POST'

export function allPosts () {
    return {
        type: ALL_POSTS
    }
}


export  function addCategory( newCategory) {
    return {
        type: ADD_CATEGORY,
        newCategory : newCategory,
    }
}


function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
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
                console.log( response );
                return response.json()
            })
            .then(data => {
                console.log(data)
                dispatch(receiveCategories( data ))
            })
    }

}
// end fetchCategories()


export function sortVote( items, voteSort ) {
    return {
        type: SORT_VOTES,
        posts: items,
        sort : voteSort
    }
}

export function cancelEdit() {
    return {
        type: CANCEL_EDIT
    }
}

export function editPost() {
    return {
        type: EDIT_POST
    }
}

export function newPost() {
    return {
        type: NEW_POST
    }
}

export function closePost() {
    return {
        type: CLOSE_POST
    }
}

// dispatched by openPost
export function getPostDetails(postId) {
    return {
        type: GET_POST_DETAILS,
        openTarget : postId
    }
}

function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts: posts,
        receivedAt: Date.now()
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
                console.log( data );
                dispatch(receivePosts( data.filter(post => post.deleted === false ) ))
            })
    }

}
// end fetchPosts()

// updatedPost is dispatached by updatePost
function  updatedPost( updated ) {
    console.log( updated)
    return {
        type : UPDATED_POST,
        updatedPost : updated,
        updatedAt : Date.now()
    }

}

//
function  deletePost( postId ) {
    return {
        type : DELETE_POST,
        deletePostId : postId,
        updatedAt : Date.now()
    }

}

export function updatePost(data) {
    console.log(data);
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
            .then(dispatch(fetchPosts()))   // fetch returns saved object and re-writes store so need to fetch again
    }
}

export function SendNewPost(data) {
    console.log( data );
    const fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    fetchHeaders.append('Authorization', 'whatever-you-want');

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
            .then(() => {
                console.log('post new post success');
            })
            .then(dispatch(fetchPosts()))
    }

}



function receiveComments(id, comments) {
    console.log('received comments', comments)
    return {
        type: RECEIVE_COMMENTS,
        comments : comments,
        parentId : id,
        receivedAt: Date.now()
    }
}


/*
*  GET /posts/:id/comments
 */
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
                console.log( response );
                return response.json()
            })
            .then(data => {
                dispatch(receiveComments( id, data ))
            })
    }

}
// end fetchComments()



