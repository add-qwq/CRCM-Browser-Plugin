chrome.storage.sync.get(['fontAwesomeSource', 'enableCustomMenu'], (data) => {
    document.getElementById('fontAwesomeSource').value = data.fontAwesomeSource || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.getElementById('enableCustomMenu').checked = data.enableCustomMenu !== false;
});

document.getElementById('saveSettings').addEventListener('click', () => {
    const fontAwesomeSource = document.getElementById('fontAwesomeSource').value;
    const enableCustomMenu = document.getElementById('enableCustomMenu').checked;

    chrome.storage.sync.set({
        fontAwesomeSource: fontAwesomeSource,
        enableCustomMenu: enableCustomMenu
    }, () => {
        alert('Settings saved!');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});