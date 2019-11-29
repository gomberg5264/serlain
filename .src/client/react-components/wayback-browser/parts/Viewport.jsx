/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

// Provides an <iframe> to display the contents of the current page being viewed with
// a WaybackBrowser.
//
// The URL for the iframe should be provided via props.url.
//
// A function that receives callbacks should be given via props.giveCallbacks. These
// callbacks are used by the parent WaybackBrowser to direct the Viewport's operation.
//
// A function that will be called by the Viewport when the current URL has finished
// loading should be given via props.callbackNewPageLoaded. It will be passed no parameters.
//
export function Viewport(props = {})
{
    Viewport.validate_props(props);

    const iframeRef = React.createRef();

    props.giveCallbacks(
    {
        reload_page,
        erase_page,
    });

    return <div className="Viewport">

               <iframe src={props.url}
                       ref={iframeRef}
                       onLoad={()=>declare_new_page_loaded()}
                       sandbox="allow-scripts allow-forms allow-modals allow-same-origin allow-downloads-without-user-activation"/>

           </div>

    function declare_new_page_loaded()
    {
        props.callbackNewPageLoaded();

        return;
    }

    // Note: This will reload using the most recent src address WE gave. If
    // the user has navigated the frame using e.g. links inside it, reloading
    // will take him back to the original src.
    function reload_page()
    {
        if (iframeRef && iframeRef.current)
        {
            iframeRef.current.src = iframeRef.current.src;
        }

        return;
    }

    function erase_page()
    {
        if (iframeRef && iframeRef.current)
        {
            iframeRef.current.src = "";
        }

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
