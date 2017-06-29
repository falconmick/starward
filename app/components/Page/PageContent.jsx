import React from 'react';
import * as Layout from '../Acf/Layout/';
import { Head } from '../Common/Head';
import { FourOhFour } from '../Content/FourOhFour';
import { Title } from '../Content/Title';
import { RenderContent } from '../Content/RenderContent';

export const PageContent = props => {
  const getComponent = (item, key) => {
    const ComponentName = Layout[item.acf_fc_layout];
    return <ComponentName key={key} {...item} />;
  };
  const { acf, content, title, yoast, siteName } = props;
  if (!acf.layout && !content) return <FourOhFour />;
  if (acf && acf.layout) {
    return (
      <main className="content" role="main">
        <Head {...yoast} defaultTitle={`${title} - ${siteName}`} />
        <article>
          {acf.layout.map((item, index) => getComponent(item, index))}
        </article>
      </main>
    );
  }
  return (
    <main className="content" role="main">
      <Head {...seo} defaultTitle={`${title} - ${siteName}`} />
      <article>
        <Title title={title} tag="h1" />
        <RenderContent content={content} />
      </article>
    </main>
  );
};
