"use strict";

import { panic_if_not_type } from "../../../assert.js";
import { WaybackBrowser } from "../../wayback-browser/WaybackBrowser.js";
import { Icon } from "./Icon.js";
export function BrowserView(props = {}) {
  BrowserView.validate_props(props);
  const [browserWindowsOpen, setBrowserWindowsOpen] = React.useState([]);
  const [topBrowserIdx, setTopBrowserIdx] = React.useState(undefined);
  const iconElements = props.availableBrowsers.map((browser, idx) => {
    return React.createElement(Icon, {
      key: idx,
      tabIndex: idx + 1,
      title: browser.desktopIcon.title,
      imageUrl: browser.desktopIcon.imageUrl,
      browsingYear: browser.browsingYear,
      onDoubleClick: () => open_browser_window({ ...browser
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
      makeTopmost: () => make_browser_window_topmost(idx),
      close: () => close_browser_window(idx)
    });
  });
  React.useEffect(() => {
    props.setActiveBrowser(topBrowserIdx >= 0 ? browserWindowsOpen[topBrowserIdx] : undefined);
  }, [topBrowserIdx]);
  return React.createElement("div", {
    className: "BrowserView"
  }, iconElements, browserElements);

  function open_browser_window(browser) {
    const newWindowList = [...browserWindowsOpen, browser];
    browser.key = `${browser.browserClassName}-${Date.now()}`;
    browser.zIndex = browserWindowsOpen.length ? top_window_z_idx() + 1 : 0;
    setTopBrowserIdx(top_window_idx(newWindowList));
    setBrowserWindowsOpen(newWindowList);
    return;
  }

  function close_browser_window(browserWindowIdx = 0) {
    const targetBrowser = browserWindowsOpen[browserWindowIdx];

    for (const browser of browserWindowsOpen) {
      if (browser.zIndex > targetBrowser.zIndex) {
        browser.zIndex--;
      }
    }

    const updatedList = [...browserWindowsOpen];
    updatedList.splice(browserWindowIdx, 1);
    setTopBrowserIdx(updatedList.length ? top_window_idx(updatedList) : undefined);
    setBrowserWindowsOpen(updatedList);
    return;
  }

  function make_browser_window_topmost(browserWindowIdx = 0) {
    if (browserWindowIdx == topBrowserIdx) {
      return;
    }

    const targetBrowser = browserWindowsOpen[browserWindowIdx];
    const topZ = top_window_z_idx();

    for (const browser of browserWindowsOpen) {
      if (browser.zIndex > targetBrowser.zIndex) {
        browser.zIndex--;
      }
    }

    targetBrowser.zIndex = topZ;
    setTopBrowserIdx(browserWindowIdx);
    return;
  }

  function top_window_z_idx(windowList = undefined) {
    windowList = windowList || browserWindowsOpen;
    return windowList.length ? windowList.reduce((maxZ, browser) => Math.max(maxZ, browser.zIndex || 0), 0) : undefined;
  }

  function top_window_idx(windowList = undefined) {
    windowList = windowList || browserWindowsOpen;
    const topZ = top_window_z_idx(windowList);
    return Math.max(0, windowList.findIndex(e => e.zIndex == topZ));
  }
}

BrowserView.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("array", props.availableBrowsers);
  panic_if_not_type("function", props.setActiveBrowser);
  return;
};