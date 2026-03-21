import { NavLinks } from './NavLinks';
import clsx from 'clsx';

type MobileNavProps = {
  onClick: (id: string) => void;
  activeSection: string;
  isOpen?: boolean;
};

export const MobileNav = ({
  onClick,
  activeSection,
  isOpen,
}: MobileNavProps) => {
  return (
    <div
      id="mobile-menu"
      className={clsx(
        'lg:hidden py-8 px-6 border-t border-cream/30 bg-warm-white/98 backdrop-blur-md rounded-b-3xl shadow-2xl transition-all duration-500 group',
        isOpen && 'is-open'
      )}
      role="navigation"
      aria-label="Мобільна навігація"
    >
      <div className="flex flex-col space-y-2">
        <NavLinks
          onClick={onClick}
          activeSection={activeSection}
          variant="mobile"
        />
      </div>
    </div>
  );
};
