<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div id="browser-container"></div>

        <script src="./dist/react/react.js"></script>
        <script src="./dist/react/react-dom.js"></script>
        <script type="module">
            import {run_browser} from "./dist/src/run-browser.js";
            
            run_browser(document.getElementById("browser-container"));
        </script>
        <script src="./dist/src/browser-window-drag.js"></script>
    </body>
</html>
