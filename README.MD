# Decision Tree Application

This project uses a dynamic decision tree loaded via JavaScript and JSON. It guides users through a set of legal decision points, providing answers based on predefined logic derived from legal rules. Depending on whether you're running the project on a server or testing locally, follow the instructions below to configure the correct script.

## Features

- Dynamic decision tree based on legal rules.
- Allows users to answer questions and see outcomes based on their input.
- Can be tested either locally (without a server) or on a web server.
- Customizable with various background and style configurations.

## Prerequisites

- A modern web browser (Google Chrome, Firefox, Edge, etc.).
- Optional: A local or remote server for fetching JSON files.

---

## Running the Project

### 1. Running Locally Without a Server

If you're not running the project on a server and want to test locally:

1. In `index.html`, point the script tag to `decision-tree-test.js`:
   ```html
   <script src="assets/js/decision-tree-test.js"></script>
   ```
   
2. This script contains an inline version of the decision tree (written directly in the JavaScript file) and will work without needing to fetch an external JSON file, allowing for easier local testing.

3. Open the `index.html` file in a browser by double-clicking it or using the `Ctrl+O` (Cmd+O on Mac) option to open the file.

4. The decision tree questionnaire will run in the browser, allowing you to test it directly.

### 2. Running on a Server

If you're running the project on a local or remote server:

1. In `index.html`, point the script tag to `decision-tree.js`:
   ```html
   <script src="assets/js/decision-tree.js"></script>
   ```
   
2. This script will load the decision tree from the external `decision-tree.json` file located in the `assets/json/` folder.

3. Ensure that the server has permission to read the `decision-tree.json` file. If you're using a local server, you can use tools like Python’s `http.server` or Node.js `http-server` to serve the files.

4. Open your browser and navigate to the server URL (e.g., `http://localhost:8000`) to run the application.

---

## Customization Options

### Background and Styling

You can customize the appearance of the application by editing the `style.css` file in the `assets/css/` folder. For example:

- **Changing the Background Color**:
  To change the background color to something more neutral, edit the `body` element in the `style.css` file:
  
  ```css
  body {
      background-color: #f5f5f5; /* Example: Light gray */
      font-family: Arial, sans-serif;
      color: #333; /* Dark text for readability */
  }
  ```

- **Button Alignment**:
  To align the "Yes" and "No" buttons to the right, ensure the following CSS and HTML modifications are applied:
  
  ```html
  <div class="modal-footer justify-content-end" id="choices-container">
      <button class="btn btn-success" id="yes-btn" onclick="handleAnswer('yes')">Yes</button>
      <button class="btn btn-danger" id="no-btn" onclick="handleAnswer('no')">No</button>
  </div>
  ```

  This uses Bootstrap’s `justify-content-end` to align the buttons to the right.

---

## Development Process (As per Assignment Guidelines)

### 1. Rule Tree Creation
This project converts a legal rule tree into a dynamic, user-friendly decision tree. The rule tree is written in JSON format and processed by JavaScript to handle user input and navigate through the decision points. The decision tree covers various legal scenarios and provides outcomes based on legal rules.

### 2. Testing
Use the `decision-tree-test.js` to run local tests without needing a server. This version directly includes the decision tree in the script, allowing you to verify all the paths through the legal decision tree. Ensure that all possible paths through the tree are covered by creating test cases for each question and outcome.

### 3. Transformation to JSON Rule File
The rule tree has been converted into a JSON format (`decision-tree.json`), making it easy to load dynamically in a server-based environment. For automated testing and production use, this JSON rule file can be plugged into any rule engine or API.

---

## Future Work

This project can be further extended by:
- Integrating with a backend server for more complex data handling.
- Creating a microservice that exposes this decision tree as an API for use in other applications.
- Refining the design and user experience for better accessibility and usability.

---