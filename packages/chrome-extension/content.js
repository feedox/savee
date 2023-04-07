//test for creating a new element and appending it to the body for future use

// function createSelectedTextElem(text) {
//   const div = document.createElement("div");
//   const h = document.createElement("h2");
//   const node = document.createTextNode(text);
//   h.appendChild(node);
//   div.appendChild(h);
//   document.body.appendChild(div);
// }

function getSaveeResponse(post) {
  //here we will get the response from the server
  return "This post of yours, " + post + ", is not true. The Holocaust was and still is the most terrible world war.";
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.text === "activate-savee") {
    const response = getSaveeResponse(message.selection);
    const currentUrl = window.location.href;
    if (currentUrl.includes("twitter.com")) {
      const textArea = document.querySelector('[data-testid="tweetTextarea_0"]');
      if (textArea) {
        textArea.focus();
        document.execCommand("insertText", false, response);
      }
    } else if (currentUrl.includes("facebook.com")) {
      const textArea = document.querySelector('[aria-label="כתיבת תגובה"]') || lastCommentBox.querySelector('[aria-label="Write a comment…"]');
      if (textArea) {
        textArea.focus();
        document.execCommand("insertText", false, response);

      }
    } else if (currentUrl.includes("instagram.com")) {
      const textArea = document.querySelector('[aria-label="Add a comment…"]');
      if (textArea) {
        textArea.focus();
        document.execCommand("insertText", false, response);
      }
    } else {
      alert("Savee can only be activated on Twitter, Facebook, or Instagram.");

      //send alert in the user's language

      // chrome.i18n.detectLanguage(function (result) {
      //   console.log(result);
      //   if (result.languages[0].indexOf("he") !== -1) {
      //     alert("התוסף פועל רק בטוויטר, אינסטגרם ופייסבוק.");
      //   } else {
      //     alert("Savee can only be activated on Twitter, Facebook, or Instagram.");
      //   }
      // });
    }
  }
});

