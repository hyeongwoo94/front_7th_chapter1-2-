# Worker Home - 노동자집 (Worker's Home)

**name:** 노동자집
<!-- 노동자집 -->

**description:** Storage for Worker's learning, implementations, and code patterns
<!-- 노동자의 학습, 구현, 코드 패턴 저장소 -->

## TDD Workflow Execution
<!-- TDD 워크플로 실행 -->

### When Receiving Task from King/Planner
<!-- 건물주/계획자로부터 작업 수신 시 -->
1. **Consult Memory** - Check for past code patterns, solutions, TDD patterns
<!-- 세월이 상담 - 과거 코드 패턴, 해결책, TDD 패턴 확인 -->
2. **Red Phase** - Write failing test first
<!-- 레드 단계 - 먼저 실패하는 테스트 작성 -->
3. **Green Phase** - Write minimal code to pass test
<!-- 그린 단계 - 테스트를 통과하는 최소 코드 작성 -->
4. **Refactor Phase** - Improve code while keeping tests green
<!-- 리팩토링 단계 - 테스트를 그린 상태로 유지하며 코드 개선 -->
5. **Return to King** - Deliver code and tests
<!-- 건물주에게 반환 - 코드와 테스트 전달 -->

## Stored Implementations
<!-- 저장된 구현 -->

### Recent Implementations
<!-- 최근 구현 -->

#### Learning: Test Code Writing Patterns (2025-10-27)
<!-- 학습: 테스트 코드 작성 패턴 (2025-10-27) -->

**Key Patterns Learned:**
<!-- 학습된 주요 패턴 -->
1. **Import Pattern**: `import { functionName } from '../../utils/fileName';`
<!-- import 패턴 -->
2. **Event Test Data Structure**:
```typescript
const event: Event = {
  id: '1',
  title: 'Title',
  date: '2025-07-01',
  startTime: '09:00',
  endTime: '10:00',
  description: '',
  location: '',
  category: '',
  repeat: { type: 'none', interval: 0 },
  notificationTime: 0,
};
```
3. **Common Assertions**: `toBe()`, `toHaveLength()`, `toEqual()`, `toString()`

### Code Patterns
<!-- 코드 패턴 -->
- **Test Patterns**: Store successful test structure patterns
<!-- 테스트 패턴: 성공적인 테스트 구조 패턴 저장 -->
- **Implementation Patterns**: Store proven implementation approaches
<!-- 구현 패턴: 검증된 구현 접근 방식 저장 -->
- **Refactoring Patterns**: Store effective refactoring techniques
<!-- 리팩토링 패턴: 효과적인 리팩토링 기법 저장 -->

---

## Codebase Pattern Analysis (2025-10-27)
<!-- 코드베이스 패턴 분석 (2025-10-27) -->

### 1. Custom Hook Patterns
<!-- 커스텀 훅 패턴 -->

#### State Management Pattern
<!-- 상태 관리 패턴 -->
```typescript
// Pattern: Multiple useState declarations with initialEvent support
export const useEventForm = (initialEvent?: Event) => {
  const [field, setField] = useState(initialEvent?.field || defaultValue);
  // ... multiple state declarations
  return { field, setField, /* ... */ };
};
```

**Key Characteristics:**
- Accept optional initial value parameter
- Provide both state and setter in return object
- Group related state (e.g., form fields, errors)
- Use type definitions for complex state (e.g., `TimeErrorRecord`)

#### Effect Hook Pattern
<!-- 이펙트 훅 패턴 -->
```typescript
// Pattern: useEffect with cleanup for intervals/subscriptions
useEffect(() => {
  const interval = setInterval(checkUpcomingEvents, 1000);
  return () => clearInterval(interval);
}, [dependencies]);
```

**Used in:** `useNotifications`, `useCalendarView`

#### Computed Value Pattern
<!-- 계산된 값 패턴 -->
```typescript
// Pattern: useMemo for expensive computations
const filteredEvents = useMemo(() => {
  return getFilteredEvents(events, searchTerm, currentDate, view);
}, [events, searchTerm, currentDate, view]);
```

**Used in:** `useSearch`

### 2. Utility Function Patterns
<!-- 유틸리티 함수 패턴 -->

