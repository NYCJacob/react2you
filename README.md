This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**Issues**
- handleSubmit method passed to onSubmit of editPostForm does not correctly send data to server via fetch. The same component is used for the new post form and edit post form.  The fetch functions are in the actions which then dispatch another action on success
- 