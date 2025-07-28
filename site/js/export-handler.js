// Export handler module for generating PNG images
class ExportHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupExportButton();
    }

    setupExportButton() {
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportAsPNG();
            });
        }
    }

    async exportAsPNG() {
        const exportBtn = document.getElementById('export-btn');
        const previewContainer = document.getElementById('post-preview');

        if (!previewContainer || !exportBtn) return;

        try {
            // Show loading state
            exportBtn.disabled = true;
            exportBtn.classList.add('loading');
            exportBtn.textContent = 'Generating...';

            // Wait a bit for any pending DOM updates
            await new Promise(resolve => setTimeout(resolve, 100));

            // Configure html2canvas options
            const options = {
                backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff',
                scale: 2, // Higher quality
                useCORS: true,
                allowTaint: true,
                width: previewContainer.offsetWidth,
                height: previewContainer.offsetHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: previewContainer.offsetWidth,
                windowHeight: previewContainer.offsetHeight
            };

            // Generate canvas
            const canvas = await html2canvas(previewContainer, options);

            // Convert to blob
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png', 0.9);
            });

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.generateFilename();

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(url);

            // Show success message
            this.showSuccess('Image exported successfully!');

        } catch (error) {
            console.error('Export failed:', error);
            this.showError('Failed to export image. Please try again.');
        } finally {
            // Reset button state
            exportBtn.disabled = false;
            exportBtn.classList.remove('loading');
            exportBtn.textContent = 'Export as PNG';
        }
    }

    generateFilename() {
        const formData = window.app.getFormData();
        const displayName = formData.displayName || 'post';
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toTimeString().slice(0, 8).replace(/:/g, '-');

        // Clean display name for filename
        const cleanName = displayName
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '_')
            .toLowerCase()
            .substring(0, 20);

        return `bluesky_post_${cleanName}_${date}_${time}.png`;
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
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

    // Alternative export method with custom styling
    async exportWithCustomStyling() {
        const previewContainer = document.getElementById('post-preview');
        if (!previewContainer) return;

        try {
            // Create a clone of the preview for export
            const clone = previewContainer.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '0';
            clone.style.backgroundColor = document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff';
            clone.style.padding = '20px';
            clone.style.borderRadius = '12px';
            clone.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';

            document.body.appendChild(clone);

            const options = {
                backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                width: clone.offsetWidth,
                height: clone.offsetHeight
            };

            const canvas = await html2canvas(clone, options);
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png', 0.9);
            });

            // Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.generateFilename();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Clean up
            document.body.removeChild(clone);

            this.showSuccess('Image exported successfully!');

        } catch (error) {
            console.error('Export failed:', error);
            this.showError('Failed to export image. Please try again.');
        }
    }

    // Method to export with different sizes
    async exportWithSize(size = 'default') {
        const sizes = {
            small: { width: 400, scale: 1 },
            default: { width: 600, scale: 2 },
            large: { width: 800, scale: 2 },
            hd: { width: 1200, scale: 3 }
        };

        const config = sizes[size] || sizes.default;
        const previewContainer = document.getElementById('post-preview');

        if (!previewContainer) return;

        try {
            const exportBtn = document.getElementById('export-btn');
            if (exportBtn) {
                exportBtn.disabled = true;
                exportBtn.classList.add('loading');
                exportBtn.textContent = 'Generating...';
            }

            // Create a wrapper with the desired size
            const wrapper = document.createElement('div');
            wrapper.style.width = `${config.width}px`;
            wrapper.style.backgroundColor = document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff';
            wrapper.style.padding = '20px';
            wrapper.style.borderRadius = '12px';
            wrapper.style.position = 'absolute';
            wrapper.style.left = '-9999px';
            wrapper.style.top = '0';

            const clone = previewContainer.cloneNode(true);
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);

            const options = {
                backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff',
                scale: config.scale,
                useCORS: true,
                allowTaint: true,
                width: wrapper.offsetWidth,
                height: wrapper.offsetHeight
            };

            const canvas = await html2canvas(wrapper, options);
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png', 0.9);
            });

            // Download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = this.generateFilename();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Clean up
            document.body.removeChild(wrapper);

            this.showSuccess(`Image exported successfully (${size} size)!`);

        } catch (error) {
            console.error('Export failed:', error);
            this.showError('Failed to export image. Please try again.');
        } finally {
            const exportBtn = document.getElementById('export-btn');
            if (exportBtn) {
                exportBtn.disabled = false;
                exportBtn.classList.remove('loading');
                exportBtn.textContent = 'Export as PNG';
            }
        }
    }
}

// Initialize export handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.exportHandler = new ExportHandler();
});