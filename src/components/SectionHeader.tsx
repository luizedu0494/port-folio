import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => (
  <div className="section-header" style={{ marginBottom: '32px' }}>
    <h2 className="section-title font-subtitle">
      {icon} {title}
    </h2>
  </div>
);
