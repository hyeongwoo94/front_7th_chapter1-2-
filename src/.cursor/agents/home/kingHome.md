# King Home - 건물주집 (Building Owner's Home)

**name:** 건물주집
<!-- 건물주집 -->

**description:** Commands and workflow management center for the King agent.
<!-- 건물주 에이전트의 명령 및 워크플로 관리 센터 -->

## Trigger Commands
<!-- 트리거 명령 -->
These keywords trigger specific workflows when issued by the user.
<!-- 이러한 키워드는 사용자가 발행할 때 특정 워크플로를 트리거합니다. -->

### 학습해 [topic]
<!-- 학습해 [topic] -->
**Trigger:** "학습해 [주제]"
<!-- 트리거: "학습해 [주제]" -->
**Workflow:**
1. King receives learning command for specified topic
<!-- 1. 건물주가 지정된 주제에 대한 학습 명령을 받습니다 -->
2. King delegates to Planner: "Create learning workflow for [topic]"
<!-- 2. 건물주가 계획자에게 위임: "[주제]에 대한 학습 워크플로 작성" -->
3. Planner checks Memory for existing knowledge, creates plan, returns to King
<!-- 3. 계획자가 세월이에서 기존 지식을 확인하고, 계획을 작성하여 건물주에게 반환 -->
4. King delegates to Worker: "Implement learning based on plan"
<!-- 4. 건물주가 노동자에게 위임: "계획을 기반으로 학습 구현" -->
5. Worker checks Memory for patterns, implements, returns to King
<!-- 5. 노동자가 세월이에서 패턴을 확인하고, 구현하여 건물주에게 반환 -->
6. King delegates to Manager: "Review the implementation"
<!-- 6. 건물주가 관리자에게 위임: "구현 검토" -->
7. Manager checks Memory for quality patterns, reviews, returns feedback
<!-- 7. 관리자가 세월이에서 품질 패턴을 확인하고, 검토하며 피드백 반환 -->
8. King delegates to Memory: "Store [topic] learning: [result]"
<!-- 8. 건물주가 세월이에게 위임: "[주제] 학습 저장: [결과]" -->
9. Memory stores successful patterns and failures for future reference
<!-- 9. 세월이가 향후 참조를 위해 성공 패턴과 실패를 저장 -->

**Storage:** Each step stores in respective agent home files
<!-- 저장: 각 단계가 해당 에이전트 홈 파일에 저장 -->

### 구현해 [feature]
<!-- 구현해 [feature] -->
**Trigger:** "구현해 [기능]"
<!-- 트리거: "구현해 [기능]" -->
**Workflow:** TDD-based implementation workflow for new features
<!-- 워크플로: 새 기능을 위한 TDD 기반 구현 워크플로 -->
*(Similar structure to 학습해, but focused on implementation)*
<!-- *(학습해와 유사한 구조이지만 구현에 초점)* -->

### 리뷰해 [code/test]
<!-- 리뷰해 [code/test] -->
**Trigger:** "리뷰해 [코드/테스트]"
<!-- 트리거: "리뷰해 [코드/테스트]" -->
**Workflow:** Code/test review and quality assurance
<!-- 워크플로: 코드/테스트 검토 및 품질 보증 -->
*(Similar structure to 학습해, but focused on review)*
<!-- *(학습해와 유사한 구조이지만 검토에 초점)* -->

### 제작해 [description]
<!-- 제작해 [description] -->
**Trigger:** "제작해 [테스트 디스크립션]"
<!-- 트리거: "제작해 [테스트 디스크립션]" -->
**Workflow:**
1. King receives test creation command with description
<!-- 1. 건물주가 디스크립션이 포함된 테스트 생성 명령을 받습니다 -->
2. King checks Memory (planerHome.md) for test description patterns learned
<!-- 2. 건물주가 세월이(planerHome.md)에서 학습한 테스트 디스크립션 패턴을 확인 -->
3. King validates description style against learned patterns
<!-- 3. 건물주가 학습한 패턴에 대해 디스크립션 스타일 검증 -->
4. King checks existing test files in `src/.cursor/agents/test/` and auto-increments file number (test_01.spec.ts → test_02.spec.ts → test_03.spec.ts, etc.)
<!-- 4. 건물주가 `src/.cursor/agents/test/`의 기존 테스트 파일을 확인하고 파일 번호를 자동 증가 (test_01.spec.ts → test_02.spec.ts → test_03.spec.ts 등) -->
5. King imports necessary functions/hooks from utils/apis/hooks based on description
<!-- 5. 건물주가 디스크립션에 기반하여 utils/apis/hooks에서 필요한 함수/훅을 import -->
6. King writes test following learned patterns (Arrange-Act-Assert, description format)
<!-- 6. 건물주가 학습한 패턴(Arrange-Act-Assert, 디스크립션 형식)을 따라 테스트 작성 -->
7. King stores implementation in memoryHome.md for future reference
<!-- 7. 건물주가 향후 참조를 위해 memoryHome.md에 구현 저장 -->

**File Naming:** Auto-increments based on existing files (test_01.spec.ts, test_02.spec.ts, test_03.spec.ts, ...)
<!-- 파일 네이밍: 기존 파일 기반 자동 증가 (test_01.spec.ts, test_02.spec.ts, test_03.spec.ts, ...) -->

## Command Management
<!-- 명령 관리 -->
- **Adding New Commands**: Add trigger keyword and workflow steps here
<!-- 새 명령 추가: 트리거 키워드와 워크플로 단계를 여기에 추가 -->
- **Modifying Commands**: Update workflow steps as needed
<!-- 명령 수정: 필요에 따라 워크플로 단계 업데이트 -->
- **Removing Commands**: Delete trigger keyword and workflow section
<!-- 명령 제거: 트리거 키워드와 워크플로 섹션 삭제 -->

## Workflow Tracking
<!-- 워크플로 추적 -->
Each command execution creates entries in:
- `src/.cursor/agents/home/kingHome.md` - King's actions and decisions
- `src/.cursor/agents/home/planerHome.md` - Planner's plans and workflows
- `src/.cursor/agents/home/toolsHome.md` - Worker's implementations
- `src/.cursor/agents/home/feedbackHome.md` - Manager's reviews
- `src/.cursor/agents/home/memoryHome.md` - Memory's storage

<!-- 각 명령 실행이 항목을 생성 -->
<!-- - `src/.cursor/agents/home/kingHome.md` - 건물주의 행동과 결정 -->
<!-- - `src/.cursor/agents/home/planerHome.md` - 계획자의 계획과 워크플로 -->
<!-- - `src/.cursor/agents/home/toolsHome.md` - 노동자의 구현 -->
<!-- - `src/.cursor/agents/home/feedbackHome.md` - 관리자의 검토 -->
<!-- - `src/.cursor/agents/home/memoryHome.md` - 세월이의 저장 -->

