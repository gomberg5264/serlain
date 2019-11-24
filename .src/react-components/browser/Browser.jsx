/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";
import {BrowserWindow} from "./parts/BrowserWindow.js";

export function Browser(props = {})
{
    Browser.validate_props(props);

    return <div className="Browser">

               <BrowserWindow naviButtons={props.naviButtons}/>

           </div>
}

Browser.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.naviButtons);

    return;
}
