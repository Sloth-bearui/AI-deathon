import React from 'react';
import { Home, Compass } from 'lucide-react';
import { Button, EmptyState } from '@/design-system';

export const NotFoundPage: React.FC = () => (
  <div className="container-page py-10">
    <h1 className="sr-only">Page not found</h1>
    <EmptyState
      icon={<Compass />}
      title="We could not find that page"
      description="The link may be old or mistyped. You can go back home and choose where to go from there."
      action={<Button to="/" icon={<Home />}>Go to Home</Button>}
    />
  </div>
);
