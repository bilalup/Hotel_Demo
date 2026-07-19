import clsx from "clsx";

export function Container({ children, className }) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-6 md:px-10", className)}>{children}</div>;
}
