# Pre-Commit Checklist
<!-- 커밋 전 체크리스트 -->

## Critical Issues to Check Before Commit
<!-- 커밋 전 반드시 확인해야 할 치명적 이슈 -->

### 1. Line Ending Issues (CRLF vs LF)
<!-- 줄바꿈 문자 이슈 (CRLF vs LF) -->

**Problem**: Windows uses CRLF (`\r\n`), but project requires LF (`\n`)
<!-- 문제: Windows는 CRLF를 사용하지만 프로젝트는 LF를 요구함 -->

**Symptoms**:
<!-- 증상: -->
- Thousands of `Delete ␍` prettier/prettier errors
<!-- 수천 개의 `Delete ␍` prettier/prettier 오류 -->
- Every line shows lint error even though code is correct
<!-- 코드가 올바른데도 모든 줄에 lint 오류 표시 -->

**Root Cause**:
<!-- 근본 원인: -->
- `.prettierrc` specifies `"endOfLine": "lf"`
<!-- `.prettierrc`가 `"endOfLine": "lf"`로 지정됨 -->
- Files were created/edited on Windows with CRLF line endings
<!-- Windows에서 CRLF 줄바꿈으로 파일이 생성/편집됨 -->

**Prevention**:
<!-- 예방: -->
1. Set Git config: `git config core.autocrlf false`
<!-- Git 설정: `git config core.autocrlf false` -->
2. Configure VS Code to use LF:
<!-- VS Code를 LF 사용하도록 설정: -->
   - Settings → Files: Eol → `\n`
   - Or set in `.vscode/settings.json`: `"files.eol": "\n"`
   <!-- 또는 `.vscode/settings.json`에 설정: `"files.eol": "\n"` -->

**Solution**:
<!-- 해결 방법: -->

Method 1: VS Code (Recommended)
<!-- 방법 1: VS Code (권장) -->
```
1. Open any file
2. Click "CRLF" in bottom status bar
3. Select "LF"
4. Save file
5. Repeat for all files OR use "Change All End of Line Sequence"
```

Method 2: Git renormalize
<!-- 방법 2: Git 재정규화 -->
```bash
git config core.autocrlf false
git add --renormalize .
git status  # Check changes
```

Method 3: dos2unix (if available)
<!-- 방법 3: dos2unix (사용 가능한 경우) -->
```bash
find src -name "*.ts" -o -name "*.tsx" | xargs dos2unix
```

### 2. Import Order Issues
<!-- Import 순서 이슈 -->

**Problem**: eslint-plugin-import requires specific import grouping
<!-- 문제: eslint-plugin-import가 특정 import 그룹화를 요구함 -->

**Rules**:
<!-- 규칙: -->
1. External libraries (React, MUI, etc.)
<!-- 외부 라이브러리 (React, MUI 등) -->
2. **ONE blank line**
<!-- 빈 줄 하나 -->
3. Internal modules (starting with `.` or `@/`)
<!-- 내부 모듈 (`.` 또는 `@/`로 시작) -->
4. **NO blank lines** within same group
<!-- 같은 그룹 내에서는 빈 줄 없음 -->

**Good Example**:
<!-- 좋은 예: -->
```typescript
import { useState } from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import Modal from './components/Modal';
import { useCalendarView } from './hooks/useCalendarView';
import { Event } from './types';
```

**Bad Example**:
<!-- 나쁜 예: -->
```typescript
import { useState } from 'react';
import { Button } from '@mui/material';

import Modal from './components/Modal';  // ❌ Blank line within group

import { useCalendarView } from './hooks/useCalendarView';  // ❌ No blank line between groups
import { Event } from './types';
```

**Fix**: Run `npm run lint:eslint -- --fix` or manually organize imports
<!-- 수정: `npm run lint:eslint -- --fix` 실행 또는 수동으로 import 정리 -->

### 3. File Ending Blank Line
<!-- 파일 마지막 빈 줄 -->

**Problem**: Prettier requires exactly one blank line at end of file
<!-- 문제: Prettier가 파일 끝에 정확히 한 줄의 빈 줄을 요구함 -->

