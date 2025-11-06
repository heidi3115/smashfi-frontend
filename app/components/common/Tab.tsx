"use client";

export type TabItem<T extends string> = {
    value: T;
    label: string;
}

type TabProps<T extends string> = {
    items: TabItem<T>[];
    activeTab: T;
    onTabChange: (tab: T) => void;
    className?: string;
}

export const Tab = <T extends string> ({
    items,
    activeTab,
    onTabChange,
    className = "",
}: TabProps<T>)=> {
    return (
        <div className={`flex text-lg gap-10 py-5 ${className}`}>
            {items.map((it) => (
                <button
                key={it.value}
                onClick={() => onTabChange(it.value)}
                className={`cursor-pointer transition-colors ${
                    activeTab === it.value ? "font-bold" : "text-gray-400"
                }`}>
                    {it.label}
                </button>
            ))}
        </div>
    )
}