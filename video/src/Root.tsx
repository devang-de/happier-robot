import { Composition } from 'remotion';
import { HappierRobotVideo } from './Video';
import { HappierRobotVideoV1Short } from '../src_v1_short/Video_v1_short';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HappierRobot"
        component={HappierRobotVideo}
        durationInFrames={3240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HappierRobotV1Short"
        component={HappierRobotVideoV1Short}
        durationInFrames={2992}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
