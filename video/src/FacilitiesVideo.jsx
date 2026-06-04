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

const SLIDE_DURATION = 50;

export const FacilitiesVideo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const currentSlide = Math.min(Math.floor(frame / SLIDE_DURATION), SLIDES.length - 1);
  const slideFrame = frame % SLIDE_DURATION;

  // First slide starts immediately, subsequent slides fade in
  const fadeIn  = (currentSlide === 0 && slideFrame < 8)
    ? interpolate(slideFrame, [0, 5], [1, 1], { extrapolateRight: 'clamp' })
    : interpolate(slideFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(slideFrame, [SLIDE_DURATION - 10, SLIDE_DURATION], [1, 0], { extrapolateLeft: 'clamp' });
  const opacity = Math.min(fadeIn, fadeOut);
  const scale   = interpolate(slideFrame, [0, SLIDE_DURATION], [1, 1.08]);

  const globalOpacity = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const slide = SLIDES[currentSlide];
  const countOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', opacity: globalOpacity, overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, opacity, transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <img src={slide.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)',
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        opacity: countOpacity,
      }}>
        <div style={{ fontSize: 14, letterSpacing: 4, color: '#C9A84C', textTransform: 'uppercase' }}>
          Johor Bahru · Freehold Living
        </div>
        <div style={{
          background: 'rgba(201,168,76,0.2)', border: '1px solid #C9A84C',
          padding: '8px 20px', borderRadius: 30, fontSize: 14, color: '#C9A84C', letterSpacing: 2,
        }}>
          51 Facilities · Level 11
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 60, left: 48, opacity }}>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
          {slide.en}
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>
          {slide.cn}
        </div>
        <div style={{ marginTop: 16, width: 60, height: 3, background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
      </div>

      {/* Slide dots */}
      <div style={{ position: 'absolute', bottom: 32, right: 48, display: 'flex', gap: 8 }}>
        {SLIDES.map((_, i) => (
          <div key={i} style={{
            width: i === currentSlide ? 24 : 8, height: 8, borderRadius: 4,
            background: i === currentSlide ? '#C9A84C' : 'rgba(255,255,255,0.3)',
          }} />
        ))}
      </div>
    </div>
  );
};
