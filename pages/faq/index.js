import React from 'react';
import FaqScreen from '../../src/components/screens/FaqScreen';

export default function FaqPage(props) {
  // const [faqCategories, setFaqCategories] = React.useState([]);

  // React.useEffect(() => {
  //   fetch('https://instalura-api.vercel.app/api/content/faq').then(async (res) => {
  //     const response = await res.json();
  //     return response.data;
  //   })
  //     .then((faqCategoriesFromServer) => {
  //       setFaqCategories(faqCategoriesFromServer);
  //     });
  // });

  // const props = {
  //   faqCategories,
  // };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FaqScreen {...props} />
  );
}

export async function getStaticProps() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq').then(async (res) => {
    const response = await res.json();
    return response.data;
  });

  // Falar sobre tamanho da página aqui e tomar cuidado com recursos extras que vão pra página
  return {
    props: {
      faqCategories,
    },
  };
}