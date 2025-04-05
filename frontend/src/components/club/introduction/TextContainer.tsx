'use client';

import React from 'react';

interface TextContainerProps {
  mainTitle: string;
  subTitle?: string;
  text: string;
}

const TextContainer: React.FC<TextContainerProps> = ({ mainTitle, subTitle, text }) => {
  return (
    <section className="bg-gray-100 rounded-xl p-6 space-y-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{mainTitle}</h2>
      {subTitle && <h3 className="text-lg font-medium text-gray-600">{subTitle}</h3>}
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </section>
  );
};

export default TextContainer;
