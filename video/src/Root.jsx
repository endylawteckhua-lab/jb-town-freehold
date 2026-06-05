import { Composition } from 'remotion';
import { HeroVideo } from './HeroVideo';
import { FacilitiesVideo } from './FacilitiesVideo';
import { LocationVideo } from './LocationVideo';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FacilitiesVideo"
        component={FacilitiesVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LocationVideo"
        component={LocationVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
