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

