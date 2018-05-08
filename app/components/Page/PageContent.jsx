import React from 'react';
import * as Layout from '../Acf/Layout/';
import { Head } from '../Common/Head';
import { FourOhFour } from '../Content/FourOhFour';
import { Title } from '../Content/Title';
import { RenderContent } from '../Content/RenderContent';
import { FooterMapSection } from '../FooterMap';

export const PageContent = props => {
  const getComponent = (item, key) => {
    const ComponentName = Layout[item.acf_fc_layout];
    return <ComponentName key={key} {...item} />;
  };
  const { acf, content, title, seo, siteName } = props;
  if ((!acf || !acf.layout) && !content) return <FourOhFour />;
  if (acf && acf.layout) {
    const { showFooterMap, footerGradientTopColor } = acf;
    return (
      <main className="content" role="main">
        <Head {...seo} defaultTitle={`${title} - ${siteName}`} />
        <article>
          {acf.layout.map((item, index) => getComponent(item, index))}
          {showFooterMap && <FooterMapSection footerGradientTopColor={footerGradientTopColor} />}
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
