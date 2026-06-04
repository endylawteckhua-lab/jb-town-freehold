import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';

export const HeroVideo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale      = interpolate(frame, [0, durationInFrames], [1, 1.15]);
  const translateX = interpolate(frame, [0, durationInFrames], [0, -30]);
  const translateY = interpolate(frame, [0, durationInFrames], [0, -15]);

  const textOpacity = interpolate(frame, [60, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY       = interpolate(frame, [60, 120], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const globalOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#000', opacity: globalOpacity }}>
      {/* Ken Burns background */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        transformOrigin: 'center center',
      }}>
        <img
          src={staticFile('hero-bg.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* Text */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: textOpacity,
        transform: `translateY(${textY}px)`,
      }}>
        <div style={{ fontSize: 18, letterSpacing: 6, color: '#C9A84C', textTransform: 'uppercase', marginBottom: 28, fontWeight: 300 }}>
          Johor Bahru · Freehold · 47 Storeys
        </div>
        <div style={{
          fontSize: 80, fontWeight: 900, color: '#fff',
          textAlign: 'center', lineHeight: 1.2, marginBottom: 20,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
          fontFamily: 'sans-serif',
        }}>
          月供 <span style={{ color: '#C9A84C' }}>SGD 430</span>，{'\n'}
          就能成为这里的屋主。
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.85)', fontWeight: 300, letterSpacing: 2, marginBottom: 10 }}>
          享有的，比你想象的更多。
        </div>
        <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
          What comes with it? More than you'd expect.
        </div>
      </div>

      {/* Gold bottom line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
        opacity: textOpacity,
      }} />
    </div>
  );
};
