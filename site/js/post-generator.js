// Post generator module for rendering Bluesky-like posts
class PostGenerator {
    constructor() {
        this.previewContainer = document.getElementById('post-preview');
        this.init();
    }

    init() {
        this.generatePreview();
    }

    generatePreview(data = null) {
        if (!this.previewContainer) return;

        // Use provided data or get from form
        const postData = data || window.app.getFormData();
        const postHTML = this.createPostHTML(postData);
        this.previewContainer.innerHTML = postHTML;
    }

    createPostHTML(data) {
        console.log('createPostHTML called with data:', data);
        const { postType, displayName, handle, avatar, content, postImage, reposts, likes, replies, date, time } = data;

        let postHTML = '';

        switch (postType) {
            case 'repost':
                postHTML = this.createRepostHTML(data);
                break;
            case 'reply':
                postHTML = this.createReplyHTML(data);
                break;
            default:
                postHTML = this.createRegularPostHTML(data);
                break;
        }

        console.log('Generated post HTML:', postHTML);
        return postHTML;
    }

    createRegularPostHTML(data) {
        const { displayName, handle, avatar, content, postImage, reposts, likes, replies, date, time } = data;

        return `
            <div class="post-container">
                <div class="post-header">
                    ${this.createAvatarHTML(avatar)}
                    <div class="post-user-info">
                        <div class="post-display-name">${this.escapeHtml(displayName)}</div>
                        <div class="post-handle">${this.escapeHtml(handle)}</div>
                        <div class="post-timestamp">${this.formatTimestamp(date, time)}</div>
                    </div>
                </div>

                ${content ? `<div class="post-content">${this.formatContent(content)}</div>` : ''}

                ${postImage ? this.createPostImageHTML(postImage) : ''}

                <div class="post-actions">
                    <div class="post-metrics">
                        ${this.createMetricHTML('repost', reposts)}
                        ${this.createMetricHTML('like', likes)}
                        ${this.createMetricHTML('reply', replies)}
                    </div>
                </div>
            </div>
        `;
    }

    createRepostHTML(data) {
        const { displayName, handle, avatar, content, postImage, reposts, likes, replies, date, time } = data;

        return `
            <div class="post-container">
                <div class="post-header">
                    ${this.createAvatarHTML(avatar)}
                    <div class="post-user-info">
                        <div class="post-display-name">${this.escapeHtml(displayName)}</div>
                        <div class="post-handle">${this.escapeHtml(handle)}</div>
                        <div class="post-timestamp">${this.formatTimestamp(date, time)}</div>
                    </div>
                </div>

                <div class="repost-container">
                    <div class="repost-header">
                        <svg class="repost-icon" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.54 2.54V9.5c0-3.314-2.686-6-6-6s-6 2.686-6 6v8.71l-2.54-2.54c-.293-.293-.768-.293-1.06 0-.293.292-.293.767 0 1.06l3.88 3.88c.292.293.767.293 1.06 0l3.88-3.88c.293-.293.293-.768 0-1.06z"/>
                        </svg>
                        Reposted
                    </div>

                    <div class="post-header">
                        <div class="post-avatar">
                            <span>👤</span>
                        </div>
                        <div class="post-user-info">
                            <div class="post-display-name">Original Author</div>
                            <div class="post-handle">@original.bsky.social</div>
                            <div class="post-timestamp">${this.formatTimestamp(date, time)}</div>
                        </div>
                    </div>

                    ${content ? `<div class="post-content">${this.formatContent(content)}</div>` : ''}

                    ${postImage ? this.createPostImageHTML(postImage) : ''}
                </div>

                <div class="post-actions">
                    <div class="post-metrics">
                        ${this.createMetricHTML('repost', reposts)}
                        ${this.createMetricHTML('like', likes)}
                        ${this.createMetricHTML('reply', replies)}
                    </div>
                </div>
            </div>
        `;
    }

    createReplyHTML(data) {
        const { displayName, handle, avatar, content, postImage, reposts, likes, replies, date, time } = data;

        return `
            <div class="post-container">
                <div class="reply-container">
                    <div class="reply-indicator">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Replying to @original.bsky.social
                    </div>

                    <div class="post-header">
                        ${this.createAvatarHTML(avatar)}
                        <div class="post-user-info">
                            <div class="post-display-name">${this.escapeHtml(displayName)}</div>
                            <div class="post-handle">${this.escapeHtml(handle)}</div>
                            <div class="post-timestamp">${this.formatTimestamp(date, time)}</div>
                        </div>
                    </div>

                    ${content ? `<div class="post-content">${this.formatContent(content)}</div>` : ''}

                    ${postImage ? this.createPostImageHTML(postImage) : ''}

                    <div class="post-actions">
                        <div class="post-metrics">
                            ${this.createMetricHTML('repost', reposts)}
                            ${this.createMetricHTML('like', likes)}
                            ${this.createMetricHTML('reply', replies)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createAvatarHTML(avatarSrc) {
        if (avatarSrc && avatarSrc !== 'assets/default-avatar.png') {
            return `
                <div class="post-avatar">
                    <img src="${avatarSrc}" alt="Avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <span style="display: none;">👤</span>
                </div>
            `;
        } else {
            return `
                <div class="post-avatar">
                    <span>👤</span>
                </div>
            `;
        }
    }

    createPostImageHTML(imageSrc) {
        return `
            <div class="post-image">
                <img src="${imageSrc}" alt="Post image" onerror="this.parentElement.style.display='none';">
            </div>
        `;
    }

    createMetricHTML(type, count) {
        const icons = {
            repost: `<svg class="post-metric-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.54 2.54V9.5c0-3.314-2.686-6-6-6s-6 2.686-6 6v8.71l-2.54-2.54c-.293-.293-.768-.293-1.06 0-.293.292-.293.767 0 1.06l3.88 3.88c.292.293.767.293 1.06 0l3.88-3.88c.293-.293.293-.768 0-1.06z"/>
            </svg>`,
            like: `<svg class="post-metric-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>`,
            reply: `<svg class="post-metric-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.046 2.242l-4.668-.01h-.016c-1.11 0-1.99.896-1.99 1.99v7.985c0 1.1.89 1.99 1.99 1.99h.016l4.668.01c1.11 0 1.99-.896 1.99-1.99V4.232c0-1.1-.89-1.99-1.99-1.99zM14.046 2.242l-4.668-.01h-.016c-1.11 0-1.99.896-1.99 1.99v7.985c0 1.1.89 1.99 1.99 1.99h.016l4.668.01c1.11 0 1.99-.896 1.99-1.99V4.232c0-1.1-.89-1.99-1.99-1.99z"/>
            </svg>`
        };

        return `
            <div class="post-metric">
                ${icons[type]}
                <span>${this.formatNumber(count)}</span>
            </div>
        `;
    }

    formatContent(content) {
        // Convert URLs to clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const formattedContent = content.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-500 hover:underline">$1</a>');

        // Convert line breaks to <br> tags
        return formattedContent.replace(/\n/g, '<br>');
    }

    formatTimestamp(date, time) {
        if (!date || !time) return '';

        try {
            const dateTime = new Date(`${date}T${time}`);
            const now = new Date();
            const diffInMinutes = Math.floor((now - dateTime) / (1000 * 60));

            if (diffInMinutes < 1) return 'now';
            if (diffInMinutes < 60) return `${diffInMinutes}m`;

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) return `${diffInHours}h`;

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 7) return `${diffInDays}d`;

            return dateTime.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return `${date} ${time}`;
        }
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize post generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.postGenerator = new PostGenerator();
});