import { AbsoluteFill, Sequence } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { DashboardOverviewScene } from './scenes/DashboardOverviewScene';
import { InboundCallScene } from './scenes/InboundCallScene';
import { PostCallScene } from './scenes/PostCallScene';
import { EmailFollowUpScene } from './scenes/EmailFollowUpScene';
import { NegotiationScene } from './scenes/NegotiationScene';
import { HITLScene } from './scenes/HITLScene';
import { ResolutionEmailScene } from './scenes/ResolutionEmailScene';
import { DealWonScene } from './scenes/DealWonScene';
import { BrainLearnsScene } from './scenes/BrainLearnsScene';
import { SystemMontageScene } from './scenes/SystemMontageScene';
import { ClosingScene } from './scenes/ClosingScene';
import { THEME } from './theme';

/*
  Scene layout (108s total at 30fps = 3240 frames):
  1. Title Card:        0-4s     (0-120)
  2. Dashboard Overview: 4-10s   (120-300)
  3. Inbound Call:      10-27s   (300-810)     — 510 frames for full transcript
  4. Post-Call:         27-34s   (810-1020)
  5. Email Follow-up:   34-42s   (1020-1260)
  6. Negotiation:       42-57s   (1260-1710)   — 450 frames for negotiation call
  7. HITL Loop:         57-67s   (1710-2010)
  8. Resolution Email:  67-74s   (2010-2220)
  9. Deal Won:          74-82s   (2220-2460)
  10. Brain Learns:     82-92s   (2460-2760)
  11. System Montage:   92-100s  (2760-3000)
  12. Closing:          100-108s (3000-3240)
*/

export const HappierRobotVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.bg }}>
      <Sequence from={0} durationInFrames={120}>
        <TitleScene />
      </Sequence>
      <Sequence from={120} durationInFrames={180}>
        <DashboardOverviewScene />
      </Sequence>
      <Sequence from={300} durationInFrames={510}>
        <InboundCallScene />
      </Sequence>
      <Sequence from={810} durationInFrames={210}>
        <PostCallScene />
      </Sequence>
      <Sequence from={1020} durationInFrames={240}>
        <EmailFollowUpScene />
      </Sequence>
      <Sequence from={1260} durationInFrames={450}>
        <NegotiationScene />
      </Sequence>
      <Sequence from={1710} durationInFrames={300}>
        <HITLScene />
      </Sequence>
      <Sequence from={2010} durationInFrames={210}>
        <ResolutionEmailScene />
      </Sequence>
      <Sequence from={2220} durationInFrames={240}>
        <DealWonScene />
      </Sequence>
      <Sequence from={2460} durationInFrames={300}>
        <BrainLearnsScene />
      </Sequence>
      <Sequence from={2760} durationInFrames={240}>
        <SystemMontageScene />
      </Sequence>
      <Sequence from={3000} durationInFrames={240}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
