import BrandedButton from "../BrandedButton";
import Image from "next/image";

const HeroBlock = ({ data }) => {
  const { title, subtitle, background, primaryButton, secondaryButton } = data;

  const getImageUrl = (image) => {
    if (!image?.url) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`;
  };

  const bgUrl = getImageUrl(background);

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {bgUrl && (
        <Image
          src={bgUrl}
          alt={title}
          fill
          priority
          className="object-cover scale-105 animate-subtle-zoom"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-white/10" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="heading-hero text-white mb-6 drop-shadow-lg">{title}</h1>
        {subtitle && (
          <p className="subheading text-white/90 mb-10 drop-shadow-md">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryButton && (
            <BrandedButton
              href={primaryButton.link}
              variant={primaryButton.variant}
              className="w-full sm:w-auto px-8 py-4 text-lg"
            >
              {primaryButton.label}
            </BrandedButton>
          )}
          {secondaryButton && (
            <BrandedButton
              href={secondaryButton.link}
              variant={secondaryButton.variant}
              className="w-full sm:w-auto px-8 py-4 text-lg"
            >
              {secondaryButton.label}
            </BrandedButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
