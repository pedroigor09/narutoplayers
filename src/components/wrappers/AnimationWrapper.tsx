'use client';

import { ReactNode } from 'react';

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export function AnimationWrapper({ children, className = '' }: AnimationWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
