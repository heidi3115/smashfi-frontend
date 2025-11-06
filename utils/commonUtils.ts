// 단위(T, B, M 등) 추가 함수
export const formatNumber = (num: number) => {
    if (num >= 1_000_000_000_000) return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `$${(num / 1_000_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${num.toLocaleString()}`;

    return `$${num.toFixed(2)}`;
}

// 천 단위 쉼표 넣는 함수
export const formatPrice = (num: number | string): string => {
    const numVal = Number(num);

    if(isNaN(numVal)) return "-";

    return numVal.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}