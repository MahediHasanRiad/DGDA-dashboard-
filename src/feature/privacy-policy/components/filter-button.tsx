interface FilterBtnType<T> {
  text: string;
  value: T;
  statusHandler: (v: T) => void;
  filter?: T;
}

function FilterBtn<T>({
  text,
  value,
  statusHandler,
  filter,
}: FilterBtnType<T>) {
  return (
    <div>
      <span
        className={`block border border-gray-300 md:p-4 p-2 text-[10px] md:text-sm rounded-md cursor-pointer transition-colors text-center ${
          filter === value ? "bg-primary-0 text-white" : "hover:bg-muted"
        }`}
        onClick={() => statusHandler(value)}
      >
        {text}
      </span>
    </div>
  );
}

export default FilterBtn;
