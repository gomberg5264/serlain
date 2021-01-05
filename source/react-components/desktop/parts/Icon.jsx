/*
 * 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function Icon(props = {})
{
    Icon.validate_props(props);

    return <div className="Icon"
                tabIndex={props.tabIndex}
                onDoubleClick={props.onDoubleClick}
                title={`Year: ${props.browsingYear}`}>

               <div className="graphic">
                   
                   <img src={props.imageUrl}/>

               </div>

               <div className="title">{props.title}</div>

           </div>
}

Icon.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("function", props.onDoubleClick);
    panic_if_not_type("number", props.browsingYear);
    panic_if_not_type("string", props.title,
                                props.imageUrl);

    return;
}
