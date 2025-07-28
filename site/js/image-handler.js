// Image handler module for avatar and post image uploads
class ImageHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupAvatarUpload();
        this.setupPostImageUpload();
    }

    setupAvatarUpload() {
        const avatarUploadBtn = document.getElementById('avatar-upload-btn');
        const avatarUpload = document.getElementById('avatar-upload');
        const avatarPreview = document.getElementById('avatar-preview');
        const avatarPlaceholder = document.getElementById('avatar-placeholder');

        if (avatarUploadBtn && avatarUpload) {
            avatarUploadBtn.addEventListener('click', () => {
                avatarUpload.click();
            });

            avatarUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files[0], avatarPreview, avatarPlaceholder, true);
            });
        }
    }

    setupPostImageUpload() {
        const postImageUploadBtn = document.getElementById('post-image-upload-btn');
        const postImageUpload = document.getElementById('post-image-upload');
        const postImagePreview = document.getElementById('post-image-preview');
        const removePostImageBtn = document.getElementById('remove-post-image');

        if (postImageUploadBtn && postImageUpload) {
            postImageUploadBtn.addEventListener('click', () => {
                postImageUpload.click();
            });

            postImageUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files[0], postImagePreview, null, false);
            });

            if (removePostImageBtn) {
                removePostImageBtn.addEventListener('click', () => {
                    this.removePostImage();
                });
            }
        }
    }

    handleImageUpload(file, previewElement, placeholderElement, isAvatar = false) {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please select a valid image file.');
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            this.showError('Image file size must be less than 5MB.');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Validate dimensions for avatars
                if (isAvatar) {
                    const minSize = 100;
                    if (img.width < minSize || img.height < minSize) {
                        this.showError(`Avatar image must be at least ${minSize}x${minSize} pixels.`);
                        return;
                    }
                }

                // Create canvas to resize image if needed
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let targetWidth, targetHeight;

                if (isAvatar) {
                    // Square avatar
                    targetWidth = targetHeight = 200;
                } else {
                    // Post image - maintain aspect ratio, max width 800px
                    const maxWidth = 800;
                    const aspectRatio = img.width / img.height;

                    if (img.width > maxWidth) {
                        targetWidth = maxWidth;
                        targetHeight = maxWidth / aspectRatio;
                    } else {
                        targetWidth = img.width;
                        targetHeight = img.height;
                    }
                }

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // Draw and resize image
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // Convert to blob and create object URL
                canvas.toBlob((blob) => {
                    const objectUrl = URL.createObjectURL(blob);

                    if (previewElement) {
                        previewElement.src = objectUrl;
                        previewElement.classList.remove('hidden');

                        if (placeholderElement) {
                            placeholderElement.classList.add('hidden');
                        }
                    }

                    // Update preview
                    if (window.app) {
                        window.app.updatePreview();
                    }
                }, 'image/jpeg', 0.8);
            };

            img.onerror = () => {
                this.showError('Failed to load image. Please try again.');
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            this.showError('Failed to read image file. Please try again.');
        };

        reader.readAsDataURL(file);
    }

    removePostImage() {
        const postImagePreview = document.getElementById('post-image-preview');
        const postImageUpload = document.getElementById('post-image-upload');
        const removePostImageBtn = document.getElementById('remove-post-image');

        if (postImagePreview) {
            postImagePreview.classList.add('hidden');
            postImagePreview.src = '';
        }

        if (postImageUpload) {
            postImageUpload.value = '';
        }

        if (removePostImageBtn) {
            removePostImageBtn.classList.add('hidden');
        }

        // Update preview
        if (window.app) {
            window.app.updatePreview();
        }
    }

    showError(message) {
        // Create a simple error notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Utility method to create a default avatar
    createDefaultAvatar(initials) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 200;
        canvas.height = 200;

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 200, 200);
        gradient.addColorStop(0, '#1da1f2');
        gradient.addColorStop(1, '#0d8bd9');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);

        // Add initials
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials.toUpperCase(), 100, 100);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, 'image/png');
        });
    }

    // Method to generate avatar from display name
    async generateAvatarFromName(displayName) {
        if (!displayName) return null;

        const initials = displayName
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 2);

        return await this.createDefaultAvatar(initials);
    }
}

// Initialize image handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageHandler = new ImageHandler();
});