# Coin List

## 사용 기술 스택
### Next.js 16
  - App Router 기반의 최신 버전으로, Route Handler, redirect() API 등 안정화된 최신 버전을 사용해보기 위해 선택
### TypeScript
  - 정적 타입 기반 안전한 프론트엔드 개발
### Tailwind CSS
  - CSS-in-JS 대비 빠르고 직관적인 스타일링
### Zustand
  - 전역 상태(즐겨찾기 등) 관리, localStorage persistence 적용
### Tanstack-table(React-table)
  - 대용량 데이터에서도 확장성이 좋은 테이블 렌더링
  - 추후 pagination이나 기타 테이블 기능 확장 시 유용할 것으로 판단되어 선택
### Mock API (Next.js Route Handler)
  - 서버 없이 /api/coins 경로로 데이터 제공
### react-icons, react-hot-toast
  - 피드백 UI 및 아이콘 사용


## 프로젝트 실행 방법

1. 패키지 설치
```
npm install
```

2. 개발 서버 실행
```
npm run dev
```

3. 브라우저에서 확인
```
http://localhost:3000
```


## 주요 기능 및 설계 기준
### 1. 라우팅 및 접근성
  - `/` 접근시 `coin-list`로 리다이렉트
  - 초기 진입 시 Price 기준 내림차순 오더
  - 각 열 클릭 시 asc/desc 정렬 및 정렬 상태 아이콘 표기

### 2. 테이블, 즐겨찾기, 검색
  - 코인 리스트를 테이블로 표시
  - 각 행 별 아이콘으로 즐겨찾기 추가/해제, My favorite 탭에서 즐겨찾기된 목록만 분리 표시
  - 전역 상태(Zustand/persist)로 즐겨찾기 유지
  - 이름/심볼(대소문자 무관) 기준 실시간 검색, 정렬/즐겨찾기 상태와 연동
  - 즐겨찾기 추가/제거 시 토스트 메세지로 사용자 피드백 제공

### 3. 구조 및 설계
  - Table/State/Search 등 기능별 커스텀 Hook과 UI 컴포넌트 분리로 재사용성과 유지보수성 강화
  - useMemo로 React 렌더링 성능 최적화 패턴 일부 적용
  - 검색 input의 불필요한 필터링 호출을 줄이기 위해 useDebounce 커스텀 훅 구현
  - CoinListTable 구성에서 테이블 행 렌더링 코드를 별도 컴포넌트로 분리하여 단일 책임 원칙 준수

## 구현 상세

### Tanstack-table을 사용한 정렬 기능
```typescript
export const SortableHeader = ({column, label, align = "start"}: SortableHeaderProps) => {
    const sorted = column.getIsSorted();

    // text 정렬
    const alignClass = align === "center" ? "justify-center" : align === "end" ? "justify-end" : "justify-start";

    return (
        <button
            className={`flex gap-2 items-center gap-2 w-full ${alignClass}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <span>{label}</span>
            {sorted === "asc" ? (
                <FaCircleArrowUp className="text-blue-500" />
            ) : sorted === "desc" ? (
                <FaCircleArrowDown className="text-blue-500" />
            ) : (
                <FaCircleArrowDown className="opacity-30" />
            )}
        </button>
    )
}
```
- Column.getIsSorted()를 통해 현재 정렬 상태를 가져와 아이콘 색상을 동적으로 변경

### Zustand 전역 상태 관리
```typescript
export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (id) => {
                set({favorites: [...get().favorites, id]});
            },

            removeFavorite: (id) => {
                set({ favorites: get().favorites.filter((f) => f!==id)});
            },

            toggleFavorite: (id) => {
                const { favorites, addFavorite, removeFavorite} = get();
                if (favorites.includes(id)) {
                    removeFavorite(id);
                } else {
                    addFavorite(id);
                }
            },

            isFavorited: (id) => {
                // 즐겨찾기에 있는지 확인
                return get().favorites.includes(id)
            },
        }),

        { name: 'coin-favorites' } // localStorage 키 이름
    )
);
```
- 코인 즐겨찾기 추가/삭제
- localStorage와 연동된 지속성 적용으로 상태 유지

### Mock API
```typescript
export async function GET() {
    const mockData = [
        {
            id: 'bitcoin',
            symbol: "BTC",
            name: "Bitcoin",
            price: 107495.13,
            ..
        }]
        ...
        ..
        ..
        return NextResponse.json(mockData)
}
```
- 서버 없이 Mock 데이터를 Next API로 제공
- 클라이언트에서 fetch("/api/coins")로 호출

## 시간 내 구현하지 못한 부분 & 보완하고 싶은 점
- 즐겨찾기 리스트(My favorite)에서 즐겨찾기 해제 시 리스트가 즉시 갱신되지 않음
- 데이터 로딩될 때 Skeleton UI 미적용
- 검색 결과 없을 때 별도 UI 미구현
- 추후 Mock data가 아닌 실제 데이터 호출 시, SSR/RSC/CSR 별 데이터 패칭 방식 테스트 필요


## AI 활용 내역
- 각 컴포넌트 설계 시, 더 나은 방안 참고용으로 ChatGPT 사용
- README 문서 구조 설계, 문장 보완에 ChatGPT 사용
- IntelliJ AI 자동완성 기능
