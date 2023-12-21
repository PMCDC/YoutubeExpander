// background.js
console.log('YouTube Expander: Background script loaded');

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'autoFocus': true });
  chrome.storage.sync.set({ 'hotKeysForSearchBox': true });
  console.log('YouTube Expander: Default values has been applied to extension');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(changeInfo.status === 'complete' && tab.url.startsWith("https://www.youtube.com/")){
    console.log('YouTube Expander: Inserting Custom CSS...');
    chrome.scripting.insertCSS(
      { target: { tabId: tabId }, files: ['/styles/youtube.css'] }, 
      () => {console.log("Youtube Expander: CSS inserted")});
  }
});