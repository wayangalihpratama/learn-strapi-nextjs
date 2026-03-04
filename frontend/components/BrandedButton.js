export default function BrandedButton({
  children,
  href,
  variant = "primary",
  className = "",
  style = {},
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all active:scale-95 min-h-[44px] min-w-[44px]";

  const variants = {
    primary: "bg-sky-accent text-white shadow-sm hover:bg-sky-accent/90",
    secondary:
      "bg-white border border-mist-grey text-foreground hover:bg-mist-grey",
    outline:
      "bg-transparent border border-sky-accent text-sky-accent hover:bg-sky-accent/10",
    ghost: "bg-transparent text-foreground hover:bg-mist-grey",
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        ...style,
        backgroundColor:
          variant === "primary" ? "var(--sky-accent)" : undefined,
        borderColor: variant === "outline" ? "var(--sky-accent)" : undefined,
        color: variant === "outline" ? "var(--sky-accent)" : undefined,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
