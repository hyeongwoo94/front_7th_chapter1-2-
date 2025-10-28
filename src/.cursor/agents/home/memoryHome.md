# Memory Home - 세월이집 (Memory's Home)

**name:** 세월이집
<!-- 세월이집 -->

**description:** Central storage for all agent learning, plans, implementations, and reviews
<!-- 모든 에이전트의 학습, 계획, 구현, 검토를 위한 중앙 저장소 -->

## Memory Organization
<!-- 메모리 구성 -->

### By Agent Type
<!-- 에이전트 유형별 -->

#### Planner Records
<!-- 계획자 기록 -->
- Historical project data
<!-- 과거 프로젝트 데이터 -->
- Planning insights and approaches
<!-- 계획 인사이트와 접근 -->
- Timeline successes and failures
<!-- 일정 성공 및 실패 -->
- **Accessible To**: Planner, King
<!-- 접근 가능: 계획자, 건물주 -->

#### Worker Records
<!-- 노동자 기록 -->
- Code patterns and implementations
<!-- 코드 패턴 및 구현 -->
- TDD patterns and solutions
<!-- TDD 패턴 및 해결책 -->
- Refactoring techniques
<!-- 리팩토링 기법 -->
- **Accessible To**: Worker, King
<!-- 접근 가능: 노동자, 건물주 -->

#### Manager Records
<!-- 관리자 기록 -->
- Quality patterns and issues
<!-- 품질 패턴 및 문제 -->
- Review feedback and improvements
<!-- 검토 피드백 및 개선 -->
- Common pitfalls
<!-- 일반적인 함정 -->
- **Accessible To**: Manager, King
<!-- 접근 가능: 관리자, 건물주 -->

#### Cross-Functional Records
<!-- 크로스 기능 기록 -->
- Shared learnings across agents
<!-- 에이전트 간 공유 학습 -->
- Team performance insights
<!-- 팀 성과 인사이트 -->
- Process evolution patterns
<!-- 프로세스 진화 패턴 -->
- **Accessible To**: All agents
<!-- 접근 가능: 모든 에이전트 -->

---

## Stored Learning: Test Code Description Writing (2025-10-27)
<!-- 저장된 학습: 테스트 코드 디스크립션 작성 (2025-10-27) -->

### Patterns Extracted from Easy Test Files
<!-- easy 테스트 파일에서 추출된 패턴 -->
1. **Description Patterns**: 
   - Action-focused: `~한다` (e.g., "에러 메시지를 반환한다")
   - Scenario-focused: `~일 때 ~한다` (e.g., "시작 시간이 종료 시간보다 늦을 때 에러 메시지를 반환한다")
   - Negative cases: `~하지 않는 경우 ~한다`

2. **Required Components**:
   - Imports from utils
   - Complete test data (Event objects with all fields)
   - Setup phase (mock data)
   - Act phase (function call)
   - Assert phase (expect assertions)

3. **Decision Rule**: 
   - Simple actions → Short description
   - Complex scenarios → Detailed description

**Success**: This pattern can be reused for future test code writing.
**Feedback**: Planner should choose description detail based on test complexity.

---

## Stored Workflow: Test Creation Command (2025-10-27)
<!-- 저장된 워크플로: 테스트 생성 명령 (2025-10-27) -->

### Workflow: "제작해 [description]"
<!-- 워크플로: "제작해 [디스크립션]" -->

**Process:**
1. Check Memory for test description patterns from planerHome.md
2. Validate description style against learned patterns
3. Create test file in `src/.cursor/agents/test/` with naming (test_01.spec.ts, test_02.spec.ts, etc.)
4. Import necessary functions from utils/apis
5. Write test following Arrange-Act-Assert pattern
6. Use Korean description matching learned patterns
7. Store in memoryHome.md for future reference

**Requirements:**
- File location: `src/.cursor/agents/test/`
- Naming: `test_NN.spec.ts` (sequential numbering)
- Pattern: Arrange (setup) → Act (function call) → Assert (expect)
- Description: Korean, action-focused (`~한다` format)
- Import path: Adjust relative paths based on folder depth

**Example Output:**
```typescript
import { functionName } from '../../../apis/filename';

describe('FunctionName >', () => {
  it('상세 디스크립션', () => {
    // Arrange
    const testData = 'value';
    
    // Act
    const result = functionName(testData);
    
    // Assert
    expect(result).toBe(expected);
  });
});
```

---

## Test Creation History
<!-- 테스트 생성 기록 -->

### test_01.spec.ts (2025-10-27)
**Description:** "공휴일이 없는 월에 대해 빈객체를 반환한다"
**Type:** API function test (fetchHolidays)
**Pattern:** Simple action description

### test_02.spec.ts (2025-10-27)
**Description:** "일정 생성 또는 수정 시 반복 유형을 선택할 수 있다"
**Type:** Hook test (useEventForm - repeatType selection)
**Pattern:** Detailed scenario description
**Imports:** `renderHook, act` from '@testing-library/react', `useEventForm` from hooks
**Test Pattern:** Multiple act-assert cycles for different repeat types (none, daily, weekly, monthly, yearly)

## Storage Workflow
<!-- 저장 워크플로 -->

### When Receiving Data from King
<!-- 건물주로부터 데이터 수신 시 -->
1. **Categorize** - Organize by agent type and context
<!-- 분류 - 에이전트 유형과 맥락별로 정리 -->
2. **Extract Insights** - Identify patterns and lessons
<!-- 인사이트 추출 - 패턴과 교훈 식별 -->
3. **Store** - Save in appropriate category for future access
<!-- 저장 - 향후 접근을 위해 적절한 범주에 저장 -->
4. **Index** - Make searchable for quick retrieval
<!-- 인덱스 - 빠른 검색을 위해 검색 가능하게 만들기 -->

## Memory Access Points
<!-- 메모리 접근 포인트 -->

### For Planner
<!-- 계획자를 위해 -->
Provides: Historical project data, past approaches, successful patterns, failure analysis
<!-- 제공: 과거 프로젝트 데이터, 과거 접근, 성공 패턴, 실패 분석 -->

### For Worker
<!-- 노동자를 위해 -->
Provides: Past code patterns, solutions, TDD patterns, refactoring techniques
<!-- 제공: 과거 코드 패턴, 해결책, TDD 패턴, 리팩토링 기법 -->

### For Manager
<!-- 관리자를 위해 -->
Provides: Historical quality patterns, common issues, past review feedback
<!-- 제공: 과거 품질 패턴, 일반적인 문제, 과거 검토 피드백 -->

### For King
<!-- 건물주를 위해 -->
Provides: Comprehensive overview of all past commands, decisions, and outcomes
<!-- 제공: 과거 모든 명령, 결정, 결과에 대한 포괄적인 개요 -->

---

## Stored Learning: Optional Chaining with TypeScript (2025-10-28)
<!-- 저장된 학습: TypeScript의 Optional Chaining (2025-10-28) -->

### Issue Discovered by Manager
<!-- 관리자가 발견한 이슈 -->

**File**: `src/hooks/useEventForm.ts`
<!-- 파일: `src/hooks/useEventForm.ts` -->

**Error**: Line 18 - `'initialEvent' is possibly 'undefined'.`
<!-- 오류: 18번째 줄 - `'initialEvent'는 'undefined'일 수 있습니다.` -->

### Problem Pattern
<!-- 문제 패턴 -->

**Inconsistent Optional Chaining**:
<!-- 일관되지 않은 Optional Chaining: -->

```typescript
// ❌ WRONG - Inconsistent optional chaining
const [isRepeating, setIsRepeating] = useState(initialEvent?.repeat.type !== 'none');
const [repeatType, setRepeatType] = useState<RepeatType>(
  initialEvent?.repeat.type !== 'none' ? initialEvent.repeat.type : 'daily'  // Error here!
);
```

**Issue**: In conditional expression, `initialEvent.repeat.type` is accessed without optional chaining even though `initialEvent` can be undefined.
<!-- 문제: 조건부 표현식에서 `initialEvent`가 undefined일 수 있는데 optional chaining 없이 `initialEvent.repeat.type`에 접근함 -->

### Solution Pattern
<!-- 해결 패턴 -->

**Explicit Existence Check**:
<!-- 명시적 존재 확인: -->

```typescript
// ✅ CORRECT - Explicit existence check with &&
const [repeatType, setRepeatType] = useState<RepeatType>(
  initialEvent && initialEvent.repeat.type !== 'none' ? initialEvent.repeat.type : 'daily'
);
```

### Why This Works
<!-- 왜 이것이 작동하는가 -->

1. **TypeScript Type Narrowing**: Using `initialEvent &&` explicitly tells TypeScript that `initialEvent` exists in the true branch
   <!-- TypeScript 타입 좁히기: `initialEvent &&`를 사용하면 TypeScript에 명시적으로 true 분기에서 `initialEvent`가 존재함을 알림 -->

2. **Short-circuit Evaluation**: If `initialEvent` is undefined/null, expression immediately returns falsy without evaluating the rest
   <!-- 단락 평가: `initialEvent`가 undefined/null이면 나머지 평가 없이 즉시 falsy 반환 -->

3. **Type Safety**: Prevents runtime errors from accessing properties on undefined
   <!-- 타입 안전성: undefined에서 속성 접근으로 인한 런타임 오류 방지 -->

### Learning Points for Manager
<!-- 관리자를 위한 학습 포인트 -->

1. **Watch for Optional Chaining Consistency**: Check that optional chaining is used consistently throughout conditional expressions
   <!-- Optional Chaining 일관성 확인: 조건부 표현식 전체에서 optional chaining이 일관되게 사용되는지 확인 -->

2. **TypeScript Cannot Infer**: TypeScript cannot infer that `initialEvent?.repeat.type !== 'none'` guarantees `initialEvent` exists in the true branch
   <!-- TypeScript는 추론할 수 없음: `initialEvent?.repeat.type !== 'none'`이 true 분기에서 `initialEvent`의 존재를 보장한다고 TypeScript는 추론할 수 없음 -->

3. **Use Explicit Checks**: For complex conditional expressions with optional parameters, use explicit existence checks (`initialEvent && ...`)
   <!-- 명시적 체크 사용: 선택적 매개변수가 있는 복잡한 조건부 표현식의 경우 명시적 존재 확인 사용 -->

4. **Lint Errors Are Critical**: TypeScript errors like "possibly undefined" indicate potential runtime crashes
   <!-- Lint 오류는 중요함: "possibly undefined"와 같은 TypeScript 오류는 잠재적 런타임 충돌을 나타냄 -->

