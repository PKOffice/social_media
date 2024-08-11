// Handle user login
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple check for demo purposes
    if (username && password) {
        // Store user info in localStorage
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        
        // Hide login form and show dashboard
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('post-form').style.display = 'block';
        document.getElementById('feed').style.display = 'block';
    } else {
        alert('Please enter both username and password.');
    }
});

// Array to hold posts
const posts = [];

// Handle new post submission
document.getElementById('new-post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').files[0];
    const username = localStorage.getItem('loggedInUser');
    const timestamp = new Date().toLocaleString();

    // Create new post object
    const newPost = {
        username,
        content,
        image: image ? URL.createObjectURL(image) : null,
        timestamp,
        likes: 0,
        comments: []
    };

    // Add new post to the posts array
    posts.push(newPost);
    displayPosts();

    // Reset the post form
    document.getElementById('new-post-form').reset();
});

// Function to display all posts
function displayPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Clear the feed

    // Loop through each post in the posts array
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Create the post content
        postElement.innerHTML = `
            <p><strong>${post.username}</strong> - ${post.timestamp}</p>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image">` : ''}
            <button class="like-button">Like (${post.likes})</button>
            <button class="comment-button">Comment</button>
            <div class="comments">
                <input type="text" class="comment-input" placeholder="Add a comment...">
                <div class="comment-list">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
            </div>
        `;

        // Handle like button click
        postElement.querySelector('.like-button').addEventListener('click', function() {
            post.likes++;
            displayPosts();
        });

        // Handle comment submission
        postElement.querySelector('.comment-button').addEventListener('click', function() {
            const commentInput = postElement.querySelector('.comment-input');
            if (commentInput.value) {
                post.comments.push(commentInput.value);
                displayPosts();
            }
        });

        // Add the post element to the feed
        feed.appendChild(postElement);
    });
}

// Call displayPosts to render any posts already in the array
displayPosts();
