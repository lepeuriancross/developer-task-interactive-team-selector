// Component: CarouselCards
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configVideo } from '@/data/config';

// Scripts (node)
import { useRef, useState, useCallback, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Components (local)
import EmblaCarousel from '@/components/utility/EmblaCarousel';
import ReactVideo from '@/components/utility/ReactVideo';

// Images
import imgIconChevron from '../../../public/img/icon_chevron.svg';
import imgIconPlay from '../../../public/img/icon_play.svg';
import imgIconClose from '../../../public/img/icon_close.svg';

/*---------- Static Data ----------*/

// Name
const name = 'CarouselCards';

/*---------- Component ----------*/

// Types
export type CarouselCardsProps = {
	cards?: CarouselCardsCardProps[];
	className?: string;
};
export type CarouselCardsCardProps = {
	id: string;
	jobs?: number;
	name?: string;
	title?: string;
	body?: string;
	link?: {
		name?: string;
		href: string;
		target?: string;
	};
	image?: string;
	video?: {
		name?: string;
		title?: string;
		src: string;
		className?: string;
	};
	className?: string;
	onClickVideo?: (src: string) => void;
	onCloseVideo?: () => void;
};
export type CarouselCardsDropdownProps = {
	isActive?: boolean;
	title?: string;
	className?: string;
	children?: React.ReactNode;
	onClickClose?: () => void;
};
export interface CarouselCardsOverlayProps {
	isActive?: boolean;
	title?: string;
	src?: string;
	className?: string;
	onClickClose?: () => void;
}

// Default component
export default function CarouselCards(props: CarouselCardsProps) {
	/*----- Props -----*/

	// Get props
	const { cards, className } = props;

	/*----- Refs -----*/

	// Ref - emblaRef
	const emblaRef = useRef<any>(null);

	/*----- Store -----*/

	// State - cardCurrent
	const [cardFirst, setCardFirst] = useState<number>(-1);
	const [cardCurrent, setCardCurrent] = useState<number>(-1);

	// State - dropdownShow
	const [dropdownShow, setDropdownShow] = useState<boolean>(false);

	// State - videoShow
	const [videoShow, setVideoShow] = useState<boolean>(false);
	const [videoSrc, setVideoSrc] = useState<string | undefined>();

	/*----- Methods -----*/

	// Method - handleSelect
	const handleSelect = (index: number) => {
		// Set cardCurrent
		setCardCurrent(index);
	};

	// Method - selectItem
	const selectItem = useCallback(
		(index: number) => {
			// Set dropdownShow
			setDropdownShow(false);

			// If cardCurrent = -1
			if (cardCurrent === -1) {
				// Set cardFirst
				setCardFirst(index);

				// Set cardCurrent
				setCardCurrent(index);
			}

			// Set embla
			emblaRef.current?.scrollTo(index);
		},
		[cardCurrent]
	);

	// Method - openDropdown
	const openDropdown = () => {
		// Set dropdownShow
		setDropdownShow(true);
	};

	// Method - closeDropdown
	const closeDropdown = () => {
		// Set dropdownShow
		setDropdownShow(false);
	};

	// Method - openVideo
	const openVideo = (src: string) => {
		// Set videoSrc
		setVideoSrc(src);

		// Set videoShow
		setVideoShow(true);
	};

	// Method - closeVideo
	const closeVideo = () => {
		// Set videoShow
		setVideoShow(false);
	};

	/*----- Lifecycle -----*/

	// Add event listener - window resize
	useEffect(() => {
		// Function - handleResize
		const handleResize = () => {
			// Set dropdownShow
			setDropdownShow(false);

			// Set cardCurrent
			setCardCurrent(-1);
		};

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Return cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Watch - dropdownShow, videoShow
	useEffect(() => {
		// If dropdownShow or videoShow
		if (!configVideo.playsInline && (dropdownShow || videoShow)) {
			// Set body style
			document.body.style.overflow = 'hidden';
		} else {
			// Set body style
			document.body.style.overflow = 'auto';
		}
	}, [dropdownShow, videoShow]);

	// Watch - cardCurrent
	useEffect(() => {
		// Set videoShow
		setVideoShow(false);
	}, [cardCurrent]);

	/*----- Init -----*/

	// If no cards, return null
	if (!cards || cards.length === 0) return null;

	// Return default
	return (
		<>
			<div className={classNames(`carousel`, className)} data-name={name}>
				<div className="carousel__dropdown">
					<button
						className="carousel__dropdown-button"
						type="button"
						onClick={openDropdown}
					>
						<span className="carousel__dropdown-button-text">
							{cards[cardCurrent]?.name ?? 'Select a sub-team'}
						</span>
						<span className="carousel__dropdown-button-icon">
							<Image
								className="carousel__dropdown-button-icon-img"
								src={imgIconChevron.src}
								width={imgIconChevron.width}
								height={imgIconChevron.height}
								alt=""
								aria-hidden="true"
							/>
						</span>
					</button>
				</div>

				<ul className="carousel__nav--desktop">
					{cards.map((card, c) => (
						<li
							className="carousel__nav-item"
							key={`carousel-teams-nav-item-desktop-${card.id}`}
						>
							<button
								className={classNames(
									`carousel__button`,
									c === cardCurrent && 'is-active'
								)}
								type="button"
								onClick={() => selectItem(c)}
							>
								<span className="carousel__button-text">
									{card.name ?? `Card ${c}`}
								</span>
							</button>
						</li>
					))}
				</ul>

				{cardCurrent >= 0 && (
					<motion.div
						className="carousel__embla"
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '-100%' }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
					>
						<EmblaCarousel
							options={{
								loop: true,
							}}
							ref={emblaRef}
							defaultSlide={cardFirst}
							onSelect={handleSelect}
						>
							{cards.map((card, c) => (
								<CarouselCardsCard
									{...card}
									className={classNames(
										cardCurrent === c && `is-active`,
										videoShow && `show-video`
									)}
									key={`carousel-teams-card-${card.id}`}
									onClickVideo={openVideo}
									onCloseVideo={closeVideo}
								/>
							))}
						</EmblaCarousel>
					</motion.div>
				)}
			</div>
			<CarouselCardsDropdown
				isActive={dropdownShow}
				onClickClose={closeDropdown}
			>
				<ul className="carousel__nav--mobile">
					{cards.map((card, c) => (
						<li
							className="carousel__nav-item"
							key={`carousel-teams-nav-item-mobile-${card.id}`}
						>
							<button
								className={classNames(
									`carousel__button`,
									c === cardCurrent && 'is-active'
								)}
								onClick={() => selectItem(c)}
							>
								<span className="carousel__button-text">
									{card.name ?? `Card ${c}`}
								</span>
							</button>
						</li>
					))}
				</ul>
			</CarouselCardsDropdown>
			{!configVideo.playsInline && (
				<CarouselCardsOverlay
					isActive={videoShow}
					src={videoSrc}
					onClickClose={closeVideo}
				/>
			)}
		</>
	);
}

// Card component
export function CarouselCardsCard(props: CarouselCardsCardProps) {
	/*----- Props -----*/

	// Get props
	const {
		id,
		jobs,
		name,
		title,
		body,
		link,
		image,
		video,
		className,
		onClickVideo = (src: string) => {},
		onCloseVideo = () => {},
	} = props;

	/*----- Refs -----*/

	// Ref - imageColEl
	const imageColEl = useRef<any>(null);

	/*----- Store -----*/

	// State - isActive
	const [isActive, setIsActive] = useState<boolean>(false);

	// State - showVideo
	const [showVideo, setShowVideo] = useState<boolean>(false);

	/*----- Lifecycle -----*/

	// Watch - className
	useEffect(() => {
		// Set isActive
		setIsActive(className && className.includes('is-active') ? true : false);

		// Set showVideo
		setShowVideo(className && className.includes('show-video') ? true : false);
	}, [className]);

	/*----- Init -----*/

	// Return default
	return (
		<>
			<article
				id={id}
				className={classNames(`card`, className)}
				data-name={`${name}Card`}
			>
				<div className="card__container">
					<div className="card__row">
						<div className="card__col--info">
							<div className="card__text-wrapper">
								{jobs && (
									<div className="card__jobs">
										<span className="card__jobs-val">{jobs}</span>{' '}
										<span className="card__jobs-text">jobs available</span>
									</div>
								)}
								{title && <h2 className="card__title">{title}</h2>}
								{body && (
									<div className="card__body">
										<p>{body}</p>
									</div>
								)}
							</div>
							{link && (
								<div className="card__button-wrapper">
									<Link href={link.href} target={link.target}>
										<button className="card__button">
											<span className="card__button-text">
												{link.name ?? 'Find jobs'}
											</span>
										</button>
									</Link>
								</div>
							)}
						</div>
						<div ref={imageColEl} className="card__col--image">
							<div className="card__image">
								{image && (
									<Image
										className={classNames(
											`card__image-img`,
											video && !(isActive && showVideo) && 'is-video'
										)}
										src={image}
										width={1920}
										height={1080}
										alt=""
									/>
								)}
								{video && (
									<button
										className="card__playbutton"
										type="button"
										onClick={() => onClickVideo(video.src)}
									>
										<div className="card__playbutton-container">
											<div className="card__playbutton-icon">
												<Image
													className="card__playbutton-icon-img"
													src={imgIconPlay.src}
													width={imgIconPlay.width}
													height={imgIconPlay.height}
													alt=""
													aria-hidden="true"
												/>
											</div>
											<div className="card__playbutton-text">
												{video.name ?? 'Watch video'}
											</div>
										</div>
									</button>
								)}
								{configVideo.playsInline && video && isActive && showVideo && (
									<motion.div
										className="card__video"
										initial={{
											opacity: 0,
										}}
										animate={{
											opacity: 1,
										}}
										transition={{
											duration: 0.3,
											ease: 'easeOut',
										}}
									>
										<motion.div
											className="card__video-bg"
											initial={{
												opacity: 0,
											}}
											animate={{
												opacity: 1,
											}}
											transition={{
												duration: 0.3,
												ease: 'easeOut',
											}}
										/>
										<ReactVideo
											src={video.src}
											options={{
												playing: isActive ?? false,
												width: 488,
												height: 275,
											}}
										/>
										<motion.button
											className="card__close"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.3, ease: 'easeOut' }}
											onClick={onCloseVideo}
										>
											<span className="sr-only">Close dropdown</span>
											<Image
												className="overlay__close-img"
												src={imgIconClose.src}
												width={imgIconClose.width}
												height={imgIconClose.height}
												alt=""
												aria-hidden="true"
											/>
										</motion.button>
									</motion.div>
								)}
							</div>
						</div>
					</div>
					<div className="card__strip" />
				</div>
			</article>
		</>
	);
}

