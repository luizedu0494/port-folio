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
    src: '/assets/audio/daniel.mp3 - green to blue (432hz) - 棒Boti棒 (youtube).mp3',
    genre: 'Ambient / Focus'
  },
  {
    id: 'decaying-duet',
    title: 'Decaying Duet',
    artist: 'Dorian Concept',
    src: '/assets/audio/Decaying Duet - Dorian Concept (youtube).mp3',
    genre: 'Electronic / Dev Flow'
  },
  {
    id: 'dark-fantasy',
    title: 'My Dark Fantasy Dream',
    artist: 'rexlity',
    src: '/assets/audio/rexlity - my dark fantasy dream - dreamscape (youtube).mp3',
    genre: 'Dreamscape'
  },
  {
    id: 'hide-cs01',
    title: 'Hide (CS01 Version)',
    artist: 'Dorian Concept',
    src: "/assets/audio/Dorian Concept - 'Hide (CS01 Version)' (Official Video) - Dorian Concept (youtube).mp3",
    genre: 'Synth / Focus'
  },
  {
    id: 'space-2',
    title: 'Space II',
    artist: 'Dorian Concept',
    src: '/assets/audio/Dorian Concept - Space II (Official Video) - Dorian Concept (youtube).mp3',
    genre: 'Space Ambient'
  },
  {
    id: 'low-hope',
    title: 'Low Hope',
    artist: 'Dorian Concept',
    src: '/assets/audio/Low Hope - Dorian Concept (youtube).mp3',
    genre: 'Chill / Study'
  },
  {
    id: 'among-the-sef',
    title: 'Among The Sef',
    artist: 'Colin Stetson',
    src: '/assets/audio/Among The Sef - Colin Stetson (youtube).mp3',
    genre: 'Atmospheric'
  }
];
