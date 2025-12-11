interface LogoProps {
  size?: number;
  variant?: "header" | "sidebar" | "footer";
}

export const Logo = ({ size = 40, variant = "header" }: LogoProps) => {
  return (
    <div
      className="flex items-center justify-center rounded-lg text-white font-bold transition-opacity hover:opacity-80"
      style={{
        width: size,
        height: size,
        fontSize: `${size * 0.6}px`,
        background: "linear-gradient(135deg, #10b981 0%, #fbbf24 100%)",
      }}
    >
      M
    </div>
  );
};

export default Logo;