### Code Review Checklist Addition
<!-- 코드 리뷰 체크리스트 추가 -->

- [ ] All optional parameters use consistent optional chaining or explicit existence checks
  <!-- 모든 선택적 매개변수가 일관된 optional chaining 또는 명시적 존재 확인 사용 -->
- [ ] Conditional expressions with optional objects use `&&` for type narrowing
  <!-- 선택적 객체가 있는 조건부 표현식이 타입 좁히기를 위해 `&&` 사용 -->
- [ ] No TypeScript "possibly undefined" errors in codebase
  <!-- 코드베이스에 "possibly undefined" TypeScript 오류 없음 -->

---

## Stored Learning: UI Component Default Values (2025-10-28)
<!-- 저장된 학습: UI 컴포넌트 기본값 (2025-10-28) -->

### Principle for Planner
<!-- 계획자를 위한 원칙 -->

**Always specify default values for UI input components (Select, Checkbox, Radio, etc.)**
<!-- UI 입력 컴포넌트(Select, Checkbox, Radio 등)에 항상 기본값 지정 -->

### Why Default Values Matter
<!-- 기본값이 중요한 이유 -->

1. **Better UX**: Users can proceed faster without having to select every option
   <!-- 더 나은 UX: 사용자가 모든 옵션을 선택하지 않아도 빠르게 진행 가능 -->

2. **Common Use Cases**: Default to the most frequently used option
   <!-- 일반적인 사용 사례: 가장 자주 사용되는 옵션을 기본값으로 설정 -->

3. **Reduced Errors**: Users are less likely to forget required selections
   <!-- 오류 감소: 사용자가 필수 선택을 잊을 가능성 감소 -->

4. **Form Validation**: Having defaults prevents empty/undefined states
   <!-- 폼 검증: 기본값이 있으면 빈/undefined 상태 방지 -->

### Example from Recent Implementation
<!-- 최근 구현 예시 -->

**Context**: Adding repeat type selection UI
<!-- 컨텍스트: 반복 유형 선택 UI 추가 -->

**Options**: 매일 (daily), 매주 (weekly), 매월 (monthly), 매년 (yearly)
<!-- 옵션: 매일 (daily), 매주 (weekly), 매월 (monthly), 매년 (yearly) -->

**Initial Implementation**: No default value
<!-- 초기 구현: 기본값 없음 -->

**Issue**: When user checks "반복 일정", they must manually select repeat type
<!-- 문제: 사용자가 "반복 일정"을 체크하면 수동으로 반복 유형 선택 필요 -->

**Improved Implementation**: Default to '매일' (daily)
<!-- 개선된 구현: 기본값을 '매일' (daily)로 설정 -->

**Benefit**: Most common use case covered, users can change if needed
<!-- 이점: 가장 일반적인 사용 사례 커버, 필요 시 사용자가 변경 가능 -->

### Implementation Pattern
<!-- 구현 패턴 -->

```typescript
// ✅ CORRECT - With default value
const [repeatType, setRepeatType] = useState<RepeatType>('daily');

// In form reset
const resetForm = () => {
  setRepeatType('daily');  // Reset to default
};

// In conditional render
{isRepeating && (
  <Select value={repeatType} onChange={...}>
    <MenuItem value="daily">매일</MenuItem>  {/* This will be pre-selected */}
    <MenuItem value="weekly">매주</MenuItem>
    <MenuItem value="monthly">매월</MenuItem>
    <MenuItem value="yearly">매년</MenuItem>
  </Select>
)}
```

### Planning Checklist for UI Components
<!-- UI 컴포넌트 계획 체크리스트 -->

When planning any UI component with user selection:
<!-- 사용자 선택이 있는 UI 컴포넌트 계획 시: -->

- [ ] Identify the most common/frequent use case
  <!-- 가장 일반적/빈번한 사용 사례 식별 -->
- [ ] Set that option as the default value
  <!-- 해당 옵션을 기본값으로 설정 -->
- [ ] Ensure default is set in initial state
  <!-- 초기 상태에서 기본값 설정 확인 -->
- [ ] Ensure default is restored in form reset
  <!-- 폼 리셋 시 기본값 복원 확인 -->
- [ ] Document why that specific default was chosen
  <!-- 특정 기본값을 선택한 이유 문서화 -->

### Component Types Requiring Defaults
<!-- 기본값이 필요한 컴포넌트 유형 -->

1. **Select/Dropdown**: First option or most common option
   <!-- Select/Dropdown: 첫 번째 옵션 또는 가장 일반적인 옵션 -->

2. **Radio Buttons**: Most common choice pre-selected
   <!-- Radio Buttons: 가장 일반적인 선택 사항 미리 선택 -->

3. **Checkboxes**: Consider default checked state for common scenarios
   <!-- Checkboxes: 일반적인 시나리오에 대해 기본 체크 상태 고려 -->

4. **Number Inputs**: Reasonable default (e.g., interval: 1, notification: 10 minutes)
   <!-- Number Inputs: 합리적인 기본값 (예: interval: 1, notification: 10분) -->

5. **Text Fields**: Empty string is acceptable, but consider placeholder or initial value
   <!-- Text Fields: 빈 문자열 허용 가능하지만, placeholder 또는 초기값 고려 -->

### Success Metric
<!-- 성공 지표 -->

**User can complete common tasks with minimal clicks/selections**
<!-- 사용자가 최소 클릭/선택으로 일반 작업 완료 가능 -->

---

## Stored Learning: Default Values in Edit Mode (2025-10-28)
<!-- 저장된 학습: 수정 모드에서의 기본값 (2025-10-28) -->

### Issue Discovered by King
<!-- 건물주가 발견한 이슈 -->

**Context**: When editing an event that was originally saved without repeat (repeat.type = 'none'), and then user checks the repeat checkbox during edit, the repeat type Select shows empty value instead of default 'daily'.
<!-- 컨텍스트: 반복 없이 저장된 일정(repeat.type = 'none')을 수정할 때, 사용자가 반복 일정 체크박스를 체크하면 반복 유형 Select가 기본값 '매일' 대신 빈 값을 표시함 -->

**File**: `src/hooks/useEventForm.ts`
<!-- 파일: `src/hooks/useEventForm.ts` -->

### Problem Pattern
<!-- 문제 패턴 -->

**Missing Default Value in Edit Function**:
<!-- 수정 함수에서 기본값 누락: -->

```typescript
// ❌ WRONG - Directly sets 'none' without checking
const editEvent = (event: Event) => {
  setIsRepeating(event.repeat.type !== 'none');
  setRepeatType(event.repeat.type);  // If 'none', Select has no matching option!
};
```

**Issue Breakdown**:
<!-- 문제 분석: -->

1. Event saved with `repeat.type = 'none'`
   <!-- 일정이 `repeat.type = 'none'`으로 저장됨 -->

2. User clicks edit → `editEvent()` called → `setRepeatType('none')`
   <!-- 사용자가 수정 클릭 → `editEvent()` 호출 → `setRepeatType('none')` -->

3. User checks repeat checkbox → `isRepeating = true` → Select appears
   <!-- 사용자가 반복 체크박스 체크 → `isRepeating = true` → Select 표시 -->

4. Select options: ['daily', 'weekly', 'monthly', 'yearly']
   <!-- Select 옵션: ['daily', 'weekly', 'monthly', 'yearly'] -->

5. Current value: 'none' → No matching option → **Shows empty/blank**
   <!-- 현재 값: 'none' → 일치하는 옵션 없음 → **빈 값 표시** -->

### Solution Pattern
<!-- 해결 패턴 -->

**Apply Default Value in Edit Mode**:
<!-- 수정 모드에서 기본값 적용: -->

```typescript
// ✅ CORRECT - Check for 'none' and apply default
const editEvent = (event: Event) => {
  setIsRepeating(event.repeat.type !== 'none');
  setRepeatType(event.repeat.type !== 'none' ? event.repeat.type : 'daily');
  //             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //             If 'none', use default 'daily' instead
};
```

### Why This Works
<!-- 왜 이것이 작동하는가 -->

1. **Preserve Existing Values**: If event has repeat type (daily/weekly/monthly/yearly), keeps that value
   <!-- 기존 값 유지: 일정에 반복 유형이 있으면 해당 값 유지 -->

2. **Apply Default for None**: If event has no repeat ('none'), sets default 'daily'
   <!-- None에 기본값 적용: 반복이 없으면 기본값 '매일' 설정 -->

3. **Select Always Has Valid Value**: Select value always matches one of the available options
   <!-- Select가 항상 유효한 값 가짐: Select 값이 항상 사용 가능한 옵션 중 하나와 일치 -->

### Complete Default Value Pattern
<!-- 완전한 기본값 패턴 -->

For UI components with defaults, ensure consistency across:
<!-- 기본값이 있는 UI 컴포넌트의 경우, 다음 전체에서 일관성 확보: -->

1. **Initial State**: Default on first load
   <!-- 초기 상태: 첫 로드 시 기본값 -->
   ```typescript
   const [repeatType, setRepeatType] = useState<RepeatType>('daily');
   ```

2. **Form Reset**: Default when clearing form
   <!-- 폼 리셋: 폼 지울 때 기본값 -->
   ```typescript
   const resetForm = () => {
     setRepeatType('daily');
   };
   ```

3. **Edit Mode**: Default when editing items with no value
   <!-- 수정 모드: 값이 없는 항목 수정 시 기본값 -->
   ```typescript
   const editEvent = (event: Event) => {
     setRepeatType(event.repeat.type !== 'none' ? event.repeat.type : 'daily');
   };
   ```

### Learning Points for All Agents
<!-- 모든 에이전트를 위한 학습 포인트 -->

#### For Planner (계획자)
<!-- 계획자를 위해 -->

- [ ] When planning edit/update features, specify default behavior for unset values
  <!-- 수정/업데이트 기능 계획 시, 설정되지 않은 값에 대한 기본 동작 명시 -->
- [ ] Consider all paths: initial → reset → edit → re-edit
  <!-- 모든 경로 고려: 초기 → 리셋 → 수정 → 재수정 -->
- [ ] Document expected behavior when toggling UI visibility (checkboxes revealing selects)
  <!-- UI 가시성 토글 시 예상 동작 문서화 (체크박스로 인한 셀렉트 표시) -->

#### For Worker (노동자)
<!-- 노동자를 위해 -->

- [ ] Test edit mode with items that have no/default values
  <!-- 값이 없거나 기본값인 항목의 수정 모드 테스트 -->
