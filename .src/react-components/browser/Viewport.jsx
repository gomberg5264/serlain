/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: <unnamed browser thing>
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";

export function Viewport(props = {})
{
    Viewport.validate_props(props);

    return <div className="Viewport">
               <iframe src={props.url} crossOrigin="anonymous"/>
           </div>
}

Viewport.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("string", props.url);

    return;
}
