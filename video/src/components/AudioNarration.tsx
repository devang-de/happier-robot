import { Audio, staticFile } from 'remotion';

interface Props {
  src: string;
  volume?: number;
}

export const AudioNarration: React.FC<Props> = ({ src, volume = 0.9 }) => {
  return <Audio src={staticFile(src)} volume={volume} />;
};
