import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      muted: string;
      border: string;
      accent: string;
      error: string;
      textSecondary: string;
    };
    shadows: {
      soft: string;
      glowRed: string;
      glowCyan: string;
    };
  }
}
