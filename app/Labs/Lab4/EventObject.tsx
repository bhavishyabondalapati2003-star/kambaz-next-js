"use client";
import { useState } from "react";

type BtnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);

  const handleClick = (e: BtnClickEvent) => {
    // Build a plain object (no circular refs, no mutation of React's synthetic event)
    const plain = {
      _reactName: (e as unknown as { _reactName?: string })._reactName,
      type: e.type,
      // Safe “snapshot” fields
      isTrusted: e.nativeEvent.isTrusted,
      timeStamp: e.timeStamp,
      target: (e.currentTarget as HTMLButtonElement).outerHTML,
      // Pointers / coords
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      // Modifiers / buttons
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
      button: e.button,
      buttons: e.buttons,
    };

    setEvent(plain);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
