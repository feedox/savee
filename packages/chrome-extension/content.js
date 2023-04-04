/* global chrome */

// Listen for a text selection event
document.addEventListener("mouseup", function () {
  // Get the selected text
  // const selection = window.getSelection().toString();

  // Send the selected text to the background script
  chrome.runtime.sendMessage({ Data: "this is data from contact.js" });
});

