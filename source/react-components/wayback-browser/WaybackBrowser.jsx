/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";
import {BrowserWindow} from "./parts/BrowserWindow.js";
import {make_element_draggable} from "../../make-draggable.js";

// A mock browser to display content from the Wayback Machine. Provides a window that
// looks like a browser and contains a set of UI controls for navigating the browsing,
// and an <iframe> viewport for displaying external web sites as if in a real browser.
//
// See the child component(s) for descriptions of the input props.
//
export function WaybackBrowser(props = {})
{
    WaybackBrowser.validate_props(props);

    const domElement = React.useRef();

    React.useEffect(()=>
    {
        make_element_draggable(domElement.current);
    }, [domElement]);

    return <div className="WaybackBrowser"
                ref={domElement}
                style={{zIndex: props.zIndex}}
                onMouseDown={props.makeTopmost}>

               <BrowserWindow buttons={props.buttons}
                              browsingYear={props.browsingYear}
                              browserClassName={props.browserClassName}
                              messageBarStrings={props.messageBarStrings}/>

           </div>
}

WaybackBrowser.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("string", props.browserClassName);
    panic_if_not_type("function", props.makeTopmost);
    panic_if_not_type("number", props.browsingYear,
                                props.zIndex);

    panic_if_not_type("object", props.messageBarStrings);
    panic_if_not_type("function", props.messageBarStrings.fetching_page_url,
                                  props.messageBarStrings.loading_page,
                                  props.messageBarStrings.page_load_finished,
                                  props.messageBarStrings.page_load_failed);

    return;
}
