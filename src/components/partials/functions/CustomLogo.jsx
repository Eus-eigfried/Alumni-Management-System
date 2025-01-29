import React from "react";

const CustomLogo = ({ width, height, fill }) => {
	return (
		<>
			<svg
				// className={`size-${size}`}
				fill={`bg-${fill}`}
				height={`${height}rem`}
				width={`${width}rem`}
				version='1.1'
				id='Layer_1'
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				viewBox='0 0 512 512'
				xmlSpace='preserve'>
				<g>
					<g>
						<path
							d='M0,0v512h512V0H0z M352,384c-16.341,0-32.149-3.307-46.997-9.792c-10.795-4.736-15.701-17.323-10.987-28.117
			s17.237-15.744,28.117-10.987c9.408,4.139,19.456,6.229,29.867,6.229c41.173,0,74.667-33.493,74.667-74.667S393.173,192,352,192
			s-74.667,33.493-74.667,74.667C277.333,331.371,224.683,384,160,384S42.667,331.371,42.667,266.667S95.317,149.333,160,149.333
			c16.341,0,32.149,3.307,46.997,9.792c10.795,4.736,15.701,17.323,10.987,28.117c-4.715,10.773-17.301,15.68-28.117,10.987
			C180.459,194.091,170.411,192,160,192c-41.173,0-74.667,33.493-74.667,74.667s33.493,74.667,74.667,74.667
			s74.667-33.493,74.667-74.667c0-64.704,52.651-117.333,117.333-117.333s117.333,52.629,117.333,117.333S416.683,384,352,384z'
						/>
					</g>
				</g>
			</svg>
		</>
	);
};

export default CustomLogo;
