<!DOCTYPE html>
<html>
    <head>
        <title>Serlain</title>
        <link rel="stylesheet" href="index.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_netscape-navigator-1_630x470.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_netscape-navigator-3_800x600.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_netscape-navigator-4_800x600.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_internet-explorer-4_800x600.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_internet-explorer-5_800x600.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_internet-explorer-6_1024x768.css">
        <link rel="stylesheet" href="./dist/assets/css/browser_mozilla-firefox-1_1024x768.css">
    </head>
    <body>
        <div id="browser-selector" class="dropdown-menu">
            <div class="dropdown-menu-header">Select an era of browsing</div>
            <div id="select-era-1996" class="dropdown-menu-item">1996 &ndash; Navigator 1.0</div>
            <div id="select-era-1997" class="dropdown-menu-item">1997 &ndash; Navigator 3.0</div>
            <div id="select-era-1998" class="dropdown-menu-item">1998 &ndash; Navigator 4.0</div>
            <div id="select-era-1999" class="dropdown-menu-item">1999 &ndash; Internet Explorer 4.0</div>
            <div id="select-era-2000" class="dropdown-menu-item">2000 &ndash; Internet Explorer 5.0</div>
            <div id="select-era-2001" class="dropdown-menu-item">2001 &ndash; Internet Explorer 6.0</div>
            <div id="select-era-2005" class="dropdown-menu-item">2005 &ndash; Firefox 1.0</div>
        </div>

        <div id="browser-container"></div>
        
        <script src="./dist/client/react/react.js"></script>
        <script src="./dist/client/react/react-dom.js"></script>
        <script type="module">
            import {run_browser} from "./dist/client/run-browser.js";
            import {internet_explorer_4,
                    internet_explorer_5,
                    internet_explorer_6,
                    netscape_navigator_1,
                    netscape_navigator_3,
                    netscape_navigator_4,
                    mozilla_firefox_1} from "./dist/client/browsers.js";

            const browserContainer = document.getElementById("browser-container");

            if (!browserContainer)
            {
                window.alert("Failed to initialize Serlain!");
                throw new Error("Failed to initialize Serlain!");
            }

            // The browsing eras available to the user to select from.
            const defaultBrowsingEra = 1999;
            const browsingEras =
            {
                "1996": netscape_navigator_1(630, 470, 1996),
                "1997": netscape_navigator_3(800, 600, 1997),
                "1998": netscape_navigator_4(800, 600, 1998),
                "1999": internet_explorer_4(800, 600, 1999),
                "2000": internet_explorer_5(800, 600, 2000),
                "2001": internet_explorer_6(1024, 768, 2001),
                "2005": mozilla_firefox_1(1024, 768, 2005),
            }

            // Run the default browser on page load.
            window.onload = function()
            {
                if (!browserContainer)
                {
                    window.alert("Critical failure: Unable to find a required DOM element.");
                }
                else
                {
                    run_browser(browsingEras[defaultBrowsingEra], browserContainer);
                }
            }

            // Wire up user interaction with the browser selector right-click menu. The menu lets
            // the user select which browser is displayed - clicking on an element launches the
            // corresponding browser.
            {
                ["select-era-1996",
                 "select-era-1997",
                 "select-era-1998",
                 "select-era-1999",
                 "select-era-2000",
                 "select-era-2001",
                 "select-era-2005"].forEach(elementId=>add_click_listener(elementId))

                function add_click_listener(elementId)
                {
                    const clickFunction = ()=>
                    {
                        // Store the browser's current screen position, so we can restore it.
                        let browserElement = browserContainer.querySelector(".Browser");
                        let top = 0;
                        let left = 0;
                        if (browserElement)
                        {
                            top = Number(browserElement.style.top.replace(/\D+/g, ""));
                            left = Number(browserElement.style.left.replace(/\D+/g, ""));
                        }

                        // Assumes the element id to be a string of the form "select-era-xxxx";
                        // where xxxx is the desired year, e.g. "select-era-1996".
                        const era = (elementId.match(/select-era-([0-9]*)/)[1] || defaultBrowsingEra);
                        run_browser(browsingEras[era], browserContainer);

                        // Move the browser to where the previous one was positioned.
                        browserElement = document.querySelector(".Browser");
                        if (browserElement)
                        {
                            browserElement.style.top = `${top}px`;
                            browserElement.style.left = `${left}px`;
                        }

                        window.close_dropdown_menus();

                        return;
                    }

                    document.getElementById(elementId).addEventListener("click", clickFunction);
                }
            }
        </script>
        <script src="./dist/client/browser-window-drag.js"></script>
    </body>
</html>
