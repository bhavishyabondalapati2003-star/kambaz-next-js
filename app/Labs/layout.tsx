import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <div className="text-center mb-4">
        <TOC />
      </div>
      <div className="px-3">{children}</div>
    </div>
  );
}
