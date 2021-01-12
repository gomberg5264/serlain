"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  }, React.createElement("iframe", _extends({
    src: props.url
  }, props.html ? {
    srcDoc: props.html
  } : {}, {
    ref: iframeRef,
    onLoad: props.callbackNewPageLoaded,
    onMouseEnter: () => SerlainGlobalState.isMouseInsideBrowserViewport = true,
    onMouseLeave: () => SerlainGlobalState.isMouseInsideBrowserViewport = false
  })));

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