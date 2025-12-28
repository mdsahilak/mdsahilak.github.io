// Command Palette functionality
(function() {
    const commandPalette = document.getElementById('command-palette');
    const commandInput = document.getElementById('command-input');
    const commandResults = document.getElementById('command-results');
    const cmdKTrigger = document.getElementById('cmd-k-trigger');

    let activeIndex = 0;
    let visibleItems = [];

    // Open command palette
    function openPalette() {
        commandPalette.classList.remove('hidden');
        commandInput.value = '';
        commandInput.focus();
        filterCommands('');
        updateActiveItem();
        document.body.style.overflow = 'hidden';
    }

    // Close command palette
    function closePalette() {
        commandPalette.classList.add('hidden');
        commandInput.value = '';
        document.body.style.overflow = '';
    }

    // Filter commands based on search input
    function filterCommands(query) {
        const items = commandResults.querySelectorAll('.command-item');
        const groups = commandResults.querySelectorAll('.command-group');

        visibleItems = [];

        items.forEach(item => {
            const label = item.querySelector('.command-label').textContent.toLowerCase();
            const matches = query === '' || label.includes(query.toLowerCase());

            if (matches) {
                item.style.display = 'flex';
                visibleItems.push(item);
            } else {
                item.style.display = 'none';
            }
        });

        // Hide empty groups
        groups.forEach(group => {
            const visibleChildren = group.querySelectorAll('.command-item[style="display: flex;"]');
            group.style.display = visibleChildren.length > 0 ? 'block' : 'none';
        });

        activeIndex = 0;
        updateActiveItem();
    }

    // Update active item highlight
    function updateActiveItem() {
        visibleItems.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Execute command
    function executeCommand(item) {
        const action = item.dataset.action;

        if (action === 'scroll') {
            const target = item.dataset.target;
            const element = document.querySelector(target);
            if (element) {
                closePalette();
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else if (action === 'link') {
            const url = item.dataset.url;
            if (url) {
                if (url.startsWith('mailto:')) {
                    window.location.href = url;
                } else {
                    window.open(url, '_blank');
                }
                closePalette();
            }
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Open palette with Cmd+K or Ctrl+K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (commandPalette.classList.contains('hidden')) {
                openPalette();
            } else {
                closePalette();
            }
            return;
        }

        // Only handle these if palette is open
        if (commandPalette.classList.contains('hidden')) return;

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closePalette();
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (visibleItems.length > 0) {
                    activeIndex = (activeIndex + 1) % visibleItems.length;
                    updateActiveItem();
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (visibleItems.length > 0) {
                    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
                    updateActiveItem();
                }
                break;

            case 'Enter':
                e.preventDefault();
                if (visibleItems[activeIndex]) {
                    executeCommand(visibleItems[activeIndex]);
                }
                break;
        }
    });

    // Quick navigation shortcuts (when palette is open)
    document.addEventListener('keydown', function(e) {
        if (commandPalette.classList.contains('hidden')) return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (document.activeElement !== commandInput) return;

        // Single key navigation
        const shortcuts = {
            'h': '#hero',
            'a': '#about',
            'c': '#contact'
        };

        if (commandInput.value === '' && shortcuts[e.key.toLowerCase()]) {
            e.preventDefault();
            const target = document.querySelector(shortcuts[e.key.toLowerCase()]);
            if (target) {
                closePalette();
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    });

    // Search input handler
    commandInput.addEventListener('input', function(e) {
        filterCommands(e.target.value);
    });

    // Click on backdrop to close
    commandPalette.querySelector('.command-palette-backdrop').addEventListener('click', closePalette);

    // Click on command item
    commandResults.addEventListener('click', function(e) {
        const item = e.target.closest('.command-item');
        if (item) {
            executeCommand(item);
        }
    });

    // Hover to set active
    commandResults.addEventListener('mousemove', function(e) {
        const item = e.target.closest('.command-item');
        if (item) {
            const index = visibleItems.indexOf(item);
            if (index !== -1 && index !== activeIndex) {
                activeIndex = index;
                updateActiveItem();
            }
        }
    });

    // Trigger button click
    cmdKTrigger.addEventListener('click', openPalette);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initialize visible items
    filterCommands('');
})();
