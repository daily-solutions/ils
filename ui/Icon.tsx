import { CSS } from '@stitches/react';

import { styled } from '../styles/stitches.config';

export type Icon =
  | 'cam'
  | 'cam_muted'
  | 'mic'
  | 'mic_muted'
  | 'screen'
  | 'screen_muted'
  | 'recording'
  | 'eye'
  | 'chat'
  | 'user'
  | 'stage'
  | 'cancel'
  | 'arrow_right'
  | 'heart'
  | 'plus'
  | 'cross'
  | 'settings'
  | 'poll'
  | 'check'
  | 'share'
  | 'arrow_left';

interface Props {
  icon: Icon;
  color?: string;
  size?: number;
  css?: CSS;
}

const StyledSVG = styled('svg', {});

export const Icon = ({
  color = 'currentColor',
  css,
  icon,
  size = 24,
}: Props) => {
  const icons = {
    cam: 'M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7z',
    cam_muted:
      'M4 19h10.879L2.145 6.265A1.977 1.977 0 0 0 2 7v10c0 1.103.897 2 2 2zM18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7z',
    mic: 'M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z',
    mic_muted:
      'm21.707 20.293-3.4-3.4A7.93 7.93 0 0 0 20 12h-2a5.945 5.945 0 0 1-1.119 3.467l-1.449-1.45A3.926 3.926 0 0 0 16 12V6c0-2.217-1.785-4.021-3.979-4.021-.07 0-.14.009-.209.025A4.006 4.006 0 0 0 8 6v.586L3.707 2.293 2.293 3.707l18 18 1.414-1.414zM6 12H4c0 4.072 3.06 7.436 7 7.931V22h2v-2.069a7.935 7.935 0 0 0 2.241-.63l-1.549-1.548A5.983 5.983 0 0 1 12 18c-3.309 0-6-2.691-6-6z M8.007 12.067a3.996 3.996 0 0 0 3.926 3.926l-3.926-3.926z',
    screen:
      'M16.9997 4.5H7.00031C5.61937 4.5 4.5 5.61937 4.5 7.00031V13.9997C4.5 15.3806 5.61937 16.5 7.00031 16.5H16.9997C18.3806 16.5 19.5 15.3806 19.5 13.9997V7.00031C19.5 5.61937 18.3806 4.5 16.9997 4.5ZM7.99969 18C7.58625 18 7.24969 18.3356 7.24969 18.75C7.24969 19.1644 7.58625 19.5 7.99969 19.5H16.0003C16.4147 19.5 16.7503 19.1644 16.7503 18.75C16.7503 18.3356 16.4147 18 16.0003 18H7.99969ZM8.66156 10.2816C8.44594 10.5094 8.44594 10.8788 8.66156 11.1066C8.87813 11.3344 9.22781 11.3344 9.44344 11.1066L11.4478 8.99156V13.4166C11.4478 13.7391 11.6944 13.9997 12 13.9997C12.3056 13.9997 12.5522 13.7391 12.5522 13.4166V8.99156L14.5566 11.1066C14.7722 11.3344 15.1228 11.3344 15.3384 11.1066C15.5541 10.8788 15.5541 10.5094 15.3384 10.2816L12.3909 7.17094C12.1753 6.94312 11.8247 6.94312 11.6091 7.17094L8.66156 10.2816Z',
    screen_muted:
      'M8.53051 16.5356H17.0493C18.4269 16.5356 19.5432 15.4192 19.5432 14.0416V7.05822C19.5432 6.6161 19.4277 6.20011 19.2257 5.83938L20.5792 4.48691C20.8736 4.1925 20.8736 3.71521 20.5792 3.4208C20.2848 3.12639 19.8075 3.12639 19.5131 3.4208L3.42005 19.5138C3.12665 19.8082 3.12665 20.2855 3.42005 20.5799C3.71446 20.8733 4.19174 20.8733 4.48615 20.5799L8.53051 16.5356ZM7.98289 19.554H16.0435C16.4585 19.554 16.7971 19.2154 16.7971 18.8004C16.7971 18.3844 16.4585 18.0468 16.0435 18.0468H7.98289C7.5669 18.0468 7.22928 18.3844 7.22928 18.8004C7.22928 19.2154 7.5669 19.554 7.98289 19.554ZM16.2515 4.56428H7.07354C5.69595 4.56428 4.5796 5.68062 4.5796 7.05822V14.0416C4.5796 14.6546 4.80066 15.2153 5.16641 15.6493L16.2515 4.56428Z',
    recording:
      'M3 10C3 7.79086 4.79086 6 7 6H17C19.2091 6 21 7.79086 21 10V14C21 16.2091 19.2091 18 17 18H7C4.79086 18 3 16.2091 3 14V10ZM5.29422 14.4187V9.57453H7.12201C8.34271 9.57453 9.02161 10.0894 9.02161 11.1125V11.1396C9.02161 11.8306 8.6691 12.2168 8.17952 12.4133L9.29577 14.4187H7.88576L6.93923 12.6843H6.6259V14.4187H5.29422ZM10.3881 14.4187V9.57453H13.6128V10.645H11.7198V11.4783H13.2277V12.4675H11.7198V13.3482H13.7173V14.4187H10.3881ZM16.9974 14.5C18.205 14.5 19.0798 13.8496 19.1711 12.5962H17.8395C17.7742 13.1314 17.4413 13.3889 16.9713 13.3889C16.3315 13.3889 15.9725 12.8943 15.9725 12.0203V11.9661C15.9725 11.0854 16.3511 10.5976 16.9517 10.5976C17.4217 10.5976 17.6828 10.8686 17.735 11.3631H19.1124C19.0014 10.0827 18.1593 9.5 16.9452 9.5C15.5808 9.5 14.5625 10.4824 14.5625 11.9729C14.5625 13.4681 15.464 14.5 16.9974 14.5Z',
    eye: 'M8.00005 12C11.6 12 14.4 8.9 15.6 7.1C16.1 6.4 16.1 5.5 15.6 4.8C14.4 3.1 11.6 0 8.00005 0C4.40005 0 1.60005 3.1 0.400047 4.9C-0.0999527 5.6 -0.0999527 6.5 0.400047 7.1C1.60005 8.9 4.40005 12 8.00005 12ZM8.00005 3C9.70005 3 11 4.3 11 6C11 7.7 9.70005 9 8.00005 9C6.30005 9 5.00005 7.7 5.00005 6C5.00005 4.3 6.30005 3 8.00005 3Z',
    chat: 'M4 18h2v4.081L11.101 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2z M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z',
    user: 'M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z',
    stage:
      'M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z',
    cancel:
      'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z',
    arrow_right:
      'm11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z',
    arrow_left:
      'M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z',
    heart:
      'M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z',
    plus: 'M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z',
    cross:
      'M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z',
    settings:
      'm2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z',
    poll: 'M6 21H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1z',
    check:
      'm10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z',
    share:
      'M11 6.914V2.586L6.293 7.293l-3.774 3.774 3.841 3.201L11 18.135V13.9c8.146-.614 11 4.1 11 4.1 0-2.937-.242-5.985-2.551-8.293C16.765 7.022 12.878 6.832 11 6.914z',
  };

  return (
    <StyledSVG
      css={css}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icons[icon]} fillRule="evenodd" clipRule="evenodd" />
    </StyledSVG>
  );
};
