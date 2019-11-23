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

export function BrowserWindow(props = {})
{
    BrowserWindow.validate_props(props);

    const [currentUrl, setCurrentUrl] = React.useState("/");

    return <div className="BrowserWindow internet-explorer-4 resolution-800x600">

               <AddressBar callbackUrlSubmit={(url)=>setCurrentUrl(url)}/>
               <TitleBar/>
               <Viewport url={currentUrl}
                         callbackNewPageLoaded={(url)=>console.log(url)}/>

           </div>
}

BrowserWindow.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
