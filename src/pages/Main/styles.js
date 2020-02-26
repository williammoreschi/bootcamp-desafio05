import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.6rem;
  color: ${props => (props.error ? 'red' : '#7159c1')};

  small {
    font-size: 1.2rem;
    color: #999;
  }
`;
