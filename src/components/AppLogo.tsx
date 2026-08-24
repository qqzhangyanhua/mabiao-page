export function AppLogo({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <img
      src="/icon.png"
      alt="码表"
      width={size}
      height={size}
      className={className ? `brand-icon ${className}` : "brand-icon"}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
      }}
      loading="eager"
      decoding="async"
    />
  );
}

