"use strict";

import { panic_if_not_type } from "../../../assert.js";
import { WaybackBrowser } from "../../wayback-browser/WaybackBrowser.js";
import { Icon } from "./Icon.js";
export function BrowserView(props = {}) {
  BrowserView.validate_props(props);
  const [browserWindowsOpen, setBrowserWindowsOpen] = React.useState([]);
  const [topBrowserZIndex, setTopBrowserZIndex] = React.useState(0);
  const iconElements = props.availableBrowsers.map((browser, idx) => {
    return React.createElement(Icon, {
      key: idx,
      tabIndex: idx + 1,
      title: browser.desktopIcon.title,
      imageUrl: browser.desktopIcon.imageUrl,
      browsingYear: browser.browsingYear,
      onDoubleClick: () => open_browser({ ...browser
      })
    });
  });
  const browserElements = browserWindowsOpen.map((browser, idx) => {
    return React.createElement(WaybackBrowser, {
      browserClassName: browser.browserClassName,
      browsingYear: browser.browsingYear,
      buttons: browser.buttons,
      messageBarStrings: browser.messageBarStrings,
      key: browser.key,
      zIndex: browser.zIndex,
      makeTopmost: () => make_browser_topmost(idx)
    });
  });
  return React.createElement("div", {
    className: "BrowserView"
  }, iconElements, browserElements);

  function open_browser(browser) {
    browser.key = `${browser.browserClassName}-${Date.now()}`;
    browser.zIndex = topBrowserZIndex;
    setTopBrowserZIndex(topBrowserZIndex + 1);
    setBrowserWindowsOpen([...browserWindowsOpen, browser]);
    return;
  }

  function make_browser_topmost(browserWindowIdx = 0) {
    let maxZIndex = browserWindowsOpen[browserWindowIdx].zIndex;

    for (const browser of browserWindowsOpen) {
      if (browser.zIndex > maxZIndex) {
        maxZIndex = browser.zIndex;
      }

      if (browser.zIndex > browserWindowsOpen[browserWindowIdx].zIndex) {
        browser.zIndex--;
      }
    }

    browserWindowsOpen[browserWindowIdx].zIndex = maxZIndex;
    setBrowserWindowsOpen([...browserWindowsOpen]);
    return;
  }
}

BrowserView.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("array", props.availableBrowsers);
  return;
};