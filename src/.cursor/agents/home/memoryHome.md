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
<!-- 교차 기능 기록 -->
- Shared learnings across agents
<!-- 에이전트 간 공유 학습 -->
- Team performance insights
<!-- 팀 성과 인사이트 -->
- Process evolution patterns
<!-- 프로세스 진화 패턴 -->
- **Accessible To**: All agents
<!-- 접근 가능: 모든 에이전트 -->

---

## TypeScript Patterns
<!-- TypeScript 패턴 -->

### Optional Chaining Consistency (2025-10-28)
<!-- Optional Chaining 일관성 (2025-10-28) -->

**Problem**: Inconsistent optional chaining in conditional expressions
<!-- 문제: 조건부 표현식에서 일관성 없는 optional chaining -->

```typescript
// ❌ BAD: TypeScript cannot infer
const value = obj?.field.nested !== 'x' ? obj.field.nested : 'default';
//                    ^^^^^^ Error: obj is possibly undefined

// ✅ GOOD: Explicit existence check
const value = obj && obj.field.nested !== 'x' ? obj.field.nested : 'default';
```

**Rule**: Use explicit `&&` for type narrowing in complex conditional expressions
<!-- 규칙: 복잡한 조건부 표현식에서 타입 좁히기를 위해 명시적 `&&` 사용 -->

---

## UI/UX Patterns
<!-- UI/UX 패턴 -->

### Default Values for Form Components (2025-10-28)
<!-- 폼 컴포넌트 기본값 (2025-10-28) -->

**Principle**: Always specify default values for input components (Select, Checkbox, Radio)
<!-- 원칙: 입력 컴포넌트(Select, Checkbox, Radio)에 항상 기본값 지정 -->

**Why**: Better UX, reduced errors, prevents empty states
<!-- 이유: 더 나은 UX, 오류 감소, 빈 상태 방지 -->

**3-Point Consistency**:
<!-- 3지점 일관성: -->

```typescript
// 1. Initial State
const [value, setValue] = useState('default');

// 2. Form Reset
const resetForm = () => setValue('default');

// 3. Edit Mode
const editItem = (item) => {
  setValue(item.value !== 'none' ? item.value : 'default');
};
```

**Checklist**:
- [ ] Set default in initial state
- [ ] Restore default in form reset
- [ ] Apply default when editing items with no value
- [ ] Select never shows empty/blank

---

## Implementation Patterns
<!-- 구현 패턴 -->

### Implementation vs Integration (2025-10-28)
<!-- 구현 vs 통합 (2025-10-28) -->

**Problem**: Utility function exists and tests pass, but feature doesn't work in production
<!-- 문제: 유틸 함수가 존재하고 테스트는 통과하지만 프로덕션에서 기능이 작동하지 않음 -->

**Anti-Pattern**:
```
✅ Utility function implemented
✅ Unit tests passing
❌ Never integrated with UI  ← Missing!
❌ Feature doesn't work
```

**Complete Implementation Checklist**:
1. [ ] Utility Function - Core logic
2. [ ] Unit Tests - Isolated testing
3. [ ] **Integration** ← - Connect to UI/Hook
   - Import in relevant files
   - Call from UI/Hook
   - Pass parameters correctly
   - Use return value
4. [ ] Integration Tests - End-to-end
5. [ ] Manual Testing - Browser verification

**Rule**: Tests Passing ≠ Feature Complete
<!-- 규칙: 테스트 통과 ≠ 기능 완성 -->

---

## Date/Time Patterns
<!-- 날짜/시간 패턴 -->

### Recurring Event Date Handling (2025-10-28)
<!-- 반복 일정 날짜 처리 (2025-10-28) -->

**User Requirements**:
- 31st day monthly: Only show on months with 31 days (skip Feb, Apr, Jun, Sep, Nov)
- Feb 29 yearly: Only show on leap years

**Calculation Strategy**: Iteration-Based (not Incremental)
<!-- 계산 전략: 반복 횟수 기반 (증분적이 아님) -->

