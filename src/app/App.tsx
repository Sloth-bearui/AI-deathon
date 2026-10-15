import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/layout';
import { HomePage } from '@/features/home';
import { CommunityFeed, PostDetail, SubmitClaim } from '@/features/community';
import { AcademyList, ModuleDetail } from '@/features/academy';
import { ScenarioList, PhoneSimulator } from '@/features/simulator';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/community/submit" element={<SubmitClaim />} />
          <Route path="/community/:id" element={<PostDetail />} />
          <Route path="/academy" element={<AcademyList />} />
          <Route path="/academy/:id" element={<ModuleDetail />} />
          <Route path="/practice" element={<ScenarioList />} />
          <Route path="/practice/:id" element={<PhoneSimulator />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
