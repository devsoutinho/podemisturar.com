import { Head } from '@src/components/Head/Head';

interface PageHOCProps {
  title: string;
  description: string;
}
export function pageHOC(Component, setupProps?: Partial<PageHOCProps>) {
  return function Wrapper(props) {
    return (
      <>
        <Head {...{...props, ...setupProps}} />
        <Component {...props} />
      </>
    );
  }
}
