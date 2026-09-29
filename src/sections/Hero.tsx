import React from 'react';
import { MapPin } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { TypewriterText } from '../components/TypewriterText';
import { SvgAsciiWordmark } from '../components/SvgAsciiWordmark';
import { GithubIcon, LinkedinIcon, GmailIcon, OutlookIcon, WhatsappIcon } from '../components/icons';

interface HeroProps {
  profile: DeveloperProfile;
  ready: boolean;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => (
  <section id="inicio" className="hero-section reveal-on-scroll">
    <div className="container hero-container-grid">
      <div>
        {/* Título Wordmark Vetorial SVG -> ASCII Interativo */}
        <h1 className="hero-wordmark-title">
          <span className="visually-hidden">LUIZ EDUARDO</span>
          <SvgAsciiWordmark variant="hero" />
        </h1>
        <p className="hero-headline font-subtitle">
          Desenvolvedor de Software focado em{' '}
          <TypewriterText
            words={[
              'Engenharia de IA & Agentes',
              'Desenvolvimento Fullstack React/Python',
              'Sistemas Inteligentes & LLMs'
            ]}
          />
        </p>

        <div className="hero-actions" style={{ marginTop: '28px' }}>
          <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <GithubIcon size={18} /> Ver Perfil no GitHub
          </a>
          <a
            href={profile.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <LinkedinIcon size={18} color="var(--accent-soft)" /> Conectar no LinkedIn
          </a>
        </div>

        {/* Quick Contact Pills */}
        <div className="contact-pills">
          <a href={profile.contacts.email} target="_blank" rel="noopener noreferrer" className="contact-pill">
            <GmailIcon size={16} color="var(--accent-soft)" /> Gmail
          </a>
          <a
            href={profile.contacts.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            <WhatsappIcon size={16} color="var(--accent-soft)" /> WhatsApp
          </a>
          <a
            href={profile.contacts.institutionalEmail}
            className="contact-pill"
            title="E-mail Institucional: luis.lopes@cesmac.edu.br"
          >
            <OutlookIcon size={16} color="var(--accent-soft)" /> E-mail Institucional
          </a>
          <span className="contact-pill contact-pill--static">
            <MapPin size={16} color="var(--accent-soft)" /> {profile.location}
          </span>
        </div>
      </div>
    </div>
  </section>
);
