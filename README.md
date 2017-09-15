This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**Installation**
- requires backend reddit clone/Udacity project server at port :5001
- npm install
- npm start


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
