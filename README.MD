# Decision Tree Application

This project uses a dynamic decision tree loaded via JavaScript and JSON. Depending on whether you're running the project on a server or testing locally, follow the instructions below to configure the correct script.

### Running on a Server?

If you're running the project on a local server (or a remote server):

1. In `index.html`, point the script tag to `decision-tree.js`:
   ```html
   <script src="assets/js/decision-tree.js"></script>
   ```
2. This script will load the decision tree from the external `decision-tree.json` file located in the `assets/json/` folder.

### Not using a Server?

If you're not running the project on a server and want to test locally:

1. In `index.html`, point the script tag to `decision-tree-test.js`:
   ```html
   <script src="assets/js/decision-tree-test.js"></script>
   ```
2. This script contains an inline version of the decision tree and will work without needing to fetch an external JSON file, allowing for easier local testing.