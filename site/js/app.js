// Main app initialization and theme management
class BlueskyPostGenerator {
    constructor() {
        this.isDarkMode = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeDefaultValues();
        this.updatePreview();
    }

    setupEventListeners() {
        // Workflow choice buttons
        const generateNewBtn = document.getElementById('generate-new-btn');
        const createFromExistingBtn = document.getElementById('create-from-existing-btn');
        const backToChoiceBtn = document.getElementById('back-to-choice');
        const backToChoiceBtn2 = document.getElementById('back-to-choice-2');

        if (generateNewBtn) {
            generateNewBtn.addEventListener('click', () => {
                this.showGenerateNewSection();
            });
        }

        if (createFromExistingBtn) {
            createFromExistingBtn.addEventListener('click', () => {
                this.showCreateFromExistingSection();
            });
        }

        if (backToChoiceBtn) {
            backToChoiceBtn.addEventListener('click', () => {
                this.showInitialChoice();
            });
        }

        if (backToChoiceBtn2) {
            backToChoiceBtn2.addEventListener('click', () => {
                this.showInitialChoice();
            });
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

        // Randomize metrics button
        const randomizeMetricsBtn = document.getElementById('randomize-metrics');
        if (randomizeMetricsBtn) {
            randomizeMetricsBtn.addEventListener('click', () => {
                this.randomizeMetrics();
            });
        }

                // Export buttons
        const exportBtn = document.getElementById('export-btn');
        const exportExistingBtn = document.getElementById('export-existing-btn');

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                if (window.exportHandler) {
                    window.exportHandler.exportAsPNG();
                }
            });
        }

        if (exportExistingBtn) {
            exportExistingBtn.addEventListener('click', () => {
                if (window.exportHandler) {
                    window.exportHandler.exportAsPNG();
                }
            });
        }

        // Export theme radio buttons
        const exportThemeRadios = document.querySelectorAll('input[name="export-theme"], input[name="export-theme-existing"]');
        exportThemeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updatePreviewWithTheme();
            });
        });
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

    // Randomize engagement metrics for realistic posts
    randomizeMetrics() {
        const repostsInput = document.getElementById('reposts');
        const likesInput = document.getElementById('likes');
        const repliesInput = document.getElementById('replies');

        if (repostsInput && likesInput && repliesInput) {
            // Generate realistic engagement metrics
            const reposts = Math.floor(Math.random() * 50) + Math.floor(Math.random() * 20);
            const likes = Math.floor(Math.random() * 200) + Math.floor(Math.random() * 100) + 10;
            const replies = Math.floor(Math.random() * 15) + Math.floor(Math.random() * 10);

            repostsInput.value = reposts;
            likesInput.value = likes;
            repliesInput.value = replies;

            // Update preview
            this.updatePreview();

            // Show feedback
            this.showNotification('Metrics randomized! 🎲', 'success');
        }
    }

        showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' :
                        type === 'error' ? 'bg-red-500' : 'bg-blue-500';

        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Workflow navigation methods
    showGenerateNewSection() {
        // Check if we're currently in the existing post workflow
        const createFromExistingSection = document.getElementById('create-from-existing-section');
        const isInExistingWorkflow = createFromExistingSection && !createFromExistingSection.classList.contains('hidden');

        if (isInExistingWorkflow) {
            // Show confirmation dialog
            if (confirm('Switching to "Generate New Post Image" will reset your current selections. Do you want to continue?')) {
                this.resetToGenerateNew();
            }
        } else {
            this.resetToGenerateNew();
        }
    }

    showCreateFromExistingSection() {
        // Check if we're currently in the generate new workflow
        const generateNewSection = document.getElementById('generate-new-section');
        const isInGenerateNewWorkflow = generateNewSection && !generateNewSection.classList.contains('hidden');

        if (isInGenerateNewWorkflow) {
            // Show confirmation dialog
            if (confirm('Switching to "Create from Existing Post" will reset your current selections. Do you want to continue?')) {
                this.resetToCreateFromExisting();
            }
        } else {
            this.resetToCreateFromExisting();
        }
    }

    resetToGenerateNew() {
        const initialChoice = document.getElementById('initial-choice');
        const generateNewSection = document.getElementById('generate-new-section');
        const createFromExistingSection = document.getElementById('create-from-existing-section');

        if (initialChoice && generateNewSection && createFromExistingSection) {
            // Hide all sections
            initialChoice.classList.add('hidden');
            createFromExistingSection.classList.add('hidden');

            // Show generate new section
            generateNewSection.classList.remove('hidden');

            // Reset form fields
            this.resetGenerateNewForm();

            // Update preview with fresh data
            this.updatePreview();
        }
    }

    resetToCreateFromExisting() {
        const initialChoice = document.getElementById('initial-choice');
        const generateNewSection = document.getElementById('generate-new-section');
        const createFromExistingSection = document.getElementById('create-from-existing-section');

        if (initialChoice && generateNewSection && createFromExistingSection) {
            // Hide all sections
            initialChoice.classList.add('hidden');
            generateNewSection.classList.add('hidden');

            // Show create from existing section
            createFromExistingSection.classList.remove('hidden');

            // Reset form fields
            this.resetCreateFromExistingForm();

            // Clear any existing post data
            if (window.postFetcher) {
                window.postFetcher.currentPostData = null;
            }

            // Clear preview
            const previewContainer = document.getElementById('post-preview');
            if (previewContainer) {
                previewContainer.innerHTML = '';
            }
        }
    }

    resetGenerateNewForm() {
        // Reset all form fields to default values
        const fields = {
            'display-name': 'John Doe',
            'handle': '@johndoe.bsky.social',
            'post-content': '',
            'reposts': '12',
            'likes': '42',
            'replies': '8',
            'post-date': this.getCurrentDate(),
            'post-time': this.getCurrentTime()
        };

        Object.keys(fields).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.value = fields[id];
            }
        });

        // Reset post type to regular post
        const regularPostRadio = document.querySelector('input[name="post-type"][value="post"]');
        if (regularPostRadio) {
            regularPostRadio.checked = true;
        }

        // Reset theme to light
        const lightThemeRadio = document.querySelector('input[name="export-theme"][value="light"]');
        if (lightThemeRadio) {
            lightThemeRadio.checked = true;
        }

        // Clear any uploaded images
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
            imagePreview.innerHTML = '';
        }
    }

    resetCreateFromExistingForm() {
        // Reset handle input
        const handleInput = document.getElementById('existing-handle');
        if (handleInput) {
            handleInput.value = '';
        }

        // Reset post URL input
        const postUrlInput = document.getElementById('post-url');
        if (postUrlInput) {
            postUrlInput.value = '';
        }

        // Reset theme to light
        const lightThemeRadio = document.querySelector('input[name="export-theme-existing"][value="light"]');
        if (lightThemeRadio) {
            lightThemeRadio.checked = true;
        }

        // Clear post list
        const postList = document.getElementById('post-list');
        if (postList) {
            postList.innerHTML = '';
        }
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().split(' ')[0].substring(0, 5);
    }

        showInitialChoice() {
        const initialChoice = document.getElementById('initial-choice');
        const generateNewSection = document.getElementById('generate-new-section');
        const createFromExistingSection = document.getElementById('create-from-existing-section');

        if (initialChoice && generateNewSection && createFromExistingSection) {
            initialChoice.classList.remove('hidden');
            generateNewSection.classList.add('hidden');
            createFromExistingSection.classList.add('hidden');
        }
    }

        updatePreviewWithTheme() {
        // Check which workflow we're in
        const createFromExistingSection = document.getElementById('create-from-existing-section');
        const isExistingPostWorkflow = createFromExistingSection && !createFromExistingSection.classList.contains('hidden');

        let exportTheme = 'light';

        if (isExistingPostWorkflow) {
            // For existing post workflow, use the existing-post radio buttons
            const existingThemeRadio = document.querySelector('input[name="export-theme-existing"]:checked');
            exportTheme = existingThemeRadio?.value || 'light';
        } else {
            // For custom post workflow, use the generate-new radio buttons
            const generateThemeRadio = document.querySelector('input[name="export-theme"]:checked');
            exportTheme = generateThemeRadio?.value || 'light';
        }

        // Apply the selected theme to the preview container
        const previewContainer = document.getElementById('post-preview');
        if (previewContainer) {
            // Remove existing theme classes
            previewContainer.classList.remove('dark', 'light');

            // Add the selected theme class
            previewContainer.classList.add(exportTheme);

            // Check if we're in the "Create from existing post" workflow
            const createFromExistingSection = document.getElementById('create-from-existing-section');
            const isExistingPostWorkflow = createFromExistingSection && !createFromExistingSection.classList.contains('hidden');

            if (isExistingPostWorkflow) {
                // For existing post workflow, we need to re-render the content with the new theme
                // but we need to get the current post data from the post fetcher
                if (window.postFetcher && window.postFetcher.currentPostData) {
                    // Re-render with the stored post data
                    const previewHTML = window.postGenerator.generatePreview(window.postFetcher.currentPostData);
                    previewContainer.innerHTML = previewHTML;
                }
            } else {
                // For custom post workflow, update the preview content
                this.updatePreview();
            }

            // Ensure the theme is applied after content update
            setTimeout(() => {
                previewContainer.classList.remove('dark', 'light');
                previewContainer.classList.add(exportTheme);
            }, 10);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BlueskyPostGenerator();
});