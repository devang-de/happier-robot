import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { ProblemSolutionScene } from './scenes/ProblemSolutionScene';
import { BrainScene } from './scenes/BrainScene';
import { HowItWorksScene } from './scenes/HowItWorksScene';
import { AutonomySafetyScene } from './scenes/AutonomySafetyScene';
import { DashboardScene } from './scenes/DashboardScene';
import { ClosingScene } from './scenes/ClosingScene';
import { THEME } from '../src/theme';

/*
  V1 Short — condensed hackathon version (~100s, 30fps)

  Scene 1  Title:            0–180        (180 frames,  6.0s)
  Scene 2  Problem+Solution: 180–696      (516 frames, 17.2s)
  Scene 3  Brain:            696–1118     (422 frames, 14.1s)
  Scene 4  How It Works:     1118–1917    (799 frames, 26.6s)
  Scene 5  Autonomy+Safety:  1917–2368    (451 frames, 15.0s)
  Scene 6  Dashboard:        2368–2708    (340 frames, 11.3s)
  Scene 7  Closing:          2708–2992    (284 frames,  9.5s)
  Total:                     2992 frames (~99.7s)
*/

export const HappierRobotVideoV1Short: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: THEME.bg }}>
      <Sequence from={0} durationInFrames={180}>
        <TitleScene />
        <Audio src={staticFile('audio_v1_short/scene_01_title.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={180} durationInFrames={516}>
        <ProblemSolutionScene />
        <Audio src={staticFile('audio_v1_short/scene_02_problem_solution.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={696} durationInFrames={422}>
        <BrainScene />
        <Audio src={staticFile('audio_v1_short/scene_03_brain.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={1118} durationInFrames={799}>
        <HowItWorksScene />
        <Audio src={staticFile('audio_v1_short/scene_04_how_it_works.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={1917} durationInFrames={451}>
        <AutonomySafetyScene />
        <Audio src={staticFile('audio_v1_short/scene_05_autonomy_safety.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={2368} durationInFrames={340}>
        <DashboardScene />
        <Audio src={staticFile('audio_v1_short/scene_06_dashboard.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={2708} durationInFrames={284}>
        <ClosingScene />
        <Audio src={staticFile('audio_v1_short/scene_07_closing.mp3')} volume={0.85} />
      </Sequence>
    </AbsoluteFill>
  );
};
