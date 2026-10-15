import React, { useEffect, useState } from 'react';
import type { Lab, LabCategory } from '@/types';
import { mockApi } from '@/services/mockApi';
import { LabCard } from '../components/LabCard';
import { Tag, SkeletonList } from '@/design-system';
import { GraduationCap, Filter } from 'lucide-react';

export const AcademyHomePage: React.FC = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<LabCategory | 'all'>('all');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await mockApi.getLabs();
      setLabs(data);
      setLoading(false);
    }
    load();
  }, []);

  const categories: { value: LabCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Topics' },
    { value: 'scams', label: 'Scam Awareness' },
    { value: 'banking', label: 'UPI & Banking' },
    { value: 'ai-media', label: 'Deepfakes & AI' },
    { value: 'device', label: 'Device Security' },
    { value: 'ai-literacy', label: 'AI Literacy' },
  ];

  const filteredLabs = selectedCategory === 'all'
    ? labs
    : labs.filter((l) => l.category === selectedCategory);

  if (loading) {
    return (
      <div className="container-page py-8">
        <SkeletonList count={3} />
      </div>
    );
  }

  return (
    <div className="container-page space-y-8" data-tour="labs">
      {/* Top Banner */}
      <div className="pt-2">
        <span className="eyebrow block mb-1">Reality Check Academy</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink">
          Interactive Learning Labs
        </h1>
        <p className="text-sm sm:text-base text-ink-2 mt-1 max-w-2xl leading-relaxed">
          Short, friendly lessons designed for all skill levels. Learn to spot deceptive messages, verify media, and protect your digital banking without tests or stress.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none" data-tour="categories">
        <span className="uppercase font-semibold text-ink-3 mr-1 flex items-center gap-1">
          <Filter className="h-3 w-3" /> Category:
        </span>
        {categories.map((c) => (
          <Tag
            key={c.value}
            active={selectedCategory === c.value}
            onClick={() => setSelectedCategory(c.value)}
            className="text-xs shrink-0"
          >
            {c.label}
          </Tag>
        ))}
      </div>

      {/* Labs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  );
};

export default AcademyHomePage;
