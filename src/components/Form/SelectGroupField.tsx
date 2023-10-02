import classNames from 'classnames';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import FieldWrapper, { FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type GroupOption = { optgroup?: string; options: Option[] };

type OptionType =
  | { options: Option[]; groupedOptions?: never }
  | { options?: never; groupedOptions: GroupOption[] };

type SelectGroupFieldProps = FieldWrapperPassThroughProps &
  OptionType & {
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

function renderOption({ label, value }: Option) {
  return (
    <option key={label?.toString()} value={value}>
      {label}
    </option>
  );
}

function SelectGroupField(props: SelectGroupFieldProps) {
  const {
    label,
    options,
    groupedOptions,
    error,
    className,
    defaultValue,
    registration,
    placeholder,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        className={classNames(
          'mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md border text-gray-900 focus:outline-none sm:text-sm dark:text-white dark:bg-gray-700',
          {
            'bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500':
              !error,
          },
          {
            'bg-red-50 border-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:border-red-400':
              !!error,
          },
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options
          ? options.map((option) => renderOption(option))
          : groupedOptions.map((groupedOption) =>
              groupedOption.optgroup ? (
                <optgroup
                  key={groupedOption.optgroup}
                  label={groupedOption.optgroup}
                >
                  {groupedOption.options.map((option) => renderOption(option))}
                </optgroup>
              ) : (
                groupedOption.options.map((option) => renderOption(option))
              )
            )}
      </select>
    </FieldWrapper>
  );
}

export default SelectGroupField;
