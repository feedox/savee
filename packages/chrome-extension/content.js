function createSelectedTextElem(text) {
  const h = document.createElement("h2");
  const node = document.createTextNode(text);
  h.appendChild(node);
  document.body.appendChild(h);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.text === "activate-savee") {
    createSelectedTextElem(message.selection);
  }
});
