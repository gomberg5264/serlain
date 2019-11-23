/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {Browser} from "./react-components/browser/Browser.js";

export function run_browser(container)
{
    const browser = Browser({
    });

    ReactDOM.unmountComponentAtNode(container)
    ReactDOM.render(browser, container);

    return;
}