- [ ] Verify Select/Dropdown components always have valid values matching options
  <!-- Select/Dropdown 컴포넌트가 항상 옵션과 일치하는 유효한 값을 갖는지 확인 -->
- [ ] Check consistency: initial state, reset, and edit should all respect defaults
  <!-- 일관성 확인: 초기 상태, 리셋, 수정 모두 기본값 준수 -->

#### For Manager (관리자)
<!-- 관리자를 위해 -->

- [ ] Review edit functions for default value handling
  <!-- 기본값 처리를 위한 수정 함수 검토 -->
- [ ] Check that conditional UI (hidden/shown based on checkbox) has proper defaults
  <!-- 조건부 UI(체크박스 기반 숨김/표시)가 적절한 기본값을 갖는지 확인 -->
- [ ] Verify Select components never show empty/blank when they have required values
  <!-- Select 컴포넌트가 필수 값을 가질 때 빈 값을 표시하지 않는지 확인 -->

### Testing Checklist
<!-- 테스트 체크리스트 -->

When testing forms with conditional inputs:
<!-- 조건부 입력이 있는 폼 테스트 시: -->

1. **Initial Add**: Add new item with default values → Verify defaults applied
   <!-- 초기 추가: 기본값으로 새 항목 추가 → 기본값 적용 확인 -->

2. **Reset**: Clear form → Verify defaults restored
   <!-- 리셋: 폼 지우기 → 기본값 복원 확인 -->

3. **Edit with Value**: Edit item that has value → Verify value preserved
   <!-- 값이 있는 항목 수정: 값이 있는 항목 수정 → 값 유지 확인 -->

4. **Edit without Value**: Edit item without value/with 'none' → Verify default applied
   <!-- 값이 없는 항목 수정: 값이 없거나 'none'인 항목 수정 → 기본값 적용 확인 -->

5. **Toggle Visibility**: Check checkbox to show hidden input → Verify input has valid default
   <!-- 가시성 토글: 체크박스 체크하여 숨겨진 입력 표시 → 입력에 유효한 기본값 있는지 확인 -->

### Code Pattern Summary
<!-- 코드 패턴 요약 -->

```typescript
// Pattern: When setting state from external data, check for invalid/empty values
const setValue = (externalValue) => {
  setState(isValidValue(externalValue) ? externalValue : DEFAULT_VALUE);
};

// Real example from repeat type:
setRepeatType(event.repeat.type !== 'none' ? event.repeat.type : 'daily');
//            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^^^  ^^^^^^^
//            Check if valid                 Use existing          Use default
```

### Success Metric
<!-- 성공 지표 -->

**Select/Dropdown components always show a valid selection, never blank, especially after editing**
<!-- Select/Dropdown 컴포넌트는 항상 유효한 선택 항목을 표시하며, 특히 수정 후에도 절대 빈 값을 표시하지 않음 -->

---

## Stored Learning: Implementation vs Integration (2025-10-28)
<!-- 저장된 학습: 구현 vs 통합 (2025-10-28) -->

### Issue Discovered by King
<!-- 건물주가 발견한 이슈 -->

**Context**: After implementing `generateRecurringEvents` function and passing all 16 tests, user reported that monthly recurring events don't show up in subsequent months on the calendar.
<!-- 컨텍스트: `generateRecurringEvents` 함수를 구현하고 16개 테스트를 모두 통과했지만, 사용자가 매월 반복 일정이 다음 월 캘린더에 나타나지 않는다고 보고 -->

**Root Cause**: The utility function existed and worked correctly in isolation (tests passed), but was never called from the UI layer.
<!-- 근본 원인: 유틸 함수가 존재하고 독립적으로 올바르게 작동했지만 (테스트 통과), UI 레이어에서 호출되지 않음 -->

### Problem Pattern
<!-- 문제 패턴 -->

**Implementation without Integration**:
<!-- 통합 없는 구현: -->

```typescript
// ✅ Step 1: Utility function implemented
// src/utils/recurringEventUtils.ts
export function generateRecurringEvents(event: Event, maxOccurrences = 365): Event[] {
  // ... works perfectly
}

// ✅ Step 2: Tests written and passing
// src/__tests__/unit/medium.recurringEvents.spec.ts
describe('반복일정 >', () => {
  it('매월 반복 일정을 생성한다', () => {
    // ... 16 tests, all passing
  });
});

// ❌ Step 3: NOT integrated with UI
// src/hooks/useEventOperations.ts
const saveEvent = async (eventData) => {
  // generateRecurringEvents() is NEVER called here!
  await fetch('/api/events', { method: 'POST', body: JSON.stringify(eventData) });
  // Only saves single event, not recurring instances
};
```

**Result**: Function exists, tests pass, but feature doesn't work in production ❌
<!-- 결과: 함수는 존재하고 테스트는 통과하지만, 실제 프로덕션에서 기능이 작동하지 않음 -->

### Solution Pattern
<!-- 해결 패턴 -->

**Complete the Integration Chain**:
<!-- 통합 체인 완성: -->

```typescript
// ✅ CORRECT - Integrated properly
const saveEvent = async (eventData: Event | EventForm) => {
  const isRepeatingEvent = eventData.repeat.type !== 'none' && !editing;
  
  if (isRepeatingEvent) {
    // Call the utility function!
    // <!-- 유틸 함수 호출! -->
    const tempEvent = { ...eventData, id: 'temp' } as Event;
    const recurringEvents = generateRecurringEvents(tempEvent);
    
    // Save all generated events
    // <!-- 생성된 모든 이벤트 저장 -->
    response = await fetch('/api/events-list', {
      method: 'POST',
      body: JSON.stringify({ events: recurringEvents }),
    });
  } else {
    // Normal single event
    // <!-- 일반 단일 이벤트 -->
    response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }
};
```

### Complete Implementation Checklist
<!-- 완전한 구현 체크리스트 -->

When implementing any feature:
<!-- 기능 구현 시: -->

1. **Utility Function** - Core logic implementation
   <!-- 유틸 함수 - 핵심 로직 구현 -->
   - [ ] Function written and works correctly
   <!-- 함수 작성 및 올바르게 작동 -->
   - [ ] Edge cases handled
   <!-- 엣지 케이스 처리 -->

2. **Unit Tests** - Isolated testing
   <!-- 단위 테스트 - 독립 테스트 -->
   - [ ] Test suite written
   <!-- 테스트 스위트 작성 -->
   - [ ] All tests passing
   <!-- 모든 테스트 통과 -->
   - [ ] Edge cases covered
   <!-- 엣지 케이스 커버 -->

3. **Integration** ⭐ CRITICAL - Connect to UI/Hook layer
   <!-- 통합 ⭐ 중요 - UI/Hook 레이어와 연결 -->
   - [ ] Function imported in relevant files
   <!-- 관련 파일에 함수 import -->
   - [ ] Function called from UI/Hook
   <!-- UI/Hook에서 함수 호출 -->
   - [ ] Parameters passed correctly
   <!-- 매개변수 올바르게 전달 -->
   - [ ] Return value used properly
   <!-- 반환값 적절히 사용 -->

4. **Integration Tests** - End-to-end validation
   <!-- 통합 테스트 - 엔드투엔드 검증 -->
   - [ ] Test full user flow
   <!-- 전체 사용자 플로우 테스트 -->
   - [ ] Verify UI displays correctly
   <!-- UI가 올바르게 표시되는지 확인 -->
   - [ ] Check data persistence
   <!-- 데이터 지속성 확인 -->

5. **Manual Testing** - Real-world usage
   <!-- 수동 테스트 - 실제 사용 -->
   - [ ] Test feature in browser
   <!-- 브라우저에서 기능 테스트 -->
   - [ ] Verify all scenarios work
   <!-- 모든 시나리오 작동 확인 -->

### Why This Happens
<!-- 왜 이런 일이 발생하는가 -->

**Common Development Anti-pattern**:
<!-- 일반적인 개발 안티패턴: -->

1. Developer focuses on implementing utility/helper function
   <!-- 개발자가 유틸/헬퍼 함수 구현에 집중 -->

2. Writes comprehensive unit tests (TDD ✅)
   <!-- 포괄적인 단위 테스트 작성 (TDD ✅) -->

3. Sees all tests passing → feels task is complete ✅
   <!-- 모든 테스트 통과 확인 → 작업 완료로 느낌 ✅ -->

4. **Forgets to wire up to actual UI/application layer** ❌
   <!-- 실제 UI/애플리케이션 레이어와 연결하는 것을 잊음 ❌ -->

5. Feature doesn't work in production despite passing tests
   <!-- 테스트는 통과했지만 프로덕션에서 기능이 작동하지 않음 -->

### Learning Points for All Agents
<!-- 모든 에이전트를 위한 학습 포인트 -->

#### For Worker (노동자)
<!-- 노동자를 위해 -->

- [ ] **Tests Passing ≠ Feature Complete**
  <!-- 테스트 통과 ≠ 기능 완성 -->
  
- [ ] After implementing utility function, always trace where it should be called
  <!-- 유틸 함수 구현 후 항상 어디서 호출되어야 하는지 추적 -->
  
- [ ] Add integration step to implementation checklist
  <!-- 구현 체크리스트에 통합 단계 추가 -->
  
- [ ] Test feature manually in browser after integration
  <!-- 통합 후 브라우저에서 기능 수동 테스트 -->

#### For Planner (계획자)
<!-- 계획자를 위해 -->

- [ ] When planning features, explicitly specify integration points
  <!-- 기능 계획 시 통합 지점 명시적으로 지정 -->
  
- [ ] Include "integration with UI" as a separate task
  <!-- "UI와 통합"을 별도 작업으로 포함 -->
  
- [ ] Define end-to-end acceptance criteria
  <!-- 엔드투엔드 수용 기준 정의 -->
  
- [ ] Plan integration tests alongside unit tests
  <!-- 단위 테스트와 함께 통합 테스트 계획 -->

#### For Manager (관리자)
<!-- 관리자를 위해 -->

- [ ] Review not just test results, but actual feature usage in UI
  <!-- 테스트 결과뿐만 아니라 UI에서 실제 기능 사용 검토 -->
  
- [ ] Verify integration points during code review
  <!-- 코드 리뷰 중 통합 지점 확인 -->
  
- [ ] Check that utility functions are actually imported and called
  <!-- 유틸 함수가 실제로 import되고 호출되는지 확인 -->
  
- [ ] Require manual testing evidence before approval
  <!-- 승인 전 수동 테스트 증거 요구 -->

