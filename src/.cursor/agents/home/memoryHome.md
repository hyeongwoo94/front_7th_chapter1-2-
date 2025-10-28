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

