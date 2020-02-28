import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);

  h1 {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
