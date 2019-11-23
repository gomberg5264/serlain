/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: <unnamed browser thing>
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";
import {AddressBar} from "./AddressBar.js";
import {TitleBar} from "./TitleBar.js";
import {Viewport} from "./Viewport.js";

export function Browser(props = {})
{
    Browser.validate_props(props);

    return <div className="Browser internet-explorer-4_800x600">

               <AddressBar/>
               <TitleBar/>
               <Viewport url="/"/>

           </div>
}

Browser.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
