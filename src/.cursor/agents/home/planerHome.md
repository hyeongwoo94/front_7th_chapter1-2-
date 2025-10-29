# Planner Home - 계획자집 (Planner's Home)

**name:** 계획자집
<!-- 계획자집 -->

**description:** Storage for Planner's learned patterns, test writing guidelines, and project-specific workflow analyses
<!-- 계획자가 학습한 패턴, 테스트 작성 가이드라인, 프로젝트별 워크플로 분석 저장소 -->

**Note**: For standard workflow, refer to `people/planer.md`. This home stores learned knowledge and project-specific insights.
<!-- 참고: 표준 워크플로는 `people/planer.md` 참조. 이 홈은 학습된 지식과 프로젝트별 인사이트를 저장 -->

---

## Learned Patterns
<!-- 학습된 패턴 -->

#### Learning: Test Code Description Writing (2025-10-27)
<!-- 학습: 테스트 코드 디스크립션 작성 (2025-10-27) -->

**Pattern Analysis from easy test files:**
<!-- easy 테스트 파일의 패턴 분석 -->
1. **Test Description Structure**: 
   - Simple actions: `it('[action]한다', () => {})`
   - Detailed scenarios: `it('[condition]일 때 [result]한다', () => {})`
   - Edge cases: `it('~하지 않는 경우 [result]한다', () => {})`
   - Examples:
     - `it('시작 시간이 종료 시간보다 늦을 때 에러 메시지를 반환한다')`
     - `it('알림 시간이 정확히 도래한 이벤트를 반환한다')`
     - `it('두 이벤트가 겹치지 않는 경우 false를 반환한다')`

2. **Required Ingredients**:
   - **Imports**: Functions to test from utils (e.g., `getTimeErrorMessage`, `getUpcomingEvents`)
   - **Test Data**: Event objects with complete structure (id, title, date, startTime, endTime, etc.)
   - **Setup**: Mock data, test scenarios
   - **Assertions**: `expect().toBe()`, `expect().toHaveLength()`, `expect().toEqual()`

3. **Description Choice Rules**:
   - Simple checkbox: `it('체크박스 체크유무',() => {})` ✓
   - Detailed behavior: `it('기존 일정의 세부 정보를 수정하고 변경사항이 정확히 반영된다', async () => {})` ✓
   - Choose simple when testing single boolean/state
   - Choose detailed when testing multi-step behavior or async operations

4. **Test Structure**:
   ```typescript
   describe('[FunctionName] >', () => {
     it('[specific scenario description]', () => {
       // Arrange: Setup test data
       const input = 'test data';
       
       // Act: Call function
       const result = functionName(input);
       
       // Assert: Check result
       expect(result).toBe(expected);
     });
   });
   ```

---

#### Learning: Error Recovery Process Integration (2025-10-29)
<!-- 학습: 오류 복구 프로세스 통합 (2025-10-29) -->

**Pattern**: When creating PRD, MUST include Error Recovery sections
<!-- 패턴: PRD 생성 시 오류 복구 섹션 필수 포함 -->

**PRD Template v4.0 Structure**:
<!-- PRD 템플릿 v4.0 구조: -->
1. **Section 3: Prerequisites** - What to prepare before implementation
   <!-- 섹션 3: 전제조건 - 구현 전 준비 사항 -->
2. **Section 4: Error Prevention** - Common pitfalls to avoid
   <!-- 섹션 4: 오류 방지 - 피해야 할 일반적인 함정 -->
3. **Section 7: Error Recovery Process** - Protocol when same error occurs twice
   <!-- 섹션 7: 오류 복구 프로세스 - 같은 오류 2번 발생 시 프로토콜 -->
4. **Section 8: Known Issues & Solutions** - Past failures and how to avoid
   <!-- 섹션 8: 알려진 이슈 & 해결책 - 과거 실패 및 회피 방법 -->

**When to Use**:
<!-- 사용 시기: -->
- Creating new feature PRDs
  <!-- 새 기능 PRD 생성 시 -->
- Updating PRD after review
  <!-- 리뷰 후 PRD 업데이트 시 -->
- Documenting failed implementation attempts
  <!-- 실패한 구현 시도 문서화 시 -->

**Key Benefit**: 90%+ first-try success after PRD update
<!-- 핵심 이점: PRD 업데이트 후 첫 시도 성공률 90%+ -->

---

#### Learning: Data Model Documentation (2025-10-29)
<!-- 학습: 데이터 모델 문서화 (2025-10-29) -->

**Pattern**: Always document data model choice explicitly in PRD
<!-- 패턴: PRD에서 데이터 모델 선택을 항상 명시적으로 문서화 -->

