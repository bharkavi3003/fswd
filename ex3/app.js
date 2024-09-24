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

            // Initialize counts
            let likeCount = 0;
            let dislikeCount = 0;
            let commentCount = 0;

            // Add image if available
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    postDiv.appendChild(img);
                    addLikeDislikeSection(postDiv, likeCount, dislikeCount);
                    addCommentSection(postDiv, commentCount);
                };
                reader.readAsDataURL(imageFile);
            } else {
                addLikeDislikeSection(postDiv, likeCount, dislikeCount);
                addCommentSection(postDiv, commentCount);
            }

            postsContainer.appendChild(postDiv);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });

    function addLikeDislikeSection(postDiv, likeCount, dislikeCount) {
        const likeSection = document.createElement('div');
        likeSection.classList.add('like-section');

        // Add like button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;'; // Heart symbol

        // Add like count display
        const likeCountDisplay = document.createElement('span');
        likeCountDisplay.textContent = ` Likes: ${likeCount}`;
        likeSection.appendChild(likeCountDisplay);

        likeButton.addEventListener('click', () => {
            likeCount++;
            likeCountDisplay.textContent = ` Likes: ${likeCount}`;
            likeButton.classList.add('liked');
        });
        likeSection.appendChild(likeButton);

        // Add dislike button
        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('dislike-button');
        dislikeButton.innerHTML = '&#10060;'; // Cross mark symbol

        // Add dislike count display
        const dislikeCountDisplay = document.createElement('span');
        dislikeCountDisplay.textContent = ` Dislikes: ${dislikeCount}`;
        likeSection.appendChild(dislikeCountDisplay);

        dislikeButton.addEventListener('click', () => {
            dislikeCount++;
            dislikeCountDisplay.textContent = ` Dislikes: ${dislikeCount}`;
            dislikeButton.classList.add('disliked');
        });
        likeSection.appendChild(dislikeButton);

        postDiv.appendChild(likeSection);
    }

    function addCommentSection(postDiv, commentCount) {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');

        // Comment count display
        const commentCountDisplay = document.createElement('span');
        commentCountDisplay.textContent = ` Comments: ${commentCount}`;
        commentSection.appendChild(commentCountDisplay);

        // Comment input
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        commentSection.appendChild(commentInput);

        // Emotions dropdown
        const emotionsSelect = document.createElement('select');
        const emotions = ['😊', '😢', '😡', '❤️', '😂'];
        emotions.forEach(emotion => {
            const option = document.createElement('option');
            option.value = emotion;
            option.textContent = emotion;
            emotionsSelect.appendChild(option);
        });
        commentSection.appendChild(emotionsSelect);

        // Comment button
        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentSection.appendChild(commentButton);

        commentButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            const selectedEmotion = emotionsSelect.value;

            if (commentText) {
                commentCount++;
                commentCountDisplay.textContent = ` Comments: ${commentCount}`;

                // Clear the input
                commentInput.value = '';

                // Display the comment
                const commentDisplay = document.createElement('div');
                commentDisplay.classList.add('comment-display');
                commentDisplay.textContent = `${selectedEmotion} ${commentText}`;
                commentSection.appendChild(commentDisplay);

                // Add like and dislike buttons for the comment
                addLikeDislikeToComment(commentDisplay);
            }
        });

        postDiv.appendChild(commentSection);
    }

    function addLikeDislikeToComment(commentDisplay) {
        const likeSection = document.createElement('div');
        likeSection.classList.add('like-section');

        // Like button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;'; // Heart symbol
        let likeCount = 0;

        const likeCountDisplay = document.createElement('span');
        likeCountDisplay.textContent = ` Likes: ${likeCount}`;
        likeSection.appendChild(likeCountDisplay);

        likeButton.addEventListener('click', () => {
            likeCount++;
            likeCountDisplay.textContent = ` Likes: ${likeCount}`;
            likeButton.classList.add('liked');
        });
        likeSection.appendChild(likeButton);

        // Dislike button
        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('dislike-button');
        dislikeButton.innerHTML = '&#10060;'; // Cross mark symbol
        let dislikeCount = 0;

        const dislikeCountDisplay = document.createElement('span');
        dislikeCountDisplay.textContent = ` Dislikes: ${dislikeCount}`;
        likeSection.appendChild(dislikeCountDisplay);

        dislikeButton.addEventListener('click', () => {
            dislikeCount++;
            dislikeCountDisplay.textContent = ` Dislikes: ${dislikeCount}`;
            dislikeButton.classList.add('disliked');
        });
        likeSection.appendChild(dislikeButton);

        commentDisplay.appendChild(likeSection);
    }
});