// Dropdown component
export function CarouselCardsDropdown(props: CarouselCardsDropdownProps) {
	/*----- Props -----*/

	// Get props
	const {
		title = 'Select a sub team',
		isActive,
		className,
		children,
		onClickClose = () => {},
	} = props;

	/*----- Init -----*/

	// Return
	return (
		<div
			className={classNames(`dropdown`, isActive && 'is-active', className)}
			data-name={`${name}Dropdown`}
		>
			<motion.div
				className="dropdown__menu-bg"
				initial={{ opacity: 0 }}
				animate={{ opacity: isActive ? 1 : 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				onClick={onClickClose}
			/>
			<motion.div
				className="dropdown__menu-container"
				initial={{ y: '100%' }}
				animate={{ y: isActive ? 0 : '100%' }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
			>
				<div className="dropdown__menu-heading">
					<h3 className="dropdown__menu-heading-title">{title}</h3>
					<button className="dropdown__menu-close" onClick={onClickClose}>
						<span className="sr-only">Close dropdown</span>
						<Image
							className="dropdown__menu-close-img"
							src={imgIconClose.src}
							width={imgIconClose.width}
							height={imgIconClose.height}
							alt=""
							aria-hidden="true"
						/>
					</button>
				</div>
				<div className="dropdown__menu-content">{children}</div>
			</motion.div>
		</div>
	);
}

// Overlay component
export function CarouselCardsOverlay(props: CarouselCardsOverlayProps) {
	/*----- Props -----*/

	// Get props
	const { isActive, title, src, className, onClickClose = () => {} } = props;

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`overlay`,
				isActive && src && 'is-active',
				className
			)}
			data-name={`${name}Overlay`}
		>
			<motion.div
				className="overlay__bg"
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: isActive && src ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: 'easeOut',
				}}
				onClick={onClickClose}
			/>
			<motion.div
				className="overlay__container"
				initial={{
					y: '100px',
					opacity: 0,
				}}
				animate={{
					y: isActive && src ? 0 : '100px',
					opacity: isActive && src ? 1 : 0,
				}}
				transition={{ duration: 0.3, ease: 'easeOut' }}
			>
				<ReactVideo
					title={title}
					src={src}
					options={{
						playing: isActive ?? false,
					}}
				/>
			</motion.div>
			<motion.button
				className="overlay__close"
				initial={{ opacity: 0 }}
				animate={{ opacity: isActive && src ? 1 : 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				onClick={onClickClose}
			>
				<span className="sr-only">Close dropdown</span>
				<Image
					className="overlay__close-img"
					src={imgIconClose.src}
					width={imgIconClose.width}
					height={imgIconClose.height}
					alt=""
					aria-hidden="true"
				/>
			</motion.button>
		</div>
	);
}
