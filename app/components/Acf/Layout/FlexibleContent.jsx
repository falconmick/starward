import React from 'react';
import cx from 'classnames';
import { ColorSection } from '../Section';
import { Header } from '../../Block/Header';
import { RenderContent } from '../../Content/RenderContent';

const mapFlexibleContent = (column, index) => {
  const { content } = column;
  return (
    <RenderContent content={content} className="flexible-content" key={index.toString()} rewriteAssets useReactRouter />
  );
};

export const FlexibleContent = props => {
  const { title, titleElement, titleAlign, columns, backgroundColor, alignContent = 'left' } = props;

  return (
    <ColorSection
      name="Flexible Content"
      backgroundColor={backgroundColor || 'white'}
      innerClassName="wrapper-small med-padded"
    >
      {title && <Header className="flex-header" style={{textAlign: titleAlign}} elementOverride={titleElement || 'h3'}>{title}</Header>}
      <div className={cx('flexible-content-wrapper')} style={{textAlign: alignContent}}>
        {columns.map(mapFlexibleContent)}
      </div>
    </ColorSection>
  );
};
