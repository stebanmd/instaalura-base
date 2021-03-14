import React from 'react';
import FaqScreen from '../../src/components/screens/FaqScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FaqPage({ faqCategories }) {
  return (
    <FaqScreen faqCategories={faqCategories} />
  );
}

FaqPage.propTypes = FaqScreen.propTypes;

export default websitePageHOC(FaqPage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'FAQ',
    },
  },
});

export async function getStaticProps() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq').then(async (res) => {
    const response = await res.json();
    return response.data;
  });

  return {
    props: {
      faqCategories,
    },
  };
}
