A basic posts and comment app project for Udacity's React Nanodegree (first cohort);  
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  
Uses basic Bootstrap v4 alpha css, Thunk middleware, React-Router, and Redux-Form among other packages (see package.json).



**Installation**
- requires backend reddit clone/Udacity project server at port :5001
- npm install
- npm start


**Features**
- only very basic styling; this project was my first react/redux app and had certain restrictions such as not using local component state-
all state had to be in redux store.  It took a lot of time.  Thus, it is not as polished as I would like, but it works.

- Views/Components
    - Posts: 
        - list all posts on initial load can limit to a specifiy category list by clicking header nav buttons
        - list of posts sortable(ascending/descending) by category, timestamp or vote score
        - each post listing can be edited or deleted directly on the posts listing
        - new post button takes you to newpost route implemented in a redux-form component
        
    - Single Post (Post Details):
        - Displays all post details, edit button, delete button, vote increment, and total comments.  
        - Below comment details the Comments component displays each comment for the post in a SingleComment component.
        
    - Single Comment (called with Comments parent component):
        -Displays the comment details along with edit, delete and vote increment buttons.
        
    - forms: there are only two form components EditPost and CommentForm.  Each handle edit or new events using corresponding
    initialize values.  Also, basic client side validation is implemented via Redux-Form.  The timestamp and voteScore are 
    intentionally not displayed on the new forms, but are created upon submit success.


**Issues**
- could not dispatch in componentDidMount when using mapdispatchtoprops which is why dispatch is called directly places
- method to nest routing to show new/edit comments component was never discovered
- I occasionally got the following error, which I have not been able to track down, but it seems that sometimes
the post id is not being passed to the fetchComments action resulting in a bad api request.
-- wrapping the component with reat-router withRouter component avoided the error but comments not received correctly.
    
        Unhandled Rejection (SyntaxError): Unexpected token < in JSON at position 0
        (anonymous function)
        src/actions/index.js:370
        
    - tried wrapping withRouter getting id in match.params.url but also does not work
    
    
    
- live updating the score proved challenging.  It was eventually solved my mapToState using deepClone:

            commentStore : _.cloneDeep((state.comments[props.comment.parentId + '-comments'] || []).find( (obj) => obj.id === props.comment.id))


-- somehow this also solved the live update of the regular prop value (now commented out) 

                                   {/*<span>Score: {voteScore}</span>*/}
