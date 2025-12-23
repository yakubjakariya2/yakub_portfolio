// Stories functionality
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('data/stories.json');
        const data = await response.json();
        initStories(data.stories);
    } catch (error) {
        console.error('Error loading stories data:', error);
    }
});

function initStories(stories) {
    const storiesSlider = document.getElementById('storiesSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const storyViewer = document.getElementById('storyViewer');
    const closeViewer = document.getElementById('closeViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerAvatar = document.getElementById('viewerAvatar');
    const viewerName = document.getElementById('viewerName');
    const viewerLoveBtn = document.getElementById('viewerLoveBtn');
    const viewerLikeBtn = document.getElementById('viewerLikeBtn');
    const viewerWowBtn = document.getElementById('viewerWowBtn');
    const viewerLoveReaction = document.getElementById('viewerLoveReaction');
    const progressBar = document.getElementById('progressBar');
    
    let currentStoryIndex = 0;
    let progressInterval;
    
    // Add Story Card
    storiesSlider.innerHTML = `
        <div class="story-card add-story">
            <div class="story-overlay"></div>
            <div class="add-icon">
                <i class="fas fa-plus"></i>
            </div>
            <div class="add-text">Create Story</div>
        </div>
        ${stories.map((story, index) => `
            <div class="story-card" data-id="${story.id}">
                <img src="${story.image}" alt="Story" class="story-image">
                <div class="story-overlay"></div>
                <img src="${story.avatar}" alt="User" class="user-avatar">
                <div class="user-name">${story.name}</div>
                <div class="love-reaction">❤️</div>
            </div>
        `).join('')}
    `;
    
    // Initialize progress bars
    function initProgressBars() {
        progressBar.innerHTML = '';
        stories.forEach((story, index) => {
            const segment = document.createElement('div');
            segment.className = 'progress-segment';
            segment.innerHTML = `<div class="progress-fill" id="progressFill-${index}"></div>`;
            progressBar.appendChild(segment);
        });
    }
    
    // Start story progress
    function startStoryProgress() {
        clearInterval(progressInterval);
        
        const progressFill = document.getElementById(`progressFill-${currentStoryIndex}`);
        progressFill.style.width = '0%';
        
        let width = 0;
        progressInterval = setInterval(() => {
            if (width >= 100) {
                nextStory();
                return;
            }
            width += 0.5;
            progressFill.style.width = `${width}%`;
        }, 50);
    }
    
    // Show story in viewer
    function showStory(index) {
        if (index < 0 || index >= stories.length) return;
        
        currentStoryIndex = index;
        const story = stories[index];
        
        viewerImage.src = story.image;
        viewerAvatar.src = story.avatar;
        viewerName.textContent = story.name;
        
        storyViewer.classList.add('active');
        initProgressBars();
        startStoryProgress();
    }
    
    // Next story
    function nextStory() {
        if (currentStoryIndex < stories.length - 1) {
            showStory(currentStoryIndex + 1);
        } else {
            closeStoryViewer();
        }
    }
    
    // Previous story
    function prevStory() {
        if (currentStoryIndex > 0) {
            showStory(currentStoryIndex - 1);
        }
    }
    
    // Close story viewer
    function closeStoryViewer() {
        storyViewer.classList.remove('active');
        clearInterval(progressInterval);
    }
    
    // Event listeners for story cards
    document.querySelectorAll('.story-card:not(.add-story)').forEach((card, index) => {
        card.addEventListener('click', () => {
            showStory(index);
        });
        
        // Double click for love reaction on card
        card.addEventListener('dblclick', function() {
            const loveReaction = this.querySelector('.love-reaction');
            loveReaction.classList.add('active');
            setTimeout(() => {
                loveReaction.classList.remove('active');
            }, 1000);
        });
    });
    
    // Event listeners for slider controls
    prevBtn.addEventListener('click', () => {
        storiesSlider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        storiesSlider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Event listeners for reaction buttons in viewer
    viewerLoveBtn.addEventListener('click', () => {
        viewerLoveReaction.classList.add('active');
        setTimeout(() => {
            viewerLoveReaction.classList.remove('active');
        }, 1000);
    });
    
    viewerLikeBtn.addEventListener('click', () => {
        viewerLoveReaction.textContent = '👍';
        viewerLoveReaction.classList.add('active');
        setTimeout(() => {
            viewerLoveReaction.classList.remove('active');
            viewerLoveReaction.textContent = '❤️';
        }, 1000);
    });
    
    viewerWowBtn.addEventListener('click', () => {
        viewerLoveReaction.textContent = '😮';
        viewerLoveReaction.classList.add('active');
        setTimeout(() => {
            viewerLoveReaction.classList.remove('active');
            viewerLoveReaction.textContent = '❤️';
        }, 1000);
    });
    
    // Event listener for closing viewer
    closeViewer.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        closeStoryViewer();
    });
    
    // Also close when clicking outside the viewer content
    storyViewer.addEventListener('click', function(e) {
        if (e.target === storyViewer) {
            closeStoryViewer();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (storyViewer.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextStory();
            } else if (e.key === 'ArrowLeft') {
                prevStory();
            } else if (e.key === 'Escape') {
                closeStoryViewer();
            }
        }
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    storyViewer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    storyViewer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            nextStory();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevStory();
        }
    }
}