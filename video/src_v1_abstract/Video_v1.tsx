import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { ProblemScene } from './scenes/ProblemScene';
import { SolutionScene } from './scenes/SolutionScene';
import { BrainScene } from './scenes/BrainScene';
import { InboundCallScene } from './scenes/InboundCallScene';
import { EmailHITLScene } from './scenes/EmailHITLScene';
import { SchedulerScene } from './scenes/SchedulerScene';
import { GuardrailsScene } from './scenes/GuardrailsScene';
import { DashboardScene } from './scenes/DashboardScene';
import { ArchitectureScene } from './scenes/ArchitectureScene';
import { ResultsScene } from './scenes/ResultsScene';
import { ClosingScene } from './scenes/ClosingScene';
import { THEME } from '../src/theme';

/*
  V1 Abstract version — audio-synced timing (30fps)

  Scene  1  Title:         0–180        (180 frames,  6.0s)
  Scene  2  Problem:       180–639      (459 frames, 15.3s)
  Scene  3  Solution:      639–1317     (678 frames, 22.6s)
  Scene  4  Brain:         1317–2139    (822 frames, 27.4s)
  Scene  5  Inbound Call:  2139–3210    (1071 frames, 35.7s)
  Scene  6  Email/HITL:    3210–4125    (915 frames, 30.5s)
  Scene  7  Scheduler:     4125–4668    (543 frames, 18.1s)
  Scene  8  Guardrails:    4668–5436    (768 frames, 25.6s)
  Scene  9  Dashboard:     5436–6036    (600 frames, 20.0s)
  Scene 10  Architecture:  6036–6693    (657 frames, 21.9s)
  Scene 11  Results:       6693–7236    (543 frames, 18.1s)
  Scene 12  Closing:       7236–7503    (267 frames,  8.9s)
  Total:                   7503 frames (~250.1s)
*/

export const HappierRobotVideoV1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.bg }}>
      <Sequence from={0} durationInFrames={180}>
        <TitleScene />
        <Audio src={staticFile('audio_v1/scene_01_title.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={180} durationInFrames={459}>
        <ProblemScene />
        <Audio src={staticFile('audio_v1/scene_02_problem.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={639} durationInFrames={678}>
        <SolutionScene />
        <Audio src={staticFile('audio_v1/scene_03_solution.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={1317} durationInFrames={822}>
        <BrainScene />
        <Audio src={staticFile('audio_v1/scene_04_brain.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={2139} durationInFrames={1071}>
        <InboundCallScene />
        <Audio src={staticFile('audio_v1/scene_05_inbound_call.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={3210} durationInFrames={915}>
        <EmailHITLScene />
        <Audio src={staticFile('audio_v1/scene_06_email_hitl.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={4125} durationInFrames={543}>
        <SchedulerScene />
        <Audio src={staticFile('audio_v1/scene_07_scheduler.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={4668} durationInFrames={768}>
        <GuardrailsScene />
        <Audio src={staticFile('audio_v1/scene_08_guardrails.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={5436} durationInFrames={600}>
        <DashboardScene />
        <Audio src={staticFile('audio_v1/scene_09_dashboard.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={6036} durationInFrames={657}>
        <ArchitectureScene />
        <Audio src={staticFile('audio_v1/scene_10_architecture.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={6693} durationInFrames={543}>
        <ResultsScene />
        <Audio src={staticFile('audio_v1/scene_11_results.mp3')} volume={0.85} />
      </Sequence>
      <Sequence from={7236} durationInFrames={267}>
        <ClosingScene />
        <Audio src={staticFile('audio_v1/scene_12_closing.mp3')} volume={0.85} />
      </Sequence>
    </AbsoluteFill>
  );
};
