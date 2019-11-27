<!DOCTYPE html>
<html>
    <head>
        <title>Serlain</title>
        <link rel="stylesheet" href="index.css">
        <link rel="stylesheet" href="browser_netscape-navigator-1_630x470.css">
        <link rel="stylesheet" href="browser_netscape-navigator-3_800x600.css">
        <link rel="stylesheet" href="browser_netscape-navigator-4_800x600.css">
        <link rel="stylesheet" href="browser_internet-explorer-4_800x600.css">
        <link rel="stylesheet" href="browser_internet-explorer-5_800x600.css">
        <link rel="stylesheet" href="browser_internet-explorer-6_1024x768.css">
        <link rel="stylesheet" href="browser_mozilla-firefox-1_1024x768.css">
    </head>
    <body>
        <div id="browser-selector" class="dropdown-menu">
            <div class="dropdown-menu-header">Select an era of browsing</div>
            <div id="select-ns1" class="dropdown-menu-item">1996 &mdash; Navigator 1.0</div>
            <div id="select-ns3" class="dropdown-menu-item">1997 &mdash; Navigator 3.0</div>
            <div id="select-ns4" class="dropdown-menu-item">1998 &mdash; Navigator 4.0</div>
            <div id="select-ie4" class="dropdown-menu-item">1999 &mdash; Internet Explorer 4.0</div>
            <div id="select-ie5" class="dropdown-menu-item">2000 &mdash; Internet Explorer 5.0</div>
            <div id="select-ie6" class="dropdown-menu-item">2001 &mdash; Internet Explorer 6.0</div>
            <div id="select-ff1" class="dropdown-menu-item">2005 &mdash; Firefox 1.0</div>
        </div>

        <div id="browser-container"></div>

        <script src="./dist/react/react.js"></script>
        <script src="./dist/react/react-dom.js"></script>
        <script type="module">
            import {run_browser} from "./dist/src/run-browser.js";
            import {internet_explorer_4,
                    internet_explorer_5,
                    internet_explorer_6,
                    netscape_navigator_1,
                    netscape_navigator_3,
                    netscape_navigator_4,
                    mozilla_firefox_1} from "./dist/src/browsers.js";

            const browserContainer = document.getElementById("browser-container");

            // Run the default browser on page load.
            window.onload = function()
            {
                if (!browserContainer)
                {
                    window.alert("Critical failure: Unable to find a required DOM element.");
                }
                else
                {
                    run_browser(netscape_navigator_1(630, 470, 1999), browserContainer);
                }
            }

            // Wire up user interaction with the browser selector right-click menu. The menu lets
            // the user select which browser is displayed - clicking on an element launches the
            // corresponding browser.
            {
                ["select-ns1",
                 "select-ns3",
                 "select-ns4",
                 "select-ie4",
                 "select-ie5",
                 "select-ie6",
                 "select-ff1"].forEach(elementId=>add_click_listener(elementId))

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

                        switch (elementId)
                        {
                            case "select-ns1": run_browser(netscape_navigator_1(630, 470, 1996), browserContainer); break;
                            case "select-ns3": run_browser(netscape_navigator_3(800, 600, 1997), browserContainer); break;
                            case "select-ns4": run_browser(netscape_navigator_4(800, 600, 1998), browserContainer); break;
                            case "select-ie4": run_browser(internet_explorer_4(800, 600, 1999), browserContainer); break;
                            case "select-ie5": run_browser(internet_explorer_5(800, 600, 2000), browserContainer); break;
                            case "select-ie6": run_browser(internet_explorer_6(1024, 768, 2001), browserContainer); break;
                            case "select-ff1": run_browser(mozilla_firefox_1(1024, 768, 2005), browserContainer); break;
                            default: break;
                        }

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
        <script src="./dist/src/browser-window-drag.js"></script>
    </body>
</html>
