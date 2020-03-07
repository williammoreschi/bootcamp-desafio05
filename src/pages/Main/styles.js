import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;

  .group {
    display: flex;
    flex: 1;

    input {
      flex: 1;
      border: 1px solid #eee;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 1.2rem;

      &.error {
        border-color: #ff6e6e;
      }
    }
  }

  span.error {
    font-size: 0.8em;
    font-weight: bold;
    margin-top: 2px;
    color: #f44336;
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
  disabled: props.load,
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
    props.load &&
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
