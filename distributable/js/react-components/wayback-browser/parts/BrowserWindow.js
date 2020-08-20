"use strict";

import { panic_if_not_type } from "../../../assert.js";
import { get_wayback_page } from "../../../get-wayback-page.js";
import { AddressBar } from "./AddressBar.js";
import { MessageBar } from "./MessageBar.js";
import { TitleBar } from "./TitleBar.js";
import { Viewport } from "./Viewport.js";
import { Buttons } from "./Buttons.js";
export function BrowserWindow(props = {}) {
  BrowserWindow.validate_props(props);
  const [websiteUrl, setWebsiteUrl] = React.useState("about:serlain");
  const [waybackUrl, setWaybackUrl] = React.useState("./about-serlain.html");
  const [waitingForServerResponse, setWaitingForServerResponse] = React.useState(false);
  const [currentMessageBarMessage, setCurrentMessageBarMessage] = React.useState("Done");
  const [addressBarKey, setAddressBarKey] = React.useState(0);
  let viewportCallbacks = {
    reload_page: () => {},
    erase_page: () => {}
  };
  return React.createElement("div", {
    className: `BrowserWindow ${props.browserClassName} ${waitingForServerResponse ? "waiting-for-network-reply" : ""}`.trim()
  }, React.createElement(TitleBar, null), React.createElement(Buttons, {
    buttons: props.buttons,
    callbackButtonReload: () => {
      if (!waitingForServerResponse) {
        refresh_address_bar();
        viewportCallbacks.reload_page();
      }
    },
    callbackButtonStop: () => {
      if (!waitingForServerResponse) viewportCallbacks.erase_page();
    },
    callbackButtonBack: () => {
      if (!waitingForServerResponse) window.history.back();
    },
    callbackButtonForward: () => {
      if (!waitingForServerResponse) window.history.forward();
    },
    callbackButtonHome: () => {
      if (!waitingForServerResponse) navigate_to_url("about:serlain");
    }
  }), React.createElement(AddressBar, {
    key: addressBarKey,
    initialUrl: websiteUrl,
    readOnly: waitingForServerResponse,
    callbackUrlSubmit: navigate_to_url
  }), React.createElement(Viewport, {
    url: waybackUrl,
    callbackNewPageLoaded: finish_navigating_to_url,
    giveCallbacks: callbacks => {
      viewportCallbacks = callbacks;
    }
  }), React.createElement(MessageBar, {
    message: currentMessageBarMessage
  }));

  function refresh_address_bar() {
    setAddressBarKey(addressBarKey + 1);
    return;
  }

  async function navigate_to_url(websiteUrl) {
    panic_if_not_type("string", websiteUrl);

    if (waitingForServerResponse) {
      return;
    }

    switch (websiteUrl) {
      case "about:serlain":
        {
          setWebsiteUrl("about:serlain");
          setWaybackUrl("./about-serlain.html");
          refresh_address_bar();
          break;
        }

      default:
        {
          setCurrentMessageBarMessage(props.messageBarStrings.fetching_page_url(websiteUrl));
          setWaitingForServerResponse(true);
          const waybackPage = await get_wayback_page(websiteUrl, props.browsingYear);

          if (!waybackPage) {
            setCurrentMessageBarMessage(props.messageBarStrings.page_load_failed(websiteUrl));
          } else {
            setWebsiteUrl(websiteUrl);
            setWaybackUrl(waybackPage.url);
            setCurrentMessageBarMessage(props.messageBarStrings.loading_page(websiteUrl));
          }

          setWaitingForServerResponse(false);
          break;
        }
    }

    return;
  }

  function finish_navigating_to_url() {
    setCurrentMessageBarMessage(props.messageBarStrings.page_load_finished());
    return;
  }
}

BrowserWindow.validate_props = function (props = {}) {
  panic_if_not_type("object", props, props.buttons);
  panic_if_not_type("string", props.browserClassName);
  panic_if_not_type("number", props.browsingYear);
  panic_if_not_type("object", props.messageBarStrings);
  panic_if_not_type("function", props.messageBarStrings.fetching_page_url, props.messageBarStrings.loading_page, props.messageBarStrings.page_load_finished, props.messageBarStrings.page_load_failed);
  return;
};