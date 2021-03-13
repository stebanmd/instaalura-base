/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import WebsiteGlobalProvider from '../provider';
import WebsitePageWrapper from '..';

// HOC = High Order Component
export default function websitePageHOC(PageComponent, { pageWrapperProps }) {
  return (props) => (
    <WebsiteGlobalProvider>
      <WebsitePageWrapper {...pageWrapperProps}>
        <PageComponent {...props} />
      </WebsitePageWrapper>
    </WebsiteGlobalProvider>
  );
}
