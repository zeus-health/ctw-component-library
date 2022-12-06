import { useState } from "react";

export type ConsentFieldProps = {
  name: string;
  text: string;
};

export function ConsentField({ name, text }: ConsentFieldProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="ctw-flex ctw-items-start ctw-space-x-2.5 ctw-rounded-lg ctw-border ctw-border-solid ctw-border-divider-main ctw-bg-bg-lighter ctw-p-4 ctw-text-content-black">
      <input
        type="checkbox"
        name={name}
        checked={enabled}
        value={String(enabled)}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <span className="ctw-text-sm">{text}</span>
    </div>
  );
}
