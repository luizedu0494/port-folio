export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  genre: string;
}

export const playlist: Track[] = [
  {
    id: 'green-to-blue',
    title: 'Green to Blue (432Hz)',
    artist: 'daniel.mp3',
    src: '/assets/audio/green-to-blue-432hz.mp3',
    genre: 'Ambient / Focus'
  },
  {
    id: 'decaying-duet',
    title: 'Decaying Duet',
    artist: 'Dorian Concept',
    src: '/assets/audio/decaying-duet.mp3',
    genre: 'Electronic / Dev Flow'
  },
  {
    id: 'dark-fantasy',
    title: 'My Dark Fantasy Dream',
    artist: 'rexlity',
    src: '/assets/audio/my-dark-fantasy-dream.mp3',
    genre: 'Dreamscape'
  },
  {
    id: 'hide-cs01',
    title: 'Hide (CS01 Version)',
    artist: 'Dorian Concept',
    src: '/assets/audio/hide-cs01-version.mp3',
    genre: 'Synth / Focus'
  },
  {
    id: 'space-2',
    title: 'Space II',
    artist: 'Dorian Concept',
    src: '/assets/audio/space-ii.mp3',
    genre: 'Space Ambient'
  },
  {
    id: 'low-hope',
    title: 'Low Hope',
    artist: 'Dorian Concept',
    src: '/assets/audio/low-hope.mp3',
    genre: 'Chill / Study'
  },
  {
    id: 'echo-sax-end',
    title: 'Echo Sax End',
    artist: 'Caleb Arredondo',
    src: '/assets/audio/echo-sax-end.mp3',
    genre: 'Sax Atmospheric'
  },
  {
    id: 'rock-wont-shine',
    title: "Rock Won't Shine",
    artist: 'Dorian Concept',
    src: '/assets/audio/rock-wont-shine.mp3',
    genre: 'Electronic / Focus'
  }
];
