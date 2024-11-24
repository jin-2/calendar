import {
  useState,
  useEffect,
  useRef,
  RefObject,
  ReactNode,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";

type TooltipProps = {
  targetRef: RefObject<HTMLElement>;
  children: ReactNode;
  onClose: () => void;
};

const Tooltip = ({ targetRef, children, onClose }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    alignRight: false,
  });

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const alignRight = targetRect.left + tooltipRect.width > viewportWidth;

    setPosition({
      top: targetRect.bottom + window.scrollY,
      left: alignRight ? targetRect.right - tooltipRect.width : targetRect.left,
      alignRight,
    });
  };

  useLayoutEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
    };
  }, [targetRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, targetRef]);

  return createPortal(
    <StyledTooltip
      ref={tooltipRef}
      style={{
        top: position.top,
        left: position.left,
        transformOrigin: position.alignRight ? "right top" : "left top",
      }}
    >
      {children}
    </StyledTooltip>,
    document.body
  );
};

export default Tooltip;

const StyledTooltip = styled.div`
  z-index: 10;
  position: absolute;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;