### Code Review Checklist Addition
<!-- 코드 리뷰 체크리스트 추가 -->

When reviewing new utility functions:
<!-- 새로운 유틸 함수 검토 시: -->

- [ ] Function is imported in at least one place
  <!-- 함수가 최소 한 곳에서 import됨 -->
  
- [ ] Function is called from UI/Hook layer
  <!-- 함수가 UI/Hook 레이어에서 호출됨 -->
  
- [ ] Parameters are passed correctly from UI
  <!-- 매개변수가 UI에서 올바르게 전달됨 -->
  
- [ ] Return value is used/displayed
  <!-- 반환값이 사용/표시됨 -->
  
- [ ] Feature works end-to-end in browser
  <!-- 브라우저에서 기능이 엔드투엔드로 작동 -->

### Prevention Strategy
<!-- 예방 전략 -->

**Feature Implementation Workflow**:
<!-- 기능 구현 워크플로: -->

```
1. Plan
   ├─ Identify utility function needed
   ├─ Identify where it will be called
   └─ Define integration points

2. Implement Utility
   ├─ Write utility function
   ├─ Write unit tests
   └─ Verify tests pass

3. Integrate ⭐ MUST DO
   ├─ Import in UI/Hook file
   ├─ Call function with correct parameters
   ├─ Use return value
   └─ Handle errors

4. Test Integration
   ├─ Write integration tests
   ├─ Manual test in browser
   └─ Verify full user flow

5. Complete
   └─ Feature works end-to-end ✅
```

### Real Example from This Issue
<!-- 이번 이슈의 실제 예시 -->

**What was done**:
<!-- 수행된 작업: -->
```
✅ generateRecurringEvents() implemented
✅ 16 unit tests written and passing
✅ All edge cases covered (leap year, month-end, etc.)
```

**What was missing**:
<!-- 누락된 작업: -->
```
❌ Never imported in useEventOperations.ts
❌ Never called when saving recurring events
❌ UI didn't trigger recurring event creation
```

**How it was fixed**:
<!-- 수정 방법: -->
```
✅ Added import in useEventOperations.ts
✅ Added logic to detect recurring events
✅ Called generateRecurringEvents() before saving
✅ Used /api/events-list endpoint for batch save
```

### Success Metric
<!-- 성공 지표 -->

**Feature is only complete when it works in production, not just when tests pass**
<!-- 기능은 테스트가 통과할 때가 아니라 프로덕션에서 작동할 때 완성됨 -->

**Definition of Done**:
<!-- 완료 정의: -->
- [ ] Implementation exists
  <!-- 구현 존재 -->
- [ ] Unit tests pass
  <!-- 단위 테스트 통과 -->
- [ ] Integrated with UI ⭐
  <!-- UI와 통합 ⭐ -->
- [ ] Integration tests pass
  <!-- 통합 테스트 통과 -->
- [ ] Manual testing confirms it works
  <!-- 수동 테스트로 작동 확인 -->
- [ ] Feature visible to end user
  <!-- 최종 사용자에게 기능 표시 -->

---

## Stored Learning: Date Overflow Handling for Recurring Events (2025-10-28)
<!-- 저장된 학습: 반복 일정의 날짜 오버플로우 처리 (2025-10-28) -->

### Issue Discovered by King
<!-- 건물주가 발견한 이슈 -->

**Context**: User reported that monthly recurring events for the 31st day were appearing on the last day of months that don't have 31 days (e.g., Feb 28), instead of being skipped.
<!-- 컨텍스트: 사용자가 31일 매월 반복 일정이 31일이 없는 달에 마지막 날(예: 2월 28일)에 표시된다고 보고, 건너뛰어야 함 -->

**User Requirement**:
- 31st day recurring: Only show on months with 31 days (Jan, Mar, May, Jul, Aug, Oct, Dec)
<!-- 31일 반복: 31일이 있는 달에만 표시 (1월, 3월, 5월, 7월, 8월, 10월, 12월) -->
- Feb 29th recurring: Only show on leap years
<!-- 2월 29일 반복: 윤년에만 표시 -->

### Problem Pattern
<!-- 문제 패턴 -->

**Old Approach - Adjust to Last Day on Overflow**:
<!-- 기존 접근 - 오버플로우 시 마지막 날로 조정: -->

```typescript
// ❌ Adjust overflow to last day of month
nextDate.setDate(originalDay); // Try to set 31st
if (nextDate.getMonth() !== targetMonth) {
  // Overflow detected (e.g., Feb 31 → Mar 3)
  nextDate.setDate(0); // Set to last day of previous month (Feb 28)
}

// Result: Shows on Feb 28, Apr 30, etc. ❌ NOT what user wanted
```

**Why This Failed**:
1. Date overflow in JavaScript: `new Date('2025-02-31')` becomes `2025-03-03`
2. Detecting overflow and adjusting to last day seemed reasonable
3. But user wanted to **skip** months without that day, not adjust

**Additional Problem - Cascading Calculation Errors**:
<!-- 추가 문제 - 연쇄 계산 오류: -->

```typescript
// ❌ Using current (overflowed) date as base for next calculation
let currentDate = new Date('2025-01-31');
currentDate = getNextOccurrence(currentDate, ...); // 2025-03-03 (overflowed)
currentDate = getNextOccurrence(currentDate, ...); // 2025-05-01 (wrong!)
// Should be 2025-03-31, then 2025-05-31
```

**Debug Log Revealed**:
```
0: 2025-01-31, Day: 31 ✅
1: 2025-03-03, Day: 3  ❌ (Feb 31 → Mar 3 overflow)
2: 2025-05-01, Day: 1  ❌ (Mar 3 + 2 months → wrong calculation)
3: 2025-07-01, Day: 1  ❌ (cascading errors)
```

### Solution Pattern
<!-- 해결 패턴 -->

**New Approach - Allow Overflow Then Filter**:
<!-- 새로운 접근 - 오버플로우 허용 후 필터링: -->

```typescript
// ✅ Allow overflow, then filter by day match
export function generateRecurringEvents(event: Event, maxOccurrences = 365): Event[] {
  const originalDay = startDate.getDate(); // Remember original day
  
  while (events.length < maxOccurrences && iterationCount < maxIterations) {
    // Always calculate from start date, not previous result
    currentDate = getMonthlyOccurrence(startDate, iterationCount, interval);
    
    // ⭐ Key: Only add event if day matches
    const shouldAddEvent =
      event.repeat.type === 'daily' ||
      event.repeat.type === 'weekly' ||
      currentDate.getDate() === originalDay; // Must match!

    if (shouldAddEvent) {
      events.push({ ...event, date: formatDate(currentDate) });
    }

    iterationCount++;
  }
}
```

**New Helper Function - Iteration-Based Calculation**:
<!-- 새로운 헬퍼 함수 - 반복 횟수 기반 계산: -->

```typescript
function getMonthlyOccurrence(startDate: Date, iteration: number, interval: number): Date {
  const result = new Date(startDate);
  const originalDay = startDate.getDate();
  
  // Calculate target month/year from START date, not previous result
  const monthsToAdd = iteration * interval;
  const targetMonth = (startDate.getMonth() + monthsToAdd) % 12;
  const targetYear = 
    startDate.getFullYear() + Math.floor((startDate.getMonth() + monthsToAdd) / 12);
  
  // Set to 1st first (avoid overflow issues in calculation)
  result.setDate(1);
  result.setFullYear(targetYear);
  result.setMonth(targetMonth);
  
  // Try to set original day (may overflow, that's OK)
  result.setDate(originalDay);
  
  return result; // Filtering happens at caller level
}
```

**Result**:
```
0: 2025-01-31, Day: 31, Match: true  → Added ✅
1: 2025-03-03, Day: 3,  Match: false → Skipped (Feb doesn't have 31st)
2: 2025-03-31, Day: 31, Match: true  → Added ✅
3: 2025-05-03, Day: 3,  Match: false → Skipped (Apr doesn't have 31st)
4: 2025-05-31, Day: 31, Match: true  → Added ✅
```

### Key Insights
<!-- 핵심 통찰 -->

#### 1. Calculation Strategy: Iteration-Based vs Incremental
<!-- 계산 전략: 반복 횟수 기반 vs 점진적 -->

**Incremental (Problems)**:
<!-- 점진적 (문제 발생): -->
```typescript
// ❌ Each calculation depends on previous result
currentDate = new Date(startDate);
for (let i = 0; i < count; i++) {
  currentDate = addMonths(currentDate, interval);
  // Errors accumulate!
}
```

**Iteration-Based (Correct)**:
<!-- 반복 횟수 기반 (올바름): -->
```typescript
// ✅ Each calculation is independent from start
for (let i = 0; i < count; i++) {
  const currentDate = getMonthlyOccurrence(startDate, i, interval);
  // No error accumulation!
}
```

#### 2. Overflow Philosophy: Adjust vs Filter
<!-- 오버플로우 철학: 조정 vs 필터링 -->

**Adjust Approach**:
- Tries to "fix" overflow by adjusting to valid date
- Assumes user wants closest valid date
- More complex logic, harder to understand
- ❌ Doesn't match user intent for recurring events

**Filter Approach**:
- Allows overflow to happen naturally
- Simply checks if result matches desired day
- Simpler logic, easier to test
- ✅ Matches user intent: "Only show if day exists"

#### 3. Loop Iteration Count
<!-- 루프 반복 횟수 -->

**Problem**: When skipping months, need more iterations to get desired event count
```typescript
// If showing 31st day for 12 months, need to check ~17 months
// (12 months with 31st + 5 months without)
const maxIterations = maxOccurrences * 12; // Safety margin
```

### Testing Strategy
<!-- 테스팅 전략 -->

**Test Categories**:
1. **Basic Cases**: Days that exist in all months (1-28)
2. **Edge Cases**: Days 29, 30, 31
3. **Leap Year**: Feb 29 in leap year vs non-leap year
4. **Month Combinations**: Months with 28, 29, 30, 31 days

**Example Test**:
```typescript
it('매월 31일 반복 일정이 31일이 없는 달에는 건너뛴다', () => {
  const event = {
    date: '2025-01-31',
    repeat: { type: 'monthly', interval: 1, endDate: '2025-08-31' },
  };

  const result = generateRecurringEvents(event);

  // 31일이 있는 달만: 1월, 3월, 5월, 7월, 8월
  expect(result).toHaveLength(5);
  expect(result[0].date).toBe('2025-01-31');
  expect(result[1].date).toBe('2025-03-31'); // Feb skipped
  expect(result[2].date).toBe('2025-05-31'); // Apr skipped
  expect(result[3].date).toBe('2025-07-31'); // Jun skipped
  expect(result[4].date).toBe('2025-08-31');
});
```

