import { type ReactNode } from "react";
import { useInView } from "../hooks";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Reveal({ children, className, id }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const cls = ["reveal", inView ? "in" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={ref} id={id} className={cls}>
      {children}
    </section>
  );
}
