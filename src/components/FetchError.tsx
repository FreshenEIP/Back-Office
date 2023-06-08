import styled from '@emotion/styled';
import { Container, Stack, Typography, useTheme } from '@mui/material';
import { FiInbox } from 'react-icons/fi';

export const FetchError: React.FC = () => {
  const theme = useTheme();

  return (
    <Container fixed>
      <Wrapper
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
      >
        <Typography>Error...</Typography>
        <FiInbox size='6rem' color={theme.palette.text.primary} />
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled(Stack)`
  height: 30vh;
`;
