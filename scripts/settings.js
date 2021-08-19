let autoFocus = document.getElementById('autoFocus');
let hotKeysForSearchBox = document.getElementById('hotKeysForSearchBox');

autoFocus.addEventListener("click", async () => {
    chrome.storage.sync.set({ 'autoFocus': autoFocus.checked });
    RefreshSettingsOnPage();
});

hotKeysForSearchBox.addEventListener("click", async () => {
    chrome.storage.sync.set({ 'hotKeysForSearchBox': hotKeysForSearchBox.checked });
    RefreshSettingsOnPage();
});

//Loading settings OnLoad
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('autoFocus', function (data) {
        autoFocus.checked = data.autoFocus
    });

    chrome.storage.sync.get('hotKeysForSearchBox', function (data) {
        hotKeysForSearchBox.checked = data.hotKeysForSearchBox
    });
}, false);

//Refresh settings on the youtube page so it can take effect instantly
async function RefreshSettingsOnPage() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.tabs.sendMessage(tab.id, {'callFunction': 'RefreshSettings'});
}
