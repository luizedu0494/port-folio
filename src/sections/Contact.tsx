import React from 'react';
import { DeveloperProfile } from '../types/portfolio';
import { GithubIcon, LinkedinIcon, GmailIcon, OutlookIcon, WhatsappIcon } from '../components/icons';

interface ContactProps {
  profile: DeveloperProfile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => (
  <section id="contato" className="reveal-on-scroll section-padded">
    <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
      <h2
        className="section-title font-subtitle"
        style={{ justifyContent: 'center', fontSize: '2.2rem', marginBottom: '16px' }}
      >
        Entre em Contato
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px', lineHeight: 1.7 }}>
        Disponível para atuar como <strong>Engenheiro de Software &amp; IA</strong> (posições remotas CLT/PJ), desenvolvimento de <strong>Agentes Autônomos</strong> e produtos web de alta tecnologia. Se você quer integrar inteligência artificial à sua operação, tirar uma ideia complexa do papel ou acelerar seu time — vamos conversar.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <a href={profile.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <LinkedinIcon size={18} /> Acessar Perfil no LinkedIn
        </a>
        <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <GithubIcon size={18} /> Explorar GitHub
        </a>
        <a
          href={profile.contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <WhatsappIcon size={18} color="var(--accent-soft)" /> Chamar no WhatsApp
        </a>
      </div>

      {/* Quick Email Contact Pills no Rodapé */}
      <div className="contact-pills" style={{ justifyContent: 'center', marginTop: '24px' }}>
        <a href={profile.contacts.email} target="_blank" rel="noopener noreferrer" className="contact-pill">
          <GmailIcon size={16} color="var(--accent-soft)" /> Gmail
        </a>
        <a
          href={profile.contacts.institutionalEmail}
          className="contact-pill"
          title="E-mail Institucional: luis.lopes@cesmac.edu.br"
        >
          <OutlookIcon size={16} color="var(--accent-soft)" /> E-mail Institucional
        </a>
      </div>
    </div>
  </section>
);
