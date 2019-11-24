/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";
import {NaviButtons} from "./NaviButtons.js";
import {AddressBar} from "./AddressBar.js";
import {TitleBar} from "./TitleBar.js";
import {Viewport} from "./Viewport.js";

export function BrowserWindow(props = {})
{
    BrowserWindow.validate_props(props);

    const [currentUrl, setCurrentUrl] = React.useState("/");

    // Functions the Viewport component gives us to interact with it.
    let viewportCallbacks =
    {
        reload_page: ()=>{},
    };

    return <div className="BrowserWindow internet-explorer-4 resolution-800x600">

               <TitleBar/>

               <NaviButtons buttons={props.naviButtons}
                            callbackButtonReload={reload_page}/>

               <AddressBar callbackUrlSubmit={(url)=>setCurrentUrl(url)}/>

               <Viewport url={currentUrl}
                         callbackNewPageLoaded={(url)=>console.log(url)}
                         giveCallbacks={(callbacks)=>{viewportCallbacks = callbacks;}}/>

           </div>

    function reload_page()
    {
        viewportCallbacks.reload_page();

        return;
    }
}

BrowserWindow.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.naviButtons);

    return;
}
