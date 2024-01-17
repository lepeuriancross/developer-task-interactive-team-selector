// Component: CarouselCards
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

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

	// State - overlayShow
	const [overlayShow, setOverlayShow] = useState<boolean>(false);
	const [overlaySrc, setOverlaySrc] = useState<string | undefined>();

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

	// Method - openOverlay
	const openOverlay = (src: string) => {
		// Set overlaySrc
		setOverlaySrc(src);

		// Set overlayShow
		setOverlayShow(true);
	};

	// Method - closeOverlay
	const closeOverlay = () => {
		// Set overlayShow
		setOverlayShow(false);
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

	// Watch - dropdownShow, overlayShow
	useEffect(() => {
		// If dropdownShow or overlayShow
		if (dropdownShow || overlayShow) {
			// Set body style
			document.body.style.overflow = 'hidden';
		} else {
			// Set body style
			document.body.style.overflow = 'auto';
		}
	}, [dropdownShow, overlayShow]);

	/*----- Init -----*/

	// If no cards, return null
	if (!cards || cards.length === 0) return null;

	// Return default
	return (
		<>
			<div
				className={classNames(`carousel block space-y-4`, className)}
				data-name={name}
			>
				<div className="carousel__dropdown px-6 lg:hidden">
					<button
						className="carousel__dropdown-button flex justify-between items-center w-full border-2 rounded-[8px] px-4 py-2 font-button font-normal text-[18px] leading-[27px] bg-transparent transition-colors duration-300 ease-out select-none border-blue lg:hover:bg-blue"
						type="button"
						onClick={openDropdown}
					>
						<span className="carousel__dropdown-button-text">
							{cards[cardCurrent]?.name ?? 'Select a sub-team'}
						</span>
						<span className="carousel__dropdown-button-icon w-[16px] h-[8px]">
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

				<ul className="carousel__nav--desktop hidden justify-center items-center max-w-screen-lg mx-auto gap-2 flex-wrap lg:flex">
					{cards.map((card, c) => (
						<li
							className="carousel__nav-item"
							key={`carousel-teams-nav-item-desktop-${card.id}`}
						>
							<button
								className={classNames(
									`carousel__button border rounded-[8px] px-3 pt-1 font-light text-[20px] leading-[27px] transition-colors duration-300 ease-out select-none`,
									c === cardCurrent
										? `bg-blue border-blue text-white`
										: 'is-active bg-transparent border-gray text-gray lg:hover:bg-blue lg:hover:border-blue lg:hover:text-white'
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
							className="max-w-full"
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
									className={classNames(cardCurrent === c && `is-active`)}
									key={`carousel-teams-card-${card.id}`}
									onClickVideo={openOverlay}
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
				<ul className="carousel__nav--mobile divide-y divide-gray-light">
					{cards.map((card, c) => (
						<li
							className="carousel__nav-item"
							key={`carousel-teams-nav-item-mobile-${card.id}`}
						>
							<button
								className={classNames(
									`carousel__button w-full py-2 text-[16px] text-left select-none`,
									c === cardCurrent && 'text-blue'
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
			<CarouselCardsOverlay
				isActive={overlayShow}
				src={overlaySrc}
				onClickClose={closeOverlay}
			/>
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
	} = props;

	/*----- Store -----*/

	// State - isActive
	const [isActive, setIsActive] = useState<boolean>(false);

	/*----- Lifecycle -----*/

	// Watch - className
	useEffect(() => {
		// Set isActive
		setIsActive(className && className.includes('is-active') ? true : false);
	}, [className]);

	/*----- Init -----*/

	// Return default
	return (
		<>
			<article
				id={id}
				className={classNames(`card p-6 lg:h-full`, className)}
				data-name={`${name}Card`}
			>
				<div className="card__container flex flex-col h-full max-w-screen-lg mx-auto rounded-[8px] shadow-lg overflow-hidden bg-white">
					<div className="card__row grid grid-flow-dense gird-cols-1 grow lg:grid-cols-2">
						<div className="card__col flex flex-col p-6 pb-8 space-y-5 text-left lg:p-8 lg:pb-12">
							<div className="card__text-wrapper space-y-5">
								{jobs && (
									<div className="card__jobs text-[16px] leading-[18.4px]">
										<span className="card__jobs-val font-semibold">{jobs}</span>{' '}
										<span className="card__jobs-text">jobs available</span>
									</div>
								)}
								{title && (
									<h2 className="card__title inline-block font-title font-normal text-[24px] leading-[27.6px] gradient-text lg:text-[40px] lg:leading-[46px]">
										{title}
									</h2>
								)}
								{body && (
									<div className="card__body pt-2">
										<p>{body}</p>
									</div>
								)}
							</div>
							{link && (
								<div className="card__button-wrapper flex items-end grow">
									<Link href={link.href} target={link.target}>
										<button className="card__button border-2 rounded-[8px] px-4 py-2 font-button font-normal text-[18px] leading-[27px] bg-transparent transition-colors duration-300 ease-out select-none border-blue text-blue lg:hover:bg-blue lg:hover:border-blue lg:hover:text-white">
											<span className="card__button-text">
												{link.name ?? 'Find jobs'}
											</span>
										</button>
									</Link>
								</div>
							)}
						</div>
						<div className="card__col">
							<div className="card__image relative w-full h-full overflow-hidden group">
								<span className="card__image-spacer realtive z-10 block pt-[64%]" />
								{image && (
									<Image
										className={classNames(
											`card__image-img absolute z-20 top-0 left-0 transform w-full h-full transition-transform duration-500 ease-in-out object-cover`,
											video && 'lg:group-hover:scale-110'
										)}
										src={image}
										width={1920}
										height={1080}
										alt=""
									/>
								)}
								{video && (
									<button
										className="card__playbutton absolute z-30 top-0 left-0 flex justify-center items-center w-full h-full font-button font-normal cursor-pointer select-none"
										type="button"
										onClick={() => onClickVideo(video.src)}
									>
										<div className="card__playbutton-container inline-flex justify-center items-center">
											<div className="card__playbutton-icon relative z-20 transform rounded-full shadow-lg lg:-mr-3 bg-black/10">
												<Image
													className="card__playbutton-icon-img w-[34px] h-[34px] lg:w-[70px] lg:h-[70px]"
													src={imgIconPlay.src}
													width={imgIconPlay.width}
													height={imgIconPlay.height}
													alt=""
													aria-hidden="true"
												/>
											</div>
											<div className="card__playbutton-text relative z-10 hidden rounded-r-[8px] px-6 py-4 backdrop-blur-lg lg:inline-block text-white bg-white/10">
												{video.name ?? 'Watch video'}
											</div>
										</div>
									</button>
								)}
							</div>
						</div>
					</div>
					<div className="card__strip gradient-background w-full h-[6px]" />
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
			className={classNames(
				`dropdown fixed z-50 top-0 left-0 flex flex-col justify-end w-full h-screen`,
				isActive ? 'is-active' : 'pointer-events-none',
				className
			)}
			data-name={`${name}Dropdown`}
		>
			<motion.div
				className="dropdown__menu-bg absolute z-10 top-0 left-0 w-full h-full select-none bg-black/30"
				initial={{ opacity: 0 }}
				animate={{ opacity: isActive ? 1 : 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				onClick={onClickClose}
			/>
			<motion.div
				className="dropdown__menu-container relative z-20 max-h-full rounded-t-[8px] p-6 font-title font-normal text-[20px] text-left overflow-y-scroll lg:p-8 bg-white"
				initial={{ y: '100%' }}
				animate={{ y: isActive ? 0 : '100%' }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
			>
				<div className="dropdown__menu-heading flex justify-between items-end border-b pb-4 border-gray">
					<h3 className="dropdown__menu-heading-title font-title font-normal text-[20px]">
						{title}
					</h3>
					<button
						className="dropdown__menu-close relative w-[42px] h-[42px] rounded-[8px] select-none bg-gray/30"
						onClick={onClickClose}
					>
						<span className="sr-only">Close dropdown</span>
						<Image
							className="dropdown__menu-close-img absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
							src={imgIconClose.src}
							width={imgIconClose.width}
							height={imgIconClose.height}
							alt=""
							aria-hidden="true"
						/>
					</button>
				</div>
				<div className="dropdown__menu-content pt-4">{children}</div>
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
				`overlay fixed top-0 left-0 flex justify-center items-center w-full h-full`,
				!(isActive && src) && 'pointer-events-none',
				className
			)}
			data-name={`${name}Overlay`}
		>
			<motion.div
				className="overlay__bg absolute z-10 top-0 left-0 w-full h-screen select-none bg-black/30"
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
				className="overlay__container relative z-20"
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
					className="bg-black"
					title={title}
					src={src}
					options={{
						playing: isActive ?? false,
					}}
				/>
			</motion.div>
			<motion.button
				className="overlay__close absolute z-30 top-6 right-6 w-[42px] h-[42px] rounded-[8px] lg:top-8 lg:right-8 bg-gray/30"
				initial={{ opacity: 0 }}
				animate={{ opacity: isActive && src ? 1 : 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				onClick={onClickClose}
			>
				<span className="sr-only">Close dropdown</span>
				<Image
					className="overlay__close-img absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