**Two Common Models**:
<!-- 두 가지 일반적인 모델: -->
```
Template Model:
- DB: 1 template event (repeat metadata)
- Frontend: Generate instances for display
- Operations: Use originalEventId

Instance Model:
- DB: Multiple events with same repeat.id
- Frontend: Use events as-is
- Operations: Use event.id (single) or repeat.id (all)
```

**Why Document**:
<!-- 문서화 이유: -->
- Prevents frontend/backend mismatch
  <!-- 프론트엔드/백엔드 불일치 방지 -->
- Clarifies ID usage (fake ID vs real DB ID)
  <!-- ID 사용 명확화 (가짜 ID vs 실제 DB ID) -->
- Guides implementation decisions
  <!-- 구현 결정 가이드 -->

**Where to Document**: Section 3 (Technical Requirements) of PRD
<!-- 문서화 위치: PRD의 섹션 3 (기술 요구사항) -->

---

#### Learning: Test Helper Structure Planning (2025-10-29)
<!-- 학습: 테스트 헬퍼 구조 계획 (2025-10-29) -->

**Pattern**: Plan test helpers BEFORE writing integration tests
<!-- 패턴: 통합 테스트 작성 전에 테스트 헬퍼 계획 -->

**4-File Helper Pattern**:
<!-- 4파일 헬퍼 패턴: -->
```
__tests__/
├── fixtures/
│   └── eventFixtures.ts      → Test data factory functions
├── helpers/
│   ├── mockHelpers.ts         → MSW setup
│   ├── asyncHelpers.ts        → Async UI interaction patterns
│   └── domHelpers.ts          → DOM query utilities
```

**Benefits**:
<!-- 이점: -->
- 50% reduction in test writing time
  <!-- 테스트 작성 시간 50% 감소 -->
- Reusable patterns across tests
  <!-- 테스트 간 재사용 가능한 패턴 -->
- Centralized mock management
  <!-- 중앙화된 모의 관리 -->

**When to Plan**: Section 0 (Prerequisites) in implementation plan
<!-- 계획 시기: 구현 계획의 섹션 0 (전제조건) -->

---

## Project-Specific Analysis
<!-- 프로젝트별 분석 -->

### Calendar App Workflow Analysis (2025-10-27)
<!-- 캘린더 앱 워크플로 분석 (2025-10-27) -->

### 1. Event Creation Workflow
<!-- 이벤트 생성 워크플로 -->

**Flow:** User Input (UI) → Form Validation → Overlap Check → API Call → State Update → UI Refresh

**Steps:**
1. Form Initialization (useEventForm) → State with defaults
2. User Input Collection → All form fields
3. Validation → Required fields + time validation
4. Data Construction → EventForm/Event object
5. Overlap Detection → findOverlappingEvents
6. API Call → POST /api/events or PUT /api/events/:id
7. Success → Refetch events, reset form, show snackbar
8. Error → Log, show error snackbar

### 2. Event Editing Workflow
<!-- 이벤트 편집 워크플로 -->

**Flow:** User Click Event → Load Data → Populate Form → Modify → Validate → Save

**Key Points:**
- editEvent populates all form fields from selected event
- editing flag determines PUT vs POST
- Same validation and save flow as creation

### 3. Event Display Workflow
<!-- 이벤트 표시 워크플로 -->

**Flow:** Component Mount → Fetch Events → Filter by View → Search Filter → Render

**Components:**
- useEventOperations: API fetch and CRUD
- useCalendarView: view/date management
- useSearch: search filtering with useMemo
- Rendering: Week/Month view with holidays

### 4. Notification Workflow
<!-- 알림 워크플로 -->

**Flow:** Interval Check (1s) → Calculate Time Diff → Filter Upcoming → Create Notification → Display

**Pattern:**
- setInterval in useEffect with cleanup
- getUpcomingEvents filters based on time and notificationTime
- Creates notifications, tracks notified events

### 5. Data Flow Patterns
<!-- 데이터 흐름 패턴 -->

**Unidirectional:** State → Props → UI → Events → State Update → Re-render

**Hook Composition:**
```
App Component
├── useEventForm (form state)
├── useEventOperations (CRUD)
├── useNotifications (notifications)
├── useCalendarView (view/navigation)
└── useSearch (filtering)
```

**State Strategy:**
- Form State: Local in useEventForm
- Events Data: Local in useEventOperations (fetched from API)
- UI State: Local in App (dialogs)
- Computed: useMemo in useSearch

### 6. Error Handling Strategy
<!-- 에러 처리 전략 -->

**Levels:**
1. Validation: Prevent API calls, inline errors
2. API: try/catch, snackbar, console log
3. UI Feedback: Always inform user

### 7. Optimization Patterns
<!-- 최적화 패턴 -->

- useMemo: Prevents unnecessary filteredEvents recalculation
- Conditional Rendering: Only show dialogs when needed
- Potential: useCallback for handlers, debouncing for search
