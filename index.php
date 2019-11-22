<!DOCTYPE html>
<html>
    <head>
        <style>
            body
            {
                background-color: black;
                color: lightgray;
            }
        </style>
    </head>
    <body>
        Hello there.
        
        <div id="browser-container"></div>

        <script src="./dist/react/react.js"></script>
        <script src="./dist/react/react-dom.js"></script>
        <script type="module">
            import {Browser} from "./dist/src/react-components/browser/Browser.js";

            const browser = Browser({
            });

            ReactDOM.render(browser, document.getElementById("browser-container"));
        </script>
    </body>
</html>
