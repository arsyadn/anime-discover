import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
  
    margin: 0;
    font-family: "Inter", system-ui, sans-serif;
    background: radial-gradient(circle at top, #111 0%, #000 60%);
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
`;
