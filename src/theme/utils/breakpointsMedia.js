import { css } from 'styled-components';
import theme from '../index';

export function breakpointsMedia(cssByBreakpoints) {
  const breakpointNames = Object.keys(cssByBreakpoints);
  const { breakpoints } = theme;

  return breakpointNames.map((breakpointName) => css`
      @media screen and (min-width: ${breakpoints[breakpointName]}px) {
        ${cssByBreakpoints[breakpointName]}
      }
    `);
}
