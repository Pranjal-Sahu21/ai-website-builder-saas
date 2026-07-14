import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColor: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

const EditorPanel = ({
  selectedElement,
  onUpdate,
  onClose,
}: EditorPanelProps) => {
  const [values, setValues] = useState(selectedElement);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Prevent dragging when interacting with input controls
    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("textarea")
    ) {
      return;
    }
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setOffset({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleChange = (field: string, value: string) => {
    if (!values) return;
    const updatedValues = {
      ...values,
      [field]: value,
    };
    if (field in values.styles) {
      updatedValues.styles = {
        ...values.styles,
        [field]: value,
      };
    }
    setValues(updatedValues);
    onUpdate({ [field]: value });
  };

  const handleStyleChange = (styleName: string, value: string) => {
    if (!values) return;
    const updatedValues = {
      ...values,
      styles: {
        ...values.styles,
        [styleName]: value,
      },
    };
    setValues(updatedValues);
    onUpdate({ styles: { [styleName]: value } });
  };

  useEffect(() => {
    setValues(selectedElement);
  }, [selectedElement]);

  if (!selectedElement || !values) return null;

  return (
    <div className="absolute top-2 right-1/2 translate-x-1/2 sm:right-2 sm:translate-x-0 w-[92vw] sm:w-80 max-w-[320px] z-[9999] pointer-events-none">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          touchAction: "none",
        }}
        className={`
          pointer-events-auto
          w-full
          max-h-[90vh] overflow-y-auto
          rounded-2xl
          bg-black
          border border-neutral-800
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
          p-5
          cursor-grab active:cursor-grabbing
          transition-[box-shadow,border-color,transform] duration-200
          ${isDragging ? "select-none shadow-[0_0_50px_rgba(166,255,93,0.12)] border-neutral-700 active:cursor-grabbing scale-[1.01] transition-none" : ""}
          animate-fade-in fade-in slide-in-from-right-5
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 select-none">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#A6FF5D] rounded-full" />
            <div>Edit element</div>
          </h3>

          <button
            onClick={onClose}
            className="
            p-1.5
            rounded-full
            text-white/60
            hover:text-[#A6FF5D]
            hover:bg-white/5
            transition
          "
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 text-sm">
          {/* Text Content */}
          <div>
            <label className="block text-xs text-[#A6FF5D] mb-2 tracking-wide select-none">
              TEXT
            </label>
            <textarea
              value={values.text}
              onChange={(e) => handleChange("text", e.target.value)}
              className="
              w-full
              bg-neutral-900
              border border-neutral-800
              rounded-xl
              p-3
              text-white
              placeholder-white/30
              resize-none
              outline-none
              focus:border-[#A6FF5D]
              focus:ring-1 focus:ring-[#A6FF5D]/40
              transition
              min-h-20
            "
            />
          </div>

          {/* Class Name */}
          <div>
            <label className="block text-xs text-[#A6FF5D] mb-2 tracking-wide select-none">
              CLASS
            </label>
            <input
              type="text"
              value={values.className || ""}
              onChange={(e) => handleChange("className", e.target.value)}
              className="
              w-full
              bg-neutral-900
              border border-neutral-800
              rounded-xl
              p-2.5
              text-white
              outline-none
              focus:border-[#A6FF5D]
              focus:ring-1 focus:ring-[#A6FF5D]/40
              transition
            "
            />
          </div>

          {/* Spacing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#A6FF5D] mb-2 select-none">PADDING</label>
              <input
                type="text"
                value={values.styles.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                className="
                w-full
                bg-neutral-900
                border border-neutral-800
                rounded-xl
                p-2.5
                text-white
                outline-none
                focus:border-[#A6FF5D]
                transition
              "
              />
            </div>

            <div>
              <label className="block text-xs text-[#A6FF5D] mb-2 select-none">MARGIN</label>
              <input
                type="text"
                value={values.styles.margin || ""}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
                className="
                w-full
                bg-neutral-900
                border border-neutral-800
                rounded-xl
                p-2.5
                text-white
                outline-none
                focus:border-[#A6FF5D]
                transition
              "
              />
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-xs text-[#A6FF5D] mb-2 select-none">FONT SIZE</label>
            <input
              type="text"
              value={values.styles.fontSize || ""}
              onChange={(e) => handleStyleChange("fontSize", e.target.value)}
              className="
              w-full
              bg-neutral-900
              border border-neutral-800
              rounded-xl
              p-2.5
              text-white
              outline-none
              focus:border-[#A6FF5D]
              transition
            "
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#A6FF5D] mb-2 select-none">
                BACKGROUND
              </label>
              <input
                type="color"
                value={
                  values.styles.backgroundColor === "rgba(0, 0, 0, 0)"
                    ? "#000000"
                    : values.styles.backgroundColor
                }
                onChange={(e) =>
                  handleStyleChange("backgroundColor", e.target.value)
                }
                className="
                w-full h-10
                rounded-xl
                border border-neutral-800
                bg-neutral-900
                cursor-pointer
              "
              />
            </div>

            <div>
              <label className="block text-xs text-[#A6FF5D] mb-2 select-none">
                TEXT COLOR
              </label>
              <input
                type="color"
                value={values.styles.color || "#ffffff"}
                onChange={(e) => handleStyleChange("color", e.target.value)}
                className="
                w-full h-10
                rounded-xl
                border border-neutral-800
                bg-neutral-900
                cursor-pointer
              "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
