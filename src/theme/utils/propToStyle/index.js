import { breakpointsMedia } from '../breakpointsMedia';

export function propToStyle(propName) {
  return (props) => {
    const propValue = props[propName];

    if (typeof propValue === 'string' || typeof propValue === 'number') {
      return {
        [propName]: props[propName],
      };
    }

    if (typeof propValue === 'object') {
      const breakpoints = {};

      Object.keys(propValue).forEach((key) => {
        breakpoints[key] = { [propName]: propValue[key] };
      });

      return breakpointsMedia(breakpoints);

      // return breakpointsMedia({
      //   xs: {
      //     [propName]: propValue.xs,
      //   },
      //   sm: {
      //     [propName]: propValue.sm,
      //   },
      //   md: {
      //     [propName]: propValue.md,
      //   },
      //   lg: {
      //     [propName]: propValue.lg,
      //   },
      //   xl: {
      //     [propName]: propValue.xl,
      //   },
      // });
    }

    return {};
  };
}
