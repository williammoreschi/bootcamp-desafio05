import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;

}

html, body, #root{
  min-height:100%;
}

body{
  background-color: #7159c1;
  -webkit-font-smoothig: antialiased !important;
}

body,input, button{
  color: #222;
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;
}

ul,ol{
  list-style:none
}

a{
  text-decoration:none
}

button{
  cursor:pointer;
}
`;
