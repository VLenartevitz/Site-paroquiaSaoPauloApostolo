import type { InfoParoquia } from "@/lib/repositorio";

/** Botão flutuante de WhatsApp presente em todas as páginas */
export default function BotaoWhatsApp({
  paroquia,
}: {
  paroquia: InfoParoquia;
}) {
  return (
    <a
      href={paroquia.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp com a secretaria"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.44 15.07L2 22l5.07-1.55A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 5.72 13.83 8.1 8.1 0 0 1-12.34-10.3A8.08 8.08 0 0 1 12.04 3.8Zm-3.3 3.5c-.18 0-.47.06-.72.33-.25.27-.95.94-.95 2.28 0 1.35.97 2.65 1.1 2.83.14.18 1.92 3.02 4.71 4.1 2.32.9 2.8.73 3.3.68.51-.05 1.63-.67 1.86-1.32.23-.65.23-1.2.16-1.32-.06-.11-.25-.18-.52-.32s-1.55-.77-1.79-.86c-.24-.09-.42-.14-.6.13-.18.28-.7.9-.85 1.08-.16.19-.31.21-.57.09-.27-.14-1.14-.43-2.17-1.34-.8-.72-1.35-1.6-1.5-1.88-.16-.27-.02-.42.12-.55.12-.13.27-.34.4-.5.14-.17.19-.29.28-.48.1-.19.05-.36-.02-.5-.07-.14-.6-1.48-.83-2.02-.2-.5-.42-.5-.6-.51h-.6Z" />
      </svg>
    </a>
  );
}
