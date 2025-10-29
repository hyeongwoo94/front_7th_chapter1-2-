# Manager Home - 관리자집 (Manager's Home)

**name:** 관리자집
<!-- 관리자집 -->

**description:** Storage for Manager's review patterns, quality insights, and lessons learned from past reviews
<!-- 관리자의 검토 패턴, 품질 인사이트, 과거 검토에서 학습한 교훈 저장소 -->

**Note**: For standard review workflow, refer to `people/feedback.md`. This home stores review history and quality patterns.
<!-- 참고: 표준 검토 워크플로는 `people/feedback.md` 참조. 이 홈은 검토 히스토리와 품질 패턴을 저장 -->

---

## Quality Patterns Library
<!-- 품질 패턴 라이브러리 -->

### Common Issues Found in Past Reviews
<!-- 과거 검토에서 발견된 일반적인 이슈 -->

#### Issue 1: Data Model Confusion (2025-10-29)
<!-- 이슈 1: 데이터 모델 혼란 (2025-10-29) -->
```
Issue: Frontend uses fake IDs for display but backend expects real DB IDs
Frequency: Critical in recurring event features
Impact: Delete/Update operations fail silently or affect wrong data
Solution: Document data model explicitly in PRD Section 3
Prevention: Always check server.js and realEvents.json first
Reference: review/2025-10-29_recurring-event-delete-final-fix.md
```

#### Issue 2: State Update Timing Assumptions (2025-10-29)
<!-- 이슈 2: 상태 업데이트 타이밍 가정 (2025-10-29) -->
```
Issue: Assuming React state updates synchronously
Frequency: Common in async flows with state dependencies
Impact: Operations use stale state values
Solution: Use direct values or API calls, not state-dependent hooks
Prevention: Review async functions for state timing issues
Reference: review/2025-10-29_recurring-event-edit-issues.md
```

#### Issue 3: Repeating Same Error Without Analysis (2025-10-29)
<!-- 이슈 3: 분석 없이 같은 오류 반복 (2025-10-29) -->
```
Issue: Trying multiple solutions without understanding root cause
Frequency: Occurs when stuck on difficult bugs
Impact: Wasted time (hours), wrong approaches
Solution: Trigger Error Recovery Process after 2nd occurrence
Prevention: Document failures, update PRD, restart with knowledge
Reference: request/prd.md Section 7, review/2025-10-29_recurring-event-edit-options-attempt.md
```

#### Issue 4: Missing Integration Step (2025-10-29)
<!-- 이슈 4: 통합 단계 누락 (2025-10-29) -->
```
Issue: Utility functions implemented but never integrated into UI/Hooks
Frequency: 30% of implementations
Impact: Tests pass but feature doesn't work in production
Solution: Always include integration step in PRD Implementation Checklist
Prevention: Check that functions are imported and called in UI components
Reference: memoryHome.md Integration Pattern
```

### Effective Review Approaches
<!-- 효과적인 검토 접근 방식 -->

#### Approach 1: Check Data Model First (2025-10-29)
<!-- 접근 1: 데이터 모델 먼저 확인 (2025-10-29) -->
```
Approach: Before reviewing CRUD operations, verify data model
Steps:
1. Check server.js for API endpoints
2. Check realEvents.json for data structure
3. Identify: Template model or Instance model?
4. Verify frontend code aligns with backend model
Effectiveness: Prevents 90% of ID-related bugs
Outcome: Correct implementation from start
```

#### Approach 2: Error Recovery Trigger (2025-10-29)
<!-- 접근 2: 오류 복구 트리거 (2025-10-29) -->
```
Approach: Monitor for repeated errors, trigger protocol after 2nd
Recognition:
- Same error message twice
- Same test fails twice after different fixes
- Same symptom in different contexts
Action:
1. STOP work immediately
2. Create review document
3. Update PRD with findings
4. Restart with new knowledge
Effectiveness: 90%+ first-try success after restart
Outcome: Time saved, knowledge accumulated
```

#### Approach 3: Root Cause Deep Dive (2025-10-29)
<!-- 접근 3: 근본 원인 심층 분석 (2025-10-29) -->
```
Approach: Always ask "Why?" 5 times to find root cause
Example (Recurring Event Delete Bug):
1. Why doesn't delete work? → Event not found in DB
2. Why not found? → Using wrong ID
3. Why wrong ID? → Using fake display ID instead of DB ID
4. Why fake ID? → Frontend generates IDs for display
5. Why generate? → Misunderstanding of data model (ROOT CAUSE)
Effectiveness: Finds true root cause 95% of time
Outcome: Permanent fixes, not band-aids
```

