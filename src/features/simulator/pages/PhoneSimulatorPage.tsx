import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Scenario, ScenarioAction } from '@/types';
import { mockApi } from '@/services/mockApi';
import { useScenario } from '../engine/useScenario';
import { PhoneFrame } from '../device/PhoneFrame';
import { NotificationShade } from '../device/NotificationShade';
import { HomeScreen } from '../device/HomeScreen';
import { MessagesApp } from '../device/apps/MessagesApp';
import { BrowserApp } from '../device/apps/BrowserApp';
import { BankApp } from '../device/apps/BankApp';
import { SettingsApp } from '../device/apps/SettingsApp';
import { PhoneApp } from '../device/apps/PhoneApp';
import { GuidanceCoach } from '../components/GuidanceCoach';
import { OutcomeScreen } from '../components/OutcomeScreen';
import { Button, EmptyState, SkeletonList } from '@/design-system';
import { ArrowLeft, RotateCcw, Smartphone } from 'lucide-react';

export const PhoneSimulatorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const sc = await mockApi.getScenarioById(id);
      setScenario(sc || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="container-page py-10">
        <SkeletonList count={2} />
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={<Smartphone />}
          title="Scenario Not Found"
          description="We could not find the requested practice scenario."
          action={<Button to="/practice" icon={<ArrowLeft />}>Back to Scenarios</Button>}
        />
      </div>
    );
  }

  return <ActiveSimulator scenario={scenario} onExit={() => navigate('/practice')} />;
};

const ActiveSimulator: React.FC<{ scenario: Scenario; onExit: () => void }> = ({ scenario, onExit }) => {
  const {
    state,
    currentNode,
    performAction,
    reset,
    switchApp,
    hintLevel,
    setHintLevel,
  } = useScenario(scenario);

  const [notificationOpen, setNotificationOpen] = useState(true);
  const [showHomeScreen, setShowHomeScreen] = useState(false);

  // If scenario reaches outcome, show OutcomeScreen
  if (state.isFinished && state.outcome) {
    return (
      <div className="container-page py-6">
        <OutcomeScreen
          scenario={scenario}
          outcome={state.outcome}
          history={state.history}
          onRetry={reset}
          onNextScenario={onExit}
        />
      </div>
    );
  }

  const renderActiveApp = () => {
    if (showHomeScreen) {
      return (
        <HomeScreen
          onOpenApp={(appId) => {
            setShowHomeScreen(false);
            switchApp(appId);
          }}
          activeApp={state.activeApp}
        />
      );
    }

    const app = currentNode?.app || state.activeApp;

    switch (app) {
      case 'browser':
        return currentNode ? <BrowserApp node={currentNode} onAction={performAction} /> : null;
      case 'bank':
        return currentNode ? <BankApp node={currentNode} onAction={performAction} /> : null;
      case 'settings':
        return currentNode ? <SettingsApp node={currentNode} onAction={performAction} /> : null;
      case 'phone':
        return currentNode ? <PhoneApp node={currentNode} onAction={performAction} /> : null;
      case 'messages':
      default:
        return currentNode ? (
          <MessagesApp
            node={currentNode}
            onAction={performAction}
            showRedFlags={hintLevel === 'showMe' || hintLevel === 'explain'}
          />
        ) : null;
    }
  };

  return (
    <div className="container-page space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/practice"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-3 hover:text-accent-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit Practice</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<RotateCcw />}
            onClick={reset}
          >
            Reset Phone
          </Button>
        </div>
      </div>

      {/* Simulator Workspace: Phone on left, Guidance Coach on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Phone Device column */}
        <div className="lg:col-span-7 flex flex-col items-center" data-tour="phone">
          <PhoneFrame onHomeClick={() => setShowHomeScreen((prev) => !prev)}>
            {/* Top banner notification if present */}
            {notificationOpen && currentNode?.notification && (
              <NotificationShade
                node={currentNode}
                onOpen={() => setNotificationOpen(false)}
              />
            )}

            {/* Current simulated screen */}
            {renderActiveApp()}
          </PhoneFrame>
        </div>

        {/* Guidance Coach side panel column */}
        <div className="lg:col-span-5 space-y-6">
          <GuidanceCoach
            node={currentNode}
            hintLevel={hintLevel}
            onSetHintLevel={setHintLevel}
          />

          <div className="p-4 rounded-xl border border-line bg-surface/40 text-xs text-ink-2 space-y-2">
            <span className="font-semibold text-ink block">📱 How To Use This Practice Phone:</span>
            <ul className="list-disc pl-4 space-y-1">
              <li>Tap the choices on the phone screen to respond to incoming messages.</li>
              <li>Tap the horizontal home bar at the bottom to switch apps or view the home screen.</li>
              <li>Use the coach on the right if you feel unsure what to check next.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneSimulatorPage;
