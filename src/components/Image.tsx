import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  filter?: string;
  className?: string;
}

export const Image: FunctionComponent<ImageProps> = ({
  src,
  alt,
  width = '100px',
  height = 'auto',
  filter = '',
  className = '',
}) => {
  return (
    <Img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      filter={filter}
    />
  );
};

interface ImageProps {
  width?: string;
  height?: string;
  filter?: string;
}

const Img = styled.img<ImageProps>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  filter: ${(p) => p.filter};
`;
