/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type, panic} from "../../../assert.js";
import {get_wayback_url} from "../../../get-wayback-url.js";
import {AddressBar} from "./AddressBar.js";
import {MessageBar} from "./MessageBar.js";
import {TitleBar} from "./TitleBar.js";
import {Viewport} from "./Viewport.js";
import {Buttons} from "./Buttons.js";

export function BrowserWindow(props = {})
{
    BrowserWindow.validate_props(props);

    const [currentUrl, setCurrentUrl] = React.useState("/");
    const [currentMessageBarMessage, setCurrentMessageBarMessage] = React.useState("Done");

    // Functions the Viewport component gives us to interact with it.
    let viewportCallbacks =
    {
        reload_page: ()=>{},
        stop_page_load: ()=>{},
    };

    return <div className="BrowserWindow internet-explorer-4 resolution-800x600">

               <TitleBar/>

               <Buttons buttons={props.buttons}
                        callbackButtonReload={()=>{viewportCallbacks.reload_page()}}
                        callbackButtonStop={()=>{viewportCallbacks.stop_page_load()}}
                        callbackButtonClose={()=>{props.callbackExitBrowser()}}
                        callbackButtonBack={()=>window.history.back()}
                        callbackButtonForward={()=>window.history.forward()}/>

               <AddressBar callbackUrlSubmit={navigate_to_url}/>

               <Viewport url={currentUrl}
                         callbackNewPageLoaded={finish_navigating_to_url}
                         giveCallbacks={(callbacks)=>{viewportCallbacks = callbacks;}}/>

               <MessageBar message={currentMessageBarMessage}/>

           </div>

    async function navigate_to_url(url)
    {
        panic_if_not_type("string", url);

        setCurrentMessageBarMessage(props.messageBarStrings.fetching_page_url(url));

        const waybackUrl = await get_wayback_url(url, 2004);

        if (!waybackUrl)
        {
            setCurrentMessageBarMessage(props.messageBarStrings.page_load_failed(url));
        }
        else
        {
            setCurrentMessageBarMessage(props.messageBarStrings.loading_page(url));
            setCurrentUrl(waybackUrl);
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
    panic_if_not_type("function", props.callbackExitBrowser);

    panic_if_not_type("object", props.messageBarStrings);
    panic_if_not_type("function", props.messageBarStrings.fetching_page_url,
                                  props.messageBarStrings.loading_page,
                                  props.messageBarStrings.page_load_finished,
                                  props.messageBarStrings.page_load_failed);

    return;
}
