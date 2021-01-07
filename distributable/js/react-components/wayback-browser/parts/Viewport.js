"use strict";

import { panic_if_not_type } from "../../../assert.js";
export function Viewport(props = {}) {
  Viewport.validate_props(props);
  const iframeRef = React.createRef();
  props.giveCallbacks({
    reload_page,
    erase_page
  });
  return React.createElement("div", {
    className: "Viewport"
  }, React.createElement("iframe", {
    src: props.url,
    ref: iframeRef,
    onLoad: () => declare_new_page_loaded()
  }));

  function declare_new_page_loaded() {
    props.callbackNewPageLoaded();
    return;
  }

  function reload_page() {
    if (iframeRef && iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }

    return;
  }

  function erase_page() {
    if (iframeRef && iframeRef.current) {
      iframeRef.current.src = "";
    }

    return;
  }
}

Viewport.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("string", props.url);
  panic_if_not_type("function", props.callbackNewPageLoaded, props.giveCallbacks);
  return;
};