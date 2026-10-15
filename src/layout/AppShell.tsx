import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';
import { AnimatedBackground } from './AnimatedBackground';
import { HelpFab } from './HelpFab';
import { WelcomeModal } from './WelcomeModal';
import { ToastContainer } from '@/design-system';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Sidebar />
      
      <div className="lg:ml-[var(--sidebar-width)] relative z-10 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 px-4 lg:px-8 py-6 pb-24 lg:pb-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <BottomNav />
      <HelpFab />
      <WelcomeModal />
      <ToastContainer />
    </div>
  );
};
