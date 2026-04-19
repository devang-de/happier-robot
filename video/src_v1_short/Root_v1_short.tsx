import { Composition } from 'remotion';
import { HappierRobotVideoV1Short } from './Video_v1_short';

export const RemotionRootV1Short: React.FC = () => {
  return (
    <Composition
      id="HappierRobotV1Short"
      component={HappierRobotVideoV1Short}
      durationInFrames={2992}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
