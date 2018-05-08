import React from 'react';
import { connect } from 'react-redux';
import { AboutSellMyShares } from './AboutSellMyShares';
import { DisclaimerCopyright } from './DisclaimerCopyright';
import { MadeWithLove } from './MadeWithLove';
import { FooterLinkList } from './FooterLinkList';
import { extractPostLink } from '../../utils/starward';
import { ScrollTopButton } from '../Common/ScrollTopButton';


export const _Footer = props => {
  const { footerMenu, postLinks, socialLinks } = props;
  return (
    <footer id="footer" className="content-info" role="contentinfo">
      <section className="main-footer wrapper-container med-padded">
        <AboutSellMyShares socialLinks={socialLinks} />
        <FooterLinkList title="Quick Links" links={footerMenu} className="quick-links" />
        <FooterLinkList title="Recent Articles" links={postLinks.slice(0, 7)} className="recent-articles" />
        <ScrollTopButton />
      </section>
      <section className="copyright wrapper-container med-padded">
        <DisclaimerCopyright />
        <MadeWithLove />
      </section>
    </footer>
  );
};

const mapStateToProps = (state) => {
  const { starward } = state;
  const { footerMenu, posts, settings } = starward;
  const { socialLinks } = settings;
  const postLinks = posts.items.map(extractPostLink);
  return { footerMenu, postLinks, socialLinks };
};

export const Footer = connect(mapStateToProps)(_Footer);
