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

            // Initialize like count
            let likeCount = 0;

            // Add image if available
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    postDiv.appendChild(img);
                    addLikeSection(postDiv, likeCount);
                };
                reader.readAsDataURL(imageFile);
            } else {
                addLikeSection(postDiv, likeCount);
            }

            postsContainer.appendChild(postDiv);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });

    function addLikeSection(postDiv, likeCount) {
        const likeSection = document.createElement('div');
        likeSection.classList.add('like-section');

        // Add heart button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;'; // Unicode heart symbol

        // Add like count display
        const likeCountDisplay = document.createElement('span');
        likeCountDisplay.textContent = ` ${likeCount}`;
        likeSection.appendChild(likeCountDisplay);

        likeButton.addEventListener('click', () => {
            likeCount++; // Increment like count
            likeCountDisplay.textContent = ` ${likeCount}`; // Update displayed like count
            likeButton.classList.add('liked'); // Change button color
        });
        likeSection.appendChild(likeButton);

        // Add text like option
        const likeText = document.createElement('span');
        likeText.classList.add('like-text');
        likeText.textContent = ' Like';
        likeText.addEventListener('click', () => {
            likeCount++; // Increment like count
            likeCountDisplay.textContent = ` ${likeCount}`; // Update displayed like count
            likeButton.classList.add('liked'); // Change button color
        });
        likeSection.appendChild(likeText);

        postDiv.appendChild(likeSection);
    }
});
