"use client";

import { useEffect, useState } from "react";

const GREETING = "Hey bienvenue chez MFW";
const SUBTITLE = "Rejoins notre univers";
const MESSAGE = "Abonne toi à la newsletter pour bénéficier des -10%";

type NewsletterPopupProps = {
  onOpenChange?: (open: boolean) => void;
};

export default function NewsletterPopup({ onOpenChange }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let index = 0;
    setTypedMessage("");

    const interval = window.setInterval(() => {
      index += 1;
      setTypedMessage(MESSAGE.slice(0, index));
      if (index >= MESSAGE.length) {
        window.clearInterval(interval);
      }
    }, 70);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-[34px] border border-[#f0e4ff] bg-gradient-to-br from-[#fef9ff] via-[#fbf4ff] to-[#ecf8ff] shadow-[0_40px_160px_rgba(28,4,52,0.3)] backdrop-blur">
        <div className="flex flex-col gap-4 p-8">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-[#c28de2]">
            <span className="h-2 w-2 rounded-full bg-[#f58ed7]" />
            <span className="h-2 w-2 rounded-full bg-[#f5c78e]" />
            <span className="h-2 w-2 rounded-full bg-[#8ee9d9]" />
          </div>
          <p className="font-serif text-2xl text-[#2d1a3a]">{GREETING}</p>
          <p className="text-base text-[#5c3c70]">{SUBTITLE}</p>
          <div className="font-serif text-lg leading-relaxed text-[#433057]">
            {typedMessage}
            {typedMessage.length < MESSAGE.length && (
              <span className="ml-1 animate-pulse text-[#c28de2]">▮</span>
            )}
          </div>
          <form
            className="mt-4 flex flex-col gap-4 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setIsOpen(false);
            }}
          >
            <input
              type="email"
              required
              placeholder="email@magicworld.com"
              className="flex-1 rounded-2xl border border-[#ddc5ff] bg-white/60 px-5 py-3 font-serif text-base text-[#2c173c] placeholder:text-[#a891c5] focus:border-[#b47fe4] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-[#cf7ef4] via-[#73d7d9] to-[#9ce0c5] px-6 py-3 text-sm uppercase tracking-[0.35em] text-white shadow-[0_10px_30px_rgba(118,68,164,0.3)] transition hover:opacity-90"
            >
              enter
            </button>
          </form>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="self-start text-xs uppercase tracking-[0.35em] text-[#8f79b3] underline-offset-4 hover:underline"
          >
            plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
