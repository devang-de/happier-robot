import React from 'react';
import { Composition } from 'remotion';
import { HappierRobotVideoV1 } from './Video_v1';

export const RemotionRootV1: React.FC = () => {
  return (
    <Composition
      id="HappierRobotV1Abstract"
      component={HappierRobotVideoV1}
      durationInFrames={7503}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
