// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'autoFocus': true });
  chrome.storage.sync.set({ 'hotKeysForSearchBox': true });
  console.log('Default values has been set for YouTube Expander');
});