### Real-World Examples
<!-- 실제 예시 -->

#### Scenario 1: Monthly Bill Due on 31st
<!-- 시나리오 1: 매월 31일 납부 -->
```
Monthly recurring on 31st:
✅ Jan 31, Mar 31, May 31, Jul 31, Aug 31, Oct 31, Dec 31
❌ Feb, Apr, Jun, Sep, Nov (no payment these months)
```

#### Scenario 2: Birthday on Feb 29
<!-- 시나리오 2: 2월 29일 생일 -->
```
Yearly recurring on Feb 29:
✅ 2024-02-29 (leap year)
❌ 2025 (skip)
❌ 2026 (skip)
❌ 2027 (skip)
✅ 2028-02-29 (leap year)
```

### Learning Points for All Agents
<!-- 모든 에이전트를 위한 학습 포인트 -->

#### For Planner (계획자)
<!-- 계획자를 위해 -->

- [ ] Consider user intent: "adjust" vs "skip" for edge cases
  <!-- 사용자 의도 고려: 엣지 케이스에 대해 "조정" vs "건너뛰기" -->

- [ ] Design iteration-based calculations for recurring patterns
  <!-- 반복 패턴에 대해 반복 횟수 기반 계산 설계 -->

- [ ] Plan for loop safety margins when filtering
  <!-- 필터링 시 루프 안전 마진 계획 -->

- [ ] Define clear test cases for date edge cases
  <!-- 날짜 엣지 케이스에 대한 명확한 테스트 케이스 정의 -->

#### For Worker (노동자)
<!-- 노동자를 위해 -->

- [ ] Always calculate from stable base (start date), not previous result
  <!-- 항상 안정적인 기준(시작 날짜)에서 계산, 이전 결과가 아님 -->

- [ ] Allow overflow to happen, then filter at higher level
  <!-- 오버플로우 허용, 상위 레벨에서 필터링 -->

- [ ] Use iteration number as parameter, not accumulated date
  <!-- 누적된 날짜가 아니라 반복 번호를 매개변수로 사용 -->

- [ ] Add debug logging for complex date calculations
  <!-- 복잡한 날짜 계산에 대해 디버그 로깅 추가 -->

#### For Manager (관리자)
<!-- 관리자를 위해 -->

- [ ] Verify user requirements match implementation philosophy
  <!-- 사용자 요구사항이 구현 철학과 일치하는지 확인 -->

- [ ] Check for error accumulation in iterative calculations
  <!-- 반복 계산에서 오류 누적 확인 -->

- [ ] Ensure tests cover all date edge cases (28, 29, 30, 31 days)
  <!-- 테스트가 모든 날짜 엣지 케이스를 커버하는지 확인 (28, 29, 30, 31일) -->

- [ ] Review debug logs for unexpected patterns
  <!-- 예상치 못한 패턴에 대해 디버그 로그 검토 -->

### Prevention Checklist
<!-- 예방 체크리스트 -->

When implementing date-based recurring logic:
<!-- 날짜 기반 반복 로직 구현 시: -->

- [ ] Clarify user intent: adjust to nearest vs skip if not exact
  <!-- 사용자 의도 명확화: 가장 가까운 날짜로 조정 vs 정확하지 않으면 건너뛰기 -->

- [ ] Use iteration-based calculation, not incremental
  <!-- 점진적이 아닌 반복 횟수 기반 계산 사용 -->

- [ ] Separate overflow handling from date matching
  <!-- 오버플로우 처리와 날짜 일치 분리 -->

- [ ] Test with days 28, 29, 30, 31
  <!-- 28, 29, 30, 31일로 테스트 -->

- [ ] Test across leap years and non-leap years
  <!-- 윤년과 평년에 걸쳐 테스트 -->

- [ ] Add safety margin for loop iterations
  <!-- 루프 반복에 안전 마진 추가 -->

### Success Metrics
<!-- 성공 지표 -->

**31st Day Recurring Events**:
<!-- 31일 반복 일정: -->
- 7 events per year (Jan, Mar, May, Jul, Aug, Oct, Dec)
- 0 events in Feb, Apr, Jun, Sep, Nov
- ✅ Matches user expectation

**Feb 29 Recurring Events**:
<!-- 2월 29일 반복 일정: -->
- 1 event per 4 years (leap years: 2024, 2028, 2032...)
- 0 events in non-leap years
- ✅ Matches user expectation

### Code Quality Improvements
<!-- 코드 품질 개선 -->

**Before**: 
- Mixed overflow handling with date calculation
- Accumulated errors in iterative calculations
- Tests expected "adjusted" behavior
- 16 tests, 2 failing

**After**:
- Clear separation: calculation → overflow → filter
- Independent calculations from start date
- Tests expect "skip" behavior
- 16 tests, 16 passing ✅
- 0 lint errors ✅

---

## Stored Learning: Virtual vs Persistent ID Pattern (2025-10-28)

**Date**: 2025-10-28
**Category**: Data Architecture Pattern
**Agents**: Worker, Planner, Manager

### Problem Context

**User Issue**: 
> "31일 매월 반복 일정을 등록한 후, 수정해서 '매월 → 매주'로 변경하려고 하니 저장 실패"

**Architecture Background**:
```
Storage Strategy Change (Previous PR):
- OLD: Store all recurring event instances (365 events)
- NEW: Store 1 original event, expand on display
```

**What Happened**:
1. User registered monthly recurring event (Jan 31)
2. System displayed expanded events (Jan 31, Mar 31, May 31...)
3. User clicked Mar 31 event → Edit modal opened
4. User changed "monthly → weekly" → Save clicked
5. **❌ Save failed: 404 Error**

### Root Cause Analysis

**Problem Pattern**: Virtual ID used for persistent operation

```typescript
// What happened internally:
// 1. fetchEvents() - Expanded events created
const expandedEvents = [
  {id: "temp-1", date: "2025-01-31", ...},  // Virtual ID
  {id: "temp-2", date: "2025-03-31", ...},  // Virtual ID (user clicked this)
  {id: "temp-3", date: "2025-05-31", ...},  // Virtual ID
]

// 2. User edited Mar 31 event
const editingEvent = {id: "temp-2", date: "2025-03-31", ...}

// 3. Save attempt
PUT /api/events/temp-2  // ❌ Server doesn't have "temp-2"
// Result: 404 Error
```

**Core Issue**:
- Virtual IDs are client-side only (for display differentiation)
- Server only knows original event ID (`original-123`)
- System lost connection between virtual and persistent IDs

### Solution: Metadata Tracking Pattern

**Concept**: Store origin information in expanded data

#### 1. Type Extension

**File**: `src/types.ts`

```typescript
export interface RepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
  id?: string;
  
  // ⭐ Metadata for tracking origin
  originalEventId?: string;  // Persistent ID from DB
  originalDate?: string;      // Original start date (base for calculation)
}
```

**Purpose**:
- `originalEventId`: Link back to DB record
- `originalDate`: Preserve calculation base (important for recurring logic)

#### 2. Metadata Injection

**File**: `src/utils/recurringEventUtils.ts`

```typescript
export function generateRecurringEvents(event: Event): Event[] {
  const originalEventId = event.id;      // Store persistent ID
  const originalDate = event.date;        // Store base date
  
  // Generate expanded events
  events.push({
    ...event,
    id: generateEventId(),                // Virtual ID (for display)
    date: expandedDateString,             // Expanded date (Mar 31, May 31...)
    repeat: {
      ...event.repeat,
      originalEventId: originalEventId,   // ⭐ Link to DB
      originalDate: originalDate,          // ⭐ Base for calculation
    },
  });
}
```

**Data Structure**:
```json
{
  "id": "virtual-temp-2",          // Client-side ID (changes each render)
  "date": "2025-03-31",            // Expanded date (what user sees)
  "repeat": {
    "type": "monthly",
    "originalEventId": "db-123",   // Persistent ID (for updates)
    "originalDate": "2025-01-31"   // Base date (for consistency)
  }
}
```

#### 3. Edit Logic with Metadata

**File**: `src/hooks/useEventOperations.ts`

```typescript
const saveEvent = async (eventData: Event | EventForm) => {
  if (editing) {
    const event = eventData as Event;
    
    // ⭐ Use persistent ID from metadata
    const updateId = event.repeat?.originalEventId || event.id;
    
    // ⭐ Use original base date (not expanded date)
    const updateDate = event.repeat?.originalDate || event.date;
    
    const updateData = {
      ...event,
      date: updateDate,  // Store with base date (Jan 31, not Mar 31)
      repeat: {
        type: event.repeat.type,      // Can change (monthly → weekly)
        interval: event.repeat.interval,
        endDate: event.repeat.endDate,
        // Don't send metadata to server (internal use only)
      },
    };
    
    // ⭐ Update using persistent ID
    await fetch(`/api/events/${updateId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }
};
```

**Flow Diagram**:
```
User Action              Internal Processing              Server Call
─────────────           ────────────────────             ────────────
Click "Edit"            
Mar 31 event            
                        Extract metadata:
                        - originalEventId: "db-123"
                        - originalDate: "2025-01-31"
                        
Change:                 
monthly → weekly        Prepare update:
                        - ID: "db-123" (not "temp-2")
                        - date: "2025-01-31" (not "2025-03-31")
                        - repeat.type: "weekly"
                        
Click "Save"                                              PUT /api/events/db-123
                                                          {date: "2025-01-31", 
                                                           repeat: {type: "weekly"}}
                                                          
                                                          ✅ Success
                        
                        Fetch & re-expand:
                        Weekly events from Jan 31
                        (Every Friday)
```

### Key Principles

#### Virtual vs Persistent IDs

**Definition**:

| Aspect | Virtual ID | Persistent ID |
|--------|------------|---------------|
| **Generated** | Client-side | Server/Database |
| **Lifespan** | Single render cycle | Permanent |
| **Purpose** | Display differentiation | CRUD operations |
| **Example** | `temp-1`, `uuid-...` | `event-123`, `id-456` |
| **Can change** | Yes (each render) | No |

**Usage Rule**:
- **Display**: Use Virtual ID (for React keys, UI differentiation)
- **Update/Delete**: Use Persistent ID (for server operations)

**Example**:
```typescript
// ✅ Good: Virtual ID for display
return events.map(event => (
  <EventCard key={event.id} /> // Virtual ID OK here
));

