import React from 'react';
import FaqQuestionScreen from '../../src/components/screens/FaqQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FaqInternaPage({ category, question }) {
  return (
    <FaqQuestionScreen
      question={question}
      category={category}
    />
  );
}
FaqInternaPage.propTypes = FaqQuestionScreen.propTypes;

export default websitePageHOC(FaqInternaPage);

export async function getStaticProps({ params }) {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (res) => {
      const response = await res.json();
      return response.data;
    });

  const dadosPag = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const foundQuestion = faqCategory.questions.find((question) => question.slug === params.slug);
    if (foundQuestion) {
      return {
        ...valorAcumulado,
        category: faqCategory,
        question: foundQuestion,
      };
    }
    return valorAcumulado;
  }, {});

  return {
    props: {
      category: dadosPag.category,
      question: dadosPag.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: dadosPag.question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (res) => {
      const response = await res.json();
      return response.data;
    });

  const paths = faqCategories.reduce((valorAcumulado, faqCategory) => {
    const questionPaths = faqCategory.questions.map((question) => ({
      params: { slug: question.slug },
    }));

    return [
      ...valorAcumulado,
      ...questionPaths,
    ];
  }, []);

  return {
    paths,
    fallback: false,
  };
}
