<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="index.css">
        <link rel="stylesheet" href="browser_internet-explorer-4_800x600.css">
        <link rel="stylesheet" href="browser_internet-explorer-6_1024x768.css">
        <link rel="stylesheet" href="browser_netscape-navigator-3_800x600.css">
    </head>
    <body>
        <div id="browser-container"></div>

        <script src="./dist/react/react.js"></script>
        <script src="./dist/react/react-dom.js"></script>
        <script type="module">
            import {run_browser} from "./dist/src/run-browser.js";
            import {internet_explorer_4,
                    internet_explorer_6,
                    netscape_navigator_3} from "./dist/src/browsers.js";

            window.onload = function()
            {
                const browserContainer = document.getElementById("browser-container");

                if (!browserContainer)
                {
                    window.alert("Critical failure: Unable to find a required DOM element.");
                }
                else
                {
                    run_browser(internet_explorer_6(1024, 768, 2004), browserContainer);
                }
            }
        </script>
        <script src="./dist/src/browser-window-drag.js"></script>
    </body>
</html>
