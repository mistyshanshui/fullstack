Togglable's 'visible' state would be set to false every time an text edit happens. 
1. Togglable was in App.js, when refresh the Togglable useState is executed
2. Seperate Togglable to be its own componnet file, problem solved
3. what is code flow in JS


5.10 remove blog
problem 1.  slow to update
 - tried to update the blog array then call the async database operation:   
        front end fast, but when quickly repeating button clicks, the update is confusing
problem 2.  after delete blog, the remaining blog changes their show/hide state 
 - in order to keep the blog's display state, the state has to bind with a blog, is it possible without writing the state to the blog property