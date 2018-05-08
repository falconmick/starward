import React from 'react';
import { ImgIcon } from '../Block/ImgIcon';
import { smoothScroll } from '../../utils/smoothScroll';


const scrollToApp = () => smoothScroll.scrollToId('app');

export const ScrollTopButton = ({children}) => <ImgIcon onClick={scrollToApp} className="scroll-top" src="/assets/images/url/ride-to-top.svg">{children}</ImgIcon>;
