import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';

const SLIDES = [
  { img: staticFile('fac-pool.jpg'),          cn: '无边际泳池',     en: 'Infinity Pool' },
  { img: staticFile('fac-theatre-real.jpg'),  cn: '迷你影院',       en: 'Mini Theatre' },
  { img: staticFile('fac-ktv.jpg'),           cn: 'KTV 室',         en: 'KTV Room' },
  { img: staticFile('fac-pickleball.jpg'),    cn: 'Pickleball 球场', en: 'Pickleball Court' },
  { img: staticFile('fac-dining.jpg'),        cn: '私人餐厅',       en: 'Gourmet Suite' },
  { img: staticFile('fac-gym.jpg'),           cn: '空中健身房',     en: 'Fitness Centre' },
  { img: staticFile('fac-waterplay.jpg'),     cn: '儿童水上乐园',   en: 'Water Playground' },
  { img: staticFile('fac-kids.jpg'),          cn: '儿童游乐区',     en: 'Kids Play Zone' },
  { img: staticFile('fac-bbq.jpg'),           cn: '户外凉亭 BBQ',   en: 'BBQ Pavilion' },
];

const SLIDE_DURATION = 50; // frames per slide
const TRANSITION = 12;     // crossfade overlap frames

export const FacilitiesVideo = () => {
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

      {/* Render all slides — crossfade via opacity */}
      {SLIDES.map((slide, i) => {
        const start = i * SLIDE_DURATION;
        const end = start + SLIDE_DURATION;

        // Crossfade: fade in before this slide starts, fade out at end
        const opacity = interpolate(
          frame,
          [start - TRANSITION, start, end - TRANSITION, end],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const labelOpacity = interpolate(
          frame,
          [start, start + 15, end - 15, end - 5],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        if (opacity === 0) return null;

        return (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity }}>
            {/* Static image — no zoom */}
            <img
              src={slide.img}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 50%)',
            }} />
            {/* Label */}
            <div style={{ position: 'absolute', bottom: 60, left: 48, opacity: labelOpacity }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
                {slide.en}
              </div>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#fff' }}>
                {slide.cn}
              </div>
              <div style={{ marginTop: 14, width: 50, height: 3, background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
            </div>
          </div>
        );
      })}

      {/* Top bar — always visible */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '28px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: headerOpacity, zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
      }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: '#C9A84C', textTransform: 'uppercase' }}>
          Johor Bahru · Freehold Living
        </div>
        <div style={{
          background: 'rgba(201,168,76,0.2)', border: '1px solid #C9A84C',
          padding: '7px 18px', borderRadius: 30, fontSize: 13, color: '#C9A84C', letterSpacing: 2,
        }}>
          51 Facilities · Level 11
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
