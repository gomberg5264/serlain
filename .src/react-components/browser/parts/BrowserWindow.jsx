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

    const initialUrl = "about:blank";
 
    // We handle URLs in two parts: the website URL is the URL of the target website,
    // e.g. "microsoft.com": and the Wayback URL is the URL of the Wayback Machine's
    // capture of the target website, e.g. "web.archive.org/web/x/www.microsoft.com".
    const [websiteUrl, setWebsiteUrl] = React.useState(initialUrl);
    const [waybackUrl, setWaybackUrl] = React.useState(initialUrl);

    const [currentMessageBarMessage, setCurrentMessageBarMessage] = React.useState("Done");
    const [addressBarKey, setAddressBarKey] = React.useState(0);
    const [navigationActive, setNavigationActive] = React.useState(false);

    // Functions the Viewport component gives us to interact with it.
    let viewportCallbacks =
    {
        reload_page: ()=>{},
        stop_page_load: ()=>{},
    };

    return <div className={`BrowserWindow internet-explorer-4 resolution-800x600 ${navigationActive? "network-active" : "network-idle"}`}>

               <TitleBar/>

               <Buttons buttons={props.buttons}
                        callbackButtonReload={()=>{refresh_address_bar(); viewportCallbacks.reload_page()}}
                        callbackButtonStop={()=>{viewportCallbacks.stop_page_load()}}
                        callbackButtonClose={()=>{props.callbackExitBrowser()}}
                        callbackButtonBack={()=>window.history.back()}
                        callbackButtonForward={()=>window.history.forward()}
                        callbackButtonHome={()=>navigate_to_url(initialUrl)}/>

               <AddressBar key={addressBarKey}
                           initialUrl={websiteUrl}
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

        // The initial URL is a non-Wayback Machine page, so we don't need to query the
        // Wayback API for it.
        if (websiteUrl === initialUrl)
        {
            setWebsiteUrl(initialUrl);
            setWaybackUrl(initialUrl);
            refresh_address_bar();
            return;
        }
        else
        {
            setNavigationActive(true);
            setCurrentMessageBarMessage(props.messageBarStrings.fetching_page_url(websiteUrl));

            const waybackPage = await get_wayback_page(websiteUrl, 2004);

            if (!waybackPage)
            {
                setCurrentMessageBarMessage(props.messageBarStrings.page_load_failed(websiteUrl));
            }
            else
            {
                setWebsiteUrl(websiteUrl);
                setWaybackUrl(waybackPage.url);
                refresh_address_bar();
                setCurrentMessageBarMessage(props.messageBarStrings.loading_page(websiteUrl));
            }
        }

        return;
    }

    function finish_navigating_to_url()
    {
        setNavigationActive(false);
        setCurrentMessageBarMessage(props.messageBarStrings.page_load_finished());

        return;
    }
}

BrowserWindow.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("function", props.callbackExitBrowser);

    panic_if_not_type("object", props.messageBarStrings);
    panic_if_not_type("function", props.messageBarStrings.fetching_page_url,
                                  props.messageBarStrings.loading_page,
                                  props.messageBarStrings.page_load_finished,
                                  props.messageBarStrings.page_load_failed);

    return;
}