// ❌ Bad: Virtual ID for update
const updateEvent = (event: Event) => {
  fetch(`/api/events/${event.id}`, {...});  // If event.id is virtual → 404
};

// ✅ Good: Persistent ID for update
const updateEvent = (event: Event) => {
  const persistentId = event.repeat?.originalEventId || event.id;
  fetch(`/api/events/${persistentId}`, {...});
};
```

#### Metadata Tracking Pattern

**When to use**:
- Expanded/derived data needs to reference source
- Client-side data transformations
- Virtual representations of DB records

**Pattern Structure**:
```typescript
interface ExpandedData {
  // Display properties
  id: string;           // Virtual ID
  displayValue: any;    // Expanded/calculated value
  
  // Metadata (link back to source)
  metadata: {
    sourceId: string;   // Persistent ID
    baseValue: any;     // Original value (for recalculation)
  }
}
```

**Examples**:

1. **Recurring Events** (this case):
```typescript
{
  id: "virtual-123",
  date: "2025-03-31",         // Expanded
  repeat: {
    originalEventId: "db-1",  // Source
    originalDate: "2025-01-31" // Base
  }
}
```

2. **Grouped Data**:
```typescript
{
  id: "group-item-5",
  value: "Item 5",
  groupMetadata: {
    groupId: "group-1",       // Parent group
    position: 5                // Position in group
  }
}
```

3. **Calculated Data**:
```typescript
{
  id: "calc-result-3",
  displayValue: "150%",        // Calculated
  metadata: {
    sourceRecordId: "record-1", // Source data
    baseValue: 100,              // Original value
    formula: "multiply-1.5"      // Calculation method
  }
}
```

#### Data Consistency Rules

**Base Date Preservation**:

```typescript
// ❌ Bad: Use expanded date as base
PUT /api/events/123
{
  date: "2025-03-31",  // User edited Mar 31 event
  repeat: {type: "monthly"}
}
// Problem: Mar 31 becomes new base → Apr 31 (invalid), May 31, Jun 31 (invalid)...

// ✅ Good: Preserve original base date
PUT /api/events/123
{
  date: "2025-01-31",  // Original start date
  repeat: {type: "monthly"}
}
// Correct: Jan 31 base → Mar 31, May 31, Jul 31... (consistent)
```

**Principle**: 
> Expanded data is for display. Operations must use source/base values.

### Learning Points

#### For Worker (노동자)

**Implementation Checklist**:
1. ✅ Identify if data is expanded/derived from source
2. ✅ Add metadata fields to track origin
3. ✅ Inject metadata during expansion
4. ✅ Use metadata in CRUD operations
5. ✅ Never send internal metadata to server

**Code Pattern**:
```typescript
// Expansion
function expand(original: T): T[] {
  return derivedItems.map(item => ({
    ...item,
    metadata: {
      originalId: original.id,
      baseValue: original.value,
    }
  }));
}

// Update
function update(item: T) {
  const id = item.metadata?.originalId || item.id;
  const value = item.metadata?.baseValue || item.value;
  api.update(id, { value });  // Use source values
}
```

#### For Planner (기획자)

**Planning Questions**:
1. Does this feature involve data expansion? (1→N transformation)
2. Will users need to edit expanded items?
3. What's the source of truth? (DB record, calculated base, etc.)
4. What metadata is needed to link back to source?

**Design Pattern**:
```
Source Data → Expansion → Display
     ↑                      ↓
     └───── Update ← User Edit
            (use source ID, 
             use base values)
```

#### For Manager (관리자)

**Review Checklist**:
- [ ] Virtual IDs not used in API calls
- [ ] Persistent IDs properly tracked in metadata
- [ ] Base values preserved in updates
- [ ] Metadata not sent to server
- [ ] Tests cover edit scenarios
- [ ] Documentation explains ID types

**Common Pitfalls**:
```typescript
// ❌ Pitfall 1: Virtual ID in API
fetch(`/api/data/${item.id}`)  // item.id might be virtual

// ❌ Pitfall 2: Expanded value as base
update({value: expandedValue})  // Should use baseValue

// ❌ Pitfall 3: Lost metadata
const {id, ...rest} = item;     // Lost metadata!
update(rest);

// ✅ Correct
const persistentId = item.metadata?.sourceId || item.id;
const baseValue = item.metadata?.baseValue || item.value;
fetch(`/api/data/${persistentId}`, {value: baseValue});
```

### Testing Strategy

**Test Scenarios**:

1. **Create → Edit Scenario**:
```typescript
it('반복 일정을 수정할 때 원본 이벤트 ID로 저장한다', async () => {
  // 1. Create original
  const created = await createEvent({
    date: '2025-01-31',
    repeat: {type: 'monthly'}
  });
  
  // 2. Fetch (triggers expansion)
  const events = await fetchEvents();
  const marchEvent = events.find(e => e.date === '2025-03-31');
  
  // 3. Edit expanded event
  await updateEvent({
    ...marchEvent,
    repeat: {type: 'weekly'}
  });
  
  // 4. Verify: original record updated with base date
  const updated = await getEvent(created.id);
  expect(updated.date).toBe('2025-01-31');  // Base date preserved
  expect(updated.repeat.type).toBe('weekly');
});
```

2. **Metadata Integrity**:
```typescript
it('펼쳐진 이벤트에 originalEventId가 있다', () => {
  const expanded = generateRecurringEvents({
    id: 'original-1',
    date: '2025-01-31',
    repeat: {type: 'monthly'}
  });
  
  expanded.forEach(event => {
    expect(event.repeat.originalEventId).toBe('original-1');
    expect(event.repeat.originalDate).toBe('2025-01-31');
  });
});
```

### Results

**Before Fix**:
```
❌ Edit recurring event → 404 Error
❌ "매월 → 매주" change impossible
❌ Server receives virtual ID
❌ Expanded date used as base
```

**After Fix**:
```
✅ Edit recurring event → Success
✅ "매월 → 매주" change works
✅ Server receives persistent ID
✅ Original base date preserved
✅ All 16 recurring tests pass
✅ 0 lint errors
```

**User Flow Success**:
```
1. Register monthly event (Jan 31) ✅
2. System displays expanded (Jan 31, Mar 31, May 31...) ✅
3. Edit Mar 31 event ✅
4. Change "monthly → weekly" ✅
5. Save successfully ✅
6. Display updates to weekly (every Friday) ✅
```

### Application to Other Features

**This pattern applies to**:

1. **Grouped Data**: 
   - Store group once
   - Expand to show all items
   - Edit item → update group

2. **Calculated Series**:
   - Store base calculation
   - Expand to show results
   - Edit result → update base formula

3. **Template Instances**:
   - Store template once
   - Generate instances
   - Edit instance → update template

4. **Time-based Splits**:
   - Store daily total
   - Expand to hourly
   - Edit hour → update daily total

**General Pattern**:
```typescript
interface ExpandedItem<T> {
  // Display
  id: string;           // Virtual
  displayData: T;       // Expanded
  
  // Metadata
  origin: {
    id: string;         // Persistent
    baseData: T;        // Source
  }
}
```

### Conclusion

**Core Lesson**: 
> When data is expanded for display (1→N transformation), always track the origin with metadata. Use virtual IDs for display, persistent IDs for operations, and base values for updates.

**Success Metrics**:
- ✅ Recurring event edits work
- ✅ Data consistency maintained
- ✅ User expectations met
- ✅ All tests passing
- ✅ Pattern documented for future features

---

## Stored Learning: Nested Object Spread Anti-Pattern (2025-10-28)

**Date**: 2025-10-28
**Category**: JavaScript Patterns, Data Integrity
**Agents**: Worker, Planner, Manager

### Problem Context

**User Issue**:
> "타이틀 31인 일정을 설명이나, 위치 등등을 수정해서 일정수정을 누르면 일정수정 실패 알림이 나온다."

**Previous Fix Attempts**:
1. ✅ Virtual ID removal implemented
2. ✅ Server ID protection implemented
3. ✅ All tests passing

**Yet Still Failing**: Event update still fails with "일정 수정 실패"

### Root Cause Analysis

**The Bug**:

```typescript
// ❌ WRONG: Only removed id, not nested object
const { id: _id, ...eventWithoutId } = event;

const updateData = {
  ...eventWithoutId,  // ← Contains repeat: { originalEventId, originalDate, ... }
  date: updateDate,
  repeat: {           // ← Tries to override above repeat
    type: event.repeat.type,
    interval: event.repeat.interval,
    endDate: event.repeat.endDate,
  },
};
```

**What `eventWithoutId` Actually Contains**:
```typescript
{
  title: "31",
  date: "2025-10-31",
  startTime: "02:27",
  endTime: "14:27",
  description: "123",
  location: "123",
  category: "업무",
  repeat: {  // ⚠️ PROBLEM: Contains internal metadata!
    type: "monthly",
    interval: 1,
    originalEventId: "3b70f939-...",  // ← Internal metadata
    originalDate: "2025-10-31"         // ← Internal metadata
  },
  notificationTime: 10
}
```

**JavaScript Object Spread Behavior**:

```javascript
// Spread order matters!
const obj1 = { a: 1, b: { x: 1, y: 2 } };
const obj2 = {
  ...obj1,     // b: { x: 1, y: 2 }
  b: { x: 10 } // Overrides b
};

// Result: { a: 1, b: { x: 10 } }
// ✅ b is overridden completely

// BUT consider this:
const obj3 = { a: 1, b: { x: 1, metadata: 'internal' } };
const obj4 = {
  ...obj3,           // b: { x: 1, metadata: 'internal' }
  b: { x: 10 }       // Override with { x: 10 }
};

// Expected: { a: 1, b: { x: 10 } }
// Problem: Runtime behavior can vary!
// Some engines might keep metadata internally
```

**The Real Issue**:
- Object spread DOES override the property
- But when the nested object contains metadata that shouldn't be sent to server
- Relying on override is risky
- **Best practice: Explicitly remove nested objects that need clean replacement**

### The Fix

**Correct Implementation**:

```typescript
// ✅ CORRECT: Remove both id AND nested object
const { id: _id, repeat: _repeat, ...eventWithoutIdAndRepeat } = event;

