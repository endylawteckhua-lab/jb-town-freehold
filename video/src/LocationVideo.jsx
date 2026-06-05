import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';

const SLIDES = [
  {
    img: staticFile('loc-wetmarket.jpg'),
    name: '鱼菜市场',
    nameEn: 'Wet Market',
    tag: '🚶',
    time: '步行 1 分钟',
    timeEn: '1 min walk',
    color: '#2ECC71',
  },
  {
    img: staticFile('loc-giant.jpg'),
    name: 'Giant Hypermarket',
    nameEn: 'Supermarket',
    tag: '🚶',
    time: '步行 3 分钟',
    timeEn: '3 min walk',
    color: '#2ECC71',
  },
  {
    img: staticFile('loc-shuttle.jpg'),
    name: 'Shuttle Bus',
    nameEn: 'To CIQ & RTS Link',
    tag: '🚌',
    time: '楼下直达关卡',
    timeEn: 'Direct to checkpoint',
    color: '#C9A84C',
  },
  {
    img: staticFile('loc-midvalley.jpg'),
    name: 'Mid Valley Southkey',
    nameEn: 'Shopping Mall',
    tag: '🚗',
    time: '驾车 8 分钟',
    timeEn: '8 min drive',
    color: '#3498DB',
  },
  {
    img: staticFile('loc-ciq.jpg'),
    name: 'JB CIQ 关卡',
    nameEn: 'Singapore Checkpoint',
    tag: '🚗',
    time: '驾车 10 分钟',
    timeEn: '10 min drive',
    color: '#3498DB',
  },
  {
    img: staticFile('loc-rts.jpg'),
    name: 'RTS Link 轻快铁',
    nameEn: 'JB ↔ Singapore Rail Link',
    tag: '🚆',
    time: '距 RTS 站约 7km',
    timeEn: '~7km to RTS station',
    color: '#E74C3C',
  },
];

const SLIDE_DURATION = 60;
const TRANSITION = 12;

export const LocationVideo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  });

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', opacity: globalOpacity, overflow: 'hidden', position: 'relative' }}>

      {SLIDES.map((slide, i) => {
        const start = i * SLIDE_DURATION;
        const end = start + SLIDE_DURATION;

        const opacity = interpolate(
          frame,
          [start - TRANSITION, start, end - TRANSITION, end],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const labelOpacity = interpolate(
          frame,
          [start, start + 18, end - 15, end - 5],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const badgeScale = interpolate(
          frame,
          [start, start + 20],
          [0.8, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        if (opacity === 0) return null;

        return (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity }}>
            <img
              src={slide.img}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)',
            }} />

            {/* Bottom info */}
            <div style={{ position: 'absolute', bottom: 60, left: 48, right: 48, opacity: labelOpacity }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                {/* Left: Name */}
                <div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
                    {slide.nameEn}
                  </div>
                  <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>
                    {slide.name}
                  </div>
                  <div style={{ marginTop: 14, width: 50, height: 3, background: `linear-gradient(90deg, ${slide.color}, transparent)` }} />
                </div>

                {/* Right: Time badge */}
                <div style={{
                  background: slide.color,
                  borderRadius: 16, padding: '16px 28px',
                  textAlign: 'center',
                  transform: `scale(${badgeScale})`,
                  transformOrigin: 'right bottom',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{slide.tag}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#000', whiteSpace: 'nowrap' }}>{slide.time}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)', marginTop: 2 }}>{slide.timeEn}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: headerOpacity, zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
      }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: '#C9A84C', textTransform: 'uppercase' }}>
          Johor Bahru · Southkey
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2ECC71' }}>
            <span>🚶</span> 步行
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#3498DB' }}>
            <span>🚗</span> 驾车
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: 28, right: 48, display: 'flex', gap: 8, zIndex: 10 }}>
        {SLIDES.map((_, i) => {
          const active = Math.floor(frame / SLIDE_DURATION) === i;
          return (
            <div key={i} style={{
              width: active ? 22 : 7, height: 7, borderRadius: 4,
              background: active ? '#C9A84C' : 'rgba(255,255,255,0.3)',
            }} />
          );
        })}
      </div>
    </div>
  );
};
