import React from 'react';
import cx from 'classnames';
import { getAcfNameClassFor } from '../../../utils/typography';
import { PageBackground } from './PageBackground';

export const createSection = ({renderBackground, renderMask, sectionClass}) => props => {
  const { name, outerClassName, innerClassName, wrapperClass, style, children } = props;
  const nameClass = getAcfNameClassFor(name);

  return (
    <section className={cx('acf', sectionClass, nameClass, outerClassName)}>
      <PageBackground>
        { renderBackground() }
        { renderMask && renderMask() }
      </PageBackground>
      <div className={wrapperClass}>
        <div className={cx('component-container', innerClassName)} style={style}>
          {children}
        </div>
      </div>
    </section>
  );
};
