import React from "react";
import "./ripple-box.css";
interface IProps {
    children: (ref: React.RefObject<any>, contentRef?: React.RefObject<any>) => JSX.Element;
    rippleColor?: string;
}
declare const RippleBox: ({ children, rippleColor, }: IProps) => JSX.Element;
export default RippleBox;
