"use Client";

import { IoSearchOutline } from "react-icons/io5";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput = ({value, onChange, placeholder}: SearchInputProps) => {
    return (
        <div className="flex gap-2 items-center bg-[#1e1e1e] rounded-full px-4 py-2 w-full mx-auto shadow-md">
            <div><IoSearchOutline color="gray" /></div>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
            />
        </div>
    )
}

export default SearchInput;