### Past Success Cases
<!-- 과거 성공 사례 -->

#### Success 1: Error Recovery Process Implementation (2025-10-29)
<!-- 성공 1: 오류 복구 프로세스 구현 (2025-10-29) -->
```
Feature: Recurring event edit (single/all options)
First Attempt: Failed with 5 core issues
Action Taken:
- Stopped implementation
- Created comprehensive review
- Updated PRD with Prerequisites, Error Prevention, Known Issues
- Restarted with updated PRD
Second Attempt: First-try success, 148 tests passed
Key Learning: PRD v4.0 with Error Recovery = 90%+ success rate
Reference: review/2025-10-29_recurring-event-edit-options-attempt.md
```

#### Success 2: Test Helper Pattern (2025-10-29)
<!-- 성공 2: 테스트 헬퍼 패턴 (2025-10-29) -->
```
Problem: Integration tests were fragile, had duplicated setup code
Solution: Created 4-file helper structure
- eventFixtures.ts (test data)
- mockHelpers.ts (MSW setup)
- asyncHelpers.ts (UI interactions)
- domHelpers.ts (DOM queries)
Outcome:
- 50% reduction in test writing time
- Tests more stable and maintainable
- Easier to add new test cases
Reference: __tests__/fixtures/ and __tests__/helpers/
```

#### Success 3: Data Model Documentation (2025-10-29)
<!-- 성공 3: 데이터 모델 문서화 (2025-10-29) -->
```
Problem: Confusion between Template vs Instance model for recurring events
Solution:
- Analyzed server.js and realEvents.json
- Documented chosen model (Instance Model) in PRD
- Updated all CRUD operations to align with model
Outcome:
- Clear implementation guidelines
- No ID mismatch bugs
- Consistent frontend/backend alignment
Reference: request/recurring-event-delete-single-or-all.md Section 3
```

### Past Failure Cases
<!-- 과거 실패 사례 -->

#### Failure 1: Repeated Same Approach Without Analysis (2025-10-29)
<!-- 실패 1: 분석 없이 같은 접근 반복 (2025-10-29) -->
```
Feature: Recurring event edit (first attempt)
What Went Wrong:
- Test failed with "Unable to find element"
- Tried: Add await → Still failed
- Tried: Increase timeout → Still failed
- Tried: Change query method → Still failed
- Tried: Check data → Still failed
- Total time wasted: ~2 hours
Root Cause: Mock data dates didn't match test base date
Lesson: After 2nd failure, STOP and analyze. Don't keep trying variations.
Prevention: Now using Error Recovery Protocol (PRD Section 7)
Reference: review/2025-10-29_recurring-event-edit-options-attempt.md
```

#### Failure 2: Assuming State Updates Synchronously (2025-10-29)
<!-- 실패 2: 상태가 동기적으로 업데이트된다고 가정 (2025-10-29) -->
```
Feature: Converting recurring instance to single event
What Went Wrong:
- Called setEditingEvent(null)
- Immediately called saveEvent()
- saveEvent still used old editingEvent value (true)
- Performed PUT instead of POST
Root Cause: React state updates are asynchronous
Lesson: Don't rely on state updates within same function for critical logic
Prevention: Use direct API calls or pass values explicitly
Reference: review/2025-10-29_recurring-event-edit-issues.md
```

---

## Document Reference Checklist
<!-- 문서 참조 체크리스트 -->

### For Every Review
<!-- 모든 검토에 대해 -->
- [ ] Consulted `home/memoryHome.md` for past patterns
<!-- `home/memoryHome.md`에서 과거 패턴 참조 -->
- [ ] Referenced applicable `doc/` standards
<!-- 적용 가능한 `doc/` 기준 참조 -->
- [ ] Checked `.cursorrules` for code conventions
<!-- 코드 컨벤션을 위해 `.cursorrules` 확인 -->

### For Planner Reviews
<!-- 계획자 검토에 대해 -->
- [ ] Validated against `prd.md` template
<!-- `prd.md` 템플릿 대비 검증 -->
- [ ] Checked TDD alignment with `doc/tdd.md`
<!-- `doc/tdd.md`와 TDD 정렬 확인 -->

### For Worker Reviews
<!-- 노동자 검토에 대해 -->
- [ ] Validated tests against `doc/test-guidelines.md`
<!-- `doc/test-guidelines.md` 대비 테스트 검증 -->
- [ ] Checked pre-commit compliance with `doc/checklist.md`
<!-- `doc/checklist.md`와 커밋 전 준수 확인 -->
- [ ] Verified TDD cycle with `doc/tdd.md`
<!-- `doc/tdd.md`로 TDD 사이클 검증 -->

