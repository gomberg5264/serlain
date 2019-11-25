/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";
import {AddressBar} from "./AddressBar.js";
import {TitleBar} from "./TitleBar.js";
import {Viewport} from "./Viewport.js";
import {Buttons} from "./Buttons.js";

export function BrowserWindow(props = {})
{
    BrowserWindow.validate_props(props);

    const [currentUrl, setCurrentUrl] = React.useState("/");

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

               <AddressBar callbackUrlSubmit={(url)=>setCurrentUrl(url)}/>

               <Viewport url={currentUrl}
                         callbackNewPageLoaded={(url)=>console.log(url)}
                         giveCallbacks={(callbacks)=>{viewportCallbacks = callbacks;}}/>

           </div>
}

BrowserWindow.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("function", props.callbackExitBrowser);

    return;
}
