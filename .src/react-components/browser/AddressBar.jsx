/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: <unnamed browser thing>
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";

export function AddressBar(props = {})
{
    AddressBar.validate_props(props);

    return <div className="AddressBar">

               <input type="text"
                      autoFocus
                      autoComplete="false"
                      spellCheck="false"></input>

           </div>
}

AddressBar.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
