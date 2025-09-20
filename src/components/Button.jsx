import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const variants = cva(
  [
    "flex",
    "w-full",
    "lg:w-fit",
    "min-h-13",
    "px-4",
    "py-3",
    "justify-center",
    "items-center",
    "rounded-lg",
    "text-base",
    "font-semibold",
  ],
  {
    variants: {
      state: {
        active: [""],
        disabled: [""],
      },
      style: {
        fill: [""],
        outln: ["border"],
      },
    },
    compoundVariants: [
      {
        state: "active",
        style: "fill",
        class: ["bg-menta-600 text-white hover:bg-menta-200"],
      },
      {
        state: "disabled",
        style: "fill",
        class: ["bg-gris-placeholder text-gris-border"],
      },
      {
        state: "active",
        style: "outln",
        class: [
          "border-gris-placeholder text-negro-principal hover:border-menta-200 hover:text-menta-200",
        ],
      },
      {
        state: "disabled",
        style: "outln",
        class: ["border-gris-border bg-gris-placeholder text-gris-border"],
      },
    ],
    defaultVariants: {
      state: "active",
      style: "fill",
    },
  }
);

function Button({ state, style, onClick, children, ...props }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(variants({ state, style }))}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
