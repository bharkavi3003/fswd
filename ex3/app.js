document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postsContainer = document.getElementById('postsContainer');

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const content = postContent.value.trim();
        const imageFile = postImage.files[0];

        if (content || imageFile) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            // Add timestamp
            const timestamp = document.createElement('div');
            timestamp.classList.add('timestamp');
            timestamp.textContent = new Date().toLocaleString();
            postDiv.appendChild(timestamp);

            // Add post content
            const textPara = document.createElement('p');
            textPara.textContent = content;
            postDiv.appendChild(textPara);

            // Add image if available
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    postDiv.appendChild(img);
                };
                reader.readAsDataURL(imageFile);
            }

            // Add like button with heart symbol
            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.innerHTML = '&#9829;'; // Unicode heart symbol
            likeButton.addEventListener('click', () => {
                likeButton.classList.toggle('liked');
                likeButton.innerHTML = likeButton.classList.contains('liked') ? '&#9829;' : '&#9829;'; // Keep heart symbol
            });
            postDiv.appendChild(likeButton);

            postsContainer.appendChild(postDiv);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });
});
