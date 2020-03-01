import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 20px;
    /*border: 2px solid #eee;*/
  }

  h1 {
    font-size: 1.3rem;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 0.9rem;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
    color: #666;
  }

  a {
    color: #7159c1;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  position: relative;
  &.loadingList:before {
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
  }

  li {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border: 1px solid #eee;
    transition: background 500ms ease-in-out;
    &:hover {
      background-color: #f8f8f8;
    }

    & + li {
      margin-top: 10px;
    }
  }

  img {
    margin-right: 10px;
    border: 2px solid #eee;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  div {
    flex: 1;
    strong {
      font-size: 1rem;
      a {
        color: #333;
        transition: color 500ms ease-in-out;
        &:hover {
          color: #7159c1;
        }
      }
      span {
        background-color: #eee;
        color: #333;
        font-size: 0.7rem;
        border-radius: 2px;
        font-weight: 600;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
    p {
      font-size: 0.8rem;
      color: #333;
    }
  }
`;

export const IssueFilter = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 90%;
  margin: 15px auto 0;

  button {
    display: flex;
    align-items: center;
    border-radius: 5px;
    color: #7159c1;
    border: 1px solid #7159c1;
    padding: 5px 15px;
    cursor: pointer;
    transition: all 500ms ease-in-out;
    background-color: #fff;

    &.active,
    &:hover {
      background: #7159c1;
      color: #fff;
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin: 0 10px;
    font-size: 0.8rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: #fff;
    color: #7159c1;

    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }
  }
`;
