type Icon =
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
	| 'chat_bubble'
	| 'heart'
	| 'plus'
	| 'cross'
	| 'settings';

interface Props {
	icon: Icon;
	color?: string;
	size?: number;
}

export const Icon = ({ color = 'currentColor', icon, size = 24 }: Props) => {
	const icons = {
		cam: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z',
		cam_muted:
			'M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z',
		mic: 'M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z',
		mic_muted:
			'M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z',
		screen:
			'M16.9997 4.5H7.00031C5.61937 4.5 4.5 5.61937 4.5 7.00031V13.9997C4.5 15.3806 5.61937 16.5 7.00031 16.5H16.9997C18.3806 16.5 19.5 15.3806 19.5 13.9997V7.00031C19.5 5.61937 18.3806 4.5 16.9997 4.5ZM7.99969 18C7.58625 18 7.24969 18.3356 7.24969 18.75C7.24969 19.1644 7.58625 19.5 7.99969 19.5H16.0003C16.4147 19.5 16.7503 19.1644 16.7503 18.75C16.7503 18.3356 16.4147 18 16.0003 18H7.99969ZM8.66156 10.2816C8.44594 10.5094 8.44594 10.8788 8.66156 11.1066C8.87813 11.3344 9.22781 11.3344 9.44344 11.1066L11.4478 8.99156V13.4166C11.4478 13.7391 11.6944 13.9997 12 13.9997C12.3056 13.9997 12.5522 13.7391 12.5522 13.4166V8.99156L14.5566 11.1066C14.7722 11.3344 15.1228 11.3344 15.3384 11.1066C15.5541 10.8788 15.5541 10.5094 15.3384 10.2816L12.3909 7.17094C12.1753 6.94312 11.8247 6.94312 11.6091 7.17094L8.66156 10.2816Z',
		screen_muted:
			'M8.53051 16.5356H17.0493C18.4269 16.5356 19.5432 15.4192 19.5432 14.0416V7.05822C19.5432 6.6161 19.4277 6.20011 19.2257 5.83938L20.5792 4.48691C20.8736 4.1925 20.8736 3.71521 20.5792 3.4208C20.2848 3.12639 19.8075 3.12639 19.5131 3.4208L3.42005 19.5138C3.12665 19.8082 3.12665 20.2855 3.42005 20.5799C3.71446 20.8733 4.19174 20.8733 4.48615 20.5799L8.53051 16.5356ZM7.98289 19.554H16.0435C16.4585 19.554 16.7971 19.2154 16.7971 18.8004C16.7971 18.3844 16.4585 18.0468 16.0435 18.0468H7.98289C7.5669 18.0468 7.22928 18.3844 7.22928 18.8004C7.22928 19.2154 7.5669 19.554 7.98289 19.554ZM16.2515 4.56428H7.07354C5.69595 4.56428 4.5796 5.68062 4.5796 7.05822V14.0416C4.5796 14.6546 4.80066 15.2153 5.16641 15.6493L16.2515 4.56428Z',
		recording:
			'M3 10C3 7.79086 4.79086 6 7 6H17C19.2091 6 21 7.79086 21 10V14C21 16.2091 19.2091 18 17 18H7C4.79086 18 3 16.2091 3 14V10ZM5.29422 14.4187V9.57453H7.12201C8.34271 9.57453 9.02161 10.0894 9.02161 11.1125V11.1396C9.02161 11.8306 8.6691 12.2168 8.17952 12.4133L9.29577 14.4187H7.88576L6.93923 12.6843H6.6259V14.4187H5.29422ZM10.3881 14.4187V9.57453H13.6128V10.645H11.7198V11.4783H13.2277V12.4675H11.7198V13.3482H13.7173V14.4187H10.3881ZM16.9974 14.5C18.205 14.5 19.0798 13.8496 19.1711 12.5962H17.8395C17.7742 13.1314 17.4413 13.3889 16.9713 13.3889C16.3315 13.3889 15.9725 12.8943 15.9725 12.0203V11.9661C15.9725 11.0854 16.3511 10.5976 16.9517 10.5976C17.4217 10.5976 17.6828 10.8686 17.735 11.3631H19.1124C19.0014 10.0827 18.1593 9.5 16.9452 9.5C15.5808 9.5 14.5625 10.4824 14.5625 11.9729C14.5625 13.4681 15.464 14.5 16.9974 14.5Z',
		eye: 'M8.00005 12C11.6 12 14.4 8.9 15.6 7.1C16.1 6.4 16.1 5.5 15.6 4.8C14.4 3.1 11.6 0 8.00005 0C4.40005 0 1.60005 3.1 0.400047 4.9C-0.0999527 5.6 -0.0999527 6.5 0.400047 7.1C1.60005 8.9 4.40005 12 8.00005 12ZM8.00005 3C9.70005 3 11 4.3 11 6C11 7.7 9.70005 9 8.00005 9C6.30005 9 5.00005 7.7 5.00005 6C5.00005 4.3 6.30005 3 8.00005 3Z',
		chat: 'M15 7v2c0 2.194-1.806 4-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2c1.097 0 2-.903 2-2V9c0-1.097-.903-2-2-2h-1zM2 5c0-1.097.903-2 2-2h7c1.097 0 2 .903 2 2v4c0 1.097-.903 2-2 2H9l-3 3v-3H4c-1.097 0-2-.903-2-2V5z',
		user: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z',
		stage:
			'M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z',
		cancel:
			'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41 15.59 7z',
		arrow_right:
			'M1 7H8.586L6.293 9.293C6.19749 9.38525 6.12131 9.49559 6.0689 9.6176C6.01649 9.7396 5.9889 9.87082 5.98775 10.0036C5.9866 10.1364 6.0119 10.2681 6.06218 10.391C6.11246 10.5139 6.18671 10.6255 6.2806 10.7194C6.3745 10.8133 6.48615 10.8875 6.60905 10.9378C6.73194 10.9881 6.86362 11.0134 6.9964 11.0123C7.12918 11.0111 7.2604 10.9835 7.3824 10.9311C7.50441 10.8787 7.61475 10.8025 7.707 10.707L11.707 6.707C11.8001 6.61411 11.874 6.50376 11.9244 6.38227C11.9748 6.26078 12.0008 6.13053 12.0008 5.999C12.0008 5.86747 11.9748 5.73722 11.9244 5.61573C11.874 5.49424 11.8001 5.38389 11.707 5.291L7.707 1.291C7.51923 1.10349 7.26466 0.998256 6.99929 0.998444C6.73393 0.998631 6.47951 1.10423 6.292 1.292C6.10449 1.47977 5.99926 1.73434 5.99944 1.99971C5.99963 2.26507 6.10523 2.51949 6.293 2.707L8.586 5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7Z',
		chat_bubble:
			'M14 0H2C0.895 0 0 0.895 0 2V10C0 11.105 0.895 12 2 12H4V15.5C4 15.692 4.11 15.867 4.283 15.951C4.352 15.984 4.426 16 4.5 16C4.611 16 4.722 15.963 4.812 15.891L9.675 12H13.999C15.104 12 15.999 11.105 15.999 10V2C15.999 0.895 15.104 0 13.999 0H14Z',
		heart:
			'M11.6 0C10.1 0 8.8 0.8 8 2C7.2 0.8 5.9 0 4.4 0C2 0 0 2 0 4.4C0 8.8 8 15.3 8 15.3C8 15.3 16 8.8 16 4.4C16 2 14 0 11.6 0Z',
		plus: 'M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z',
		cross:
			'M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z',
		settings:
			'M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z',
	};

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={icons[icon]} fillRule="evenodd" clipRule="evenodd" />
		</svg>
	);
};
