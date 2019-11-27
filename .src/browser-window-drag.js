/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

// Implements dragging the browser window by its title bar with the mouse.
{
    let mouseLeftIsDown = false;
    const prevMousePos = {x:0, y:0};

    window.onmousedown = function(event)
    {
        if ((event.which !== 1) ||
            !event.target.classList.contains("TitleBar"))
        {
            return;
        }

        prevMousePos.x = Math.max(0, event.clientX);
        prevMousePos.y = Math.max(0, event.clientY);
        mouseLeftIsDown = true;

        return;
    }

    window.onmouseup = function(event)
    {
        if (event.which !== 1)
        {
            return;
        }

        mouseLeftIsDown = false;

        return;
    }

    window.onmousemove = function(event)
    {
        if (mouseLeftIsDown)
        {
            const browserElement = document.querySelector(".Browser");

            if (!browserElement)
            {
                return;
            }

            const mousePosDelta =
            {
                x: (event.clientX - prevMousePos.x),
                y: (event.clientY - prevMousePos.y),
            }

            const prevTop = Number(browserElement.style.top.replace(/\D+/g, ""));
            const prevLeft = Number(browserElement.style.left.replace(/\D+/g, ""));

            browserElement.style.top = `${Math.max(0, (prevTop + mousePosDelta.y))}px`;
            browserElement.style.left = `${Math.max(0, prevLeft + mousePosDelta.x)}px`;
        }

        prevMousePos.x = Math.max(0, event.clientX);
        prevMousePos.y = Math.max(0, event.clientY);

        return;
    }
}
