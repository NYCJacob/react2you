const uuidv4 = require('uuid/v4');

export const ALL_POSTS = 'ALL_POSTS'
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FETCH_POSTS = 'FETCH_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SORT = 'SORT'
export const CLOSE_POST = 'CLOSE_POST'
export const EDIT_POST = 'EDIT_POST'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const UPDATED_POST = 'UPDATED_POST'
export const NEW_POST = 'NEW_POST'
export const DELETE_POST = 'DELETE_POST'
export const POST_VOTE = 'POST_VOTE'
export const SORTER = 'SORTER'
export const SET_SORTKEY = 'SET_SORTKEY'
export const MASTER_FETCH = 'MASTER_FETCH'
export const CREATE_POST = 'CREATE_POST'
export const CLEAR_TARGET = 'CLEAR_TARGET'
export const SET_TARGET = 'SET_TARGET'

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
        type : POST_VOTE,
        vote : vote,
        postId : postId
    }
}


export function setSortKey(sortKey) {
    return {
        type: SET_SORTKEY,
        key : sortKey
    }
}

export function cancelEdit() {
    return {
        type: CANCEL_EDIT
    }
}

export function editPost(post) {
    console.log(post)
    return {
        type: EDIT_POST,
        postData: post
    }
}

export function newPost() {
    return {
        type: NEW_POST
    }
}

export function createPost(){
    return {
        type: CREATE_POST
    }
}

export function closePost() {
    return {
        type: CLOSE_POST
    }
}

// dispatched by openPost
// export function getPostDetails(post) {
//     return {
//         type: GET_POST_DETAILS,
//         target : post
//     }
// }

export function setTargetAction( post ) {
    return{
        type: SET_TARGET,
        target : post
    }
}

export function receivePosts(posts) {
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
                dispatch(receivePosts( data ))
            })
    }

}
// end fetchPosts()


// updatedPost is dispatached by updatePost
function  updatedPost( updated ) {
    return {
        type : UPDATED_POST,
        updatedPost : updated,
        updatedAt : Date.now()
    }

}

function clearTarget(){
    return {
        type: CLEAR_TARGET
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

export function sendVote(postId, vote) {
    console.log( 'sendVote action');
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
                console.log('post vote success');
                dispatch(postVoting(postId, vote))
            })
            .then(dispatch(fetchPosts()))
    }

}

export function updatePost(data) {
    console.log( data );
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
            .then(dispatch(fetchPosts()))   // fetch returns saved object and re-writes store so need to fetch again
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



