
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
        chrome.tabs.sendMessage(tab.id, { text: "activate-savee" });
    }
}
);
