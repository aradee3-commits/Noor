// 2D Cube Counting Application
class CubeCountingApp {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.cubes = [];
        this.cubeCount = 0;
        this.animationId = null;
        this.colors = [
            '#ff6b6b', // Red
            '#4ecdc4', // Teal
            '#45b7d1', // Blue
            '#96ceb4', // Green
            '#feca57', // Yellow
            '#ff9ff3', // Pink
            '#54a0ff', // Light Blue
            '#5f27cd', // Purple
            '#00d2d3', // Cyan
            '#ff3742'  // Bright Red
        ];
        
        this.init();
        this.setupControls();
        this.animate();
    }

    init() {
        this.canvas = document.getElementById('cubeCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set up canvas dimensions
        this.resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = document.getElementById('canvas-container');
        const containerRect = container.getBoundingClientRect();
        
        // Set canvas size to fit container while maintaining aspect ratio
        const maxWidth = containerRect.width - 40;
        const maxHeight = containerRect.height - 40;
        
        this.canvas.width = Math.min(800, maxWidth);
        this.canvas.height = Math.min(500, maxHeight);
        
        // Update canvas style
        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.style.height = this.canvas.height + 'px';
    }

    createCube() {
        const gridCols = 8;
        const cubeSize = 60;
        const spacing = 5;
        const startX = 50;
        const startY = this.canvas.height - 80;

        const row = Math.floor(this.cubeCount / gridCols);
        const col = this.cubeCount % gridCols;

        const cube = {
            id: this.cubeCount,
            x: startX + col * (cubeSize + spacing),
            y: startY - row * (cubeSize + spacing),
            size: cubeSize,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            scale: 0.1,
            targetScale: 1.0,
            rotation: 0,
            shadowOffset: 3,
            animationProgress: 0
        };

        this.cubes.push(cube);
        this.cubeCount++;
        
        this.updateCounter();
        this.updateButtonStates();
    }

    removeCube() {
        if (this.cubes.length === 0) return;

        const cube = this.cubes[this.cubes.length - 1];
        cube.targetScale = 0.1;
        cube.removing = true;

        // Remove cube after animation
        setTimeout(() => {
            this.cubes.pop();
            this.cubeCount--;
            this.updateCounter();
            this.updateButtonStates();
        }, 300);
    }

    resetCubes() {
        // Mark all cubes for removal with staggered timing
        this.cubes.forEach((cube, index) => {
            setTimeout(() => {
                cube.targetScale = 0.1;
                cube.removing = true;
            }, index * 50);
        });

        // Clear all cubes after animations
        setTimeout(() => {
            this.cubes = [];
            this.cubeCount = 0;
            this.updateCounter();
            this.updateButtonStates();
        }, this.cubes.length * 50 + 300);
    }

    drawCube(cube) {
        const ctx = this.ctx;
        const { x, y, size, color, scale, rotation, shadowOffset } = cube;
        
        const actualSize = size * scale;
        const centerX = x + size / 2;
        const centerY = y + size / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(rotation);

        // Draw shadow
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000000';
        ctx.fillRect(-actualSize/2 + shadowOffset, -actualSize/2 + shadowOffset, actualSize, actualSize);

        // Draw main cube face
        ctx.globalAlpha = 1.0;
        
        // Create gradient for 3D effect
        const gradient = ctx.createLinearGradient(-actualSize/2, -actualSize/2, actualSize/2, actualSize/2);
        gradient.addColorStop(0, this.lightenColor(color, 20));
        gradient.addColorStop(1, this.darkenColor(color, 20));
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-actualSize/2, -actualSize/2, actualSize, actualSize);

        // Draw highlight (top edge)
        ctx.fillStyle = this.lightenColor(color, 40);
        ctx.fillRect(-actualSize/2, -actualSize/2, actualSize, actualSize * 0.2);

        // Draw right edge for 3D effect
        ctx.fillStyle = this.darkenColor(color, 30);
        ctx.beginPath();
        ctx.moveTo(actualSize/2, -actualSize/2);
        ctx.lineTo(actualSize/2 + 10, -actualSize/2 - 10);
        ctx.lineTo(actualSize/2 + 10, actualSize/2 - 10);
        ctx.lineTo(actualSize/2, actualSize/2);
        ctx.closePath();
        ctx.fill();

        // Draw top edge for 3D effect
        ctx.fillStyle = this.lightenColor(color, 10);
        ctx.beginPath();
        ctx.moveTo(-actualSize/2, -actualSize/2);
        ctx.lineTo(-actualSize/2 + 10, -actualSize/2 - 10);
        ctx.lineTo(actualSize/2 + 10, -actualSize/2 - 10);
        ctx.lineTo(actualSize/2, -actualSize/2);
        ctx.closePath();
        ctx.fill();

        // Draw border
        ctx.strokeStyle = this.darkenColor(color, 50);
        ctx.lineWidth = 2;
        ctx.strokeRect(-actualSize/2, -actualSize/2, actualSize, actualSize);

        ctx.restore();
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const B = (num >> 8 & 0x00FF) + amt;
        const G = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
                      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 + 
                      (G < 255 ? (G < 1 ? 0 : G) : 255)).toString(16).slice(1);
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const B = (num >> 8 & 0x00FF) - amt;
        const G = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R > 255 ? 255 : (R < 0 ? 0 : R)) * 0x10000 + 
                      (B > 255 ? 255 : (B < 0 ? 0 : B)) * 0x100 + 
                      (G > 255 ? 255 : (G < 0 ? 0 : G))).toString(16).slice(1);
    }

    updateAnimations() {
        this.cubes.forEach(cube => {
            // Scale animation
            if (cube.scale < cube.targetScale) {
                cube.scale = Math.min(cube.targetScale, cube.scale + 0.05);
            } else if (cube.scale > cube.targetScale) {
                cube.scale = Math.max(cube.targetScale, cube.scale - 0.05);
            }

            // Gentle rotation
            if (!cube.removing) {
                cube.rotation += 0.005;
            } else {
                cube.rotation += 0.1;
            }

            // Floating animation
            cube.animationProgress += 0.02;
            cube.y += Math.sin(cube.animationProgress) * 0.5;
        });
    }

    render() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#f0f4f8');
        gradient.addColorStop(1, '#e2e8f0');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines for visual appeal
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.canvas.width; i += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i < this.canvas.height; i += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
        }

        // Draw all cubes
        this.cubes.forEach(cube => {
            this.drawCube(cube);
        });

        // Draw instructions if no cubes
        if (this.cubes.length === 0) {
            this.ctx.fillStyle = '#666';
            this.ctx.font = 'bold 24px Comic Sans MS, cursive';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Click "Add Cube" to start counting!', this.canvas.width / 2, this.canvas.height / 2);
            
            // Draw arrows pointing to buttons
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.font = 'bold 32px Arial';
            this.ctx.fillText('👆', this.canvas.width / 2, this.canvas.height / 2 - 80);
        }
    }

    updateCounter() {
        const counterElement = document.getElementById('cubeCounter');
        counterElement.textContent = this.cubeCount;
        
        // Add animation to counter
        counterElement.style.transform = 'scale(1.3)';
        counterElement.style.color = this.colors[this.cubeCount % this.colors.length];
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }

    updateButtonStates() {
        const removeBtn = document.getElementById('removeCube');
        const resetBtn = document.getElementById('resetCubes');
        
        removeBtn.disabled = this.cubeCount === 0;
        resetBtn.disabled = this.cubeCount === 0;
    }

    setupControls() {
        const addBtn = document.getElementById('addCube');
        const removeBtn = document.getElementById('removeCube');
        const resetBtn = document.getElementById('resetCubes');

        addBtn.addEventListener('click', () => {
            this.createCube();
            // Add visual feedback
            addBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                addBtn.style.transform = 'scale(1)';
            }, 100);
        });

        removeBtn.addEventListener('click', () => {
            this.removeCube();
            // Add visual feedback
            removeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                removeBtn.style.transform = 'scale(1)';
            }, 100);
        });

        resetBtn.addEventListener('click', () => {
            this.resetCubes();
            // Add visual feedback
            resetBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                resetBtn.style.transform = 'scale(1)';
            }, 100);
        });

        // Initial button states
        this.updateButtonStates();

        // Add keyboard controls
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                case '+':
                case '=':
                    event.preventDefault();
                    this.createCube();
                    break;
                case 'ArrowDown':
                case '-':
                    event.preventDefault();
                    this.removeCube();
                    break;
                case 'r':
                case 'R':
                    event.preventDefault();
                    this.resetCubes();
                    break;
            }
        });

        // Add click interaction with canvas
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Click anywhere on canvas to add cube
            this.createCube();
        });
    }

    animate() {
        this.updateAnimations();
        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = new CubeCountingApp();
        
        // Make app globally accessible for debugging
        window.cubeApp = app;
        
        console.log('Cube counting app initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize cube counting app:', error);
        document.getElementById('canvas-container').innerHTML = 
            '<div class="loading">❌ Failed to initialize. Please refresh the page.</div>';
    }
});