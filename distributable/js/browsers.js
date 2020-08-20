"use strict";

import { panic_if_not_type } from "./assert.js";
import { WaybackBrowser } from "./react-components/wayback-browser/WaybackBrowser.js";
import { Button } from "./react-components/wayback-browser/parts/Button.js";
export function internet_explorer_4(width, height, browsingYear) {
  panic_if_not_type("number", width, height, browsingYear);
  return WaybackBrowser({
    browserClassName: `internet-explorer-4 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Connecting to site ${url}`,
      loading_page: url => `Opening page ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  });
}
export function internet_explorer_5(width, height, browsingYear) {
  panic_if_not_type("number", width, height, browsingYear);
  return WaybackBrowser({
    browserClassName: `internet-explorer-5 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Connecting to site ${url}`,
      loading_page: url => `Opening page ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  });
}
export function internet_explorer_6(width, height, browsingYear) {
  return WaybackBrowser({
    browserClassName: `internet-explorer-6 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Connecting to site ${url}`,
      loading_page: url => `Opening page ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  });
}
export function mozilla_firefox_1(width, height, browsingYear) {
  return WaybackBrowser({
    browserClassName: `mozilla-firefox-1 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Looking up ${url}...`,
      loading_page: url => `Transferring data from ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  });
}
export function netscape_navigator_1(width, height, browsingYear) {
  return WaybackBrowser({
    browserClassName: `netscape-navigator-1 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Connect: Looking up host: ${url}...`,
      loading_page: url => `Transferring data from ${url}`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Document: Done"
    }
  });
}
export function netscape_navigator_3(width, height, browsingYear) {
  return WaybackBrowser({
    browserClassName: `netscape-navigator-3 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Connect: Looking up host: ${url}...`,
      loading_page: url => `Transferring data from ${url}`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Document: Done"
    }
  });
}
export function netscape_navigator_4(width, height, browsingYear) {
  return WaybackBrowser({
    browserClassName: `netscape-navigator-4 resolution-${width}x${height}`,
    browsingYear: browsingYear,
    buttons: [React.createElement(Button, {
      buttonName: "reload",
      key: "0"
    }), React.createElement(Button, {
      buttonName: "home",
      key: "2"
    }), React.createElement(Button, {
      buttonName: "back",
      key: "4"
    }), React.createElement(Button, {
      buttonName: "forward",
      key: "5"
    })],
    messageBarStrings: {
      fetching_page_url: url => `Connect: Looking up host: ${url}...`,
      loading_page: url => `Transferring data from ${url}`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Document: Done"
    }
  });
}