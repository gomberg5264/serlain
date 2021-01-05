"use strict";

import { panic_if_not_type } from "../../assert.js";
import { BrowserView } from "./parts/BrowserView.js";
import { Taskbar } from "./parts/Taskbar.js";
export function Desktop(props = {}) {
  Desktop.validate_props(props);
  const [activeBrowser, setActiveBrowser] = React.useState(undefined);
  return React.createElement("div", {
    className: "Desktop"
  }, React.createElement(BrowserView, {
    availableBrowsers: props.availableBrowsers,
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