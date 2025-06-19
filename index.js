const demoElement = document.getElementById('demo-element');
        let draggedElement = null;
        let offset = { x: 0, y: 0 };
        
        // Enhanced Position Control
        function changePosition(pos) {
            demoElement.style.position = pos;
            if (pos === 'relative') {
                demoElement.style.top = '20px';
                demoElement.style.left = '20px';
            } else if (pos === 'absolute') {
                demoElement.style.top = '10px';
                demoElement.style.right = '10px';
                demoElement.style.left = 'auto';
            } else if (pos === 'fixed') {
                demoElement.style.top = '100px';
                demoElement.style.right = '20px';
                demoElement.style.left = 'auto';
            } else {
                demoElement.style.top = 'auto';
                demoElement.style.left = 'auto';
                demoElement.style.right = 'auto';
            }
            demoElement.innerHTML = `Position: ${pos}<br><small>Drag me around!</small>`;
            updateActiveButton(event);
        }
        
        function changeDisplay(display) {
            demoElement.style.display = display;
            if (display !== 'none') {
                demoElement.innerHTML = `Display: ${display}<br><small>Drag me around!</small>`;
            }
            updateActiveButton(event);
        }
        
        // Float Controls
        function setFloat(elementId, floatValue) {
            const element = document.getElementById(elementId);
            element.style.float = floatValue;
            
            // Update classes for styling
            element.className = 'float-element';
            if (floatValue === 'left') {
                element.classList.add('float-left');
            } else if (floatValue === 'right') {
                element.classList.add('float-right');
            } else {
                element.classList.add('float-none');
            }
            
            element.textContent = `${elementId} (float: ${floatValue})`;
        }
        
        function toggleClear() {
            const clearElement = document.getElementById('clear-element');
            clearElement.style.display = clearElement.style.display === 'none' ? 'block' : 'none';
        }
        
        function resetFloat() {
            document.getElementById('element1').className = 'float-element float-left';
            document.getElementById('element1').style.float = 'left';
            document.getElementById('element1').textContent = 'Element 1';
            
            document.getElementById('element2').className = 'float-element float-right';
            document.getElementById('element2').style.float = 'right';
            document.getElementById('element2').textContent = 'Element 2';
            
            document.getElementById('clear-element').style.display = 'none';
        }
        
        // Z-Index Controls
        function updateZIndex(elementId, value, displayId) {
            const element = document.getElementById(elementId);
            element.style.zIndex = value;
            document.getElementById(displayId).textContent = value;
            
            // Update text in element
            const textSpan = element.querySelector('span');
            if (textSpan) {
                textSpan.textContent = value;
            }
        }
        
        function randomizeZIndex() {
            const elements = ['z-back', 'z-middle', 'z-front'];
            const displays = ['z1-value', 'z2-value', 'z3-value'];
            const sliders = ['z1-slider', 'z2-slider', 'z3-slider'];
            
            elements.forEach((id, index) => {
                const randomZ = Math.floor(Math.random() * 16) - 5;
                updateZIndex(id, randomZ, displays[index]);
                document.getElementById(sliders[index]).value = randomZ;
            });
        }
        
        function resetZIndex() {
            updateZIndex('z-back', 1, 'z1-value');
            updateZIndex('z-middle', 2, 'z2-value');
            updateZIndex('z-front', 3, 'z3-value');
            document.getElementById('z1-slider').value = 1;
            document.getElementById('z2-slider').value = 2;
            document.getElementById('z3-slider').value = 3;
        }
        
        // Box Model Controls
        function updateBoxModel(property, value, displayId) {
            const elements = {
                margin: document.getElementById('interactive-margin'),
                border: document.getElementById('interactive-border'),
                padding: document.getElementById('interactive-padding')
            };
            
            if (property === 'margin') {
                elements.margin.style.padding = value + 'px';
                document.getElementById(displayId).textContent = value + 'px';
            } else if (property === 'border') {
                elements.border.style.borderWidth = value + 'px';
                document.getElementById(displayId).textContent = value + 'px';
            } else if (property === 'padding') {
                elements.padding.style.padding = value + 'px';
                document.getElementById(displayId).textContent = value + 'px';
            }
        }
        
        function resetBoxModel() {
            updateBoxModel('margin', 15, 'margin-value');
            updateBoxModel('border', 3, 'border-value');
            updateBoxModel('padding', 15, 'padding-value');
            document.getElementById('margin-slider').value = 15;
            document.getElementById('border-slider').value = 3;
            document.getElementById('padding-slider').value = 15;
        }
        
        // Transform Controls
        function updateTransform(property, value, displayId) {
            const element = demoElement;
            let currentTransform = element.style.transform || '';
            
            if (property === 'rotate') {
                currentTransform = currentTransform.replace(/rotate\([^)]*\)/g, '');
                currentTransform += ` rotate(${value}deg)`;
                document.getElementById(displayId).textContent = value + '°';
            } else if (property === 'scale') {
                currentTransform = currentTransform.replace(/scale\([^)]*\)/g, '');
                currentTransform += ` scale(${value})`;
                document.getElementById(displayId).textContent = value;
            } else if (property === 'opacity') {
                element.style.opacity = value / 100;
                document.getElementById(displayId).textContent = value + '%';
                return;
            }
            
            element.style.transform = currentTransform.trim();
        }
        
        function resetElement() {
            demoElement.style.position = 'static';
            demoElement.style.display = 'block';
            demoElement.style.top = 'auto';
            demoElement.style.left = 'auto';
            demoElement.style.right = 'auto';
            demoElement.style.transform = '';
            demoElement.style.opacity = '1';
            demoElement.innerHTML = 'Demo Element<br><small>Drag me around!</small>';
            
            // Reset sliders
            document.getElementById('rotation-slider').value = 0;
            document.getElementById('scale-slider').value = 1;
            document.getElementById('opacity-slider').value = 100;
            document.getElementById('rotation-value').textContent = '0°';
            document.getElementById('scale-value').textContent = '1';
            document.getElementById('opacity-value').textContent = '100%';
            
            // Remove active class from buttons
            document.querySelectorAll('.interactive-btn').forEach(btn => btn.classList.remove('active'));
        }
        
        function randomizeElement() {
            const positions = ['static', 'relative', 'absolute'];
            const displays = ['block', 'inline-block'];
            
            changePosition(positions[Math.floor(Math.random() * positions.length)]);
            changeDisplay(displays[Math.floor(Math.random() * displays.length)]);
            
            const randomRotation = Math.floor(Math.random() * 360);
            const randomScale = (Math.random() * 2 + 0.5).toFixed(1);
            const randomOpacity = Math.floor(Math.random() * 100 + 1);
            
            updateTransform('rotate', randomRotation, 'rotation-value');
            updateTransform('scale', randomScale, 'scale-value');
            updateTransform('opacity', randomOpacity, 'opacity-value');
            
            document.getElementById('rotation-slider').value = randomRotation;
            document.getElementById('scale-slider').value = randomScale;
            document.getElementById('opacity-slider').value = randomOpacity;
        }
        
        function updateActiveButton(event) {
            if (event && event.target) {
                document.querySelectorAll('.interactive-btn').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
            }
        }

        // Drag and Drop Functionality
        function setupDragAndDrop() {
            const draggableElements = document.querySelectorAll('.interactive-element, .z-layer, .float-element');
            
            draggableElements.forEach(element => {
                element.addEventListener('dragstart', handleDragStart);
                element.addEventListener('dragend', handleDragEnd);
            });
            
            // Make containers drop zones
            const containers = document.querySelectorAll('.z-index-demo, .float-demo, #interactive-demo');
            containers.forEach(container => {
                container.addEventListener('dragover', handleDragOver);
                container.addEventListener('drop', handleDrop);
            });
        }
        
        function handleDragStart(e) {
            draggedElement = e.target;
            const rect = e.target.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
            e.target.style.opacity = '0.7';
        }
        
        function handleDragEnd(e) {
            e.target.style.opacity = '1';
            draggedElement = null;
        }
        
        function handleDragOver(e) {
            e.preventDefault();
        }
        
        function handleDrop(e) {
            e.preventDefault();
            if (draggedElement) {
                const containerRect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - containerRect.left - offset.x;
                const y = e.clientY - containerRect.top - offset.y;
                
                draggedElement.style.position = 'absolute';
                draggedElement.style.left = x + 'px';
                draggedElement.style.top = y + 'px';
            }
        }

        // Initialize drag and drop when page loads
        document.addEventListener('DOMContentLoaded', function() {
            setupDragAndDrop();
            
            // Add interactive hover effects
            document.querySelectorAll('.box-layer').forEach(layer => {
                layer.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.transition = 'transform 0.2s';
                });
                
                layer.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
            
            // Add click-to-focus effects for interactive elements
            document.querySelectorAll('.interactive-element').forEach(element => {
                element.addEventListener('click', function() {
                    // Remove focus from other elements
                    document.querySelectorAll('.interactive-element').forEach(el => {
                        el.style.boxShadow = '';
                    });
                    // Add focus to clicked element
                    this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
                });
            });
            
            // Add keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey) {
                    switch(e.key) {
                        case 'r':
                            e.preventDefault();
                            resetElement();
                            break;
                        case 'z':
                            e.preventDefault();
                            randomizeZIndex();
                            break;
                        case 'f':
                            e.preventDefault();
                            resetFloat();
                            break;
                    }
                }
            });
            
            // Add live CSS value display
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        updateLiveDisplay(mutation.target);
                    }
                });
            });
            
            // Observe demo element for style changes
            observer.observe(demoElement, { 
                attributes: true, 
                attributeFilter: ['style'] 
            });
        });
        
        function updateLiveDisplay(element) {
            if (element.id === 'demo-element') {
                const styles = window.getComputedStyle(element);
                const liveDisplay = document.getElementById('live-display');
                if (liveDisplay) {
                    liveDisplay.innerHTML = `
                        <strong>Live CSS Values:</strong><br>
                        Position: ${styles.position}<br>
                        Display: ${styles.display}<br>
                        Z-Index: ${styles.zIndex}<br>
                        Transform: ${styles.transform !== 'none' ? styles.transform : 'none'}<br>
                        Opacity: ${styles.opacity}
                    `;
                }
            }
        }
        
        // Color picker functionality
        function changeColor(property, color) {
            if (property === 'background') {
                demoElement.style.backgroundColor = color;
            } else if (property === 'text') {
                demoElement.style.color = color;
            } else if (property === 'border') {
                demoElement.style.borderColor = color;
                demoElement.style.border = `3px solid ${color}`;
            }
        }
        
        // Animation presets
        function applyAnimation(animationType) {
            demoElement.style.transition = 'all 1s ease-in-out';
            
            switch(animationType) {
                case 'bounce':
                    demoElement.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        demoElement.style.transform = 'translateY(0)';
                    }, 500);
                    break;
                case 'spin':
                    demoElement.style.transform = 'rotate(360deg)';
                    setTimeout(() => {
                        demoElement.style.transform = 'rotate(0deg)';
                    }, 1000);
                    break;
                case 'pulse':
                    demoElement.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        demoElement.style.transform = 'scale(1)';
                    }, 500);
                    break;
                case 'fade':
                    demoElement.style.opacity = '0.3';
                    setTimeout(() => {
                        demoElement.style.opacity = '1';
                    }, 500);
                    break;
            }
        }
        
        function changePosition(pos) {
            demoElement.style.position = pos;
            if (pos === 'relative') {
                demoElement.style.top = '20px';
                demoElement.style.left = '20px';
            } else if (pos === 'absolute') {
                demoElement.style.top = '10px';
                demoElement.style.right = '10px';
            } else {
                demoElement.style.top = 'auto';
                demoElement.style.left = 'auto';
                demoElement.style.right = 'auto';
            }
            demoElement.textContent = `Position: ${pos}`;
        }
        
        function changeDisplay(display) {
            demoElement.style.display = display;
            demoElement.textContent = `Display: ${display}`;
        }
        
        function resetElement() {
            demoElement.style.position = 'static';
            demoElement.style.display = 'block';
            demoElement.style.top = 'auto';
            demoElement.style.left = 'auto';
            demoElement.style.right = 'auto';
            demoElement.textContent = 'Demo Element';
        }

        // Add some interactive hover effects
        document.querySelectorAll('.box-layer').forEach(layer => {
            layer.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s';
            });
            
            layer.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });