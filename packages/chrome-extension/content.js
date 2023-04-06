
function getSelectionText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  console.log(text);
  return text;
}

function createSelectedTextElem(text) {
  const h = document.createElement("h2");
  const node = document.createTextNode(text);
  h.appendChild(node);
  document.body.appendChild(h);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.text === "activate-savee") {
    createSelectedTextElem(getSelectionText());
  }
});