const updateData = {
  ...eventWithoutIdAndRepeat,  // ← Does NOT contain repeat!
  date: updateDate,
  repeat: {  // ← Clean new object
    type: event.repeat.type,
    interval: event.repeat.interval,
    endDate: event.repeat.endDate,
  },
};
```

**Why This Works**:
1. `eventWithoutIdAndRepeat` doesn't contain `repeat` at all
2. New `repeat` object is completely clean
3. No chance of metadata leakage
4. Explicit and predictable behavior

### Pattern Recognition

**Anti-Pattern: Nested Object Override via Spread**

```typescript
// ❌ ANTI-PATTERN
const { topLevelField, ...rest } = object;
const data = {
  ...rest,              // Contains nestedObject with metadata
  nestedObject: { ... } // Attempting to override
};
```

**Correct Pattern: Explicit Nested Object Removal**

```typescript
// ✅ BEST PRACTICE
const { topLevelField, nestedObject, ...rest } = object;
const data = {
  ...rest,              // Does NOT contain nestedObject
  nestedObject: { ... } // Clean new object
};
```

### Real-World Examples

#### Example 1: User Profile Update

```typescript
// ❌ Bad
function updateProfile(user) {
  const { id, ...userData } = user;  // userData.settings has metadata
  return fetch('/api/user', {
    body: JSON.stringify({
      ...userData,
      settings: { theme: newTheme }  // Override attempt
    })
  });
}

// ✅ Good
function updateProfile(user) {
  const { id, settings, ...userData } = user;  // Remove settings
  return fetch('/api/user', {
    body: JSON.stringify({
      ...userData,
      settings: { theme: newTheme }  // Clean new object
    })
  });
}
```

#### Example 2: Product Update

```typescript
// ❌ Bad
const { productId, ...product } = fullProduct;
// product.pricing has internal calculations
const updateData = {
  ...product,
  pricing: { price: newPrice, currency: 'USD' }
};

// ✅ Good
const { productId, pricing, ...product } = fullProduct;
const updateData = {
  ...product,
  pricing: { price: newPrice, currency: 'USD' }
};
```

#### Example 3: Event Update (This Case)

```typescript
// ❌ Bad
const { id, ...event } = fullEvent;
// event.repeat has originalEventId, originalDate
const updateData = {
  ...event,
  repeat: { type: 'weekly', interval: 1 }
};

// ✅ Good
const { id, repeat, ...event } = fullEvent;
const updateData = {
  ...event,
  repeat: { type: 'weekly', interval: 1 }
};
```

### Detection Checklist

**When reviewing code, check for**:

1. **Nested Object Override Pattern**:
```typescript
const { field1, ...rest } = obj;
const data = { ...rest, nestedObj: {...} };  // ⚠️ Check!
```

2. **Questions to Ask**:
- Does `rest` contain `nestedObj`?
- Does `nestedObj` have internal metadata?
- Are we trying to override `nestedObj`?

3. **If YES to all, refactor to**:
```typescript
const { field1, nestedObj, ...rest } = obj;
const data = { ...rest, nestedObj: {...} };  // ✅ Safe
```

### Learning Points

#### For Worker (노동자)

**Implementation Rule**:
> When spreading an object and then overriding a nested property, ALWAYS explicitly remove that nested property first.

**Code Template**:
```typescript
// Step 1: Identify nested objects to override
const nestedFields = ['repeat', 'settings', 'metadata'];

// Step 2: Explicitly remove them
const { id, repeat, settings, metadata, ...clean } = sourceObject;

// Step 3: Add clean versions
const dataToSend = {
  ...clean,
  repeat: createCleanRepeat(),
  settings: createCleanSettings(),
  metadata: createCleanMetadata()
};
```

**Verification**:
```typescript
// Before sending, verify no internal fields
console.assert(!dataToSend.repeat?.originalEventId);
console.assert(!dataToSend.settings?.internalFlag);
```

#### For Planner (기획자)

**Design Principle**:
> Separate client-side metadata from server-bound data at the type level

**Type Design**:
```typescript
// Client-side event (with metadata)
interface ClientEvent extends Event {
  repeat: ClientRepeatInfo;
}

interface ClientRepeatInfo extends RepeatInfo {
  originalEventId?: string;  // Client-only
  originalDate?: string;      // Client-only
}

// Server-bound event (no metadata)
interface ServerEvent extends Event {
  repeat: ServerRepeatInfo;
}

interface ServerRepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
  // No metadata fields
}
```

**Conversion Function**:
```typescript
function toServerEvent(clientEvent: ClientEvent): ServerEvent {
  const { id, repeat, ...base } = clientEvent;
  return {
    ...base,
    repeat: {
      type: repeat.type,
      interval: repeat.interval,
      endDate: repeat.endDate
      // Metadata automatically excluded by type
    }
  };
}
```

#### For Manager (관리자)

**Review Checklist**:
- [ ] All API request bodies explicitly construct nested objects
- [ ] No nested object override via spread
- [ ] Type definitions separate client/server data
- [ ] Tests verify no metadata in API calls
- [ ] Documentation warns about metadata

**Test Pattern**:
```typescript
it('does not send internal metadata to server', async () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  const eventWithMetadata = {
    id: 'virtual-123',
    title: 'Test',
    repeat: {
      type: 'monthly',
      interval: 1,
      originalEventId: 'real-456',  // Internal
      originalDate: '2025-01-01'     // Internal
    }
  };

  await updateEvent(eventWithMetadata);

  const sentBody = JSON.parse(mockFetch.mock.calls[0][1].body);
  expect(sentBody.repeat.originalEventId).toBeUndefined();
  expect(sentBody.repeat.originalDate).toBeUndefined();
});
```

### Results

**Before Fix**:
```
❌ Event update fails
❌ "일정 수정 실패" toast
❌ Metadata possibly sent to server
❌ Unpredictable behavior
```

**After Fix**:
```
✅ Event update succeeds
✅ "일정이 수정되었습니다" toast
✅ No metadata sent to server
✅ Predictable, reliable behavior
✅ 121 tests passing
```

### Broader Implications

**This pattern applies to**:

1. **Form Data Submission**:
   - Remove calculated fields before submit
   - Remove UI state before API call
   - Remove validation metadata

2. **State Updates**:
   - Remove component-specific state before persist
   - Remove derived data before storage
   - Remove temporary flags before save

3. **Data Synchronization**:
   - Remove client-side IDs before server sync
   - Remove local timestamps before upload
   - Remove optimization hints before transfer

**General Rule**:
> If an object has nested properties with internal/metadata fields, and you need to send a clean version to an external system, ALWAYS explicitly destructure and remove those nested properties rather than relying on spread override.

### Conclusion

**Core Lesson**:
> JavaScript object spread does override properties, but relying on this for nested objects with metadata is dangerous. Always explicitly remove nested objects that need clean replacement.

**Success Metrics**:
- ✅ Event update works
- ✅ No metadata leakage
- ✅ Explicit and predictable code
- ✅ All tests passing
- ✅ Pattern documented and understood

---

## Stored Learning: UI Layer Metadata Preservation (2025-10-28)

**Date**: 2025-10-28
**Category**: Data Flow, Metadata Management, UI Patterns
**Agents**: King, Worker, Planner, Manager

### Problem Context

**User Issue**:
> "그래도 일정 저장 실패 알림이 나온다."

**Previous Fixes Applied**:
1. ✅ `useEventOperations.ts`: Virtual ID removal, clean repeat object
2. ✅ `server.js`: Body ID protection, URL ID preservation
3. ✅ All tests passing

**Yet Still Failing**: Event update still fails with "일정 저장 실패"

### Root Cause Analysis

**The Missing Link**: UI Layer (App.tsx)

**Problem Code** (`src/App.tsx` Line 129-144):

```typescript
// ❌ WRONG: Creating brand new object, losing metadata
const eventData: Event | EventForm = {
  id: editingEvent ? editingEvent.id : undefined,  // ← Virtual ID!
  title,
  date,
  startTime,
  endTime,
  description,
  location,
  category,
  repeat: {  // ← Brand new object, no metadata!
    type: isRepeating ? repeatType : 'none',
    interval: repeatInterval,
    endDate: repeatEndDate || undefined,
  },
  notificationTime,
};
```

**Two Critical Mistakes**:

1. **Virtual ID Passed Directly**:
```typescript
id: editingEvent ? editingEvent.id : undefined
// If editingEvent is expanded: id = "virtual-temp-456"
// This virtual ID is sent to saveEvent!
```

2. **Metadata Completely Lost**:
```typescript
repeat: {
  type: isRepeating ? repeatType : 'none',
  interval: repeatInterval,
  endDate: repeatEndDate || undefined,
  // ❌ NO originalEventId!
  // ❌ NO originalDate!
}
```

### Data Flow Visualization

**Expected Flow** (What we thought was happening):
```
editingEvent              App.tsx                useEventOperations
────────────              ───────                ──────────────────
{                         eventData = {          updateId = 
  id: "virtual-456",        ...editingEvent,       repeat.originalEventId
  repeat: {                 repeat: {              || id
    originalEventId:          originalEventId:   = "db-123"  ✅
    "db-123",                 "db-123"
    originalDate:           }
    "2025-10-31"          }
  }
}
                          ↓
                          PUT /api/events/db-123  ✅
```

**Actual Flow** (What was really happening):
```
editingEvent              App.tsx                useEventOperations
────────────              ───────                ──────────────────
{                         eventData = {          updateId = 
  id: "virtual-456",        id: "virtual-456",     repeat.originalEventId
  repeat: {                 repeat: {              || id
    originalEventId:          type: "monthly",   = undefined || id
    "db-123",                 interval: 1        = "virtual-456"  ❌
    originalDate:             // NO metadata!
    "2025-10-31"            }
  }                       }
}
                          ↓
                          PUT /api/events/virtual-456  ❌
                          404 Not Found
