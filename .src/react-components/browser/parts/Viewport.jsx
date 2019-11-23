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
    }, [iframeRef.current])

    return <div className="Viewport">

               <iframe src={props.url}
                       onLoad={()=>declare_new_page_loaded()}
                       ref={iframeRef}/>

           </div>

    function declare_new_page_loaded()
    {
        console.log(iframeRef.current.src);
        props.callbackNewPageLoaded();

        return;
    }
}

Viewport.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("string", props.url);
    panic_if_not_type("function", props.callbackNewPageLoaded);

    return;
}
