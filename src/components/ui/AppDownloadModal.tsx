import { useEffect } from "react";
import { X, Smartphone } from "lucide-react";

interface Props {
  onClose: () => void;
  articleTitle?: string;
}

export default function AppDownloadModal({ onClose, articleTitle }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Download the SCISA app"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center animate-fade-in-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-xl font-bold text-text-primary mb-2 leading-tight">
          Read the full story on the SCISA App
        </h2>

        {articleTitle && (
          <p className="text-sm text-primary font-semibold mb-3 line-clamp-2">
            "{articleTitle}"
          </p>
        )}

        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          Full news articles, events, and updates are available exclusively on
          the SCISA mobile app. Download it free to stay connected with the
          College of Science.
        </p>

        {/* Store buttons */}
        <div className="flex flex-col gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.scisa.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-text-primary hover:bg-black text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition"
          >
            {/* Google Play icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.33.18.7.2 1.05.06l12.04-6.96-2.75-2.75-10.34 9.65zm-1.18-20.5v17.49c0 .46.18.87.48 1.17l.1.09 9.8-9.8v-.23L2.48 2.1l-.1.09A1.63 1.63 0 0 0 2 3.26zm18.1 7.08L17.4 8.28l-2.96 2.96 2.96 2.96 2.73-1.58c.78-.45.78-1.83-.03-2.28zM4.23.18c-.35-.14-.72-.12-1.05.06l10.34 9.64 2.75-2.75L4.23.18z"/>
            </svg>
            Get it on Google Play
          </a>

          <a
            href="https://apps.apple.com/app/scisa/id000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-text-primary hover:bg-black text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition"
          >
            {/* Apple icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on the App Store
          </a>
        </div>

        <p className="mt-5 text-xs text-text-muted">
          Free to download · Available on Android &amp; iOS
        </p>
      </div>
    </div>
  );
}
