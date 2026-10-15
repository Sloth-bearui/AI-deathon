import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Scenario } from '@/types';
import { mockApi } from '@/services/mockApi';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { Card, Badge, Button, SkeletonList } from '@/design-system';
import { Smartphone, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ScenarioPickerPage: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const completedIds = useSimulatorStore((s) => s.completedScenarioIds);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await mockApi.getScenarios();
      setScenarios(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="container-page py-8">
        <SkeletonList count={3} />
      </div>
    );
  }

  return (
    <div className="container-page space-y-8" data-tour="scenarios">
      {/* Top Banner */}
      <div className="pt-2">
        <span className="eyebrow block mb-1">Interactive Smartphone Sandbox</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink">
          Phone Practice Scenarios
        </h1>
        <p className="text-sm sm:text-base text-ink-2 mt-1 max-w-2xl leading-relaxed">
          Test real-life messaging and scam situations on a realistic, simulated phone. No real money, no real passwords, and zero risk.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((sc) => {
          const isDone = completedIds.includes(sc.id);
          const isGentle = sc.difficulty === 'gentle';

          return (
            <Card
              key={sc.id}
              interactive
              className="h-full flex flex-col justify-between p-6 space-y-5 transition-all duration-300 hover:border-accent/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge tone={isGentle ? 'ok' : 'accent'} size="sm">
                    {isGentle ? 'Gentle Practice' : 'Standard Scenario'}
                  </Badge>

                  {isDone && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-ok-ink">
                      <CheckCircle2 className="h-4 w-4" /> Completed
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-ink leading-snug">
                  {sc.title}
                </h3>

                <p className="text-sm text-ink-2 leading-relaxed line-clamp-3">
                  {sc.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-ink-3">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" /> ~{sc.minutes} minutes
                </span>

                <Button
                  to={`/practice/${sc.id}`}
                  variant={isDone ? 'secondary' : 'primary'}
                  size="sm"
                  iconRight={<ArrowRight />}
                >
                  {isDone ? 'Practise Again' : 'Start Practice'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioPickerPage;
