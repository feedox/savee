# Savee Chrome Extension

Savee is a Chrome extension that allows users to mark text containing false content about the Holocaust on Facebook, Instagram, and Twitter and receive a response with real facts to respond to the post. The extension uses the Feedox API to generate responses based on the selected text.

## Demo

![savee_demo](https://github.com/feedox/savee/blob/master/savee_demo.gif?raw=true.gif)

## How to Run the Extension

-   To run the extension, follow the steps below:

    -   Download or clone the repository from GitHub: [link](https://github.com/feedox/savee/tree/master/packages/chrome-extension):

    -   Open Google Chrome and go to chrome://extensions/.
    -   Enable the "Developer mode" toggle on the top right-hand corner of the page.
    -   Click the "Load unpacked" button and select the chrome-extension folder from the repository. The Savee Chrome Extension should now be loaded and ready to use.

-   Note: For each update to the code, just save the files and refresh the extension at chrome://extensions/.

## Files in the Project

-   The Savee Chrome Extension project consists of the following files:

    -   manifest.json: This file contains the metadata and configuration information for the extension, including the permissions required, the background and content scripts, and the context menu item.
    -   background.js: This file sets up the context menu item for selecting text and sends a message to the content script to activate the extension when the context menu item is clicked.
    -   content.js: This file listens for messages from the background script and performs the logic for the extension. It sends a request to the Feedox API to get a response based on the selected text and inserts the response into the appropriate text area in the Facebook, Instagram, or Twitter post.
    -   package.json: This file contains the dependencies required for the development of the extension.
    -   popup.html: This file is the HTML template for the extension's popup window, which is used to display information about the extension.
    -   savee_logo.png: This file is the logo for the Savee Chrome Extension.

## Contributing:

Please feel free to contribute to the project or contact the author if you have any questions or suggestions.

[![languages and tools](https://skills.thijs.gg/icons?i=js,html)](https://skills.thijs.gg)
