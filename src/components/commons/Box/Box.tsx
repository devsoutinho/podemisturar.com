import React from 'react';
import MaterialBox from '@mui/material/Box';

interface BoxProps {
  tag?: string;
  children: React.ReactNode;
  styleSheet?: Record<string,any>;
  onSubmit?: any;
}
export function Box({ tag, styleSheet, children, ...props }: BoxProps) {
  return (
    <MaterialBox
      component={tag as unknown as any}
      sx={styleSheet}
      {...props}
    >
      {children}
    </MaterialBox>
  );
}
