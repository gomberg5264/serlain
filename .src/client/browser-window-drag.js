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

    // Implement a right-click menu for the browser's title bar while we're at it.
    /// TODO: This should be in some other, more suitable source file.
    window.oncontextmenu = function(event)
    {
        mouseLeftIsDown = false;

        if (event.target.classList.contains("TitleBar"))
        {
            event.preventDefault();

            const selectorDropdown = document.getElementById("browser-selector");

            if (selectorDropdown)
            {
                selectorDropdown.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
                selectorDropdown.style.display = "block";
            }
        }

        return;
    }

    window.close_dropdown_menus = function()
    {
        const selectorDropdown = document.getElementById("browser-selector");
        if (selectorDropdown)
        {
            selectorDropdown.style.display = "none";
        }

        return;
    }

    // For mouse (non-touch screen).
    {
        window.onmousedown = function(event)
        {
            // Hide any dropdown click menus.
            if (!event.target.classList.contains("dropdown-menu-item"))
            {
                window.close_dropdown_menus();
            }

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
                const browserElement = document.querySelector(".WaybackBrowser");

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
}