```

### The Metadata Chain

**3-Step Metadata Preservation Chain**:

1. **Step 1: Generate** (`recurringEventUtils.ts`):
   - Expand 1 event → N events
   - Inject `originalEventId`, `originalDate` into each

2. **Step 2: Preserve** (`App.tsx`):  ← **THIS WAS BROKEN!**
   - User edits expanded event
   - Must preserve metadata when creating eventData
   
3. **Step 3: Utilize** (`useEventOperations.ts`):
   - Extract `originalEventId` for API call
   - Extract `originalDate` for data consistency

**If any step fails, the entire chain breaks!**

### The Fix

**Correct Implementation** (`src/App.tsx`):

```typescript
// ✅ CORRECT: Preserve original event with metadata
const eventData: Event | EventForm = editingEvent
  ? {
      // Editing mode: Preserve entire original event
      // <!-- 수정 모드: 원본 이벤트 전체 보존 -->
      ...editingEvent,  // ← Includes id, repeat with metadata, etc.
      
      // Override with form data
      // <!-- 폼 데이터로 덮어쓰기 -->
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      
      repeat: {
        ...editingEvent.repeat,  // ← Preserve repeat metadata!
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      
      notificationTime,
    }
  : {
      // Creating mode: Brand new event
      // <!-- 생성 모드: 완전히 새로운 이벤트 -->
      title,
      date,
      startTime,
      endTime,
      description,
      location,
      category,
      repeat: {
        type: isRepeating ? repeatType : 'none',
        interval: repeatInterval,
        endDate: repeatEndDate || undefined,
      },
      notificationTime,
    };
```

**Why This Works**:

1. **`...editingEvent`**: Spreads entire original event
   - Includes `id: "virtual-456"`
   - Includes all other fields
   
2. **`...editingEvent.repeat`**: Spreads repeat with metadata
   - Includes `originalEventId: "db-123"`
   - Includes `originalDate: "2025-10-31"`
   - Includes `type`, `interval`, etc.
   
3. **Override with form data**: User changes applied
   - `title: newTitle`
   - `description: newDescription`
   - `repeat.type: newType`
   
4. **Result**: Perfect blend of metadata + user changes
   ```typescript
   {
     id: "virtual-456",         // From editingEvent
     title: "수정된 제목",      // From form
     description: "수정된 설명", // From form
     repeat: {
       type: "weekly",           // From form
       interval: 1,              // From form
       originalEventId: "db-123", // From editingEvent.repeat  ✅
       originalDate: "2025-10-31" // From editingEvent.repeat  ✅
     }
   }
   ```

### Before/After Comparison

#### Before Fix

```typescript
// App.tsx
const eventData = {
  id: editingEvent ? editingEvent.id : undefined,
  ...formFields,
  repeat: {
    type: formType,
    interval: formInterval
  }
};
// eventData.repeat.originalEventId = undefined  ❌

// ↓ saveEvent(eventData)
// ↓ useEventOperations.ts
const updateId = event.repeat?.originalEventId || event.id;
// = undefined || "virtual-456"
// = "virtual-456"  ❌

// ↓ API Request
PUT /api/events/virtual-456
// 404 Not Found  ❌
```

#### After Fix

```typescript
// App.tsx
const eventData = editingEvent
  ? {
      ...editingEvent,
      ...formFields,
      repeat: {
        ...editingEvent.repeat,
        type: formType,
        interval: formInterval
      }
    }
  : { ...formFields };
// eventData.repeat.originalEventId = "db-123"  ✅

// ↓ saveEvent(eventData)
// ↓ useEventOperations.ts
const updateId = event.repeat?.originalEventId || event.id;
// = "db-123" || "virtual-456"
// = "db-123"  ✅

// ↓ API Request
PUT /api/events/db-123
// 200 OK  ✅
```

### Pattern Recognition

**Anti-Pattern: Form-to-Object Direct Mapping**

```typescript
// ❌ ANTI-PATTERN
function createEventData(form, editing, source) {
  return {
    id: editing ? source.id : undefined,
    ...form.fields,
    nestedObject: {
      field1: form.nested.field1,
      field2: form.nested.field2
    }
  };
}
// Result: All metadata lost!
```

**Correct Pattern: Conditional Preservation**

```typescript
// ✅ BEST PRACTICE
function createEventData(form, editing, source) {
  return editing
    ? {
        ...source,           // Preserve all metadata
        ...form.fields,      // Override with form data
        nestedObject: {
          ...source.nestedObject,  // Preserve nested metadata
          field1: form.nested.field1,  // Override
          field2: form.nested.field2
        }
      }
    : {
        ...form.fields,  // New object, no metadata needed
        nestedObject: {
          field1: form.nested.field1,
          field2: form.nested.field2
        }
      };
}
```

### Real-World Examples

#### Example 1: User Profile Update

```typescript
// ❌ Bad
const profileData = {
  id: user.id,
  name: formName,
  email: formEmail,
  settings: {
    theme: formTheme,
    language: formLanguage
  }
};
// Lost: settings.lastSync, settings.version, etc.

// ✅ Good
const profileData = {
  ...user,  // Preserve all metadata
  name: formName,
  email: formEmail,
  settings: {
    ...user.settings,  // Preserve settings metadata
    theme: formTheme,
    language: formLanguage
  }
};
```

#### Example 2: Product Update

```typescript
// ❌ Bad
const productData = {
  id: product.id,
  name: formName,
  price: formPrice,
  inventory: {
    quantity: formQuantity,
    location: formLocation
  }
};
// Lost: inventory.lastRestockDate, inventory.supplier, etc.

// ✅ Good
const productData = {
  ...product,
  name: formName,
  price: formPrice,
  inventory: {
    ...product.inventory,
    quantity: formQuantity,
    location: formLocation
  }
};
```

#### Example 3: Event Update (This Case)

```typescript
// ❌ Bad
const eventData = {
  id: editingEvent?.id,
  title: formTitle,
  repeat: {
    type: formRepeatType,
    interval: formInterval
  }
};
// Lost: repeat.originalEventId, repeat.originalDate

// ✅ Good
const eventData = editingEvent
  ? {
      ...editingEvent,
      title: formTitle,
      repeat: {
        ...editingEvent.repeat,
        type: formRepeatType,
        interval: formInterval
      }
    }
  : { /* new event */ };
```

### Detection Checklist

**When reviewing UI code, check for**:

1. **Form Data Mapping**:
```typescript
const data = {
  id: source.id,
  field1: formField1,
  field2: formField2,
  nested: {  // ⚠️ Check!
    nestedField: formNestedField
  }
};
```

2. **Questions to Ask**:
- Is this an edit operation?
- Does `source` have metadata?
- Are we creating a brand new object?
- Will metadata be lost?

3. **If YES to metadata loss, refactor to**:
```typescript
const data = editing
  ? {
      ...source,
      field1: formField1,
      nested: {
        ...source.nested,
        nestedField: formNestedField
      }
    }
  : { /* new */ };
```

### Learning Points

#### For Worker (노동자)

**Implementation Rule**:
> When creating event data from form inputs in edit mode, ALWAYS spread the original event first, then override with form data.

**Code Template**:
```typescript
// Step 1: Determine mode
const isEditing = Boolean(sourceEvent);

// Step 2: Create data conditionally
const data = isEditing
  ? {
      ...sourceEvent,       // Preserve all
      ...formData,          // Override top-level
      nested: {
        ...sourceEvent.nested,  // Preserve nested
        ...formNested           // Override nested
      }
    }
  : {
      ...formData,          // New event
      nested: formNested
    };

// Step 3: Verify
console.assert(
  !isEditing || data.metadata === sourceEvent.metadata,
  'Metadata should be preserved in edit mode'
);
```

**Two-Location Update**:
When you find one place that needs this pattern, look for ALL places:
- Normal save button handler
- Overlap dialog save handler
- Quick edit handlers
- Batch update handlers

**All must use the same pattern!**

#### For Planner (기획자)

**Design Principle**:
> UI layer should be metadata-agnostic but metadata-preserving. It doesn't need to know what metadata is, but must preserve it.

**Design Pattern**:

1. **State Management**:
   ```
   editingEvent: Event | null  // Holds full event with metadata
   formFields: { title, date, ... }  // Holds user input
   ```

2. **Data Construction**:
   ```
   Editing: Merge editingEvent + formFields (preserve metadata)
   Creating: Use formFields only (no metadata needed)
   ```

3. **API Contract**:
   ```
   saveEvent(eventData: Event | EventForm)
   - If Event: Has metadata (editing)
   - If EventForm: No metadata (creating)
   ```

**Documentation**:
```markdown
# Event Update Flow

## Creating New Event
1. User fills form
2. Create EventForm from form data
3. No metadata needed

## Editing Existing Event
1. Load event into editingEvent (includes metadata)
2. User modifies form
3. Create Event by:
   - Spreading editingEvent (preserve metadata)
   - Overriding with form data
   - Spreading nested objects (preserve nested metadata)
```

#### For Manager (관리자)

**Review Checklist**:
- [ ] Edit mode spreads original event
- [ ] Nested objects also spread (especially `repeat`)
- [ ] Form data overrides after spreading
- [ ] Both normal save and overlap save use same pattern
- [ ] Test verifies metadata preservation

**Test Pattern**:
```typescript
describe('Event Update', () => {
  it('preserves metadata when editing recurring event', () => {
    const expandedEvent = {
      id: 'virtual-123',
      title: 'Original',
      repeat: {
        type: 'monthly',
        interval: 1,
        originalEventId: 'db-456',
        originalDate: '2025-01-31'
      }
    };

    // Simulate editing
    const updatedEvent = createEventData({
      title: 'Updated'
    }, true, expandedEvent);

    expect(updatedEvent.repeat.originalEventId).toBe('db-456');
    expect(updatedEvent.repeat.originalDate).toBe('2025-01-31');
    expect(updatedEvent.title).toBe('Updated');
  });
});
```

### Results

**Before Fix**:
```
❌ PUT /api/events/virtual-456
❌ 404 Not Found
❌ "일정 저장 실패"
```

**After Fix**:
```
✅ PUT /api/events/db-123
✅ 200 OK
✅ "일정이 수정되었습니다"
✅ All 122 tests passing
```

### Broader Implications

**This pattern applies to**:

1. **Edit Operations**:
   - User profile updates
   - Product inventory updates
   - Settings modifications
   - Any form that edits existing data

2. **Metadata Types**:
   - Client-side IDs (virtual IDs)
   - Server-side IDs (persistent IDs)
   - Timestamps (createdAt, updatedAt)
   - Version numbers
   - Audit trails

3. **Nested Object Updates**:
   - Configuration objects
   - Address information
   - Recurring patterns
   - Permission structures

**General Rule**:
> In edit mode, always spread the source object before applying form data. This ensures all metadata (known and unknown) is preserved.

### Conclusion

**Core Lesson**:
> The UI layer is a critical link in the metadata preservation chain. Even if lower layers (utils, hooks) handle metadata correctly, the UI must preserve it when constructing update payloads.

**The 3-Link Chain**:
1. **Utils**: Inject metadata when expanding data
2. **UI**: Preserve metadata when editing  ← **This fix!**
3. **Hooks**: Utilize metadata when saving

**Break any link → System fails!**

**Success Metrics**:
- ✅ Recurring events editable
- ✅ Metadata preserved across entire flow
- ✅ Virtual IDs never reach server
- ✅ All 122 tests passing
- ✅ Pattern documented and understood

