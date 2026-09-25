import React from 'react';
import { ExternalLink, Medal } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';

interface CertificationsProps {
  profile: DeveloperProfile;
}

export const Certifications: React.FC<CertificationsProps> = ({ profile }) => (
  <section id="certificacoes" className="reveal-on-scroll section-padded">
    <div className="container">
      <SectionHeader
        icon={<Medal color="var(--accent-crimson)" size={28} />}
        title="Cursos & Certificações"
      />

      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}
      >
        {profile.certifications.map((cert) => (
          <div key={cert.title} className="cert-card">
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
              <h3 className="font-subtitle cert-title">{cert.title}</h3>
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
          </div>
        ))}
      </div>
    </div>
  </section>
);
