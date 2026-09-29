import React from 'react';
import { ExternalLink, Medal } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';
import BorderGlow from '../components/BorderGlow';

interface CertificationsProps {
  profile: DeveloperProfile;
}

export const Certifications: React.FC<CertificationsProps> = ({ profile }) => (
  <section id="certificacoes" className="reveal-on-scroll section-padded">
    <div className="container">
      <SectionHeader
        icon={<Medal color="var(--accent-soft)" size={28} />}
        title="Cursos & Certificações"
        triggerId="certificacoes"
      />

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}
      >
        {profile.certifications.map((cert) => (
          <BorderGlow
            key={cert.title}
            className="cert-card"
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#120F17"
            borderRadius={24}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <div className="cert-issuer">{cert.issuer}</div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                    title="Verificar credencial oficial"
                  >
                    Verificar <ExternalLink size={12} />
                  </a>
                )}
              </div>
              <h3 className="font-subtitle cert-title" style={{ wordBreak: 'break-word' }}>
                {cert.title}
              </h3>
              <div className="cert-meta">
                {cert.issueDate} {cert.credentialId ? `• Credencial: ${cert.credentialId}` : ''}
              </div>
            </div>

            {cert.skills && (
              <div className="tech-tags" style={{ marginTop: 'auto' }}>
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tech-tag" style={{ fontSize: '0.75rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </BorderGlow>
        ))}
      </div>
    </div>
  </section>
);
