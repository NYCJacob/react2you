export const ALL_POSTS = 'ALL_POSTS'
export const ALL_CATEGORIES = 'ALL_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const FETCH_POSTS = 'FETCH_POSTS'

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

export function fetchPosts () {
    return {
        type: FETCH_POSTS
    }
}