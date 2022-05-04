import MaterialTypography from '@mui/material/Typography';

const typographyVariantsMap = {
  'heading1': 'h1',
  'heading2': 'h2',
  'heading3': 'h3',
  'heading4': 'h4',
  'heading5': 'h5',
  'heading6': 'h6',
  'body1': 'body1',
  'body2': 'body2',
};

interface TextProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'li' | 'span';
  variant: keyof typeof typographyVariantsMap;
  children: React.ReactNode;
  styleSheet?: Record<string,any>;
}
export function Text({ tag, variant, styleSheet, children }: TextProps) {
  return (
    <MaterialTypography
      component={tag}
      variant={typographyVariantsMap[variant] as unknown as any}
      sx={styleSheet}
    >
      {children}
    </MaterialTypography>
  );
}
