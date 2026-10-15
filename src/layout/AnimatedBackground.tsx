import React from 'react';

export const AnimatedBackground: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
    <div className="mesh absolute inset-0">
      <div
        className="absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax] animate-drift rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--mesh-a), transparent 70%)' }}
      />
      <div
        className="absolute -right-[15%] top-[15%] h-[55vmax] w-[55vmax] animate-drift-slow rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, var(--mesh-b), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-[20%] left-[30%] h-[50vmax] w-[50vmax] animate-drift rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, var(--mesh-c), transparent 70%)', animationDelay: '-18s' }}
      />
    </div>

    <div
      className="absolute inset-0 opacity-40 dark:opacity-20"
      style={{
        backgroundImage: 'radial-gradient(var(--dot) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse at 50% 35%, black 40%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 35%, black 40%, transparent 85%)',
      }}
    />
  </div>
);
