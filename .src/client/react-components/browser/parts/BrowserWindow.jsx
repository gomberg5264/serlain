/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";
import {get_wayback_page} from "../../../get-wayback-page.js";
import {AddressBar} from "./AddressBar.js";
import {MessageBar} from "./MessageBar.js";
import {TitleBar} from "./TitleBar.js";
import {Viewport} from "./Viewport.js";
import {Buttons} from "./Buttons.js";

export function BrowserWindow(props = {})
{
    BrowserWindow.validate_props(props);
 
    // We handle URLs in two parts: the website URL is the URL of the target website,
    // e.g. "microsoft.com": and the Wayback URL is the URL of the Wayback Machine's
    // capture of the target website, e.g. "web.archive.org/web/x/www.microsoft.com".
    const [websiteUrl, setWebsiteUrl] = React.useState("about:serlain");
    const [waybackUrl, setWaybackUrl] = React.useState("./dist/assets/about-serlain.html");

    // Set to true while we're waiting for a response from the Serlain backend.
    const [waitingForServerResponse, setWaitingForServerResponse] = React.useState(false);

    // The current text displayed in the message/status bar.
    const [currentMessageBarMessage, setCurrentMessageBarMessage] = React.useState("Done");

    const [addressBarKey, setAddressBarKey] = React.useState(0);

    // Functions the Viewport component gives us to interact with it.
    let viewportCallbacks =
    {
        reload_page: ()=>{},
        erase_page: ()=>{},
    };

    return <div className={`BrowserWindow ${props.browserClassName} ${waitingForServerResponse? "waiting-for-network-reply" : ""}`.trim()}>

               <TitleBar/>

               <Buttons buttons={props.buttons}
                        callbackButtonReload={()=>{if (!waitingForServerResponse) {refresh_address_bar(); viewportCallbacks.reload_page();}}}
                        callbackButtonStop={()=>{if (!waitingForServerResponse) viewportCallbacks.erase_page()}}
                        callbackButtonBack={()=>{if (!waitingForServerResponse) window.history.back()}}
                        callbackButtonForward={()=>{if (!waitingForServerResponse) window.history.forward()}}
                        callbackButtonHome={()=>{if (!waitingForServerResponse) navigate_to_url("about:serlain")}}/>

               <AddressBar key={addressBarKey}
                           initialUrl={websiteUrl}
                           readOnly={waitingForServerResponse}
                           callbackUrlSubmit={navigate_to_url}/>

               <Viewport url={waybackUrl}
                         callbackNewPageLoaded={finish_navigating_to_url}
                         giveCallbacks={(callbacks)=>{viewportCallbacks = callbacks;}}/>

               <MessageBar message={currentMessageBarMessage}/>

           </div>

    function refresh_address_bar()
    {
        setAddressBarKey(addressBarKey + 1);
        return;
    }

    // Takes in a website URL (e.g. "microsoft.com"), fetches a capture of the website from
    // the Wayback Machine, and displays the captured page in the Viewport.
    async function navigate_to_url(websiteUrl)
    {
        panic_if_not_type("string", websiteUrl);

        // Don't allow queuing browsing requests.
        if (waitingForServerResponse)
        {
            return;
        }

        switch (websiteUrl)
        {
            // Certain special pages don't need to be queried from the Wayback API but
            // are instead to be loaded from local resources.
            case "about:serlain":
            {
                setWebsiteUrl("about:serlain");
                setWaybackUrl("./dist/assets/about-serlain.html");
                refresh_address_bar();

                break;
            }
            // Poll the Wayback API for a capture of the given website.
            default:
            {
                setCurrentMessageBarMessage(props.messageBarStrings.fetching_page_url(websiteUrl));

                setWaitingForServerResponse(true);
                const waybackPage = await get_wayback_page(websiteUrl, props.browsingYear);

                if (!waybackPage)
                {
                    setCurrentMessageBarMessage(props.messageBarStrings.page_load_failed(websiteUrl));
                }
                else
                {
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

    function finish_navigating_to_url()
    {
        setCurrentMessageBarMessage(props.messageBarStrings.page_load_finished());

        return;
    }
}

BrowserWindow.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("string", props.browserClassName);
    panic_if_not_type("number", props.browsingYear);

    panic_if_not_type("object", props.messageBarStrings);
    panic_if_not_type("function", props.messageBarStrings.fetching_page_url,
                                  props.messageBarStrings.loading_page,
                                  props.messageBarStrings.page_load_finished,
                                  props.messageBarStrings.page_load_failed);

    return;
}
