// Component: PageHome
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticContent } from '@/data/content';

// Scripts (node)
// ...

// Scripts (local)
// ..

// Components (node)
// ...

// Components (local)
import SectionTeamSelector from '@/components/sections/SectionTeamSelector';

/*---------- Static Data ----------*/

// Name
const name = 'PageHome';

/*---------- Component ----------*/

export default function PageHome() {
	/*----- Init -----*/

	// Fetch content (static for now)
	const content = staticContent;

	// Return default
	return (
		<main className="page" data-name={name}>
			{/* Section Array */}
			{content.sections && content.sections.length > 0 && (
				<>
					{content.sections.map((section, i) => (
						<>
							{section._type === 'blockTeamSelector' && (
								<SectionTeamSelector settings={section} key={i} />
							)}
						</>
					))}
				</>
			)}
		</main>
	);
}
