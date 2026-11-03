type PageHeaderProps = {
  titulo: string;
  subtitulo?: string;
};

/** Cabeçalho padrão das páginas internas */
export default function PageHeader({ titulo, subtitulo }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-brand-800 text-white">
      {/* brilho dourado decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="mt-3 max-w-2xl text-lg text-brand-100/85">{subtitulo}</p>
        )}
      </div>
    </div>
  );
}
