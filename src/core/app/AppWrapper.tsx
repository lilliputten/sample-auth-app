import React from 'react';

interface AppWrapperProps {
  children?: React.ReactNode;
}

export function AppWrapper(props: AppWrapperProps): JSX.Element {
  const { children } = props;
  // TODO: To use composition: StoreWrapper, CoreWrapper, ThemeWrapper
  return (
    <>
      {/* TODO: Expose root control nodes or use custom hooks? */}
      {children}
    </>
  );
}
