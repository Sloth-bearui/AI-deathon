import React from 'react';
import { MessageSquare, Globe, Landmark, Settings, Phone } from 'lucide-react';

interface Props {
  onOpenApp: (appId: string) => void;
  activeApp: string;
}

export const HomeScreen: React.FC<Props> = ({ onOpenApp, activeApp }) => {
  const apps = [
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-6 w-6 text-white" />, color: 'bg-emerald-500', badge: '1' },
    { id: 'browser', label: 'Browser', icon: <Globe className="h-6 w-6 text-white" />, color: 'bg-blue-500' },
    { id: 'bank', label: 'Nova Bank', icon: <Landmark className="h-6 w-6 text-white" />, color: 'bg-teal-600' },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-6 w-6 text-white" />, color: 'bg-slate-600' },
    { id: 'phone', label: 'Phone', icon: <Phone className="h-6 w-6 text-white" />, color: 'bg-green-600' },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between p-6 select-none animate-fade-in">
      {/* Top App Grid */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-4 pt-6">
        {apps.slice(0, 4).map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpenApp(app.id)}
            className="flex flex-col items-center gap-1.5 focus:outline-none group"
          >
            <div className={`relative grid h-14 w-14 place-items-center rounded-2xl ${app.color} shadow-md group-hover:scale-105 transition-transform`}>
              {app.icon}
              {app.badge && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white font-bold text-xs flex items-center justify-center border-2 border-white">
                  {app.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-ink group-hover:text-accent-ink transition-colors">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* Dock Bar */}
      <div className="glass rounded-[24px] p-3 flex justify-around items-center border border-line/60">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpenApp(app.id)}
            className="grid h-12 w-12 place-items-center rounded-2xl hover:scale-105 transition-transform"
            title={app.label}
          >
            <div className={`grid h-11 w-11 place-items-center rounded-xl ${app.color}`}>
              {app.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
