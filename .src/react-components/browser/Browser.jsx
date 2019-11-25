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

               <BrowserWindow buttons={props.buttons}
                              callbackExitBrowser={()=>ReactDOM.unmountComponentAtNode(props.container)}/>

           </div>
}

Browser.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons, props.container);

    return;
}
