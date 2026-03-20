'use client';

import React, { useEffect, useState } from 'react';
import { LucideProps, Coffee } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const iconCache: Record<string, React.ComponentType<any>> = {};

export const Icon = ({ name, ...props }: IconProps) => {
  const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  const [IconComponent, setIconComponent] =
    useState<React.ComponentType<any> | null>(iconCache[kebabName] || null);

  useEffect(() => {
    let isMounted = true;

    if (!iconCache[kebabName]) {
      const loadIcon = async () => {
        try {
          const loader = (dynamicIconImports as any)[kebabName];
          if (loader) {
            const mod = await loader();
            if (isMounted) {
              iconCache[kebabName] = mod.default;
              setIconComponent(() => mod.default);
            }
          } else {
            if (isMounted) {
              setIconComponent(null);
            }
          }
        } catch (error) {
          if (isMounted) {
            setIconComponent(null);
          }
        }
      };
      loadIcon();
    } else {
      setIconComponent(() => iconCache[kebabName]);
    }

    return () => {
      isMounted = false;
    };
  }, [kebabName]);

  const LucideIcon = IconComponent;

  if (!LucideIcon) {
    return <Coffee {...props} />;
  }

  return <LucideIcon {...props} />;
};
