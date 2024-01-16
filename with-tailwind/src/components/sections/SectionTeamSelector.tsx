// Component: SectionTeamSelector
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import CarouselCards from '@/components/singles/CarouselCards';
import { CarouselCardsCardProps } from '@/components/singles/CarouselCards';

// Styles
// ...

/*---------- Static Data ----------*/

// Name
const name = 'SectionTeamSelector';

/*---------- Component ----------*/

// Types
export type BlockTeamSelector = {
	_type: 'blockTeamSelector';
	title?: string;
	body?: string;
	cards?: CarouselCardsCardProps[];
};
export type SectionTeamSelectorProps = {
	settings?: BlockTeamSelector;
	className?: string;
};

// Default component
export default function SectionTeamSelector(props: SectionTeamSelectorProps) {
	/*----- Props -----*/

	// Get props
	const { settings, className } = props;

	/*----- Init -----*/

	// If no settings, return null
	if (!settings) return null;

	// Return default
	return (
		<section
			className={classNames(
				`section w-full overflow-hidden bg-gray-light text-gray`,
				className
			)}
			data-name={name}
		>
			<div className="section__container py-16 space-y-8 lg:py-20">
				<div className="section__row px-6 lg:px-8">
					<div className="section__text-wrapper container mx-auto space-y-4">
						{settings.title && (
							<div className="section__title inline-block max-w-screen-sm font-title font-normal text-[40px] leading-[44px] gradient-text lg:text-[64px]">
								<h1>{settings.title}</h1>
							</div>
						)}
						{settings.body && (
							<div className="section__body max-w-screen-sm mx-auto font-body">
								<p>{settings.body}</p>
							</div>
						)}
					</div>
				</div>
				{settings.cards && settings.cards.length > 0 && (
					<div className="section__carousel">
						<CarouselCards cards={settings.cards} />
					</div>
				)}
			</div>
		</section>
	);
}
