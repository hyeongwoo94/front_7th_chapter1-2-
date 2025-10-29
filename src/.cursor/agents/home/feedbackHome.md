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

*(To be populated as reviews are completed)*
<!-- *(검토가 완료되면 채워짐)* -->

**Example Pattern:**
<!-- 예시 패턴: -->
```
Issue: Missing concrete Input→Output examples in request documents
Frequency: 40% of Planner reviews (2024-10)
Impact: User confusion, implementation delays
Solution: Request specific Before/After data with real examples
Reference: prd.md Section 2
```

### Effective Review Approaches
<!-- 효과적인 검토 접근 방식 -->

*(To be populated as patterns emerge)*
<!-- *(패턴이 나타나면 채워짐)* -->

**Example Approach:**
<!-- 예시 접근 방식: -->
```
Approach: Always check doc/test-guidelines.md when reviewing tests
Effectiveness: Caught 85% of test structure violations
Outcome: Faster reviews, clearer feedback
```

### Past Success Cases
<!-- 과거 성공 사례 -->

*(To be populated with successful review outcomes)*
<!-- *(성공적인 검토 결과로 채워짐)* -->

### Past Failure Cases
<!-- 과거 실패 사례 -->

*(To be populated with lessons learned from mistakes)*
<!-- *(실수에서 학습한 교훈으로 채워짐)* -->

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

