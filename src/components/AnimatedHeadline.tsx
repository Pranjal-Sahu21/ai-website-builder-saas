import { useEffect, useRef, useState, type ReactNode } from "react";
import "./AnimatedHeadline.css";

interface AnimatedHeadlineProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  triggerOnView?: boolean;
}

function flattenChildren(children: ReactNode): { char: string; styled?: string }[] {
  const result: { char: string; styled?: string }[] = [];

  const processNode = (node: ReactNode, styledClass?: string): void => {
    if (typeof node === "string") {
      for (const char of node) {
        result.push({ char, styled: styledClass });
      }
    } else if (typeof node === "number") {
      for (const char of String(node)) {
        result.push({ char, styled: styledClass });
      }
    } else if (Array.isArray(node)) {
      node.forEach((child) => processNode(child, styledClass));
    } else if (node && typeof node === "object" && "props" in node) {
      const element = node as React.ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;
      const childClass = element.props.className || "";
      processNode(element.props.children, childClass);
    }
  };

  processNode(children);
  return result;
}

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  as: Tag = "h1",
  children,
  className = "",
  stagger = 45,
  duration = 600,
  triggerOnView = true,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(!triggerOnView);

  useEffect(() => {
    if (!triggerOnView) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [triggerOnView]);

  const chars = flattenChildren(children);

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`animated-headline ${className}`}
      style={
        {
          "--ah-duration": `${duration}ms`,
        } as React.CSSProperties
      }
    >
      <span className="ah-sr-only">{children}</span>

      <span className="ah-letters" aria-hidden="true">
        {chars.map((item, i) => {
          const delay = i * stagger;

          if (item.char === " ") {
            return (
              <span key={i} className="ah-space">
                {"\u00A0"}
              </span>
            );
          }

          return (
            <span
              key={i}
              className={`ah-letter ${isVisible ? "ah-animate" : ""} ${item.styled || ""}`}
              style={
                {
                  "--ah-delay": `${delay}ms`,
                } as React.CSSProperties
              }
            >
              {item.char}
            </span>
          );
        })}
      </span>
    </Tag>
  );
};

export default AnimatedHeadline;
