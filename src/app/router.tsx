import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/layout';
import { NotFoundPage } from './NotFoundPage';

// Feature pages are code-split so the first paint stays light.
const HomePage = lazy(() => import('@/features/home/HomePage'));
const CommunityFeedPage = lazy(() => import('@/features/community/pages/CommunityFeedPage'));
const PostDetailPage = lazy(() => import('@/features/community/pages/PostDetailPage'));
const ContributorProfilePage = lazy(() => import('@/features/community/pages/ContributorProfilePage'));
const AcademyHomePage = lazy(() => import('@/features/academy/pages/AcademyHomePage'));
const LabPage = lazy(() => import('@/features/academy/pages/LabPage'));
const ScenarioPickerPage = lazy(() => import('@/features/simulator/pages/ScenarioPickerPage'));
const PhoneSimulatorPage = lazy(() => import('@/features/simulator/pages/PhoneSimulatorPage'));

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/community', element: <CommunityFeedPage /> },
      { path: '/community/post/:id', element: <PostDetailPage /> },
      { path: '/community/contributor/:id', element: <ContributorProfilePage /> },
      { path: '/academy', element: <AcademyHomePage /> },
      { path: '/academy/:slug', element: <LabPage /> },
      { path: '/practice', element: <ScenarioPickerPage /> },
      { path: '/practice/:id', element: <PhoneSimulatorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
