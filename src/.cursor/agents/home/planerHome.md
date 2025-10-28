# Planner Home - 계획자집 (Planner's Home)

**name:** 계획자집
<!-- 계획자집 -->

**description:** Storage for Planner's learning, plans, and workflows
<!-- 계획자의 학습, 계획, 워크플로 저장소 -->

## Workflow Execution Steps
<!-- 워크플로 실행 단계 -->

### When Receiving Command from King
<!-- 건물주로부터 명령 수신 시 -->
1. **Consult Memory** - Check for existing plans, approaches, or lessons learned
<!-- 세월이 상담 - 기존 계획, 접근 방식 또는 학습된 교훈 확인 -->
2. **Analyze Requirements** - Break down into actionable components
<!-- 요구사항 분석 - 실행 가능한 구성 요소로 분해 -->
3. **Create Workflow** - Develop step-by-step plan incorporating Memory insights
<!-- 워크플로 작성 - 세월이의 인사이트를 반영한 단계별 계획 수립 -->
4. **Return to King** - Deliver detailed workflow plan
<!-- 건물주에게 반환 - 상세 워크플로 계획 전달 -->

## Stored Plans
<!-- 저장된 계획 -->

### Recent Learning Plans
<!-- 최근 학습 계획 -->

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

### Workflow Templates
<!-- 워크플로 템플릿 -->
- **Learning Workflow**: Query Memory → Plan → Delegate to Worker
<!-- 학습 워크플로: 세월이 조회 → 계획 → 노동자에게 위임 -->
- **Implementation Workflow**: Query Memory → Plan → Delegate to Worker
<!-- 구현 워크플로: 세월이 조회 → 계획 → 노동자에게 위임 -->
- **Review Workflow**: Query Memory → Plan → Delegate to Manager
<!-- 검토 워크플로: 세월이 조회 → 계획 → 관리자에게 위임 -->

---

## Application Workflow Analysis (2025-10-27)
<!-- 애플리케이션 워크플로 분석 (2025-10-27) -->

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

## Integration with Memory
<!-- 세월이와의 통합 -->
- Before creating any plan, ALWAYS check Memory for:
<!-- 모든 계획을 작성하기 전에 항상 세월이에서 다음을 확인 -->
  - Previous plans for similar topics
  - Successful approaches
  - Failed approaches to avoid
  - Lessons learned
<!-- - 유사한 주제에 대한 이전 계획 -->
<!-- - 성공적인 접근 -->
<!-- - 피해야 할 실패 접근 -->
<!-- - 학습된 교훈 -->