#### Date Manipulation Pattern
<!-- 날짜 조작 패턴 -->
```typescript
// Pattern: Pure functions for date calculations
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getWeekDates(date: Date): Date[] {
  // Loop-based date generation
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(sunday);
    nextDate.setDate(sunday.getDate() + i);
    weekDates.push(nextDate);
  }
  return weekDates;
}
```

**Characteristics:**
- Pure functions (no side effects)
- Single responsibility
- Clear naming (verb + noun)
- JSDocs for complex logic

#### Filtering/Transformation Pattern
<!-- 필터링/변환 패턴 -->
```typescript
// Pattern: filter + map chains for data transformation
const upcomingEvents = events.filter((event) => {
  // filtering logic
}).map((event) => ({
  id: event.id,
  message: createNotificationMessage(event),
}));
```

**Used in:** `useNotifications`, `eventUtils`, `notificationUtils`

#### Validation Pattern
<!-- 검증 패턴 -->
```typescript
// Pattern: Return typed validation result objects
export function getTimeErrorMessage(start: string, end: string): TimeValidationResult {
  if (!start || !end) {
    return { startTimeError: null, endTimeError: null };
  }
  // validation logic
  return { startTimeError: 'message', endTimeError: 'message' };
}
```

### 3. API/Async Patterns
<!-- API/비동기 패턴 -->

#### Fetch Pattern with Error Handling
<!-- 에러 처리가 있는 패치 패턴 -->
```typescript
const fetchEvents = async () => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const { events } = await response.json();
    setEvents(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    enqueueSnackbar('이벤트 로딩 실패', { variant: 'error' });
  }
};
```

**Characteristics:**
- try/catch for error handling
- Response ok check
- User feedback via snackbar
- State update after success

#### Conditional HTTP Methods
<!-- 조건부 HTTP 메서드 -->
```typescript
let response;
if (editing) {
  response = await fetch(`/api/events/${id}`, { method: 'PUT', /* ... */ });
} else {
  response = await fetch('/api/events', { method: 'POST', /* ... */ });
}
```

### 4. TypeScript Patterns
<!-- 타입스크립트 패턴 -->

#### Type Definition
<!-- 타입 정의 -->
```typescript
// Pattern: Union types for state
type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

// Pattern: Record for object types
type TimeErrorRecord = Record<'startTimeError' | 'endTimeError', string | null>;

// Pattern: Interface extension
export interface Event extends EventForm {
  id: string;
}
```

#### Optional Chaining & Nullish Coalescing
<!-- 옵셔널 체이닝 & Nullish 병합 -->
```typescript
const [title, setTitle] = useState(initialEvent?.title || '');
const [isRepeating, setIsRepeating] = useState(initialEvent?.repeat.type !== 'none');
```

### 5. Naming Conventions
<!-- 네이밍 규칙 -->

- **Hooks:** `use[Feature]` (e.g., `useEventForm`, `useNotifications`)
- **Utilities:** `[verb][Noun]` (e.g., `getWeekDates`, `formatMonth`)
- **Components:** PascalCase (e.g., `App`)
- **Constants:** UPPER_CASE for fixed values, camelCase for computed
- **Handlers:** `handle[Action]` (e.g., `handleStartTimeChange`)

### 6. Code Organization Patterns
<!-- 코드 구성 패턴 -->

- **Imports:** External libs → Types → Utils → Components
- **Hook Structure:** State declarations → Derived state → Handlers → Effects → Return
- **Utility Files:** Pure functions grouped by domain (date, event, notification)
- **Single Responsibility:** Each file/function has one clear purpose

## Integration with Memory
<!-- 세월이와의 통합 -->
- Before implementing ANY code, ALWAYS check Memory for:
<!-- 모든 코드를 구현하기 전에 항상 세월이에서 다음을 확인 -->
  - Past solutions for similar problems
  - TDD patterns and approaches
  - Refactoring techniques
  - Common pitfalls to avoid
<!-- - 유사한 문제에 대한 과거 해결책 -->
<!-- - TDD 패턴과 접근 -->
<!-- - 리팩토링 기법 -->
<!-- - 피해야 할 일반적인 함정 -->

