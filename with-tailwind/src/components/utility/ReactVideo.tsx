// Component: ReactVideo
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useRef, useState, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import ReactPlayer from 'react-player';

/*---------- Static Data ----------*/

// Name
const name = 'ReactVideo';

/*---------- Component ----------*/

// Types
export type ReactVideoProps = {
	title?: string;
	src?: string;
	options?: { playing: boolean; width?: number; height?: number };
	className?: string;
};

// Default component
const ReactVideo = (props: ReactVideoProps) => {
	/*----- Init -----*/

	// Get props
	const {
		title,
		src,
		options = { playing: true, width: 500, height: 400 },
		className,
	} = props;
	const { width = 500, height = 400 } = options;

	/*----- Refs -----*/

	// Ref - playerRef
	const playerRef = useRef<any>();

	/*----- Store -----*/

	// State - videoScale
	const [videoScale, setVideoScale] = useState(1);

	/*----- Lifecycle -----*/

	// Watch - src
	useEffect(() => {
		// If no playerRef, return
		if (!playerRef.current) return;

		// Reset timeline
		playerRef.current.seekTo(0);
	}, [src]);

	// Watch - width
	useEffect(() => {
		// Function - resize
		const resize = () => {
			// Get window width
			const windowWidth = window.innerWidth;

			// Set scale
			setVideoScale(windowWidth < width ? windowWidth / width : 1);
		};

		// Add event listener
		window.addEventListener('resize', resize);

		// Init
		resize();

		// Return cleanup
		return () => {
			window.removeEventListener('resize', resize);
		};
	}, [width]);

	/*----- Init -----*/

	// If no src, return null
	if (!src) return null;

	// Return default
	return (
		<div
			className={classNames(`video`, className)}
			style={{ transform: `scale(${videoScale})` }}
		>
			{title && <h2>{title}</h2>}
			<ReactPlayer
				ref={playerRef}
				{...options}
				url={src}
				controls={true}
				light={false} // <- incase of dark mode
				pip={true} // <- picture in picture
			/>
			<source src={src} type="video/mp4" />
		</div>
	);
};

export default ReactVideo;
