import { useEffect, useState } from "react";

/**
 * 입력 값을 지정된 시간만큼 delay시켜 반환하는 커스텀 훅
 * 기본 delay: 500
 * 예) const debouncedSearch = useDebounce(search, 500)
  */

export default function useDebounce<T>(propValue: T, delay: number = 500): T {
    const [value, setValue] = useState(propValue);

    useEffect(() => {
        const handler = setTimeout(() => setValue(propValue), delay);

        return () => clearTimeout(handler);
    }, [propValue, delay]);

    return value;
}