# King Home - 嫄대Ъ二쇱쭛 (Building Owner's Home)

**name:** 嫄대Ъ二쇱쭛
<!-- 嫄대Ъ二쇱쭛 -->

**description:** Commands and workflow management center for the King agent.
<!-- 嫄대Ъ二??먯씠?꾪듃??紐낅졊 諛??뚰겕?뚮줈 愿由??쇳꽣 -->

## Trigger Commands
<!-- ?몃━嫄?紐낅졊 -->
These keywords trigger specific workflows when issued by the user.
<!-- ?대윭???ㅼ썙?쒕뒗 ?ъ슜?먭? 諛쒗뻾?????뱀젙 ?뚰겕?뚮줈瑜??몃━嫄고빀?덈떎. -->

### ?숈뒿??[topic]
<!-- ?숈뒿??[topic] -->
**Trigger:** "?숈뒿??[二쇱젣]"
<!-- ?몃━嫄? "?숈뒿??[二쇱젣]" -->
**Workflow:**
1. King receives learning command for specified topic
<!-- 1. 嫄대Ъ二쇨? 吏?뺣맂 二쇱젣??????숈뒿 紐낅졊??諛쏆뒿?덈떎 -->
2. King delegates to Planner: "Create learning workflow for [topic]"
<!-- 2. 嫄대Ъ二쇨? 怨꾪쉷?먯뿉寃??꾩엫: "[二쇱젣]??????숈뒿 ?뚰겕?뚮줈 ?묒꽦" -->
3. Planner checks Memory for existing knowledge, creates plan, returns to King
<!-- 3. 怨꾪쉷?먭? ?몄썡?댁뿉??湲곗〈 吏?앹쓣 ?뺤씤?섍퀬, 怨꾪쉷???묒꽦?섏뿬 嫄대Ъ二쇱뿉寃?諛섑솚 -->
4. King delegates to Worker: "Implement learning based on plan"
<!-- 4. 嫄대Ъ二쇨? ?몃룞?먯뿉寃??꾩엫: "怨꾪쉷??湲곕컲?쇰줈 ?숈뒿 援ы쁽" -->
5. Worker checks Memory for patterns, implements, returns to King
<!-- 5. ?몃룞?먭? ?몄썡?댁뿉???⑦꽩???뺤씤?섍퀬, 援ы쁽?섏뿬 嫄대Ъ二쇱뿉寃?諛섑솚 -->
6. King delegates to Manager: "Review the implementation"
<!-- 6. 嫄대Ъ二쇨? 愿由ъ옄?먭쾶 ?꾩엫: "援ы쁽 寃?? -->
7. Manager checks Memory for quality patterns, reviews, returns feedback
<!-- 7. 愿由ъ옄媛 ?몄썡?댁뿉???덉쭏 ?⑦꽩???뺤씤?섍퀬, 寃?좏븯硫??쇰뱶諛?諛섑솚 -->
8. King delegates to Memory: "Store [topic] learning: [result]"
<!-- 8. 嫄대Ъ二쇨? ?몄썡?댁뿉寃??꾩엫: "[二쇱젣] ?숈뒿 ??? [寃곌낵]" -->
9. Memory stores successful patterns and failures for future reference
<!-- 9. ?몄썡?닿? ?ν썑 李몄“瑜??꾪빐 ?깃났 ?⑦꽩怨??ㅽ뙣瑜????-->

**Storage:** Each step stores in respective agent home files
<!-- ??? 媛??④퀎媛 ?대떦 ?먯씠?꾪듃 ???뚯씪?????-->

### 援ы쁽??[feature]
<!-- 援ы쁽??[feature] -->
**Trigger:** "援ы쁽??[湲곕뒫]"
<!-- ?몃━嫄? "援ы쁽??[湲곕뒫]" -->
**Workflow:** TDD-based implementation workflow for new features
<!-- ?뚰겕?뚮줈: ??湲곕뒫???꾪븳 TDD 湲곕컲 援ы쁽 ?뚰겕?뚮줈 -->
*(Similar structure to ?숈뒿?? but focused on implementation)*
<!-- *(?숈뒿?댁? ?좎궗??援ъ“?댁?留?援ы쁽??珥덉젏)* -->

