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

