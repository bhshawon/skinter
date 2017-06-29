## Prerequisites
1. Node.js and NPM
2. Chrome
3. [Extension reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid?hl=en-US) for chrome.

## Installation
1. Clone the repository.
2. Run npm install.

## Running
1. Go to chrome://extensions and check the `Developer mode` option. Select `load unpacked extension` option. Select the `dist` folder in repository from folder selection window.
2. When developing, run npm start to enable auto transpilation through babel upon modification. To see the change reflected in chrome, click the `Extensions reloader` icon on extensions bar and reload the current page.
