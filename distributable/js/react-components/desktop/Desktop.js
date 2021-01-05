"use strict";

import { panic_if_not_type } from "../../assert.js";
import { BrowserView } from "./parts/BrowserView.js";
import { Taskbar } from "./parts/Taskbar.js";
export function Desktop(props = {}) {
  Desktop.validate_props(props);
  const [activeBrowser, setActiveBrowser] = React.useState(props.availableBrowsers[4]);
  const themeClassName = activeBrowser ? activeBrowser.operatingSystem.toLowerCase().replace(/[ .]/g, "-") : "generic";
  return React.createElement("div", {
    className: `Desktop theme-${themeClassName}`
  }, React.createElement(BrowserView, {
    availableBrowsers: props.availableBrowsers,
    defaultBrowser: activeBrowser,
    callbackBrowserChanged: browser => setActiveBrowser(browser)
  }), React.createElement(Taskbar, {
    browsingYear: activeBrowser ? activeBrowser.browsingYear : new Date().getFullYear()
  }));
}

Desktop.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("array", props.availableBrowsers);
  return;
};