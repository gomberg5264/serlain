/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "./assert.js";

export function internet_explorer_4(browsingYear, width, height)
{
    panic_if_not_type("number", width, height, browsingYear);

    return {
        browserClassName: `internet-explorer-4 resolution-${width}x${height}`,

        // The year from which to ask the Wayback Machine to give captures for websites
        // viewed using this browser.
        browsingYear: browsingYear,

        // Create a list of the interactible buttons in the browser window.
        // Note that the buttonName property must match a known button name - the
        // action performed when the user clicks on the button will be decided based
        // on the button name (such that e.g. a button named "reload" will reload
        // the page).
        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Internet Explorer 4",
            imageUrl: "./img/icons/internet-explorer-199x-1.png",
        },

        // Strings that will be shown in the browser's message bar as a response to
        // specific events.
        messageBarStrings: {
            fetching_page_url: (url)=>`Connecting to site ${url}`,
            loading_page: (url)=>`Opening page ${url}...`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Done",
        },
    };
}

export function internet_explorer_5(browsingYear, width, height)
{
    panic_if_not_type("number", width, height, browsingYear);

    return {
        browserClassName: `internet-explorer-5 resolution-${width}x${height}`,

        browsingYear: browsingYear,

        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Internet Explorer 5",
            imageUrl: "./img/icons/internet-explorer-199x-2.png",
        },

        messageBarStrings: {
            fetching_page_url: (url)=>`Connecting to site ${url}`,
            loading_page: (url)=>`Opening page ${url}...`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Done",
        },
    };
}

export function internet_explorer_6(browsingYear, width, height)
{
    return {
        browserClassName: `internet-explorer-6 resolution-${width}x${height}`,

        browsingYear: browsingYear,

        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Internet Explorer 6",
            imageUrl: "./img/icons/internet-explorer-6.png",
        },

        messageBarStrings: {
            fetching_page_url: (url)=>`Connecting to site ${url}`,
            loading_page: (url)=>`Opening page ${url}...`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Done",
        },
    };
}

export function mozilla_firefox_1(browsingYear, width, height)
{
    return {
        browserClassName: `mozilla-firefox-1 resolution-${width}x${height}`,

        browsingYear: browsingYear,

        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Mozilla Firefox 1",
            imageUrl: "/img/icons/firefox-1.png",
        },

        messageBarStrings: {
            fetching_page_url: (url)=>`Looking up ${url}...`,
            loading_page: (url)=>`Transferring data from ${url}...`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Done",
        },
    };
}

export function netscape_navigator_1(browsingYear, width, height)
{
    return {
        browserClassName: `netscape-navigator-1 resolution-${width}x${height}`,

        browsingYear: browsingYear,

        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Netscape Navigator 1",
            imageUrl: "./img/icons/netscape-navigator-1.png",
        },

        // Strings that will be shown in the browser's message bar as a response to
        // specific events.
        messageBarStrings: {
            fetching_page_url: (url)=>`Connect: Looking up host: ${url}...`,
            loading_page: (url)=>`Transferring data from ${url}`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Document: Done",
        },
    };
}

export function netscape_navigator_3(browsingYear, width, height)
{
    return {
        browserClassName: `netscape-navigator-3 resolution-${width}x${height}`,

        browsingYear: browsingYear,

        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Netscape Navigator 3",
            imageUrl: "./img/icons/netscape-navigator-3.png",
        },

        // Strings that will be shown in the browser's message bar as a response to
        // specific events.
        messageBarStrings: {
            fetching_page_url: (url)=>`Connect: Looking up host: ${url}...`,
            loading_page: (url)=>`Transferring data from ${url}`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Document: Done",
        },
    };
}

export function netscape_navigator_4(browsingYear, width, height)
{
    return {
        browserClassName: `netscape-navigator-4 resolution-${width}x${height}`,

        browsingYear: browsingYear,

        buttons: ["reload", "home", "back", "forward"],

        desktopIcon: {
            title: "Netscape Navigator 4",
            imageUrl: "./img/icons/netscape-navigator-3.png",
        },

        // Strings that will be shown in the browser's message bar as a response to
        // specific events.
        messageBarStrings: {
            fetching_page_url: (url)=>`Connect: Looking up host: ${url}...`,
            loading_page: (url)=>`Transferring data from ${url}`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Document: Done",
        },
    };
}
