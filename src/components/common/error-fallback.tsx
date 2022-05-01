import React from 'react';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button type="button" onClick={resetErrorBoundary}>Try again</button>
  </div>
);
