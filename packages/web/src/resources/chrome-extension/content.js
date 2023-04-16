//test for creating a new element and appending it to the body for future use

// function createSelectedTextElem(text) {
//   const div = document.createElement("div");
//   const h = document.createElement("h2");
//   const node = document.createTextNode(text);
//   h.appendChild(node);
//   div.appendChild(h);
//   document.body.appendChild(div);
// }

// function to call the Feedox API and return the response
async function getSaveeResponse(post) {
  const url = 'https://api.feedox.com/v1/ai/conversation/5579120785547-8400';
  const config = {
    headers: {
      'accept': '*/*',
      'content-type': 'application/json; charset=UTF-8',
      'accept-language': 'en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7,es;q=0.6'
    }
  };
  const data = {
    messages: [
      {
        role: 'user',
        content: "input: \"" + post + "\""
      }
    ],
    "userId": "HWYnPaVfS3aoTLVlVxmAD4ISgwi2"
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      ...config,
      body: JSON.stringify(data),
    });
    console.log(data);
    const result = await response.json();
    console.log(result);
    console.log("your post is:" + post);
    console.log("your response is:" + result[0].content);
    if (result[0].content) {
      return result[0].content;
    }
  } catch (error) {
    console.log('error');
    console.error(error);
  }
}

// function to create and show a loading indicator
// function to create and show a loading indicator
function showLoadingIndicator() {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.width = "99.9%";
  div.style.height = "99.9%";
  div.style.background = "rgba(0, 0, 0, 0.5)";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";
  div.classList.add("loader");
  const animation = document.createElement("img");
  animation.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjQxNzhiNGI1ZDhmNWRkY2E2MzEyNWQyYjUyMzQ3ZjBlMTEzZjVhNSZjdD1z/92wJiJniUcIRJyeNYF/giphy.gif";
  animation.style.width = "100px";
  animation.style.height = "100px";
  div.appendChild(animation);
  document.body.appendChild(div);
  console.log(animation)
}

// function to hide the loading indicator
function hideLoadingIndicator() {
  const loader = document.querySelector(".loader");
  console.log(loader);
  console.log(loader.parentElement);
  loader.parentElement.removeChild(loader);
}

// listener to receive message from background.js and execute getSaveeResponse function
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.text === "activate-savee") {
    const currentUrl = window.location.href;

    const { user } = await chrome.storage.sync.get();
    console.log('savee activated', user);
    if (user == null) {
      alert('You must be signed in to use Savee to generate responses. Please click on the extension icon and sign in.');
      return;
    }

    if (currentUrl.includes("twitter.com")) {
      const textArea = document.querySelector('[data-testid="tweetTextarea_0"]');
      if (textArea) {
        textArea.focus();
        showLoadingIndicator();
        getSaveeResponse(message.selection).then(response => {
          hideLoadingIndicator();
          document.execCommand("insertText", false, response);
        });
      }
    } else if (currentUrl.includes("facebook.com")) {
      const textArea = document.querySelector('[aria-label="כתיבת תגובה"]') || document.querySelector('[aria-label="Write a comment"]');
      if (textArea) {
        textArea.focus();
        showLoadingIndicator();
        getSaveeResponse(message.selection).then(response => {
          hideLoadingIndicator();
          document.execCommand("insertText", false, response);
        });
      }
    } else if (currentUrl.includes("instagram.com")) {
      const textArea = document.querySelector('[aria-label="Add a comment…"]');
      if (textArea) {
        textArea.focus();
        showLoadingIndicator();
        getSaveeResponse(message.selection).then(response => {
          hideLoadingIndicator();
          document.execCommand("insertText", false, response);
        });
      }
    } else {
      alert("Savee can only be activated on Twitter, Facebook, or Instagram.");
    }
  }
});


