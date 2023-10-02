import classNames from 'classnames';
import { ReactComponent as MagnifyingGlassIcon } from '@/assets/magnifying-glass.svg';

type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type SearchProps = WithRequired<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
>;

function Search({ className, ...rest }: SearchProps) {
  return (
    <div className="group flex justify-between text-sm items-end border-b border-gray-500 px-2 text-gray-500 dark:text-gray-300 dark:border-gray-300">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <input
        placeholder="Search.."
        className={classNames(
          'w-full bg-transparent border-none focus:outline-none placeholder:font-thin dark:placeholder-gray-300',
          className
        )}
        {...rest}
      />
      <MagnifyingGlassIcon className="w-8 h-8 duration-200 group-hover:scale-110" />
    </div>
  );
}

export default Search;
