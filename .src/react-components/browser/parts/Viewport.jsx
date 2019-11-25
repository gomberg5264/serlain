/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function Viewport(props = {})
{
    Viewport.validate_props(props);

    const iframeRef = React.createRef();

    React.useEffect(()=>
    {
        console.log("current", iframeRef.current.src);
    }, [iframeRef.current]);

    props.giveCallbacks({
        // Note: This will reload using the most recent src address WE gave. If
        // the user has navigated the frame using e.g. links inside it, reloading
        // will take him back to the original src.
        reload_page: ()=>
        {
            if (iframeRef && iframeRef.current)
            {
                iframeRef.current.src = iframeRef.current.src;
            }
        },

        // If a page is currently being loaded into the iframe, stop doing so.
        stop_page_load: ()=>{/*TODO*/},
    });

    return <div className="Viewport">

               <iframe src={props.url}
                       onLoad={()=>declare_new_page_loaded()}
                       ref={iframeRef}/>

           </div>

    function declare_new_page_loaded()
    {
        props.callbackNewPageLoaded();

        return;
    }
}

Viewport.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("string", props.url);
    panic_if_not_type("function", props.callbackNewPageLoaded, props.giveCallbacks);

    return;
}
