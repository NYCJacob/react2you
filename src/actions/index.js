export const ALL_POSTS = 'ALL_POSTS'
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FETCH_POSTS = 'FETCH_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


export function allPosts () {
    return {
        type: ALL_POSTS
    }
}

export function allCategories () {
    return {
        type: ALL_CATEGORIES
    }
}

export  function addCategory( newCategory) {
    return {
        type: ADD_CATEGORY,
        newCategory : newCategory,
    }
}



function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts: posts,
        receivedAt: Date.now()
    }
}


export function fetchPosts() {
    return dispatch => {
        return fetch(fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'whatever-you-want' }}))
            .then(response => {
                console.log(response);
                dispatch(receivePosts(response))
            } )
    }
}
// end fetchPosts()

/*
// this is from redux reddit example
function __fetchPosts(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
    }
}

function __receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}*/
