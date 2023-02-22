import { Inter } from '@next/font/google';
import type * as Stitches from '@stitches/react';
import { createStitches } from '@stitches/react';

const inter = Inter({ subsets: ['latin'] });

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      background: '#FFFFFF',
      primary: '#00A4B7',
      primaryText: '#FFFFFF',
      secondary: '#EFF3F5',
      secondaryText: '#00A4B7',
      muted: '#6B7785',
      danger: '#FDDDDD',
      dangerText: '#F33236',
      text: '#2B3F56',
      disabled: '#F0F0F0',
      tileInfo: 'rgba(107, 119, 133, 0.7)',
      dark: '#1F2D3D',
      baseText: '#121A24',
      orange: '#FF9254',
      orangeLight: '#FFEED5',
      cyanLight: '#E2FBFD',
      cyanLightText: '#00C9DF',
      message: 'rgba(226, 251, 253, 0.4)',
      border: '#C8D1DC',
      yellow: '#FAD71F',
      yellowText: '#1C1C1C',
    },
    fonts: {
      inter: `${inter.style.fontFamily},"Helvetica Neue", Arial, sans-serif`,
      sans: '"Work Sans", "Helvetica Neue", Arial, sans-serif',
      serif: '"Work Sans", "Helvetica Neue", Arial, sans-serif',
      mono: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", "Input Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSizes: {
      body: '1rem',
      0: '0.625rem', // 10px
      1: '0.75rem', // 12px
      2: '0.875rem', // 14px
      3: '1rem', // 16px
      4: '1.125rem', // 18px
      5: '1.25rem', // 20px
      6: '1.375rem', // 22px
      7: '1.5rem', // 24px
      8: '1.75rem', // 28px
      9: '2rem', // 32px
      10: '2.25rem', // 36px
      11: '2.625rem', // 42px
      12: '2.875rem', // 46px
      13: '3.1875rem', // 51px
    },
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      body: '1.625',
      heading: 1.15,
    },
    borderWidths: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '5px',
      4: '10px',
      5: '25px',
    },
    shadows: {
      card: '0px 156px 62px rgba(90, 125, 140, 0.01), 0px 88px 53px rgba(90, 125, 140, 0.03), 0px 39px 39px rgba(90, 125, 140, 0.04), 0px 10px 21px rgba(90, 125, 140, 0.05), 0px 0px 0px rgba(90, 125, 140, 0.05)',
      toast:
        '0px 49px 20px rgba(43, 63, 86, 0.01), 0px 27px 16px rgba(43, 63, 86, 0.03), 0px 12px 12px rgba(43, 63, 86, 0.04), 0px 3px 7px rgba(43, 63, 86, 0.05), 0px 0px 0px rgba(43, 63, 86, 0.05)',
    },
    transitions: {
      default: 'all 250ms ease',
      button:
        'background 0.15s ease 0s, color 0.15s ease 0s, border-color 0.15s ease 0s, box-shadow 0.15s ease 0s, transform 0.15s ease 0s, opacity 0.15s ease 0s',
      avatar: 'box-shadow 0.25s ease 0s, opacity 0.25s ease 0s',
      link: 'opacity 0.25s ease 0s, background 0.25s ease 0s',
      card: 'transform 0.25s ease 0s, box-shadow 0.25s ease 0s',
    },
    space: {
      0: '0rem', // 0px
      1: '0.25rem', // 4px
      2: '0.5rem', // 8px
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      5: '1.5rem', // 24px
      6: '2rem', // 32px
      7: '2.5rem', // 40px
      8: '3rem', // 48px
      9: '3.5rem', // 56px
      10: '4rem', // 64px
      11: '8rem', // 128px
      12: '16rem', // 256px
      13: '32rem', // 512px
    },
    sizes: {
      0: '1px',
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '32px',
      7: '44px',
      8: '65px',
      9: '80px',
      10: '90px',
      tab: '36px',
      trayButton: '45px',
      container: '1200px',
    },
    radii: {
      none: '0',
      xs: '4px',
      sm: '6px',
      default: '9px',
      m: '9px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),

    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
      flexDirection: value,
    }),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
      alignItems: value,
    }),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
      alignContent: value,
    }),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
      justifyContent: value,
    }),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
      flexShrink: value,
    }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),

    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),

    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
      lineHeight: value,
    }),

    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),

    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value,
    }),
    us: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },
  'html, body': {
    minHeight: '100%',
    padding: 0,
    margin: 0,
    fontSize: '$body',
    lineHeight: '$body',
    fontWeight: '$normal',
    fontFamily: '$inter',
    color: '$text',
    backgroundColor: '$background!important',
  },
});
