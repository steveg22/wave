import classNames from 'classnames';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  className?: string;
  error?: FieldError | undefined;
  label?: string;
  children: React.ReactNode;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

function FieldWrapper(props: FieldWrapperProps) {
  const { label, className, error, children } = props;
  return (
    <div>
      <label
        className={classNames(
          'block mb-2 text-sm font-medium',
          { 'text-red-700 dark:text-red-500': !!error },
          className
        )}
      >
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-600 dark:text-red-500"
        >
          <span className="font-medium">{error.message}</span>
        </div>
      )}
    </div>
  );
}

export default FieldWrapper;
