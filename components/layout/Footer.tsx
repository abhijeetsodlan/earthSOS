import { Leaf } from "lucide-react";

export const Footer = () => (
  <footer className="bg-primary-600 px-4 py-10 text-neutral-200 md:px-8">
    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center gap-2 text-primary-200">
          <Leaf aria-hidden />
          <span className="font-bold">Earth S.O.S.</span>
        </div>
        <p className="text-sm text-neutral-200">Climate awareness, data literacy, and practical action in one place.</p>
      </div>
      <div className="text-sm md:text-right">
        <p>Data combines public climate APIs and curated educational datasets.</p>
        <p className="mt-3">&copy; 2026 Earth S.O.S. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
