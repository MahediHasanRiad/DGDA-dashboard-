import type { HTMLInputTypeAttribute } from "react";

interface InputType {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  name,
  label,
  type = 'text',
  placeholder = '',
  readonly = false,
  onChange,
  value,
}: InputType) {
  

  return (
    <section className="">
      <label
        className={`text-[12px] md:text-sm ${readonly == true ? "text-gray-700" : "text-black"}`}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        placeholder={placeholder}
        className="w-full border mt-2 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#D4A017]/50 transition-colors"
      />
    </section>
  );
}
