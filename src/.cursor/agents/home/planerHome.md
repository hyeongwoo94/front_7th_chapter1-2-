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
