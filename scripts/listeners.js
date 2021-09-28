//------------------------------------------------------------------------------
//Main listener of the extension. This will perform the user desired action
//
//Note: This is instanciated when the page is fully loaded
//------------------------------------------------------------------------------

//Declare settings variable
var isHotKeysForSearchBoxEnabled = true;
var isAutoFocusEnabled = true;
var youtubeUrl = 'https://www.youtube.com/';

//Load the user settings
RefreshSettings();

//Load the user settings
function RefreshSettings(){
    chrome.storage.sync.get('autoFocus', function (data) {
        isAutoFocusEnabled = data.autoFocus;
    });
    
    chrome.storage.sync.get('hotKeysForSearchBox', function(data) {
        isHotKeysForSearchBoxEnabled = data.hotKeysForSearchBox
    });
}

//Focus on the Search Box when the page is fully loaded
if (window.location.href === youtubeUrl) {
    if (isAutoFocusEnabled) {
        document.querySelector('#search-input #search').focus();
    }
}

//Focus on the Search Box if [CTRL] + [F] is pressed
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 70 && e.ctrlKey && isHotKeysForSearchBoxEnabled) {
        e.preventDefault();
        document.getElementById('search-button-narrow').click(); //When the window is very small, this will bring back the search bar
        document.querySelector('#search-input #search').focus();
    };
});

//Retreived messages from the Extension settings popup. Mostly to refresh the settings on the current page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{ 
    if(request.callFunction === 'RefreshSettings')
    {
        RefreshSettings();  
    }
});