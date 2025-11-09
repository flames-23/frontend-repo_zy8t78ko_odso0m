import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative h-[38vh] sm:h-[46vh] lg:h-[54vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white drop-shadow-sm">
            Save, organize, and share your wish lists
          </h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A clean, minimalist board for everything you want — from Christmas gifts to future goals. Add a link and we’ll fetch the image, title, and brand for you.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/20 to-white dark:from-neutral-900/0 dark:via-neutral-900/20 dark:to-neutral-900" />
    </section>
  );
};

export default Hero;
