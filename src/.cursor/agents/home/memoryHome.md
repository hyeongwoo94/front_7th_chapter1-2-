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

## TypeScript Patterns
<!-- TypeScript 패턴 -->

### Optional Chaining Consistency (2025-10-28)
<!-- Optional Chaining 일관성 (2025-10-28) -->

**Problem**: Inconsistent optional chaining in conditional expressions
<!-- 문제: 조건부 표현식에서 일관되지 않은 optional chaining -->

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
<!-- 문제: 유틸 함수가 존재하고 테스트는 통과하지만, 프로덕션에서 기능이 작동하지 않음 -->

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
3. [ ] **Integration** ⭐ - Connect to UI/Hook
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
<!-- 계산 전략: 반복 횟수 기반 (점진적이 아님) -->

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
<!-- 오버플로우 철학: 오버플로우 허용 → 그 후 필터링 -->

```typescript
export function generateRecurringEvents(event: Event): Event[] {
  const originalDay = startDate.getDate();
  
  for (let i = 0; i < maxIterations; i++) {
    const date = calculateDate(startDate, i, interval);
    
    // ⭐ Filter by day match
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
<!-- 컨텍스트: 반복 일정이 표시를 위해 1→N으로 확장되지만, 사용자 수정은 원본 DB 레코드를 업데이트해야 함 -->

### The 3-Layer Metadata Chain
<!-- 3레이어 메타데이터 체인 -->

```
Layer 1: Utils (Expansion)
  ↓ Inject metadata
Layer 2: UI (Preservation)
  ↓ Preserve metadata
Layer 3: Hooks (Utilization)
  ↓ Use metadata for API calls
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
  
  // ⭐ Metadata for tracking origin
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
      originalEventId: event.id,       // ⭐ Link to DB
      originalDate: event.date          // ⭐ Calculation base
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
        ...editingEvent.repeat,  // ⭐ Preserve repeat metadata
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
<!-- 레이어 3: 메타데이터 활용 (Hooks) -->

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
  // ⭐ Use persistent ID from metadata
  const updateId = event.repeat?.originalEventId || event.id;
  
  // ⭐ Use original base date (not expanded date)
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
it('반복 일정 수정 시 원본 이벤트 ID로 저장한다', async () => {
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
<!-- 인덱스 - 빠른 검색을 위해 인덱싱 -->

## Memory Access Points
<!-- 메모리 접근 포인트 -->

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

**Memory Version**: 2.0 (Refactored 2024-10-29)
<!-- 메모리 버전: 2.0 (2024-10-29 리팩토링) -->