```typescript
// ❌ BAD: Incremental (errors accumulate)
let currentDate = new Date(startDate);
for (let i = 0; i < count; i++) {
  currentDate = addMonths(currentDate, interval);  // Errors accumulate!
}

// ✅ GOOD: Iteration-based (independent calculations)
for (let i = 0; i < count; i++) {
  const currentDate = getMonthlyOccurrence(startDate, i, interval);
  // No error accumulation!
}
```

**Overflow Philosophy**: Allow Overflow → Then Filter
<!-- 오버플로 철학: 오버플로 허용 → 그 후 필터링 -->

```typescript
export function generateRecurringEvents(event: Event): Event[] {
  const originalDay = startDate.getDate();
  
  for (let i = 0; i < maxIterations; i++) {
    const date = calculateDate(startDate, i, interval);
    
    // ← Filter by day match
    const shouldAdd = date.getDate() === originalDay;
    
    if (shouldAdd) {
      events.push({ ...event, date: formatDate(date) });
    }
  }
}
```

**Key Principles**:
- Calculate from stable base (start date), not previous result
- Allow overflow naturally, filter at higher level
- Add safety margin for loop iterations (maxIterations = maxOccurrences * 12)

---

## Metadata Management Pattern (2025-10-28)
<!-- 메타데이터 관리 패턴 (2025-10-28) -->

**Context**: Recurring events expand 1→N for display, but user edits must update the original DB record
<!-- 컨텍스트: 반복 일정은 표시를 위해 1→N으로 확장되지만 사용자 편집은 원본 DB 레코드를 업데이트해야 함 -->

### The 3-Layer Metadata Chain
<!-- 3 레이어 메타데이터 체인 -->

```
Layer 1: Utils (Expansion)
  → Inject metadata
Layer 2: UI (Preservation)
  → Preserve metadata
Layer 3: Hooks (Utilization)
  → Use metadata for API calls
```

**Break any link → System fails!**
<!-- 어떤 링크라도 끊어지면 시스템 실패! -->

---

### Layer 1: Metadata Injection (Utils)
<!-- 레이어 1: 메타데이터 주입 (Utils) -->

**Type Definition**:
```typescript
export interface RepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
  
  // ← Metadata for tracking origin
  originalEventId?: string;  // Persistent DB ID
  originalDate?: string;      // Base date for calculation
}
```

**Implementation**:
```typescript
export function generateRecurringEvents(event: Event): Event[] {
  return expandedDates.map(date => ({
    ...event,
    id: generateVirtualId(),           // Virtual ID for display
    date: expandedDateString,          // Expanded date
    repeat: {
      ...event.repeat,
      originalEventId: event.id,       // ← Link to DB
      originalDate: event.date          // ← Calculation base
    }
  }));
}
```

---

### Layer 2: Metadata Preservation (UI)
<!-- 레이어 2: 메타데이터 보존 (UI) -->

**Anti-Pattern**: Direct form-to-object mapping
<!-- 안티패턴: 폼에서 객체로 직접 매핑 -->

```typescript
// ❌ BAD: Loses all metadata
const eventData = {
  id: editingEvent?.id,           // Virtual ID!
  title: formTitle,
  repeat: {                        // Brand new object, no metadata!
    type: formType,
    interval: formInterval
  }
};
```

**Correct Pattern**: Conditional preservation
<!-- 올바른 패턴: 조건부 보존 -->

```typescript
// ✅ GOOD: Preserves metadata
const eventData = editingEvent
  ? {
      ...editingEvent,           // Preserve all metadata
      title: formTitle,          // Override with form
      repeat: {
        ...editingEvent.repeat,  // ← Preserve repeat metadata
        type: formType,
        interval: formInterval
      }
    }
  : {
      // New event: no metadata needed
      title: formTitle,
      repeat: { type: formType, interval: formInterval }
    };
```

**Critical Points**:
- Spread original object BEFORE form data
- Spread nested objects (especially `repeat`)
- Apply to ALL save handlers (normal save, overlap dialog, etc.)

---

### Layer 3: Metadata Utilization (Hooks)
<!-- 레이어 3: 메타데이터 사용 (Hooks) -->

