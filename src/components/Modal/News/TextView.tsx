import React from 'react';
import Markdown from 'react-markdown';

export const TextView = ({ text }) => {
  return <Markdown>{text}</Markdown>;
};