**Rule**: Every file must end with exactly ONE newline character
<!-- 규칙: 모든 파일은 정확히 한 개의 개행 문자로 끝나야 함 -->

**Check**: Look at end of file - cursor should be on empty line after last code
<!-- 확인: 파일 끝 확인 - 커서가 마지막 코드 다음 빈 줄에 있어야 함 -->

**Good**:
<!-- 좋은 예: -->
```typescript
export default Modal;
← cursor here (empty line)
```

**Bad**:
<!-- 나쁜 예: -->
```typescript
export default Modal;← no newline after

export default Modal;

← extra blank line
```

### 4. React Hooks Dependencies
<!-- React Hooks 의존성 -->

**Problem**: Missing dependencies in useEffect/useCallback
<!-- 문제: useEffect/useCallback에 의존성 누락 -->

**Rule**: All values used inside hook must be in dependency array
<!-- 규칙: 훅 내부에서 사용되는 모든 값은 의존성 배열에 있어야 함 -->

**Solution**:
<!-- 해결: -->
- Wrap functions with `useCallback`
<!-- 함수를 `useCallback`으로 감싸기 -->
- Add all dependencies to array
<!-- 모든 의존성을 배열에 추가 -->
- Use ESLint's suggested fix
<!-- ESLint의 제안 수정 사용 -->

**Good Example**:
<!-- 좋은 예: -->
```typescript
const checkUpcomingEvents = useCallback(() => {
  const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
  // ...
}, [events, notifiedEvents]);  // All dependencies listed

useEffect(() => {
  const interval = setInterval(checkUpcomingEvents, 1000);
  return () => clearInterval(interval);
}, [checkUpcomingEvents]);  // Include callback
```

## Pre-Commit Command Checklist
<!-- 커밋 전 명령어 체크리스트 -->

Run these commands before every commit:
<!-- 매 커밋 전에 다음 명령어 실행: -->

```bash
# 1. Check for CRLF issues
git diff --check

# 2. Run linter
npm run lint:eslint

# 3. Run TypeScript compiler
npm run lint:tsc

# 4. Run all tests
npm test -- --run

# 5. Fix auto-fixable issues
npm run lint:eslint -- --fix
```

## Common Lint Errors and Fixes
<!-- 일반적인 Lint 오류 및 수정 -->

| Error | Meaning | Fix |
|-------|---------|-----|
| `Delete ␍` | CRLF line ending | Convert to LF |
| `There should be at least one empty line between import groups` | Missing blank line between import groups | Add blank line |
| `There should be no empty line within import group` | Extra blank line in same group | Remove blank line |
| `Delete ⏎` | Extra blank line at end of file | Remove extra newline |
| `Insert ⏎` | Missing blank line at end of file | Add newline |
| `React Hook useEffect has a missing dependency` | Missing dependency in hooks | Add to dependency array or use useCallback |

## Automation Setup
<!-- 자동화 설정 -->

### VS Code Settings
<!-- VS Code 설정 -->

Create `.vscode/settings.json`:
<!-- `.vscode/settings.json` 생성: -->
```json
{
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Git Hooks (Optional)
<!-- Git Hooks (선택사항) -->

Use husky to run linting before commit:
<!-- husky를 사용하여 커밋 전 린팅 실행: -->
```bash
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

## Key Takeaways
<!-- 핵심 요약 -->

- ✅ Always use LF line endings (not CRLF)
<!-- LF 줄바꿈 사용 (CRLF 아님) -->
- ✅ One blank line between import groups
<!-- import 그룹 간 빈 줄 하나 -->
- ✅ No blank lines within import groups
<!-- import 그룹 내에는 빈 줄 없음 -->
- ✅ Exactly one newline at end of file
<!-- 파일 끝에 정확히 한 줄의 개행 -->
- ✅ Wrap functions in useCallback when used in useEffect
<!-- useEffect에서 사용되는 함수는 useCallback으로 감싸기 -->
- ✅ Run `npm run lint` before committing
<!-- 커밋 전에 `npm run lint` 실행 -->
- ✅ Fix CRLF issues immediately when they appear
<!-- CRLF 문제가 나타나면 즉시 수정 -->