**Nested Object Handling**:
```typescript
// ❌ BAD: Nested object override via spread
const { id, ...eventData } = event;
const updateData = {
  ...eventData,      // Contains repeat with metadata
  repeat: {          // Override attempt
    type: newType,
    interval: newInterval
  }
};
// Problem: Relying on override is risky

// ✅ GOOD: Explicit removal
const { id, repeat, ...eventData } = event;
const updateData = {
  ...eventData,      // Does NOT contain repeat
  repeat: {          // Clean new object
    type: newType,
    interval: newInterval
    // No metadata sent to server
  }
};
```

**ID Usage**:
```typescript
const saveEvent = async (event: Event) => {
  // ← Use persistent ID from metadata
  const updateId = event.repeat?.originalEventId || event.id;
  
  // ← Use original base date (not expanded date)
  const updateDate = event.repeat?.originalDate || event.date;
  
  await fetch(`/api/events/${updateId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...cleanEventData,
      date: updateDate  // Base date preserved
    })
  });
};
```

---

### Virtual vs Persistent IDs
<!-- Virtual vs Persistent ID -->

| Aspect | Virtual ID | Persistent ID |
|--------|------------|---------------|
| **Generated** | Client-side | Server/Database |
| **Lifespan** | Single render | Permanent |
| **Purpose** | Display differentiation | CRUD operations |
| **Example** | `temp-1`, `uuid-...` | `event-123` |
| **Can change** | Yes | No |

**Usage Rule**:
- **Display**: Use Virtual ID (React keys, UI differentiation)
- **Update/Delete**: Use Persistent ID (server operations)

---

### Metadata Pattern Summary
<!-- 메타데이터 패턴 요약 -->

**Complete Checklist**:

**For Utils (노동자)**:
- [ ] Inject `originalEventId` and `originalDate` during expansion
- [ ] Generate virtual IDs for display differentiation

**For UI (노동자)**:
- [ ] Spread original event when editing
- [ ] Spread nested objects (especially `repeat`)
- [ ] Apply pattern to ALL save handlers

**For Hooks (노동자)**:
- [ ] Extract persistent ID from metadata
- [ ] Extract base values (originalDate, etc.)
- [ ] Explicitly remove nested objects before creating clean data
- [ ] Never send metadata to server

**For Manager (관리자)**:
- [ ] Verify metadata preserved across all layers
- [ ] Check virtual IDs not used in API calls
- [ ] Ensure base values used for updates
- [ ] Test edit scenarios thoroughly

---

### Test Pattern
<!-- 테스트 패턴 -->

```typescript
it('반복 일정 편집 시 원본 이벤트 ID로 업데이트한다', async () => {
  // 1. Create original
  const created = await createEvent({
    date: '2025-01-31',
    repeat: { type: 'monthly' }
  });
  
  // 2. Fetch (triggers expansion)
  const events = await fetchEvents();
  const marchEvent = events.find(e => e.date === '2025-03-31');
  
  // 3. Verify metadata exists
  expect(marchEvent.repeat.originalEventId).toBe(created.id);
  expect(marchEvent.repeat.originalDate).toBe('2025-01-31');
  
  // 4. Edit expanded event
  await updateEvent({
    ...marchEvent,
    title: 'Updated'
  });
  
  // 5. Verify: original record updated with base date
  const updated = await getEvent(created.id);
  expect(updated.date).toBe('2025-01-31');  // Base preserved
  expect(updated.title).toBe('Updated');
});
```

---

## Common Bug Patterns
<!-- 일반적인 버그 패턴 -->

### Pattern 1: Metadata Loss in UI Layer
**Symptom**: 404 Error when updating recurring events
**Cause**: UI creates brand new object without preserving metadata
**Fix**: Spread original event + nested objects before form data

### Pattern 2: Virtual ID in API Calls
**Symptom**: Server can't find record (virtual ID sent instead of persistent ID)
**Cause**: Not extracting `originalEventId` from metadata
**Fix**: `const id = event.repeat?.originalEventId || event.id`

### Pattern 3: Nested Object Metadata Leakage
**Symptom**: Internal metadata sent to server, causing errors
**Cause**: Relying on spread override for nested objects
**Fix**: Explicitly remove nested object before spreading

### Pattern 4: Implementation Without Integration
**Symptom**: Tests pass but feature doesn't work
**Cause**: Utility function never called from UI
**Fix**: Complete integration checklist (import → call → use return value)

### Pattern 5: Date Calculation Errors
**Symptom**: Recurring dates drift over time
**Cause**: Incremental calculation accumulates errors
**Fix**: Use iteration-based calculation from stable base

---

## Storage Workflow
<!-- 저장 워크플로 -->

### When Receiving Data from King
<!-- 건물주로부터 데이터 수신 시 -->
1. **Categorize** - Organize by agent type and context
<!-- 분류 - 에이전트 유형과 맥락별로 정리 -->
2. **Extract Insights** - Identify patterns and lessons
<!-- 인사이트 추출 - 패턴과 교훈 식별 -->
3. **Store** - Save in appropriate category
<!-- 저장 - 적절한 범주에 저장 -->
4. **Index** - Make searchable for quick retrieval
<!-- 인덱싱 - 빠른 검색을 위해 인덱싱 -->

## Memory Access Points
<!-- 메모리 접근 지점 -->

### For Planner (계획자)
Provides: Historical project data, past approaches, successful patterns, failure analysis
<!-- 제공: 과거 프로젝트 데이터, 과거 접근, 성공 패턴, 실패 분석 -->

### For Worker (노동자)
Provides: Past code patterns, solutions, TDD patterns, refactoring techniques
<!-- 제공: 과거 코드 패턴, 해결책, TDD 패턴, 리팩토링 기법 -->

### For Manager (관리자)
Provides: Historical quality patterns, common issues, past review feedback
<!-- 제공: 과거 품질 패턴, 일반적인 문제, 과거 검토 피드백 -->

### For King (건물주)
Provides: Comprehensive overview of all past commands, decisions, and outcomes
<!-- 제공: 과거 모든 명령, 결정, 결과에 대한 포괄적인 개요 -->

---

## Review Patterns
<!-- 리뷰 패턴 -->

This section stores lessons learned from formal code reviews. Memory automatically extracts and categorizes insights to help all agents improve.
<!-- 이 섹션은 공식 코드 리뷰에서 학습한 교훈을 저장합니다. Memory는 자동으로 인사이트를 추출하고 분류하여 모든 에이전트가 개선할 수 있도록 돕습니다. -->

### Diagnostic Pattern: Root Cause Misdiagnosis (2025-10-29)
<!-- 진단 패턴: 근본 원인 오진 (2025-10-29) -->

**Source**: `review/2025-10-29_integration-test-recurring-event-issue-v2.md`
<!-- 출처: -->

**Problem**: Integration tests failing with "Found multiple elements with text"
<!-- 문제: "Found multiple elements with text"로 통합 테스트 실패 -->

**Initial Diagnosis (WRONG)**: Tests don't specify `repeat` field → backend defaults to recurring → events expand
<!-- 초기 진단 (틀림): 테스트가 `repeat` 필드를 지정하지 않음 → 백엔드가 반복으로 기본 설정 → 이벤트 확장 -->

**Root Cause (CORRECT)**: System behavior is to expand recurring events. Tests should accept this reality, not fight it.
<!-- 근본 원인 (올바름): 시스템 동작은 반복 일정을 확장하는 것. 테스트는 이 현실을 수용해야 하며, 맞서 싸우지 말아야 함 -->

**Solution**: Change test query from `getByText` to `getAllByText()[0]` (3 lines changed)
<!-- 해결책: 테스트 쿼리를 `getByText`에서 `getAllByText()[0]`로 변경 (3줄 변경) -->

**Anti-Pattern**: First solution tried to modify test data to force non-recurring behavior (7+ lines, fragile, high complexity)
<!-- 안티패턴: 첫 번째 해결책은 반복 않는 동작을 강제하려고 테스트 데이터를 수정하려 함 (7줄 이상, 취약, 높은 복잡성) -->

**Lessons**:
<!-- 교훈: -->
1. **Accept system behavior, don't fight it**: If events expand, handle it in tests
   <!-- 시스템 동작 수용, 맞서 싸우지 말 것: 이벤트가 확장되면 테스트에서 처리 -->
2. **Choose simple solutions**: One line > seven lines
   <!-- 간단한 해결책 선택: 한 줄 > 일곱 줄 -->
3. **Loose coupling**: Tests shouldn't depend on form state internals
   <!-- 느슨한 결합: 테스트가 폼 상태 내부에 의존하지 않아야 함 -->
4. **Verify assumptions**: Don't assume backend behavior without checking
   <!-- 가정 검증: 확인 없이 백엔드 동작 가정하지 말 것 -->

**Applies To**: Manager (diagnostic process), Worker (test implementation), Planner (solution design)
<!-- 적용 대상: Manager(진단 프로세스), Worker(테스트 구현), Planner(해결책 설계) -->

**Diagnostic Checklist for Manager**:
<!-- Manager를 위한 진단 체크리스트: -->
- [ ] Don't assume root cause without verification
<!-- 검증 없이 근본 원인 가정하지 말 것 -->
- [ ] Consider: Is this fighting system behavior?
<!-- 고려: 시스템 동작과 맞서고 있는가? -->
- [ ] Prefer simple solutions over complex ones
<!-- 복잡한 것보다 간단한 해결책 선호 -->
- [ ] Check if "fixing" behavior makes sense or accepting it is better
<!-- 동작을 "고치는" 것이 합리적인지 아니면 수용하는 것이 더 나은지 확인 -->

---

### Testing Pattern: Query Method Selection (2025-10-29)
<!-- 테스트 패턴: 쿼리 메서드 선택 (2025-10-29) -->

**Source**: `review/2025-10-29_integration-test-recurring-event-issue-v2.md`
<!-- 출처: -->

**Problem**: `getByText` throws error when multiple elements match
<!-- 문제: 여러 요소가 일치할 때 `getByText`가 오류 발생 -->

**Root Cause**: Using wrong query method for scenario with multiple matching elements
<!-- 근본 원인: 여러 일치 요소가 있는 시나리오에서 잘못된 쿼리 메서드 사용 -->

**Solution**: Use `getAllByText()[0]` when multiple instances expected
<!-- 해결책: 여러 인스턴스가 예상될 때 `getAllByText()[0]` 사용 -->

**Guidelines**:
<!-- 가이드라인: -->

**Use `getByText`** when:
<!-- `getByText` 사용 시점: -->
- Element guaranteed to be unique
- Testing specific instance matters
- Want test to fail if multiple exist

**Use `getAllByText()[0]`** when:
<!-- `getAllByText()[0]` 사용 시점: -->
- Multiple instances expected (lists, recurring items)
- Only need to verify existence
- Don't care about specific instance

**Applies To**: Worker (test writing), Planner (test strategy)
<!-- 적용 대상: Worker(테스트 작성), Planner(테스트 전략) -->

---

### Implementation Pattern: XOR Logic for Business Rules (2025-10-29)
<!-- 구현 패턴: 비즈니스 규칙을 위한 XOR 로직 (2025-10-29) -->

**Source**: `review/2025-10-29_overlap-dialog-bug-fix.md`
<!-- 출처: -->

**Problem**: Need to detect when one event is recurring and other is normal (but not both)
<!-- 문제: 한 이벤트가 반복이고 다른 것이 일반일 때 감지 필요 (둘 다는 아님) -->

**Solution**: Use XOR logic with `!==` operator
<!-- 해결책: `!==` 연산자로 XOR 로직 사용 -->

```typescript
// ✅ Clean XOR implementation
const newIsRecurring = newEvent.repeat.type !== 'none';
const overlapIsRecurring = event.repeat.type !== 'none';
return newIsRecurring !== overlapIsRecurring;  // XOR: true only if one is true
```

**Anti-Pattern**: Complex conditional chains
<!-- 안티패턴: 복잡한 조건부 체인 -->

```typescript
// ❌ Complex and error-prone
if ((newIsRecurring && !overlapIsRecurring) || 
    (!newIsRecurring && overlapIsRecurring)) {
  return true;
}
```

**Lesson**: XOR can be elegantly expressed with `!==` operator
<!-- 교훈: XOR은 `!==` 연산자로 우아하게 표현 가능 -->

**Applies To**: Worker (implementation), Planner (logic design)
<!-- 적용 대상: Worker(구현), Planner(로직 설계) -->

---

### Code Quality Pattern: Pure Functions for Business Logic (2025-10-29)
<!-- 코드 품질 패턴: 비즈니스 로직을 위한 순수 함수 (2025-10-29) -->

**Source**: `review/2025-10-29_overlap-dialog-bug-fix.md`
<!-- 출처: -->

**Problem**: Business logic needs to be testable and reusable
<!-- 문제: 비즈니스 로직은 테스트 가능하고 재사용 가능해야 함 -->

**Solution**: Extract to pure function in utils
<!-- 해결책: utils의 순수 함수로 추출 -->

```typescript
// ✅ Pure function: Easy to test, no side effects
export function hasRecurringNormalConflict(
  newEvent: Event | EventForm,
  overlappingEvents: Event[]
): boolean {
  // No side effects, deterministic
  const newIsRecurring = newEvent.repeat.type !== 'none';
  return overlappingEvents.some((event) => {
    const overlapIsRecurring = event.repeat.type !== 'none';
    return newIsRecurring !== overlapIsRecurring;
  });
}
```

**Benefits**:
<!-- 이점: -->
- **Testability**: Can test in isolation without UI
  <!-- 테스트 가능성: UI 없이 독립적으로 테스트 가능 -->
- **Reusability**: Can use in multiple places
  <!-- 재사용성: 여러 곳에서 사용 가능 -->
- **Maintainability**: Logic centralized in one place
  <!-- 유지보수성: 로직이 한 곳에 집중화 -->
- **Type Safety**: Can use union types (`Event | EventForm`)
  <!-- 타입 안전성: 유니온 타입 사용 가능 -->

**Applies To**: Worker (implementation), Planner (architecture)
<!-- 적용 대상: Worker(구현), Planner(아키텍처) -->

---

### Test Coverage Pattern: Edge Cases First (2025-10-29)
<!-- 테스트 커버리지 패턴: 엣지 케이스 우선 (2025-10-29) -->

**Source**: `review/2025-10-29_overlap-dialog-bug-fix.md`
<!-- 출처: -->

**Problem**: Need comprehensive test coverage for business logic
<!-- 문제: 비즈니스 로직에 대한 포괄적인 테스트 커버리지 필요 -->

**Solution**: Test edge cases explicitly (7 test cases for XOR logic)
<!-- 해결책: 엣지 케이스를 명시적으로 테스트 (XOR 로직에 대한 7개 테스트 케이스) -->

**Test Categories**:
<!-- 테스트 범주: -->
1. **Base Cases**: Normal scenarios (2 tests)
   - Normal + Normal → false
   - Recurring + Recurring → false
2. **XOR Cases**: The actual logic (2 tests)
   - Recurring + Normal → true
   - Normal + Recurring → true
3. **Edge Cases**: Boundary conditions (3 tests)
   - Multiple overlaps with at least one XOR → true
   - No overlaps → false
   - Empty state handling

**Coverage Checklist**:
<!-- 커버리지 체크리스트: -->
- [ ] Happy path
- [ ] Negative cases (should return false)
- [ ] Positive cases (should return true)
- [ ] Multiple items
- [ ] Empty/null cases
- [ ] Boundary conditions

**Applies To**: Worker (test writing), Manager (review checklist)
<!-- 적용 대상: Worker(테스트 작성), Manager(리뷰 체크리스트) -->

---

### Integration Pattern: Complete Implementation Checklist (2025-10-29)
<!-- 통합 패턴: 완전한 구현 체크리스트 (2025-10-29) -->

**Source**: From memoryHome.md patterns
<!-- 출처: memoryHome.md 패턴에서 -->

**Problem**: Tests pass but feature doesn't work in production
<!-- 문제: 테스트는 통과하지만 프로덕션에서 기능이 작동하지 않음 -->

**Root Cause**: Implemented utility function but never integrated with UI/Hook
<!-- 근본 원인: 유틸 함수를 구현했지만 UI/Hook과 통합하지 않음 -->

**Complete Checklist**:
<!-- 완전한 체크리스트: -->
1. [ ] Utility Function - Core logic implementation
2. [ ] Unit Tests - Isolated testing
3. [ ] **Integration** ← - Connect to UI/Hook (CRITICAL)
   - Import in relevant files
   - Call from UI/Hook
   - Pass parameters correctly
   - Use return value
4. [ ] Integration Tests - End-to-end verification
5. [ ] Manual Testing - Browser verification

**Anti-Pattern**: Assuming "tests pass" means "feature complete"
<!-- 안티패턴: "테스트 통과"가 "기능 완성"을 의미한다고 가정 -->

**Rule**: Tests Passing ≠ Feature Complete
<!-- 규칙: 테스트 통과 ≠ 기능 완성 -->

**Applies To**: Worker (implementation), Manager (review), Planner (task breakdown)
<!-- 적용 대상: Worker(구현), Manager(리뷰), Planner(작업 분해) -->

---

## Diagnostic Checklist for All Agents
<!-- 모든 에이전트를 위한 진단 체크리스트 -->

### What to Avoid (Common Mistakes)
<!-- 피해야 할 것 (일반적인 실수) -->

**For Manager**:
- ❌ Assuming root cause without verification
<!-- 검증 없이 근본 원인 가정 -->
- ❌ Fighting system behavior instead of accepting it
<!-- 시스템 동작을 수용하는 대신 맞서기 -->
- ❌ Choosing complex solutions when simple ones exist
<!-- 간단한 해결책이 있을 때 복잡한 해결책 선택 -->

**For Worker**:
- ❌ Using wrong query methods in tests
<!-- 테스트에서 잘못된 쿼리 메서드 사용 -->
- ❌ Implementing functions without integration
<!-- 통합 없이 함수만 구현 -->
- ❌ Writing complex conditionals for XOR logic
<!-- XOR 로직을 복잡한 조건문 작성 -->

**For Planner**:
- ❌ Creating fragile test plans that depend on internals
<!-- 내부에 의존하는 취약한 테스트 계획 생성 -->
- ❌ Skipping edge case planning
<!-- 엣지 케이스 계획 생략 -->
- ❌ Not verifying integration step in plans
<!-- 계획에서 통합 단계 검증 안 함 -->

### What to Try (Effective Techniques)
<!-- 시도해야 할 것 (효과적인 기법) -->

**For Manager**:
- ✅ Verify system behavior before diagnosing
<!-- 진단 전 시스템 동작 검증 -->
- ✅ Consider: "Accept vs Fight" system behavior
<!-- 고려: 시스템 동작 "수용 vs 맞섬" -->
- ✅ Prefer simple, robust solutions
<!-- 간단하고 견고한 해결책 선호 -->

**For Worker**:
- ✅ Use `getAllByText()[0]` for repeated elements
<!-- 반복 요소에 `getAllByText()[0]` 사용 -->
- ✅ Extract business logic to pure functions
<!-- 비즈니스 로직을 순수 함수로 추출 -->
- ✅ Use `!==` for elegant XOR implementation
<!-- 우아한 XOR 구현에 `!==` 사용 -->
- ✅ Always complete integration step
<!-- 항상 통합 단계 완료 -->

**For Planner**:
- ✅ Include integration step in all plans
<!-- 모든 계획에 통합 단계 포함 -->
- ✅ Plan edge case tests explicitly
<!-- 엣지 케이스 테스트를 명시적으로 계획 -->
- ✅ Design for loose coupling
<!-- 느슨한 결합을 위한 설계 -->

---

**Memory Version**: 2.1 (Review Learning Added 2024-10-29)
<!-- 메모리 버전: 2.1 (리뷰 학습 추가 2024-10-29) -->
