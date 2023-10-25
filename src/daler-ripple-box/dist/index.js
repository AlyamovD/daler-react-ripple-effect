import React from "react";
import { v4 as uuid } from "uuid";
import "./ripple-box.css";
const detectMob = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
};
const RippleBox = ({ children, rippleColor = "rgba(255, 255, 255, 0.2)" }) => {
    const ref = React.useRef();
    const contentRef = React.useRef();
    React.useEffect(() => {
        const element = ref.current;
        const contentElement = contentRef.current;
        let rippleIdForRemove = null;
        element.style.overflow = "hidden";
        element.style.position = "relative";
        if (contentElement)
            contentElement.classList.add("content-NEG_WNK");
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    // This function will be called when the browser
                    // attempts to access the passive property.
                    passiveSupported = true;
                    return false;
                },
            };
            window.addEventListener("test", () => { }, options);
        }
        catch (err) {
            passiveSupported = false;
        }
        const handleMouseDown = (e) => {
            const ripple = document.createElement("span");
            if (e.button !== 0)
                return;
            const id = uuid();
            ripple.className = "ripple-NEG_WNK";
            ripple.style.background = rippleColor;
            ripple.style.left = e.offsetX + "px";
            ripple.style.top = e.offsetY + "px";
            ripple.style.width = Math.max(element.offsetWidth, element.offsetHeight) + "px";
            ripple.style.height = Math.max(element.offsetWidth, element.offsetHeight) + "px";
            ripple.id = "ripple-" + id;
            rippleIdForRemove = "#ripple-" + id;
            element.appendChild(ripple);
            setTimeout(() => ripple.classList.add("slower-NEG_WNK"), 300);
        };
        const handleTouchStart = (e) => {
            const ripple = document.createElement("span");
            const id = uuid();
            ripple.className = "ripple-NEG_WNK";
            ripple.style.background = rippleColor;
            ripple.style.left = e.touches[0].pageX - element.getBoundingClientRect().left + "px";
            ripple.style.top = e.touches[0].pageY - element.getBoundingClientRect().top + "px";
            ripple.style.width = Math.max(element.offsetWidth, element.offsetHeight) + "px";
            ripple.style.height = Math.max(element.offsetWidth, element.offsetHeight) + "px";
            ripple.id = "ripple-" + id;
            rippleIdForRemove = "#ripple-" + id;
            element.appendChild(ripple);
            setTimeout(() => ripple.classList.add("slower-NEG_WNK"), 300);
        };
        const handleRemoveRipple = () => {
            if (!rippleIdForRemove)
                return;
            const localRipple = document.querySelector(rippleIdForRemove);
            if (!localRipple)
                return;
            localRipple.style.background = "transparent";
            setTimeout(() => localRipple.remove(), 300);
        };
        if (detectMob()) {
            element.addEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchend", handleRemoveRipple);
            window.addEventListener("touchcancel", handleRemoveRipple);
            window.addEventListener("touchmove", handleRemoveRipple);
        }
        else {
            element.addEventListener("mousedown", handleMouseDown, passiveSupported ? { passive: true } : false);
            window.addEventListener("mouseup", handleRemoveRipple, passiveSupported ? { passive: true } : false);
            window.addEventListener("dragend", handleRemoveRipple, passiveSupported ? { passive: true } : false);
        }
        return () => {
            element.removeEventListener("mousedown", handleMouseDown);
            element.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchcancel", handleRemoveRipple);
            window.removeEventListener("touchend", handleRemoveRipple);
            window.removeEventListener("touchmove", handleRemoveRipple);
            window.removeEventListener("mouseup", handleRemoveRipple);
            window.removeEventListener("dragend", handleRemoveRipple);
        };
    }, [rippleColor]);
    return children(ref, contentRef);
};
export default RippleBox;
