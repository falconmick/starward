import React from 'react';
import { HeroContainer } from '../../Hero';

export const Hero = props => {
  const { slides } = props;

  return (
    <section className="hero">
      <HeroContainer slides={slides} />
    </section>
  );
};
