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
		<section className={classNames(`section`, className)} data-name={name}>
			<div className="section__container">
				<div className="section__row">
					<div className="section__text-wrapper">
						{settings.title && (
							<div className="section__title">
								<h1>{settings.title}</h1>
							</div>
						)}
						{settings.body && (
							<div className="section__body">
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
