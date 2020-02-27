import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
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
export const Form = styled.form`
  margin-top: 15px;
  display: flex;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 1.2rem;
  }
`;

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }

  to{
    transform:rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background-color: #7159c1;
  border: none;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${props =>
    props.loading &&
    css`
  svg {
    animation ${rotate} 2s linear infinite;
  }
  `}
`;

export const List = styled.ul`
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
    }
  }
`;
