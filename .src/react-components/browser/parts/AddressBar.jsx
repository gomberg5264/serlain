/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function AddressBar(props = {})
{
    AddressBar.validate_props(props);

    return <div className="AddressBar">

               <input type="text"
                      onKeyDown={(event)=>
                      {
                          if (event.key === "Enter")
                          {
                              submit_url(event.target.value);
                          }
                      }}
                      autoFocus
                      autoComplete="false"
                      spellCheck="false"></input>

           </div>

    function submit_url(url)
    {
        panic_if_not_type("string", url);

        if (!url.length)
        {
            return;
        }

        props.callbackUrlSubmit(url);

        return;
    }
}

AddressBar.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("function", props.callbackUrlSubmit);

    return;
}
