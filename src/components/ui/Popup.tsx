"use client";
import React, { useEffect, useRef } from "react";


interface PopupProps<T extends Element> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<T | null>;
  popupCss?: string
}
const Popup = <T extends Element>({
  children,
  isOpen,
  onClose,
  anchorRef,
  popupCss=""
}: PopupProps<T>) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div ref={popupRef} className={`popup ${popupCss}`}>
      {children}
    </div>
  );
};

export default Popup;
