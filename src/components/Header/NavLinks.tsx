import clsx from "clsx";

type NavLinksProps = {
  onClick: (id: string) => void;
  activeSection: string;
  variant?: "desktop" | "mobile";
};

export const NavLinks = ({
  onClick,
  activeSection,
  variant = "desktop",
}: NavLinksProps) => {
  const links = [
    { id: "home", label: "Головна" },
    { id: "menu", label: "Меню" },
    { id: "about", label: "Про нас" },
    { id: "gallery", label: "Галерея" },
    { id: "coffee-quiz", label: "Тест кави" },
    { id: "events", label: "Події" },
    { id: "reviews", label: "Відгуки" },
  ];

  return (
    <>
      {links.map(({ id, label }, index) => {
        const isActive = activeSection === id;

        const isMobile = variant === "mobile";

        return (
          <button
            key={id}
            onClick={() => onClick(id)}
            style={{ 
              transitionDelay: isMobile ? `${index * 100}ms` : "0ms" 
            }}
            className={clsx(
              "relative text-xl transition-all duration-700 ease-[var(--ease-spring)]",
              isMobile ? "opacity-0 translate-y-4 group-[.is-open]:opacity-100 group-[.is-open]:translate-y-0" : "",

              !isActive && [
                "text-warm-brown",
                "hover:text-sage-green hover:scale-105",
                "before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5",
                "before:bg-sage-green before:transition-all before:duration-300",
                "hover:before:w-full",
              ],

                isActive && "text-sage-green font-medium scale-105",

                variant === "mobile" && "text-left py-4 px-6 w-full border-b border-warm-brown/5 last:border-0 active:bg-sage-green/5",
                variant === "desktop" && "px-1"
              )}
            >
              <span className="relative z-10">{label}</span>
              {isActive && variant === "desktop" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sage-green rounded-full shadow-[0_0_8px_rgba(156,170,156,0.6)]" />
              )}
              {isActive && variant === "mobile" && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sage-green rounded-r-full" />
              )}
            {isActive && (
              <span
                className={clsx(
                  "absolute -top-1 -right-1 w-2 h-2 bg-sage-green rounded-full",
                  "animate-pulse",
                  isMobile && "hidden"
                )}
              />
            )}
          </button>
        );
      })}
    </>
  );
};
