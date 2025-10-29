# PRD Template - Product Requirement Document
<!-- PRD 템플릿 - 제품 요구사항 문서 -->

**purpose:** Template for creating feature request documents in `request/` folder
<!-- 목적: `request/` 폴더에 기능 요청 문서 생성을 위한 템플릿 -->

**usage:** Copy this template → Fill in sections → Save to `request/[feature-name].md`
<!-- 사용법: 이 템플릿 복사 → 섹션 채우기 → `request/[기능명].md`에 저장 -->

---

# Feature Request: [Feature Name]
<!-- 기능 요청: [기능명] -->

**Date**: YYYY-MM-DD
**Requester**: [User/King]
**Status**: ⏳ Pending Review | ✅ Approved | ❌ Rejected

---

## 1. Feature Overview
<!-- 기능 개요 -->

**What**: [1-sentence description of the feature]
<!-- 무엇을: 기능에 대한 한 문장 설명 -->

**Why**: [Business/user value]
<!-- 왜: 비즈니스/사용자 가치 -->

**User Story**: As a [user], I want to [action], so that [benefit]
<!-- 사용자 스토리: [사용자]로서, [행동]을 하고 싶습니다, [이익]을 위해 -->

---

## 2. Input → Output ⭐
<!-- 입력 → 출력 ⭐ -->

### Input (사용자 행동)
```
User Action:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Current State (Before):
[UI 상태 또는 데이터 구조]
```

### Process (변환 과정)
```
1. [처리 단계 1]
2. [처리 단계 2]
3. [처리 단계 3]
```

### Output (예상 결과)
```
After State:
[변경된 UI 상태 또는 데이터 구조]

Expected Notification/Feedback:
[사용자에게 보여질 피드백]
```

### Example
```
Before: [구체적인 예시 - 실제 데이터]
Action: [사용자가 실제로 하는 행동]
After: [결과 - 실제 데이터]
```

---

## 3. Technical Requirements (Optional)
<!-- 기술 요구사항 (선택사항) -->

### Data Model Changes
```typescript
// 필요한 경우만 작성
interface Example {
  // ...
}
```

### UI Components
- [ ] Component to create: [이름]
- [ ] Component to modify: [이름]

### API/Storage Changes
- [ ] New endpoint/method: [설명]
- [ ] Modified data structure: [설명]

---

## 4. Implementation Checklist
<!-- 구현 체크리스트 -->

### Must Have (필수)
- [ ] [필수 기능 1]
- [ ] [필수 기능 2]
- [ ] [필수 기능 3]

### Nice to Have (선택)
- [ ] [선택 기능 1]
- [ ] [선택 기능 2]

### Edge Cases to Handle
- [ ] [엣지 케이스 1]
- [ ] [엣지 케이스 2]

---

## 5. Success Criteria
<!-- 성공 기준 -->

**Feature is complete when:**
- [ ] All "Must Have" items work
- [ ] Input → Output matches specification
- [ ] Edge cases handled
- [ ] Tests pass
- [ ] Code follows .cursorrules

---

## 6. Questions/Concerns (Optional)
<!-- 질문/우려사항 (선택사항) -->

**Unclear points:**
- [질문 1]
- [질문 2]

**Potential issues:**
- [우려사항 1]
- [우려사항 2]

---

## User Confirmation
<!-- 사용자 컨펌 -->

**Status**: ⏳ Awaiting user confirmation
<!-- 상태: 사용자 컨펌 대기 중 -->

**User Comments**:
```
[사용자 피드백 작성 공간]
```

**Final Decision**: 
- [ ] ✅ Approved - Proceed with implementation
- [ ] 🔄 Revise - Need changes (specify below)
- [ ] ❌ Rejected - Do not implement

**Revision Notes** (if applicable):
```
[수정 필요 사항]
```

---

---

# 📚 Template Usage Guide
<!-- 템플릿 사용 가이드 -->

## For Planner (계획자)
<!-- 계획자용 -->

**When to create request document:**
- King issues new feature requirement
- User requests new functionality

**How to fill:**
1. **Copy this template** to `request/[feature-name].md`
2. **Section 1**: Summarize what and why
3. **Section 2 ⭐**: MOST IMPORTANT - Clear Input→Output with examples
4. **Section 3**: Technical details (if needed)
5. **Section 4**: Break down into checklist
6. **Section 5**: Define success criteria
7. **Section 6**: List any questions for user
8. **Save and notify user** for confirmation

