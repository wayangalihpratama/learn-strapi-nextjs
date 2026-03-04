import HeroBlock from "./blocks/HeroBlock";
import InfoBlock from "./blocks/InfoBlock";
import FeaturedGridBlock from "./blocks/FeaturedGridBlock";

const BlockRenderer = ({ blocks }) => {
  if (!blocks) return null;

  return blocks.map((block, index) => {
    switch (block.__component) {
      case "sections.hero":
        return <HeroBlock key={index} data={block} />;
      case "sections.info-block":
        return <InfoBlock key={index} data={block} />;
      case "sections.featured-grid":
        return <FeaturedGridBlock key={index} data={block} />;
      default:
        console.warn(`Unknown component: ${block.__component}`);
        return null;
    }
  });
};

export default BlockRenderer;
