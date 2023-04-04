/* global chrome */

//create context menu
chrome.contextMenus.create({
    id: "savee",
    title: "Create a response to the text:  \"%s\" by savee",
    contexts: ["selection"]
});


// Handle the context menu item click event
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // Check if the context menu item was clicked
    if (info.menuItemId === "savee") {
        // Get the selected text
        var selectedText = info.selectionText;

        // Get the position of the selection
        var selectionPosition = {
            top: info.clientY,
            left: info.clientX
        };

        chrome.popupWindow = chrome.windows.create({
            type: "popup",
            url: "popup.html",
            width: 100,
            height: 50,
            left: selectionPosition.left,
            top: selectionPosition.top
        }, function (popupWindow) {
            // Send the selected text to the popup window
            chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                if (message === "getSelectedText") {
                    sendResponse(selectedText);
                }
            });
        });
    }
});







