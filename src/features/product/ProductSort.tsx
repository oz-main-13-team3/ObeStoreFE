import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { SORT_OPTIONS } from '@/constants';
import { useToggleStore } from '@/store';
import { useProductFilterStore } from '@/features/product';

type SortOptionType = string;

interface ProductSortProps {
  selectedOption: SortOptionType;
}

export function ProductSort({ selectedOption }: ProductSortProps) {
  const { isSortOpen, toggleSort, closeSort } = useToggleStore();
  const { sort, setSort } = useProductFilterStore();

  const selectedOptionLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label || SORT_OPTIONS[0].label;

  return (
    <div className='relative inline-block w-40'>
      <button
        onClick={toggleSort}
        className='border-primary-500-40 flex w-full items-center justify-between rounded-lg border py-2 pr-1 pl-2 text-sm font-semibold focus:outline-none'
      >
        {selectedOptionLabel}
        <RiArrowDropDownLine size={20} />
      </button>
      <AnimatePresence>
        {isSortOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='absolute z-50 mt-1 w-full rounded-md bg-white shadow-md'
          >
            {SORT_OPTIONS.map((option) => (
              <div
                key={option.value}
                className={`hover:bg-primary-500-60/10 cursor-pointer px-3 py-2 text-sm ${
                  selectedOption === option.value ? 'text-primary-700 font-bold' : ''
                }`}
                onClick={() => {
                  setSort(option.value);
                  closeSort();
                }}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