### 由щ럭??[code/test]
<!-- 由щ럭??[code/test] -->
**Trigger:** "由щ럭??[肄붾뱶/?뚯뒪??"
<!-- ?몃━嫄? "由щ럭??[肄붾뱶/?뚯뒪??" -->
**Workflow:** Code/test review and quality assurance
<!-- ?뚰겕?뚮줈: 肄붾뱶/?뚯뒪??寃??諛??덉쭏 蹂댁쬆 -->
*(Similar structure to ?숈뒿?? but focused on review)*
<!-- *(?숈뒿?댁? ?좎궗??援ъ“?댁?留?寃?좎뿉 珥덉젏)* -->

### ?쒖옉??[description]
<!-- ?쒖옉??[description] -->
**Trigger:** "?쒖옉??[?뚯뒪???붿뒪?щ┰??"
<!-- ?몃━嫄? "?쒖옉??[?뚯뒪???붿뒪?щ┰??" -->
**Workflow:**
1. King receives test creation command with description
<!-- 1. 嫄대Ъ二쇨? ?붿뒪?щ┰?섏씠 ?ы븿???뚯뒪???앹꽦 紐낅졊??諛쏆뒿?덈떎 -->
2. King checks Memory (planerHome.md) for test description patterns learned
<!-- 2. 嫄대Ъ二쇨? ?몄썡??planerHome.md)?먯꽌 ?숈뒿???뚯뒪???붿뒪?щ┰???⑦꽩???뺤씤 -->
3. King validates description style against learned patterns
<!-- 3. 嫄대Ъ二쇨? ?숈뒿???⑦꽩??????붿뒪?щ┰???ㅽ???寃利?-->
4. King checks existing test files in `src/.cursor/agents/test/` and auto-increments file number (test_01.spec.ts ??test_02.spec.ts ??test_03.spec.ts, etc.)
<!-- 4. 嫄대Ъ二쇨? `src/.cursor/agents/test/`??湲곗〈 ?뚯뒪???뚯씪???뺤씤?섍퀬 ?뚯씪 踰덊샇瑜??먮룞 利앷? (test_01.spec.ts ??test_02.spec.ts ??test_03.spec.ts ?? -->
5. King imports necessary functions/hooks from utils/apis/hooks based on description
<!-- 5. 嫄대Ъ二쇨? ?붿뒪?щ┰?섏뿉 湲곕컲?섏뿬 utils/apis/hooks?먯꽌 ?꾩슂???⑥닔/?낆쓣 import -->
6. King writes test following learned patterns (Arrange-Act-Assert, description format)
<!-- 6. 嫄대Ъ二쇨? ?숈뒿???⑦꽩(Arrange-Act-Assert, ?붿뒪?щ┰???뺤떇)???곕씪 ?뚯뒪???묒꽦 -->
7. King stores implementation in memoryHome.md for future reference
<!-- 7. 嫄대Ъ二쇨? ?ν썑 李몄“瑜??꾪빐 memoryHome.md??援ы쁽 ???-->

**File Naming:** Auto-increments based on existing files (test_01.spec.ts, test_02.spec.ts, test_03.spec.ts, ...)
<!-- ?뚯씪 ?ㅼ씠諛? 湲곗〈 ?뚯씪 湲곕컲 ?먮룞 利앷? (test_01.spec.ts, test_02.spec.ts, test_03.spec.ts, ...) -->

### ?꾩껜 ?뚯뒪?몄퐫??<!-- ?꾩껜 ?뚯뒪?몄퐫??-->
**Trigger:** "?꾩껜 ?뚯뒪?몄퐫??
<!-- ?몃━嫄? "?꾩껜 ?뚯뒪?몄퐫?? -->
**Workflow:**
1. King receives test execution command
<!-- 1. 嫄대Ъ二쇨? ?뚯뒪???ㅽ뻾 紐낅졊??諛쏆뒿?덈떎 -->
2. King executes: `npm test -- --run`
<!-- 2. 嫄대Ъ二쇨? ?ㅽ뻾: `npm test -- --run` -->
3. King collects test results (total tests, passed, failed, duration)
<!-- 3. 嫄대Ъ二쇨? ?뚯뒪??寃곌낵 ?섏쭛 (珥??뚯뒪?? ?듦낵, ?ㅽ뙣, ?뚯슂?쒓컙) -->
4. King reports summary to user
<!-- 4. 嫄대Ъ二쇨? ?ъ슜?먯뿉寃??붿빟 蹂닿퀬 -->

**Expected Output:**
<!-- ?덉긽 異쒕젰: -->
```
??All tests passed: [X] tests passed out of [Y] total
Duration: [Z] seconds
?먮뒗
??Some tests failed: [X] tests passed, [Y] tests failed out of [Z] total
Duration: [W] seconds
```

### 由고듃 寃??<!-- 由고듃 寃??-->
**Trigger:** "由고듃 寃??
<!-- ?몃━嫄? "由고듃 寃?? -->
**Workflow:**
1. King receives lint check command
<!-- 1. 嫄대Ъ二쇨? 由고듃 寃??紐낅졊??諛쏆뒿?덈떎 -->
2. King executes TypeScript check: `npm run lint:tsc`
<!-- 2. 嫄대Ъ二쇨? TypeScript 寃???ㅽ뻾: `npm run lint:tsc` -->
3. King executes ESLint check: `npm run lint:eslint`
<!-- 3. 嫄대Ъ二쇨? ESLint 寃???ㅽ뻾: `npm run lint:eslint` -->
4. King reports any errors or warnings
<!-- 4. 嫄대Ъ二쇨? ?ㅻ쪟 ?먮뒗 寃쎄퀬 蹂닿퀬 -->

**Expected Output:** Linting results summary
<!-- ?덉긽 異쒕젰: 由고똿 寃곌낵 ?붿빟 -->

### 而ㅻ컠 ??泥댄겕
<!-- 而ㅻ컠 ??泥댄겕 -->
**Trigger:** "而ㅻ컠 ??泥댄겕"
<!-- ?몃━嫄? "而ㅻ컠 ??泥댄겕" -->
**Workflow:**
1. King receives pre-commit validation command
<!-- 1. 嫄대Ъ二쇨? 而ㅻ컠 ??寃利?紐낅졊??諛쏆뒿?덈떎 -->
2. King checks CRLF: `git diff --check`
<!-- 2. 嫄대Ъ二쇨? CRLF ?뺤씤: `git diff --check` -->
3. King validates TypeScript: `npm run lint:tsc`
<!-- 3. 嫄대Ъ二쇨? TypeScript 寃利? `npm run lint:tsc` -->
4. King validates ESLint: `npm run lint:eslint`
<!-- 4. 嫄대Ъ二쇨? ESLint 寃利? `npm run lint:eslint` -->
5. King runs all tests: `npm test -- --run`
<!-- 5. 嫄대Ъ二쇨? 紐⑤뱺 ?뚯뒪???ㅽ뻾: `npm test -- --run` -->
6. King generates checklist report
<!-- 6. 嫄대Ъ二쇨? 泥댄겕由ъ뒪??蹂닿퀬???앹꽦 -->

**Expected Output:** Complete pre-commit validation report
<!-- ?덉긽 異쒕젰: ?꾩쟾??而ㅻ컠 ??寃利?蹂닿퀬??-->

### 由щ럭 ?숈뒿
<!-- 由щ럭 ?숈뒿 -->
**Trigger:** "由щ럭 ?숈뒿" or automatic after "由щ럭??
<!-- ?몃━嫄? "由щ럭 ?숈뒿" ?먮뒗 "由щ럭?? ???먮룞 -->
**Workflow:**
1. King receives review learning command
<!-- 1. 嫄대Ъ二쇨? 由щ럭 ?숈뒿 紐낅졊??諛쏆뒿?덈떎 -->
2. King scans `src/.cursor/agents/review/` folder for new reviews
<!-- 2. 嫄대Ъ二쇨? `src/.cursor/agents/review/` ?대뜑?먯꽌 ??由щ럭 ?ㅼ틪 -->
3. King delegates to Memory: "Process new review files"
<!-- 3. 嫄대Ъ二쇨? ?몄썡?댁뿉寃??꾩엫: "??由щ럭 ?뚯씪 泥섎━" -->
4. Memory extracts core information:
<!-- 4. ?몄썡?닿? ?듭떖 ?뺣낫 異붿텧: -->
   - Problem description and symptoms
   <!-- 臾몄젣 ?ㅻ챸怨?利앹긽 -->
   - Root cause analysis
   <!-- 洹쇰낯 ?먯씤 遺꾩꽍 -->
   - Solution approach (correct and rejected)
   <!-- ?닿껐梨??묎렐 (?щ컮瑜?寃껉낵 嫄곕???寃? -->
   - Diagnostic mistakes (if any)
   <!-- 吏꾨떒 ?ㅼ닔 (?덈뒗 寃쎌슦) -->
   - Lessons learned
   <!-- 援먰썕 -->
5. Memory categorizes by pattern type:
<!-- 5. ?몄썡?닿? ?⑦꽩 ?좏삎蹂꾨줈 遺꾨쪟: -->
   - TypeScript/Type Safety Issues
   - UI/UX Bugs
   - Integration/Implementation Gaps
   - Data Flow/State Management
   - Test Strategy/Coverage
   - Diagnostic Process Issues
6. Memory stores in `memoryHome.md` Review Patterns section
<!-- 6. ?몄썡?닿? `memoryHome.md` 由щ럭 ?⑦꽩 ?뱀뀡?????-->
7. Memory updates Diagnostic Checklist
<!-- 7. ?몄썡?닿? 吏꾨떒 泥댄겕由ъ뒪???낅뜲?댄듃 -->
8. King reports learning summary to user
<!-- 8. 嫄대Ъ二쇨? ?ъ슜?먯뿉寃??숈뒿 ?붿빟 蹂닿퀬 -->

**Format**: Problem ??Root Cause ??Solution ??Anti-Pattern ??Lesson ??Applies To
<!-- ?뺤떇: 臾몄젣 ??洹쇰낯 ?먯씤 ???닿껐梨????덊떚?⑦꽩 ??援먰썕 ???곸슜 ???-->

**Expected Output:**
<!-- ?덉긽 異쒕젰: -->
```
??Review Learning Complete

Processed: [N] new review files
- review/[filename-1].md
- review/[filename-2].md

Extracted Patterns:
- [Pattern 1]: [Category] - [Key Lesson]
- [Pattern 2]: [Category] - [Key Lesson]

Updated:
- memoryHome.md: Added [N] new patterns
- Diagnostic Checklist: Added [M] new items

All agents can now reference these patterns to avoid repeating mistakes.
```

**Agent Benefits:**
<!-- ?먯씠?꾪듃 ?댁젏: -->
- **Planner**: Check Review Patterns before planning to avoid past mistakes
  <!-- 怨꾪쉷?? 怨쇨굅 ?ㅼ닔瑜??쇳븯湲??꾪빐 怨꾪쉷 ??由щ럭 ?⑦꽩 ?뺤씤 -->
- **Worker**: Reference successful solutions and avoid anti-patterns
  <!-- ?몃룞?? ?깃났?곸씤 ?닿껐梨?李몄“ 諛??덊떚?⑦꽩 諛⑹? -->
- **Manager**: Improve diagnostic accuracy by learning from past misdiagnoses
  <!-- 愿由ъ옄: 怨쇨굅 ?ㅼ쭊?먯꽌 ?숈뒿?섏뿬 吏꾨떒 ?뺥솗???μ긽 -->

## Command Management
<!-- 紐낅졊 愿由?-->
- **Adding New Commands**: Add trigger keyword and workflow steps here
<!-- ??紐낅졊 異붽?: ?몃━嫄??ㅼ썙?쒖? ?뚰겕?뚮줈 ?④퀎瑜??ш린??異붽? -->
- **Modifying Commands**: Update workflow steps as needed
<!-- 紐낅졊 ?섏젙: ?꾩슂???곕씪 ?뚰겕?뚮줈 ?④퀎 ?낅뜲?댄듃 -->
- **Removing Commands**: Delete trigger keyword and workflow section
<!-- 紐낅졊 ?쒓굅: ?몃━嫄??ㅼ썙?쒖? ?뚰겕?뚮줈 ?뱀뀡 ??젣 -->

## Workflow Tracking
<!-- ?뚰겕?뚮줈 異붿쟻 -->
Each command execution creates entries in:
- `src/.cursor/agents/home/kingHome.md` - King's actions and decisions
- `src/.cursor/agents/home/planerHome.md` - Planner's plans and workflows
- `src/.cursor/agents/home/toolsHome.md` - Worker's implementations
- `src/.cursor/agents/home/feedbackHome.md` - Manager's reviews
- `src/.cursor/agents/home/memoryHome.md` - Memory's storage

<!-- 媛?紐낅졊 ?ㅽ뻾????ぉ???앹꽦 -->
<!-- - `src/.cursor/agents/home/kingHome.md` - 嫄대Ъ二쇱쓽 ?됰룞怨?寃곗젙 -->
<!-- - `src/.cursor/agents/home/planerHome.md` - 怨꾪쉷?먯쓽 怨꾪쉷怨??뚰겕?뚮줈 -->
<!-- - `src/.cursor/agents/home/toolsHome.md` - ?몃룞?먯쓽 援ы쁽 -->
<!-- - `src/.cursor/agents/home/feedbackHome.md` - 愿由ъ옄??寃??-->
<!-- - `src/.cursor/agents/home/memoryHome.md` - ?몄썡?댁쓽 ???-->

