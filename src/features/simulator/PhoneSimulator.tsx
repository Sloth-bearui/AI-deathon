import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Battery, Wifi, Signal, Shield, CheckCircle2, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button, Card, Badge } from '@/design-system';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { cn } from '@/utils/cn';
import fakeKycData from '@/data/scenarios/fake-kyc-sms.json';
import upiCollectData from '@/data/scenarios/upi-collect-trick.json';

interface NodeContent {
  title?: string;
  body: string;
  sender?: string;
  url?: string;
}

interface ScenarioAction {
  id: string;
  label: string;
  nextNodeId: string;
  isSafe?: boolean;
  commentary?: string;
}

interface ScenarioNode {
  id: string;
  type: string;
  content: NodeContent;
  actions: ScenarioAction[];
  flags?: Record<string, unknown>;
}

interface ScenarioData {
  id: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: ScenarioNode[];
}

const scenarioDataMap: Record<string, ScenarioData> = {
  'fake-kyc-sms': fakeKycData as unknown as ScenarioData,
  'upi-collect-trick': upiCollectData as unknown as ScenarioData,
};

export const PhoneSimulator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { completeScenario } = useSimulatorStore();

  const scenario = scenarioDataMap[id || ''];
  const [currentNodeId, setCurrentNodeId] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<ScenarioAction | null>(null);
  const [showCommentary, setShowCommentary] = useState(false);
  const [history, setHistory] = useState<Array<{ nodeId: string; actionId: string; safe: boolean; label: string }>>([]);
  const [finished, setFinished] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Initialize
  useEffect(() => {
    if (scenario) {
      setCurrentNodeId(scenario.startNodeId);
    }
  }, [scenario]);

  const currentNode = scenario?.nodes.find((n) => n.id === currentNodeId);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentNodeId, showCommentary]);

  // If scenario not found, use fallback
  if (!scenario) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-lg mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate('/practice')}>
          <ArrowLeft size={16} /> Back
        </Button>
        <Card className="p-8 text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="font-heading text-xl font-bold mb-2">Coming Soon</h2>
          <p className="text-[var(--color-text-secondary)] mb-4">
            This scenario is still being developed. Try one of the available scenarios.
          </p>
          <Button onClick={() => navigate('/practice')}>Back to Scenarios</Button>
        </Card>
      </motion.div>
    );
  }

  const handleAction = (action: ScenarioAction) => {
    setSelectedAction(action);
    setShowCommentary(true);
  };

  const handleContinue = () => {
    if (!selectedAction) return;

    const newHistory = [...history, {
      nodeId: currentNodeId,
      actionId: selectedAction.id,
      safe: selectedAction.isSafe !== false,
      label: selectedAction.label,
    }];
    setHistory(newHistory);

    // Check if the next node is an outcome or end
    const nextNode = scenario.nodes.find((n) => n.id === selectedAction.nextNodeId);
    if (nextNode?.type === 'outcome' || !nextNode) {
      // Show the outcome node first, then finish
      if (nextNode) {
        setCurrentNodeId(nextNode.id);
      }
      setFinished(true);
      completeScenario(id || '');
    } else {
      setCurrentNodeId(selectedAction.nextNodeId);
    }

    setSelectedAction(null);
    setShowCommentary(false);
  };

  const handleRestart = () => {
    setCurrentNodeId(scenario.startNodeId);
    setSelectedAction(null);
    setShowCommentary(false);
    setHistory([]);
    setFinished(false);
  };

  const safeCount = history.filter((h) => h.safe).length;
  const totalSteps = history.length;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  // Results screen
  if (finished) {
    const outcomeNode = currentNode;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate('/practice')}>
          <ArrowLeft size={16} /> Back to scenarios
        </Button>

        <Card className="p-8 text-center">
          <div className="text-5xl mb-4">{safeCount === totalSteps ? '🎉' : safeCount > 0 ? '👍' : '⚠️'}</div>
          <h2 className="font-heading text-2xl font-bold mb-2">
            {outcomeNode?.content.title || (safeCount === totalSteps ? 'Perfect Score!' : 'Room to Learn')}
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-4 whitespace-pre-line text-sm">
            {outcomeNode?.content.body || ''}
          </p>
          <p className="text-accent font-medium mb-6">
            You made {safeCount} safe choice{safeCount !== 1 ? 's' : ''} out of {totalSteps} decision{totalSteps !== 1 ? 's' : ''}.
          </p>

          {/* Decision recap */}
          <div className="space-y-3 text-left mb-8">
            {history.map((h, i) => (
              <div key={i} className={cn(
                'p-4 rounded-card border',
                h.safe ? 'border-emerald-400/30 bg-emerald-400/5' : 'border-red-400/30 bg-red-400/5'
              )}>
                <div className="flex items-center gap-2 mb-1">
                  {h.safe ? <CheckCircle2 size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-red-400" />}
                  <span className="text-sm font-medium">Decision {i + 1}</span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{h.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button onClick={handleRestart}>
              <RotateCcw size={16} /> Try Again
            </Button>
            <Button variant="secondary" onClick={() => navigate('/practice')}>
              More Scenarios
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!currentNode) return null;

  // Type-specific styling
  const nodeTypeIcons: Record<string, string> = {
    notification: '🔔',
    message: '💬',
    browser: '🌐',
    bank: '🏦',
    call: '📞',
    settings: '⚙️',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/practice')}>
          <ArrowLeft size={16} /> {t('common.back')}
        </Button>
        <Badge variant="default">{scenario.title}</Badge>
      </div>

      {/* Phone Frame */}
      <div className="relative mx-auto" style={{ maxWidth: '375px' }}>
        <div className="rounded-[2.5rem] border-4 border-[#1a1a2e] bg-[#0B1220] shadow-2xl shadow-black/50 overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs text-white/70">
            <span className="font-medium">{timeStr}</span>
            <div className="flex items-center gap-1.5">
              <Signal size={12} />
              <Wifi size={12} />
              <Battery size={12} />
            </div>
          </div>

          {/* Notch */}
          <div className="flex justify-center -mt-0.5 mb-1">
            <div className="w-28 h-6 bg-black rounded-b-2xl" />
          </div>

          {/* Screen content */}
          <div className="min-h-[500px] px-4 pb-6 flex flex-col">
            {/* Node type indicator */}
            <div className="text-center my-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs">
                <span>{nodeTypeIcons[currentNode.type] || '📱'}</span>
                <span>{currentNode.content.title || currentNode.type}</span>
                {currentNode.content.sender && (
                  <>
                    <span>·</span>
                    <span>{currentNode.content.sender}</span>
                  </>
                )}
              </div>
            </div>

            {/* Message area */}
            <div className="flex-1 space-y-3 py-2">
              {/* URL bar for browser type */}
              {currentNode.type === 'browser' && currentNode.content.url && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
                  <span className="text-red-400">⚠</span>
                  <span className="truncate">{currentNode.content.url}</span>
                </div>
              )}

              {/* Message bubble */}
              <motion.div
                key={currentNodeId}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  'rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line',
                  currentNode.type === 'browser'
                    ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/80 text-white/90 max-w-full'
                    : currentNode.type === 'notification'
                    ? 'bg-white/10 text-white/90 max-w-[90%]'
                    : currentNode.type === 'call'
                    ? 'bg-gradient-to-br from-green-600/80 to-green-700/80 text-white mx-auto text-center max-w-[80%]'
                    : 'bg-white/10 text-white/90 max-w-[85%]'
                )}
              >
                {currentNode.content.body}
              </motion.div>

              {/* Commentary after selection */}
              <AnimatePresence>
                {showCommentary && selectedAction && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      'rounded-2xl p-4 text-sm mx-2',
                      selectedAction.isSafe !== false
                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/20 border border-red-500/30 text-red-300'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {selectedAction.isSafe !== false
                        ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                        : <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                      }
                      <div>
                        <p className="font-medium text-xs mb-1">
                          {selectedAction.isSafe !== false ? 'Safe Choice ✓' : 'Risky Choice ✕'}
                        </p>
                        <p className="text-white/80 text-xs">
                          {selectedAction.commentary || (selectedAction.isSafe !== false ? 'Good decision!' : 'This could put you at risk.')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messageEndRef} />
            </div>

            {/* Action buttons */}
            <div className="space-y-2 mt-auto">
              {!showCommentary && currentNode.actions.map((action) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleAction(action)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm transition-all',
                    'bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 hover:border-accent/40',
                    'min-h-[48px] active:scale-[0.98]'
                  )}
                >
                  {action.label}
                </motion.button>
              ))}

              {showCommentary && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button className="w-full" onClick={handleContinue}>
                    Continue →
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Home bar */}
          <div className="flex justify-center pb-2 pt-1">
            <div className="w-32 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Safety reminder */}
      <div className="text-center">
        <p className="text-xs text-[var(--color-text-muted)] flex items-center justify-center gap-1">
          <Shield size={12} /> This is a safe simulation. No real data is involved.
        </p>
      </div>
    </motion.div>
  );
};
