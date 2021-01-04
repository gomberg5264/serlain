"use strict";

import { panic_if_not_type } from "./assert.js";
import { Button } from "./react-components/wayback-browser/parts/Button.js";
export function internet_explorer_4(browsingYear, width, height) {
  panic_if_not_type("number", width, height, browsingYear);
  return {
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
    desktopIcon: {
      title: "Internet Explorer 4",
      imageUrl: "./img/icons/internet-explorer-199x-1.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Connecting to site ${url}`,
      loading_page: url => `Opening page ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  };
}
export function internet_explorer_5(browsingYear, width, height) {
  panic_if_not_type("number", width, height, browsingYear);
  return {
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
    desktopIcon: {
      title: "Internet Explorer 5",
      imageUrl: "./img/icons/internet-explorer-199x-2.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Connecting to site ${url}`,
      loading_page: url => `Opening page ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  };
}
export function internet_explorer_6(browsingYear, width, height) {
  return {
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
    desktopIcon: {
      title: "Internet Explorer 6",
      imageUrl: "./img/icons/internet-explorer-6.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Connecting to site ${url}`,
      loading_page: url => `Opening page ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  };
}
export function mozilla_firefox_1(browsingYear, width, height) {
  return {
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
    desktopIcon: {
      title: "Mozilla Firefox 1",
      imageUrl: "/img/icons/firefox-1.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Looking up ${url}...`,
      loading_page: url => `Transferring data from ${url}...`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Done"
    }
  };
}
export function netscape_navigator_1(browsingYear, width, height) {
  return {
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
    desktopIcon: {
      title: "Netscape Navigator 1",
      imageUrl: "./img/icons/netscape-navigator-1.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Connect: Looking up host: ${url}...`,
      loading_page: url => `Transferring data from ${url}`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Document: Done"
    }
  };
}
export function netscape_navigator_3(browsingYear, width, height) {
  return {
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
    desktopIcon: {
      title: "Netscape Navigator 3",
      imageUrl: "./img/icons/netscape-navigator-3.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Connect: Looking up host: ${url}...`,
      loading_page: url => `Transferring data from ${url}`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Document: Done"
    }
  };
}
export function netscape_navigator_4(browsingYear, width, height) {
  return {
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
    desktopIcon: {
      title: "Netscape Navigator 4",
      imageUrl: "./img/icons/netscape-navigator-3.png"
    },
    messageBarStrings: {
      fetching_page_url: url => `Connect: Looking up host: ${url}...`,
      loading_page: url => `Transferring data from ${url}`,
      page_load_failed: url => `Unable to connect to site ${url}`,
      page_load_finished: () => "Document: Done"
    }
  };
}