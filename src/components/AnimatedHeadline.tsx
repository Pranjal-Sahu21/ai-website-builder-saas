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

interface CharItem {
  char: string;
  styled?: string;
  isBr?: boolean;
}

function flattenChildren(children: ReactNode): CharItem[] {
  const result: CharItem[] = [];

  const processNode = (node: ReactNode, styledClass?: string): void => {
    if (node === null || node === undefined) return;

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
    } else if (typeof node === "object" && "type" in node) {
      const element = node as any;
      if (element.type === "br" || element.type === "BR") {
        result.push({ char: "\n", isBr: true });
      } else if (element.props) {
        const childClass = element.props.className || "";
        processNode(
          element.props.children,
          childClass ? `${styledClass || ""} ${childClass}`.trim() : styledClass
        );
      }
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

  // Group characters into words to prevent letters of a single word wrapping across lines
  type WordItem = {
    isSpace?: boolean;
    isBr?: boolean;
    letters?: CharItem[];
  };

  const groupIntoWords = (items: CharItem[]): WordItem[] => {
    const words: WordItem[] = [];
    let currentWord: CharItem[] = [];

    for (const item of items) {
      if (item.isBr) {
        if (currentWord.length > 0) {
          words.push({ letters: currentWord });
          currentWord = [];
        }
        words.push({ isBr: true });
      } else if (item.char === " ") {
        if (currentWord.length > 0) {
          words.push({ letters: currentWord });
          currentWord = [];
        }
        words.push({ isSpace: true });
      } else {
        currentWord.push(item);
      }
    }

    if (currentWord.length > 0) {
      words.push({ letters: currentWord });
    }

    return words;
  };

  const words = groupIntoWords(chars);

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
        {(() => {
          let globalIndex = 0;
          return words.map((word, wordIdx) => {
            if (word.isBr) {
              return <br key={`br-${wordIdx}`} />;
            }

            if (word.isSpace) {
              globalIndex++;
              return (
                <span key={`space-${wordIdx}`} className="ah-space">
                  {"\u00A0"}
                </span>
              );
            }

            return (
              <span
                key={`word-${wordIdx}`}
                className="ah-word"
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
              >
                {word.letters?.map((item, letterIdx) => {
                  const delay = globalIndex * stagger;
                  globalIndex++;

                  return (
                    <span
                      key={`letter-${letterIdx}`}
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
            );
          });
        })()}
      </span>
    </Tag>
  );
};

export default AnimatedHeadline;
