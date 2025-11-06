# Coin List

## 사용 기술 스택
### Next.js 16
  - App Router 기반의 최신 버전으로, Route Handler, redirect() API 등 안정화된 최신 버전 활용
### TypeScript
  - 제네릭 활용 타입 안정성 확보
  - 정적 타입분석으로 런타임에러 사전 방지
### Tailwind CSS
  - CSS-in-JS 대비 빠르고 직관적인 스타일링
### Zustand
  - 전역 상태 관리 라이브러리
  - localStorage persistence로 즐겨찾기 데이터 저장

### Tanstack-table(React-table)
  - 테이블 정렬, 필터링 등 복잡한 로직 관리
  - 대용량 데이터 처리에 최적화
  - 향후 pagination, column size 조절 등 확장 용이
### react-icons, react-hot-toast
  - 직관적 아이콘 표시 및 피드백 UI


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


## 주요 설계 기준

### 1. 컴포넌트 재사용성 & 확장성

 #### 문제: 초기구현 시 컴포넌트가 결합되어 재사용이 어려움
 - 제네릭 타입 활용 공통 컴포넌트 설계
```typescript

export const Tab = <T extends string> ({
    items: TabItem[];
    activeTab: T;
    onTabChange: (tab: T) => void;
}) => ....

```
 - 단일 책임 원칙 적용
   - `FavoriteButton`: 즐겨찾기 UI만 담당
   - `CoinListRow`: 코인 데이터 표시만 담당

### 2. 코드 가독성
 - 명확한 네이밍
   - Custom Hook: `useDebounce`, `useFavoriteStore`
   - 이벤트핸들러: `handleFavoriteToggle`

 - 폴더 기반 역할 분리
   - `common/`: 프로젝트 전반 재사용
   - `features/`: 특정 도메인 로직 포함
   - `ui/`: UI 컴포넌트

- 주석으로 함수 설명 표시
  ```typescript
    /**
  * 입력 값을 지정된 시간만큼 delay시켜 반환하는 커스텀 훅
  * 기본 delay: 500
  * 예) const debouncedSearch = useDebounce(search, 500)
    */
     ```

## 주요 기능 구현

### 1. 라우팅 및 초기상태
  - `/` 접근 시 `/coin-list`로 리다이렉트
  - 초기 진입 시 Price 기준 내림차순 정렬

### 2. 탭 & 검색 필터링 처리
  - 재사용 가능한 Tab 컴포넌트로 구현
  - 타입 안정성 확보 (`"all" | "favorite"`)
  - 코인 이름/심볼, 대소문자 무관
  - `useDebounce` 훅으로 불필요한 렌더링 최소화

### 3. Tanstack Table을 사용한 정렬 기능
- Column.getIsSorted()를 통해 현재 정렬 상태를 가져와 아이콘 색상을 동적으로 변경

### 4. 즐겨찾기 기능
 - Zustand persist로 localStorage 연동
 - 새로고침 후에도 즐겨찾기 상태 유지
 - 추가/삭제 시 toast로 사용자 피드백

### 5. 성능 최적화
  - `useMemo`로 필터/정렬 결과 메모이제이션
  - Debounce로 불필요한 필터링 호출 방지
  - TanStack Table 활용으로 효율적 렌더링

### 6. Mock API
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
- Next.js Route 핸들러를 활용한 API
- 클라이언트에서 fetch("/api/coins")로 호출

## 구현하지 못한 부분 & 보완하고 싶은 점
 ### 구현하지 못한 부분
- 에러 처리 및 로딩 상태
  - API 호출 실패 시 에러메세지 표시
  - 로딩 상태 표시(loading 아이콘 또는 Skeleton UI 적용)
- 빈 화면 UI
  - 검색 결과 없을 때 빈 안내 화면
  - 즐겨찾기 없을 때 빈 안내 화면
- 즐겨찾기 리스트 즉시 갱신
  - My favorite 탭에서 즐겨찾기 해제 시 리스트가 즉시 갱신되지않음

### 보완하고 싶은점
- 대용량 데이터 최적화
  - 추후 10,000가지 넘는 데이터 발생 시 서버 사이드 pagination
  - 혹은 infinite scroll
- 테스트 코드작성
  - 컴포넌트 단위 테스트
  - custom 훅 테스트
- 반응형 디자인
  - 모바일이나 태블릿 같은 다양한 디바이스 레이아웃 최적화
- 실제 API 연동
  - 데이터 페칭 방식 선택(SSR, CSR 등)
  - Tanstack Query 도입 고민

    
## AI 활용 내역
- 컴포넌트 구조 설계 시 Claude를 통해 재사용성과 확장성 개선 방안 논의
- README 문서 구조 설계, 문장 보완
- 개발도구: IntelliJ AI 자동완성 기능으로 반복 코드 작성 효율화
