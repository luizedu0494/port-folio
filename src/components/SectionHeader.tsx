import React from 'react';
import { ScrambleText } from './ScrambleText';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  /** ID da seção (ex: 'sobre') — ao clicar no nav, dispara scramble glitch */
  triggerId?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, triggerId }) => (
  <div className="section-header" style={{ marginBottom: '32px' }}>
    <h2
      className="section-title font-subtitle"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#f8fafc',
        cursor: 'default',
        flexWrap: 'wrap',
        maxWidth: '100%'
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, color: 'var(--accent-soft)' }}>
        {icon}
      </span>
      <ScrambleText text={title} onView hover triggerId={triggerId} />
    </h2>
  </div>
);
