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

    const inputRef = React.useRef();

    let inputFieldHasFocus = false;

    return <div className="AddressBar">

               <input type="text"
                      ref={inputRef}
                      key={props.initialUrl}
                      defaultValue={props.initialUrl}
                      onFocus={(event)=>
                      {
                          if (!inputFieldHasFocus)
                          {
                              event.target.select()
                          }

                          inputFieldHasFocus = true;
                      }}
                      onBlur={(event)=>
                      {
                          if (inputFieldHasFocus)
                          {
                              /// TODO: Clear the input field's selection.

                              if (event.target.value == "")
                              {
                                  event.target.value = props.initialUrl;
                              }
                          }

                          inputFieldHasFocus = false;
                      }}
                      onKeyDown={(event)=>
                      {
                          if (event.key === "Enter")
                          {
                              submit_url(event.target.value);
                          }
                      }}
                      autoComplete="false"
                      spellCheck="false"></input>

           </div>

    // Called when the user provides a URL via the address bar, e.g. by
    // typing in text and then pressing Enter.
    async function submit_url(url)
    {
        panic_if_not_type("string", url);

        if (!url.length)
        {
            return;
        }

        url = url.toLowerCase();

        // For conformance with how browsers normally operate, we'll want to
        // remove the address field's focus when the user submits an URL.
        if (inputRef && inputRef.current)
        {
            inputRef.current.value = url; // In case the URL had e.g. uppercase that we've now converted to lowercase.
            inputRef.current.blur();
        }

        props.callbackUrlSubmit(url);

        return;
    }
}

AddressBar.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("function", props.callbackUrlSubmit);
    panic_if_not_type("string", props.initialUrl);

    return;
}
