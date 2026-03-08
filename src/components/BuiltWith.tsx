import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiSupabase,
  SiFlydotio,
  SiTelegram,
  SiNodedotjs
} from '@icons-pack/react-simple-icons';

export function BuiltWith() {
  const techs = [
    { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" /> },
    { name: 'React', icon: <SiReact className="w-6 h-6" /> },
    { name: 'TypeScript', icon: <SiTypescript className="w-6 h-6" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6" /> },
    { name: 'Supabase', icon: <SiSupabase className="w-6 h-6" /> },
    { name: 'Fly.io', icon: <SiFlydotio className="w-6 h-6" /> },
    { name: 'Telegram', icon: <SiTelegram className="w-6 h-6" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="w-6 h-6" /> },
  ];

  return (
    <section className="py-12 border-t border-white/5 bg-black/20 z-10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-widest text-slate-500 uppercase mb-8">
          BUILT WITH
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {techs.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center gap-3 group cursor-default">
              <div className="text-slate-400 group-hover:text-white transition-colors duration-300">
                {tech.icon}
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
