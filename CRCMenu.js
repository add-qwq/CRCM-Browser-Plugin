(function () {
    let customMenu = null;
    let isMenuVisible = false;
    let currentLink = null;
    let currentImage = null;
    let selectedText = '';
    let focusedElementBeforeMenu = null;
    let enableCustomMenu = true;

    let backItem, refreshItem, copyItem, pasteItem, openInNewTabItem, copyLinkItem, backToHomeItem;
    let generalMenuHeader, editDivider, editMenuHeader, linkDivider, linkMenuHeader, imageDivider, imageMenuHeader, otherDivider, otherMenuHeader;
    let openImageInNewTabItem, copyImageUrlItem;

    let scrollTimer = null;
    let touchStartY = 0;

    function initializeMenu() {
        chrome.storage.sync.get(['fontAwesomeSource', 'enableCustomMenu'], (data) => {
            enableCustomMenu = data.enableCustomMenu !== false;
            const fontAwesomeSource = data.fontAwesomeSource || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            createMenuElement(fontAwesomeSource);
            cacheMenuElements();
            registerEventListeners();
            detectColorScheme();
        });
    }

    function createMenuElement(fontAwesomeSource) {
        if (document.getElementById('custom-menu')) return;

        const menuHTML = `
            <div class="crc-custom-menu">
                <div id="custom-menu" class="custom-menu">
                    <div class="menu-header" id="general-menu-header">常规操作</div>
                    <div class="menu-item" id="back-item">
                        <i class="fa fa-arrow-left"></i>
                        <span>返回</span>
                    </div>
                    <div class="menu-item" id="refresh-item">
                        <i class="fa fa-refresh"></i>
                        <span>刷新</span>
                    </div>

                    <div class="menu-divider" id="edit-divider"></div>
                    <div class="menu-header" id="edit-menu-header">编辑操作</div>
                    <div class="menu-item" id="copy-item">
                        <i class="fa fa-copy"></i>
                        <span>复制</span>
                    </div>
                    <div class="menu-item" id="paste-item">
                        <i class="fa fa-paste"></i>
                        <span>粘贴</span>
                    </div>

                    <div class="menu-divider" id="link-divider"></div>
                    <div class="menu-header" id="link-menu-header">链接操作</div>
                    <div class="menu-item" id="open-in-new-tab-item">
                        <i class="fa fa-external-link"></i>
                        <span>在新标签页打开</span>
                    </div>
                    <div class="menu-item" id="copy-link-item">
                        <i class="fa fa-link"></i>
                        <span>复制链接地址</span>
                    </div>

                    <div class="menu-divider" id="image-divider"></div>
                    <div class="menu-header" id="image-menu-header">图片操作</div>
                    <div class="menu-item" id="open-image-in-new-tab-item">
                        <i class="fa fa-external-link"></i>
                        <span>在新标签页打开</span>
                    </div>
                    <div class="menu-item" id="copy-image-url-item">
                        <i class="fa fa-link"></i>
                        <span>复制图片地址</span>
                    </div>

                    <div class="menu-divider" id="other-divider"></div>
                    <div class="menu-header" id="other-menu-header">其他操作</div>
                    <div class="menu-item" id="back-to-home-item">
                        <i class="fa fa-home"></i>
                        <span>返回主页</span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', menuHTML);

        const link = document.createElement('link');
        link.href = fontAwesomeSource;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        customMenu = document.getElementById('custom-menu');
    }

    function cacheMenuElements() {
        if (!customMenu) return;

        backItem = document.getElementById('back-item');
        refreshItem = document.getElementById('refresh-item');
        copyItem = document.getElementById('copy-item');
        pasteItem = document.getElementById('paste-item');
        openInNewTabItem = document.getElementById('open-in-new-tab-item');
        copyLinkItem = document.getElementById('copy-link-item');
        backToHomeItem = document.getElementById('back-to-home-item');
        openImageInNewTabItem = document.getElementById('open-image-in-new-tab-item');
        copyImageUrlItem = document.getElementById('copy-image-url-item');

        generalMenuHeader = document.getElementById('general-menu-header');
        editDivider = document.getElementById('edit-divider');
        editMenuHeader = document.getElementById('edit-menu-header');
        linkDivider = document.getElementById('link-divider');
        linkMenuHeader = document.getElementById('link-menu-header');
        imageDivider = document.getElementById('image-divider');
        imageMenuHeader = document.getElementById('image-menu-header');
        otherDivider = document.getElementById('other-divider');
        otherMenuHeader = document.getElementById('other-menu-header');
    }

    function registerEventListeners() {
        document.addEventListener('contextmenu', handleContextMenu);

        document.addEventListener('click', e => {
            if (customMenu && !customMenu.contains(e.target) && isMenuVisible) hideMenu();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && isMenuVisible) hideMenu();
        });

        document.addEventListener('wheel', handleScroll, { passive: true });
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', () => isMenuVisible && hideMenu());

        customMenu?.addEventListener('click', e => {
            const target = e.target.closest('.menu-item');
            if (!target) return;

            switch (target.id) {
                case 'back-item': backAction(); break;
                case 'refresh-item': refreshAction(); break;
                case 'copy-item': copyAction(); break;
                case 'paste-item': pasteAction(); break;
                case 'open-in-new-tab-item': openInNewTabAction(); break;
                case 'copy-link-item': copyLinkAction(); break;
                case 'back-to-home-item': backToHomeAction(); break;
                case 'open-image-in-new-tab-item': openImageInNewTabAction(); break;
                case 'copy-image-url-item': copyImageUrlAction(); break;
            }
        });

        chrome.runtime.onMessage.addListener((message) => {
            if (message.action === 'updateSettings') {
                chrome.storage.sync.get(['fontAwesomeSource', 'enableCustomMenu'], (data) => {
                    enableCustomMenu = data.enableCustomMenu !== false;
                    const fontAwesomeSource = data.fontAwesomeSource || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

                    const existingLink = document.querySelector('link[href*="font-awesome"]');
                    if (existingLink) existingLink.remove();

                    const link = document.createElement('link');
                    link.href = fontAwesomeSource;
                    link.rel = 'stylesheet';
                    document.head.appendChild(link);
                });
            }
        });
    }

    function handleScroll() {
        if (isMenuVisible) {
            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(hideMenu, 50);
        }
    }

    function handleTouchStart(e) {
        if (isMenuVisible) touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        if (isMenuVisible && Math.abs(e.touches[0].clientY - touchStartY) > 5) {
            hideMenu();
        }
    }

    function handleContextMenu(e) {
        if (!enableCustomMenu) return;
        e.preventDefault();

        focusedElementBeforeMenu = document.activeElement;
        selectedText = window.getSelection().toString();
        currentLink = getCurrentLink(e.target);
        currentImage = getCurrentImage(e.target);

        updateMenuItemsVisibility();
        showMenu(e.clientX, e.clientY);
    }

    function getCurrentLink(target) {
        const linkElement = target.closest('a');
        if (linkElement) return linkElement.href;

        const onclick = target.getAttribute('onclick');
        if (onclick) {
            const openMatch = onclick.match(/window\.open\(['"](.*?)['"]/i);
            if (openMatch) return openMatch[1];
            
            const hrefMatch = onclick.match(/location\.href\s*=\s*['"](.*?)['"]/i);
            if (hrefMatch) return hrefMatch[1];
        }
        return null;
    }

    function getCurrentImage(target) {
        const imgElement = target.closest('img');
        if (imgElement) return imgElement.src;

        const style = window.getComputedStyle(target);
        const bgImage = style.getPropertyValue('background-image');
        if (bgImage && bgImage !== 'none') {
            const bgMatch = bgImage.match(/url\(["']?(.*?)["']?\)/i);
            if (bgMatch) return bgMatch[1];
        }
        return null;
    }

    function updateMenuItemsVisibility() {
        if (!customMenu) return;

        [backItem, refreshItem, copyItem, pasteItem,
            openInNewTabItem, copyLinkItem, backToHomeItem,
            generalMenuHeader, editDivider, editMenuHeader,
            linkDivider, linkMenuHeader, imageDivider,
            imageMenuHeader, openImageInNewTabItem,
            copyImageUrlItem, otherDivider, otherMenuHeader].forEach(item => {
                if (item) item.style.display = 'none';
            });

        const isInputFocused = focusedElementBeforeMenu &&
            (focusedElementBeforeMenu.tagName === 'INPUT' ||
                focusedElementBeforeMenu.tagName === 'TEXTAREA' ||
                focusedElementBeforeMenu.isContentEditable);

        // 常规
        if (generalMenuHeader) generalMenuHeader.style.display = 'block';
        if (backItem) backItem.style.display = 'flex';
        if (refreshItem) refreshItem.style.display = 'flex';

        // 其他
        if (otherDivider) otherDivider.style.display = 'block';
        if (otherMenuHeader) otherMenuHeader.style.display = 'block';
        if (backToHomeItem) backToHomeItem.style.display = 'flex';

        // 图片
        if (currentImage) {
            if (imageDivider) imageDivider.style.display = 'block';
            if (imageMenuHeader) imageMenuHeader.style.display = 'block';
            if (openImageInNewTabItem) openImageInNewTabItem.style.display = 'flex';
            if (copyImageUrlItem) copyImageUrlItem.style.display = 'flex';
        }
        // 链接
        else if (currentLink) {
            if (linkDivider) linkDivider.style.display = 'block';
            if (linkMenuHeader) linkMenuHeader.style.display = 'block';
            if (openInNewTabItem) openInNewTabItem.style.display = 'flex';
            if (copyLinkItem) copyLinkItem.style.display = 'flex';
        }
        // 编辑
        else if (isInputFocused || selectedText) {
            if (editDivider) editDivider.style.display = 'block';
            if (editMenuHeader) editMenuHeader.style.display = 'block';
            if (copyItem) copyItem.style.display = 'flex';
            if (pasteItem) pasteItem.style.display = 'flex';
        }
    }

    function showMenu(x, y) {
        if (!customMenu) return;

        const originalDisplay = customMenu.style.display;
        const originalVisibility = customMenu.style.visibility;
        customMenu.style.display = 'block';
        customMenu.style.visibility = 'hidden';

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const menuWidth = customMenu.offsetWidth;
        const menuHeight = customMenu.offsetHeight;

        customMenu.style.display = originalDisplay;
        customMenu.style.visibility = originalVisibility;

        let left = x;
        let top = y;

        if (x + menuWidth > windowWidth) left = Math.max(0, x - menuWidth);
        if (y + menuHeight > windowHeight) top = Math.max(0, y - menuHeight);

        const isFirstShow = !isMenuVisible;
        customMenu.style.left = `${left}px`;
        customMenu.style.top = `${top}px`;
        customMenu.style.display = 'block';

        if (isFirstShow) {
            setTimeout(() => customMenu.classList.add('visible'), 10);
        } else {
            customMenu.classList.add('visible');
        }

        isMenuVisible = true;
    }

    function hideMenu() {
        if (!customMenu || !isMenuVisible) return;

        customMenu.classList.remove('visible');
        customMenu.classList.add('hiding');

        setTimeout(() => {
            customMenu.style.display = 'none';
            customMenu.style.left = 'auto';
            customMenu.style.top = 'auto';
            customMenu.classList.remove('hiding');
        }, 200);

        isMenuVisible = false;
    }

    function copyAction() {
        if (!selectedText) return hideMenu();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(selectedText)
                .then(() => hideMenu())
                .catch(() => fallbackCopyText(selectedText));
        } else {
            fallbackCopyText(selectedText);
        }
    }

    function pasteAction() {
        const targetElement = focusedElementBeforeMenu;
        if (!targetElement || !(targetElement.tagName === 'INPUT' ||
            targetElement.tagName === 'TEXTAREA' || targetElement.isContentEditable)) {
            return hideMenu();
        }

        const wasFocused = document.activeElement === targetElement;
        if (!wasFocused) targetElement.focus();

        if (navigator.clipboard) {
            navigator.clipboard.readText().then(text => {
                insertTextAtCursor(targetElement, text);
                if (!wasFocused) targetElement.blur();
                hideMenu();
            }).catch(() => fallbackPasteText(targetElement));
        } else {
            fallbackPasteText(targetElement);
        }
    }

    function fallbackCopyText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } catch (e) {
            alert('复制失败，请手动复制');
        }
        document.body.removeChild(textarea);
        hideMenu();
    }

    function fallbackPasteText(targetElement) {
        const textarea = document.createElement('textarea');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        try {
            document.execCommand('paste');
            insertTextAtCursor(targetElement, textarea.value);
        } catch (e) {
            alert('粘贴失败，可能没有权限');
        }
        document.body.removeChild(textarea);
        hideMenu();
    }

    function insertTextAtCursor(element, text) {
        if (typeof element.execCommand === 'function') {
            document.execCommand('insertText', false, text);
        } else if (element.setRangeText) {
            const start = element.selectionStart;
            const end = element.selectionEnd;
            element.setRangeText(text, start, end, 'end');
            const pos = start + text.length;
            element.selectionStart = pos;
            element.selectionEnd = pos;
        } else if (element.createTextRange) {
            const range = element.createTextRange();
            range.collapse(true);
            range.text = text;
            range.moveStart('character', -text.length);
            range.select();
        }
    }

    function backAction() {
        window.history.back();
        hideMenu();
    }

    function refreshAction() {
        window.location.reload();
        hideMenu();
    }

    function openInNewTabAction() {
        if (currentLink) window.open(currentLink, '_blank');
        hideMenu();
    }

    function copyLinkAction() {
        if (currentLink) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(currentLink)
                    .catch(() => fallbackCopyText(currentLink));
            } else {
                fallbackCopyText(currentLink);
            }
        }
        hideMenu();
    }

    function backToHomeAction() {
        window.location.href = '/';
        hideMenu();
    }

    function openImageInNewTabAction() {
        if (currentImage) window.open(currentImage, '_blank');
        hideMenu();
    }

    function copyImageUrlAction() {
        if (currentImage) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(currentImage)
                    .catch(() => fallbackCopyText(currentImage));
            } else {
                fallbackCopyText(currentImage);
            }
        }
        hideMenu();
    }

    function detectColorScheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        updateMenuColorScheme(mediaQuery.matches);
        mediaQuery.addListener(e => updateMenuColorScheme(e.matches));
    }

    function updateMenuColorScheme(isDarkMode) {
        if (isDarkMode) {
            customMenu.classList.add('dark-mode');
        } else {
            customMenu.classList.remove('dark-mode');
        }
    }

    initializeMenu();

    window.CustomRightClickMenu = { initialize: initializeMenu };
})();