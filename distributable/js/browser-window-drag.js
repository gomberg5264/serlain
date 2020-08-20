"use strict";

{
  const horizDragLimit = {
    left: -400,
    right: Infinity
  };
  let mouseLeftIsDown = false;
  const prevMousePos = {
    x: 0,
    y: 0
  };

  window.oncontextmenu = function (event) {
    mouseLeftIsDown = false;

    if (event.target.classList.contains("TitleBar")) {
      event.preventDefault();
      const selectorDropdown = document.getElementById("browser-selector");

      if (selectorDropdown) {
        selectorDropdown.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        selectorDropdown.style.display = "block";
      }
    }

    return;
  };

  window.close_dropdown_menus = function () {
    const selectorDropdown = document.getElementById("browser-selector");

    if (selectorDropdown) {
      selectorDropdown.style.display = "none";
    }

    return;
  };

  {
    window.onmousedown = function (event) {
      if (!event.target.classList.contains("dropdown-menu-item")) {
        window.close_dropdown_menus();
      }

      if (event.which !== 1 || !event.target.classList.contains("TitleBar")) {
        return;
      }

      prevMousePos.x = Math.max(horizDragLimit.left, event.clientX);
      prevMousePos.y = Math.max(0, event.clientY);
      mouseLeftIsDown = true;
      return;
    };

    window.onmouseup = function (event) {
      if (event.which !== 1) {
        return;
      }

      mouseLeftIsDown = false;
      return;
    };

    window.onmousemove = function (event) {
      if (mouseLeftIsDown) {
        const browserElement = document.querySelector(".WaybackBrowser");

        if (!browserElement) {
          return;
        }

        const mousePosDelta = {
          x: event.clientX - prevMousePos.x,
          y: event.clientY - prevMousePos.y
        };
        const prevTop = Number(browserElement.style.top.replace(/\D+/g, ""));
        const prevLeft = Number(browserElement.style.left.replace(/[^\d-]+/g, ""));
        browserElement.style.top = `${Math.max(0, prevTop + mousePosDelta.y)}px`;
        browserElement.style.left = `${Math.max(horizDragLimit.left, prevLeft + mousePosDelta.x)}px`;
      }

      prevMousePos.x = Math.max(horizDragLimit.left, event.clientX);
      prevMousePos.y = Math.max(0, event.clientY);
      return;
    };
  }
}