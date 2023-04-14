import React from "react";

let tmp = 0;

const RippleBox = ({ children }: { children: (ref: React.RefObject<any>) => JSX.Element }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const element = ref.current! as HTMLElement;
    let rippleIdForRemove: string | null = null;

    element.style.overflow = "hidden";
    element.style.position = "relative";

    const handleMouseDown = (e: MouseEvent) => {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = e.offsetX + "px";
      ripple.style.top = e.offsetY + "px";
      ripple.style.width = element.offsetWidth + "px";
      ripple.style.height = element.offsetWidth + "px";
      ripple.id = "ripple-" + tmp;
      rippleIdForRemove = "ripple-" + tmp;
      tmp++;
      element.appendChild(ripple);
      setTimeout(() => ripple.classList.add("slower"), 300);
    };

    const handleRemoveRipple = () => {
      if (!rippleIdForRemove) return;
      let localRippleForRemove = rippleIdForRemove;
      (document.querySelector("#" + localRippleForRemove) as HTMLElement)?.classList.add("hide");
      setTimeout(() => {
        if (localRippleForRemove !== null)
          (document.querySelector("#" + localRippleForRemove) as HTMLElement)?.remove();
      }, 300);
    };

    element.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleRemoveRipple);
  }, []);

  return children(ref);
};

export default RippleBox;
