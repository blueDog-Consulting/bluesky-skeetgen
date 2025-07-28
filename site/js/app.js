// Main app initialization and theme management
class BlueskyPostGenerator {
    constructor() {
        this.isDarkMode = false;
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.initializeDefaultValues();
        this.updatePreview();
    }

    setupTheme() {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('bluesky-theme');
        this.isDarkMode = savedTheme === 'dark' ||
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.applyTheme();
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('bluesky-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('bluesky-theme', 'light');
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Real-time preview updates
        const inputs = [
            'display-name',
            'handle',
            'post-content',
            'reposts',
            'likes',
            'replies',
            'post-date',
            'post-time'
        ];

        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.updatePreview());
                element.addEventListener('change', () => this.updatePreview());
            }
        });

        // Post type radio buttons
        const postTypeRadios = document.querySelectorAll('input[name="post-type"]');
        postTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => this.updatePreview());
        });

        // Character counter for post content
        const postContent = document.getElementById('post-content');
        if (postContent) {
            postContent.addEventListener('input', (e) => {
                this.updateCharacterCount(e.target.value);
                this.updatePreview();
            });
        }

        // Add image button
        const addImageBtn = document.getElementById('add-image-btn');
        if (addImageBtn) {
            addImageBtn.addEventListener('click', () => {
                this.toggleImageUpload();
            });
        }
    }

    initializeDefaultValues() {
        // Set default date and time to current
        const now = new Date();
        const dateInput = document.getElementById('post-date');
        const timeInput = document.getElementById('post-time');

        if (dateInput) {
            dateInput.value = now.toISOString().split('T')[0];
        }

        if (timeInput) {
            timeInput.value = now.toTimeString().slice(0, 5);
        }

        // Set default values for better UX
        const displayName = document.getElementById('display-name');
        if (displayName && !displayName.value) {
            displayName.value = 'John Doe';
        }

        const handle = document.getElementById('handle');
        if (handle && !handle.value) {
            handle.value = '@johndoe.bsky.social';
        }

        const postContent = document.getElementById('post-content');
        if (postContent && !postContent.value) {
            postContent.value = 'Just testing out this awesome Bluesky post generator! 🚀';
        }

        // Set some default engagement metrics
        const likes = document.getElementById('likes');
        if (likes && !likes.value) {
            likes.value = '42';
        }

        const reposts = document.getElementById('reposts');
        if (reposts && !reposts.value) {
            reposts.value = '12';
        }

        const replies = document.getElementById('replies');
        if (replies && !replies.value) {
            replies.value = '8';
        }
    }

    updateCharacterCount(text) {
        const counter = document.querySelector('#post-content').nextElementSibling.querySelector('span');
        if (counter) {
            const count = text.length;
            const maxLength = 300;
            counter.textContent = `${count}/${maxLength} characters`;

            // Change color when approaching/exceeding limit
            if (count > maxLength) {
                counter.classList.add('text-red-500');
                counter.classList.remove('text-gray-500', 'dark:text-gray-400');
            } else if (count > maxLength * 0.9) {
                counter.classList.add('text-yellow-500');
                counter.classList.remove('text-gray-500', 'dark:text-gray-400', 'text-red-500');
            } else {
                counter.classList.add('text-gray-500', 'dark:text-gray-400');
                counter.classList.remove('text-yellow-500', 'text-red-500');
            }
        }
    }

    toggleImageUpload() {
        const imageSection = document.getElementById('image-upload-section');
        const addImageBtn = document.getElementById('add-image-btn');

        if (imageSection.classList.contains('hidden')) {
            imageSection.classList.remove('hidden');
            addImageBtn.textContent = 'Remove Image';
            addImageBtn.classList.add('text-red-500', 'hover:text-red-600');
            addImageBtn.classList.remove('text-blue-500', 'hover:text-blue-600');
        } else {
            imageSection.classList.add('hidden');
            addImageBtn.textContent = 'Add Image';
            addImageBtn.classList.add('text-blue-500', 'hover:text-blue-600');
            addImageBtn.classList.remove('text-red-500', 'hover:text-red-600');

            // Clear the post image
            const postImagePreview = document.getElementById('post-image-preview');
            const postImageUpload = document.getElementById('post-image-upload');
            if (postImagePreview) {
                postImagePreview.classList.add('hidden');
                postImagePreview.src = '';
            }
            if (postImageUpload) {
                postImageUpload.value = '';
            }
        }

        this.updatePreview();
    }

    updatePreview() {
        // This will be called by the post generator module
        if (window.postGenerator) {
            window.postGenerator.generatePreview();
        }
    }

    // Utility method to get current form data
    getFormData() {
        return {
            postType: document.querySelector('input[name="post-type"]:checked')?.value || 'post',
            displayName: document.getElementById('display-name')?.value || '',
            handle: document.getElementById('handle')?.value || '',
            avatar: document.getElementById('avatar-preview')?.src || '',
            content: document.getElementById('post-content')?.value || '',
            postImage: document.getElementById('post-image-preview')?.src || '',
            reposts: parseInt(document.getElementById('reposts')?.value || '0'),
            likes: parseInt(document.getElementById('likes')?.value || '0'),
            replies: parseInt(document.getElementById('replies')?.value || '0'),
            date: document.getElementById('post-date')?.value || '',
            time: document.getElementById('post-time')?.value || ''
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BlueskyPostGenerator();
});