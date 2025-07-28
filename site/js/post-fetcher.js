// Post fetcher module for Bluesky API integration
class PostFetcher {
    constructor() {
        this.currentPosts = [];
        this.currentPage = 0;
        this.postsPerPage = 5;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const fetchPostsBtn = document.getElementById('fetch-posts-btn');
        const postUrlInput = document.getElementById('post-url');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');

        if (fetchPostsBtn) {
            fetchPostsBtn.addEventListener('click', () => {
                this.fetchPosts();
            });
        }

        if (postUrlInput) {
            postUrlInput.addEventListener('input', () => {
                this.handleDirectUrl();
            });
        }

        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                this.previousPage();
            });
        }

        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                this.nextPage();
            });
        }
    }

    async fetchPosts() {
        const handleInput = document.getElementById('social-handle');
        const handle = handleInput?.value?.trim();

        if (!handle) {
            this.showError('Please enter a Bluesky handle');
            return;
        }

        // Clean the handle (remove @ if present)
        const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;

        try {
            this.showLoading('Fetching posts...');

            // For now, we'll simulate fetching posts
            // In a real implementation, you'd call the Bluesky API
            const posts = await this.simulateFetchPosts(cleanHandle);

            this.currentPosts = posts;
            this.currentPage = 0;
            this.displayPosts();

            this.showSuccess(`Found ${posts.length} posts from @${cleanHandle}`);

        } catch (error) {
            console.error('Error fetching posts:', error);
            this.showError('Failed to fetch posts. Please try again.');
        }
    }

    async simulateFetchPosts(handle) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate sample posts for demonstration
        const samplePosts = [
            {
                id: '1',
                text: `Just testing out this awesome Bluesky Image Post Generator! 🚀 #bluesky #generator`,
                author: handle,
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                likes: Math.floor(Math.random() * 50) + 10,
                reposts: Math.floor(Math.random() * 20) + 2,
                replies: Math.floor(Math.random() * 10) + 1
            },
            {
                id: '2',
                text: `This tool is amazing for creating realistic post mockups. Perfect for marketing! 📱`,
                author: handle,
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                likes: Math.floor(Math.random() * 100) + 20,
                reposts: Math.floor(Math.random() * 30) + 5,
                replies: Math.floor(Math.random() * 15) + 2
            },
            {
                id: '3',
                text: `Can't believe how easy it is to generate Bluesky post images. Game changer! ✨`,
                author: handle,
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                likes: Math.floor(Math.random() * 75) + 15,
                reposts: Math.floor(Math.random() * 25) + 3,
                replies: Math.floor(Math.random() * 12) + 1
            },
            {
                id: '4',
                text: `Testing the new image generation feature. The results look so realistic! 🎨`,
                author: handle,
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                likes: Math.floor(Math.random() * 60) + 12,
                reposts: Math.floor(Math.random() * 18) + 2,
                replies: Math.floor(Math.random() * 8) + 1
            },
            {
                id: '5',
                text: `This is exactly what I needed for my social media marketing. Thank you! 🙏`,
                author: handle,
                timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
                likes: Math.floor(Math.random() * 80) + 18,
                reposts: Math.floor(Math.random() * 22) + 4,
                replies: Math.floor(Math.random() * 11) + 2
            }
        ];

        return samplePosts;
    }

    displayPosts() {
        const postSelection = document.getElementById('post-selection');
        const postsList = document.getElementById('posts-list');
        const pageInfo = document.getElementById('page-info');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');

        if (!postSelection || !postsList) return;

        // Show the post selection section
        postSelection.classList.remove('hidden');

        // Calculate pagination
        const startIndex = this.currentPage * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const currentPosts = this.currentPosts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.currentPosts.length / this.postsPerPage);

        // Update page info
        if (pageInfo) {
            pageInfo.textContent = `${this.currentPage + 1} of ${totalPages}`;
        }

        // Update navigation buttons
        if (prevPageBtn) {
            prevPageBtn.disabled = this.currentPage === 0;
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = this.currentPage >= totalPages - 1;
        }

        // Clear and populate posts list
        postsList.innerHTML = '';

        currentPosts.forEach(post => {
            const postElement = this.createPostElement(post);
            postsList.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const div = document.createElement('div');
        div.className = 'p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors';

        const timestamp = this.formatTimestamp(post.timestamp);
        const truncatedText = post.text.length > 100 ? post.text.substring(0, 100) + '...' : post.text;

        div.innerHTML = `
            <div class="text-sm text-gray-900 dark:text-white mb-2">${truncatedText}</div>
            <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>${timestamp}</span>
                <div class="flex space-x-3">
                    <span>❤️ ${post.likes}</span>
                    <span>🔄 ${post.reposts}</span>
                    <span>💬 ${post.replies}</span>
                </div>
            </div>
        `;

        div.addEventListener('click', () => {
            this.selectPost(post);
        });

        return div;
    }

    selectPost(post) {
        // For the existing post workflow, we need to populate the preview directly
        // since we don't have form fields in that section
        this.populateExistingPostPreview(post);

        // Show the export section
        const existingPostExport = document.getElementById('existing-post-export');
        if (existingPostExport) {
            existingPostExport.classList.remove('hidden');
        }

        this.showSuccess('Post selected! You can now export the image.');
    }

    populateExistingPostPreview(post) {
        // Create a data object for the existing post
        const postData = {
            postType: 'post',
            displayName: post.author,
            handle: `@${post.author}`,
            avatar: '',
            content: post.text,
            postImage: '',
            reposts: post.reposts,
            likes: post.likes,
            replies: post.replies,
            date: new Date(post.timestamp).toISOString().split('T')[0],
            time: new Date(post.timestamp).toTimeString().split(' ')[0]
        };

        // Update the preview with this data
        if (window.postGenerator) {
            const previewHTML = window.postGenerator.generatePreview(postData);
            const previewElement = document.getElementById('post-preview');
            if (previewElement) {
                previewElement.innerHTML = previewHTML;

                // Apply the current export theme to the preview
                const exportTheme = document.querySelector('input[name="export-theme-existing"]:checked')?.value || 'light';
                previewElement.classList.remove('dark', 'light');
                previewElement.classList.add(exportTheme);

                // Force the theme to be applied
                setTimeout(() => {
                    previewElement.classList.remove('dark', 'light');
                    previewElement.classList.add(exportTheme);
                }, 10);
            }
        }
    }

    handleDirectUrl() {
        const urlInput = document.getElementById('post-url');
        const url = urlInput?.value?.trim();

        if (url && url.includes('bsky.app')) {
            // Extract post data from URL (simplified)
            this.showSuccess('Direct URL detected! Processing...');
            // In a real implementation, you'd parse the URL and fetch the specific post
        }
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.displayPosts();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.currentPosts.length / this.postsPerPage);
        if (this.currentPage < totalPages - 1) {
            this.currentPage++;
            this.displayPosts();
        }
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }

    showLoading(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2000);
    }

    showSuccess(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    showError(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize post fetcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.postFetcher = new PostFetcher();
});