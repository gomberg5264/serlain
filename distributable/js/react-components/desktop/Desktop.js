"use strict";

import { panic_if_not_type } from "../../assert.js";
import { Taskbar } from "./widgets/Taskbar.js";
import { Icon } from "./widgets/Icon.js";
export function Desktop(props = {}) {
  Desktop.validate_props(props);
  const icons = [{
    title: "Netscape Navigator 1",
    imageUrl: "./img/icons/netscape-navigator-1.png"
  }, {
    title: "Netscape Navigator 3",
    imageUrl: "./img/icons/netscape-navigator-3.png"
  }, {
    title: "Netscape Navigator 4",
    imageUrl: "./img/icons/netscape-navigator-3.png"
  }, {
    title: "Internet Explorer 4",
    imageUrl: "./img/icons/internet-explorer-199x-1.png"
  }, {
    title: "Internet Explorer 5",
    imageUrl: "./img/icons/internet-explorer-199x-2.png"
  }, {
    title: "Internet Explorer 6",
    imageUrl: "./img/icons/internet-explorer-6.png"
  }, {
    title: "Mozilla Firefox 1",
    imageUrl: "/img/icons/firefox-1.png"
  }];
  return React.createElement("div", {
    className: "Desktop"
  }, icons.map((icon, idx) => React.createElement(Icon, {
    key: idx,
    tabIndex: idx + 1,
    title: icon.title,
    imageUrl: icon.imageUrl
  })), React.createElement(Taskbar, null));
}

Desktop.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  return;
};