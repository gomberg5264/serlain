"use strict";

import { panic_if_not_type } from "../../../assert.js";
import { WaybackBrowser } from "../../wayback-browser/WaybackBrowser.js";
import { Icon } from "./Icon.js";
export function BrowserView(props = {}) {
  BrowserView.validate_props(props);
  const [activeBrowser, setActiveBrowser] = React.useState(props.defaultBrowser);
  const browserDesktopIcons = props.availableBrowsers.map((browser, idx) => {
    return React.createElement(Icon, {
      key: idx,
      tabIndex: idx + 1,
      title: browser.desktopIcon.title,
      imageUrl: browser.desktopIcon.imageUrl,
      browsingYear: browser.browsingYear,
      operatingSystem: browser.operatingSystem,
      onDoubleClick: () => open_browser_window(browser)
    });
  });

  const activeBrowserElement = (() => {
    if (activeBrowser) {
      return React.createElement(WaybackBrowser, {
        browserClassName: activeBrowser.browserClassName,
        browsingYear: activeBrowser.browsingYear,
        buttons: activeBrowser.buttons,
        messageBarStrings: activeBrowser.messageBarStrings,
        closeBrowser: close_active_browser_window,
        key: Date.now()
      });
    } else {
      return "";
    }
  })();

  React.useEffect(() => {
    if (activeBrowser) {
      props.callbackBrowserChanged(activeBrowser);
    }
  }, [activeBrowser]);
  return React.createElement("div", {
    className: "BrowserView"
  }, React.createElement("div", {
    className: "icons-container"
  }, browserDesktopIcons), activeBrowserElement);

  function open_browser_window(browser) {
    setActiveBrowser(browser);
    return;
  }

  function close_active_browser_window() {
    setActiveBrowser(undefined);
    return;
  }
}

BrowserView.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("array", props.availableBrowsers);
  panic_if_not_type("function", props.callbackBrowserChanged);
  return;
};