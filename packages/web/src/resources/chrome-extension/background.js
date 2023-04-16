//first remove all context menus and then create a context menu
chrome.contextMenus.create({
    id: "savee",
    //title: "Create a response to the text:  \"%s\" by savee",
    title: "Use savee as a response",
    contexts: ["selection"]
});


// Handle the context menu item click event
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // Check if the context menu item was clicked
    if (info.menuItemId === "savee") {
        chrome.tabs.sendMessage(tab.id, { text: "activate-savee", selection: info.selectionText });
    }
});

chrome.runtime.onConnectExternal.addListener(function (port) {
    port.onMessage.addListener(async function (msg) {
        console.log("onMessage", msg)
        if (msg?.type == 'login-success') {
            console.log('login-success!', msg.data);
            await chrome.storage.sync.set({
                user: msg.data,
            });
            chrome.runtime.sendMessage({ msg: "login-success", data: msg.data });
        } else if (msg?.type == 'logout-success') {
            console.log('logout-success!', msg.data);
            await chrome.storage.sync.set({
                user: null,
            });
            chrome.runtime.sendMessage({ msg: "logout-success", data: null });
        }
        // port.postMessage({ type: "", data: "successs" }); // send message back to page, TBD
    });
});

async function sendMessage(msg) {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.tabs.sendMessage(tab.id, msg)
}
