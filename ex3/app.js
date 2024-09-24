document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postsContainer = document.getElementById('postsContainer');

    // Load posts from localStorage on page load
    loadPosts();

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const content = postContent.value.trim();
        const imageFile = postImage.files[0];
        const postId = Date.now(); // Unique ID for each post

        if (content || imageFile) {
            const post = {
                id: postId,
                content: content,
                image: imageFile ? URL.createObjectURL(imageFile) : null,
                likeCount: 0,
                dislikeCount: 0,
                comments: []
            };

            // Add post to localStorage
            addPostToStorage(post);

            // Render the new post
            renderPost(post);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