**References to consult:**
- `memoryHome.md`: Past patterns
- `planerHome.md`: Planning workflows
- History files: Similar past features

## For User (사용자)
<!-- 사용자용 -->

**What to review:**
1. **Section 2**: Does Input→Output match your expectation?
2. **Section 4**: Are "Must Have" items correct?
3. **Section 5**: Are success criteria clear?
4. **Section 6**: Answer any questions

**How to approve:**
1. Read the document
2. Add comments if needed
3. Check one of: ✅ Approved / 🔄 Revise / ❌ Rejected
4. Notify King/Planner

## For Worker (노동자)
<!-- 노동자용 -->

**After user approval:**
1. Read **Section 2** (Input→Output) carefully
2. Follow **Section 4** (Checklist) during implementation
3. Verify **Section 5** (Success Criteria) before completion
4. Reference documents:
   - `memoryHome.md`: Patterns
   - `company/test-team.md`: Testing
   - `company/feature-team.md`: Implementation

---

# 📋 Quick Examples
<!-- 빠른 예시 -->

## Example 1: Simple Feature
```markdown
# Feature Request: Add Dark Mode Toggle

## 1. Feature Overview
**What**: Add a toggle button to switch between light and dark themes
**Why**: Users want to reduce eye strain at night
**User Story**: As a user, I want to toggle dark mode, so that I can use the app comfortably at night

## 2. Input → Output
### Input
User clicks "Dark Mode" toggle button in settings

Current State: Light theme active

### Output
After State: Dark theme applied to entire app
Notification: "다크 모드가 활성화되었습니다"

### Example
Before: Background white, text black
Action: Click toggle
After: Background dark gray, text white

## 4. Implementation Checklist
### Must Have
- [ ] Toggle button in settings
- [ ] Theme persists after page reload
- [ ] All components respect theme

## 5. Success Criteria
- [ ] Toggle works
- [ ] Theme persists
- [ ] No color contrast issues
```

## Example 2: Complex Feature
```markdown
# Feature Request: Recurring Event Bulk Edit

## 1. Feature Overview
**What**: Edit all instances of recurring event at once
**Why**: Users need to update recurring meetings without editing each one
**User Story**: As a calendar user, I want to bulk edit recurring events, so that I save time

## 2. Input → Output
### Input
1. Click recurring event
2. Click "수정"
3. Modal asks: "해당 일정만 수정하시겠어요?"
4. Click "아니오"
5. Modify fields
6. Click "저장"

Current State: 50 recurring events (weekly team meeting)

### Output
After State: All 50 instances updated
Recurring icon 🔁 maintained

### Example
Before: "팀 스탠드업" 10:00-11:00 (50 instances)
Action: Change to "팀 데일리" 09:30-10:30
After: "팀 데일리" 09:30-10:30 (50 instances, all updated)

## 4. Implementation Checklist
### Must Have
- [ ] Modal question UI
- [ ] Bulk update logic
- [ ] Preserve recurring metadata

### Edge Cases
- [ ] 1000+ instances performance
- [ ] Previously singularized instances not affected

## 5. Success Criteria
- [ ] All instances update
- [ ] Recurring icon maintained
- [ ] < 1s for 1000 instances
```

---

# 🎯 Key Principles
<!-- 핵심 원칙 -->

1. **Section 2 is SOURCE OF TRUTH**: Input→Output defines everything
   <!-- 섹션 2가 단일 진실 공급원: Input→Output이 모든 것을 정의 -->

2. **Concrete Examples > Abstract Descriptions**: Show real data, not theory
   <!-- 구체적 예시 > 추상적 설명: 이론이 아닌 실제 데이터 표시 -->

3. **User Confirmation is Mandatory**: No implementation without approval
   <!-- 사용자 컨펌 필수: 승인 없이 구현 없음 -->

4. **Keep it Simple**: If unsure, ask user. Don't guess.
   <!-- 단순하게 유지: 불확실하면 사용자에게 질문. 추측하지 말 것 -->

---

**PRD Template Version**: 3.0 (Simplified 2024-10-29)
<!-- PRD 템플릿 버전: 3.0 (2024-10-29 간소화) -->

