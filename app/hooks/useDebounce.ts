import { useEffect, useState } from "react";

/**
 * 입력 값을 지정된 시간만큼 delay시켜 반환하는 커스텀 훅
 * 기본 delay: 500
 * 예) const debouncedSearch = useDebounce(search, 500)
  */

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}