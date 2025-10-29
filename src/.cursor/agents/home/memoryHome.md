# Memory Home - ?몄썡?댁쭛 (Memory's Home)

**name:** ?몄썡?댁쭛
<!-- ?몄썡?댁쭛 -->

**description:** Central storage for all agent learning, plans, implementations, and reviews
<!-- 紐⑤뱺 ?먯씠?꾪듃???숈뒿, 怨꾪쉷, 援ы쁽, 寃?좊? ?꾪븳 以묒븰 ??μ냼 -->

## Memory Organization
<!-- 硫붾え由?援ъ꽦 -->

### By Agent Type
<!-- ?먯씠?꾪듃 ?좏삎蹂?-->

#### Planner Records
<!-- 怨꾪쉷??湲곕줉 -->
- Historical project data
<!-- 怨쇨굅 ?꾨줈?앺듃 ?곗씠??-->
- Planning insights and approaches
<!-- 怨꾪쉷 ?몄궗?댄듃? ?묎렐 -->
- Timeline successes and failures
<!-- ?쇱젙 ?깃났 諛??ㅽ뙣 -->
- **Accessible To**: Planner, King
<!-- ?묎렐 媛?? 怨꾪쉷?? 嫄대Ъ二?-->

#### Worker Records
<!-- ?몃룞??湲곕줉 -->
- Code patterns and implementations
<!-- 肄붾뱶 ?⑦꽩 諛?援ы쁽 -->
- TDD patterns and solutions
<!-- TDD ?⑦꽩 諛??닿껐梨?-->
- Refactoring techniques
<!-- 由ы뙥?좊쭅 湲곕쾿 -->
- **Accessible To**: Worker, King
<!-- ?묎렐 媛?? ?몃룞?? 嫄대Ъ二?-->

#### Manager Records
<!-- 愿由ъ옄 湲곕줉 -->
- Quality patterns and issues
<!-- ?덉쭏 ?⑦꽩 諛?臾몄젣 -->
- Review feedback and improvements
<!-- 寃???쇰뱶諛?諛?媛쒖꽑 -->
- Common pitfalls
<!-- ?쇰컲?곸씤 ?⑥젙 -->
- **Accessible To**: Manager, King
<!-- ?묎렐 媛?? 愿由ъ옄, 嫄대Ъ二?-->

#### Cross-Functional Records
<!-- ?щ줈??湲곕뒫 湲곕줉 -->
- Shared learnings across agents
<!-- ?먯씠?꾪듃 媛?怨듭쑀 ?숈뒿 -->
- Team performance insights
<!-- ? ?깃낵 ?몄궗?댄듃 -->
- Process evolution patterns
<!-- ?꾨줈?몄뒪 吏꾪솕 ?⑦꽩 -->
- **Accessible To**: All agents
<!-- ?묎렐 媛?? 紐⑤뱺 ?먯씠?꾪듃 -->

---

## TypeScript Patterns
<!-- TypeScript ?⑦꽩 -->

### Optional Chaining Consistency (2025-10-28)
<!-- Optional Chaining ?쇨???(2025-10-28) -->

**Problem**: Inconsistent optional chaining in conditional expressions
<!-- 臾몄젣: 議곌굔遺 ?쒗쁽?앹뿉???쇨??섏? ?딆? optional chaining -->

```typescript
// ??BAD: TypeScript cannot infer
const value = obj?.field.nested !== 'x' ? obj.field.nested : 'default';
//                    ^^^^^^ Error: obj is possibly undefined

// ??GOOD: Explicit existence check
const value = obj && obj.field.nested !== 'x' ? obj.field.nested : 'default';
```

**Rule**: Use explicit `&&` for type narrowing in complex conditional expressions
<!-- 洹쒖튃: 蹂듭옟??議곌굔遺 ?쒗쁽?앹뿉?????醫곹엳湲곕? ?꾪빐 紐낆떆??`&&` ?ъ슜 -->

---

## UI/UX Patterns
<!-- UI/UX ?⑦꽩 -->

### Default Values for Form Components (2025-10-28)
<!-- ??而댄룷?뚰듃 湲곕낯媛?(2025-10-28) -->

**Principle**: Always specify default values for input components (Select, Checkbox, Radio)
<!-- ?먯튃: ?낅젰 而댄룷?뚰듃(Select, Checkbox, Radio)????긽 湲곕낯媛?吏??-->

**Why**: Better UX, reduced errors, prevents empty states
<!-- ?댁쑀: ???섏? UX, ?ㅻ쪟 媛먯냼, 鍮??곹깭 諛⑹? -->

**3-Point Consistency**:
<!-- 3吏???쇨??? -->

```typescript
// 1. Initial State
const [value, setValue] = useState('default');

// 2. Form Reset
const resetForm = () => setValue('default');

// 3. Edit Mode
const editItem = (item) => {
  setValue(item.value !== 'none' ? item.value : 'default');
};
```

**Checklist**:
- [ ] Set default in initial state
- [ ] Restore default in form reset
- [ ] Apply default when editing items with no value
- [ ] Select never shows empty/blank

---

## Implementation Patterns
<!-- 援ы쁽 ?⑦꽩 -->

### Implementation vs Integration (2025-10-28)
<!-- 援ы쁽 vs ?듯빀 (2025-10-28) -->

**Problem**: Utility function exists and tests pass, but feature doesn't work in production
<!-- 臾몄젣: ?좏떥 ?⑥닔媛 議댁옱?섍퀬 ?뚯뒪?몃뒗 ?듦낵?섏?留? ?꾨줈?뺤뀡?먯꽌 湲곕뒫???묐룞?섏? ?딆쓬 -->

**Anti-Pattern**:
```
??Utility function implemented
??Unit tests passing
??Never integrated with UI  ??Missing!
??Feature doesn't work
```

**Complete Implementation Checklist**:
1. [ ] Utility Function - Core logic
2. [ ] Unit Tests - Isolated testing
3. [ ] **Integration** 狩?- Connect to UI/Hook
   - Import in relevant files
   - Call from UI/Hook
   - Pass parameters correctly
   - Use return value
4. [ ] Integration Tests - End-to-end
5. [ ] Manual Testing - Browser verification

**Rule**: Tests Passing ??Feature Complete
<!-- 洹쒖튃: ?뚯뒪???듦낵 ??湲곕뒫 ?꾩꽦 -->

---

## Date/Time Patterns
<!-- ?좎쭨/?쒓컙 ?⑦꽩 -->

### Recurring Event Date Handling (2025-10-28)
<!-- 諛섎났 ?쇱젙 ?좎쭨 泥섎━ (2025-10-28) -->

**User Requirements**:
- 31st day monthly: Only show on months with 31 days (skip Feb, Apr, Jun, Sep, Nov)
- Feb 29 yearly: Only show on leap years

**Calculation Strategy**: Iteration-Based (not Incremental)
<!-- 怨꾩궛 ?꾨왂: 諛섎났 ?잛닔 湲곕컲 (?먯쭊?곸씠 ?꾨떂) -->

```typescript
// ??BAD: Incremental (errors accumulate)
let currentDate = new Date(startDate);
for (let i = 0; i < count; i++) {
  currentDate = addMonths(currentDate, interval);  // Errors accumulate!
}

// ??GOOD: Iteration-based (independent calculations)
for (let i = 0; i < count; i++) {
  const currentDate = getMonthlyOccurrence(startDate, i, interval);
  // No error accumulation!
}
```

**Overflow Philosophy**: Allow Overflow ??Then Filter
<!-- ?ㅻ쾭?뚮줈??泥좏븰: ?ㅻ쾭?뚮줈???덉슜 ??洹????꾪꽣留?-->

```typescript
export function generateRecurringEvents(event: Event): Event[] {
  const originalDay = startDate.getDate();
  
  for (let i = 0; i < maxIterations; i++) {
    const date = calculateDate(startDate, i, interval);
    
    // 狩?Filter by day match
    const shouldAdd = date.getDate() === originalDay;
    
    if (shouldAdd) {
      events.push({ ...event, date: formatDate(date) });
    }
  }
}
```

**Key Principles**:
- Calculate from stable base (start date), not previous result
- Allow overflow naturally, filter at higher level
- Add safety margin for loop iterations (maxIterations = maxOccurrences * 12)

---

## Metadata Management Pattern (2025-10-28)
<!-- 硫뷀??곗씠??愿由??⑦꽩 (2025-10-28) -->

**Context**: Recurring events expand 1?묿 for display, but user edits must update the original DB record
<!-- 而⑦뀓?ㅽ듃: 諛섎났 ?쇱젙???쒖떆瑜??꾪빐 1?묿?쇰줈 ?뺤옣?섏?留? ?ъ슜???섏젙? ?먮낯 DB ?덉퐫?쒕? ?낅뜲?댄듃?댁빞 ??-->

### The 3-Layer Metadata Chain
<!-- 3?덉씠??硫뷀??곗씠??泥댁씤 -->

```
Layer 1: Utils (Expansion)
  ??Inject metadata
Layer 2: UI (Preservation)
  ??Preserve metadata
Layer 3: Hooks (Utilization)
  ??Use metadata for API calls
```

**Break any link ??System fails!**
<!-- ?대뼡 留곹겕?쇰룄 ?딆뼱吏硫??쒖뒪???ㅽ뙣! -->

---

### Layer 1: Metadata Injection (Utils)
<!-- ?덉씠??1: 硫뷀??곗씠??二쇱엯 (Utils) -->

**Type Definition**:
```typescript
export interface RepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
  
  // 狩?Metadata for tracking origin
  originalEventId?: string;  // Persistent DB ID
  originalDate?: string;      // Base date for calculation
}
```

**Implementation**:
```typescript
export function generateRecurringEvents(event: Event): Event[] {
  return expandedDates.map(date => ({
    ...event,
    id: generateVirtualId(),           // Virtual ID for display
    date: expandedDateString,          // Expanded date
    repeat: {
      ...event.repeat,
      originalEventId: event.id,       // 狩?Link to DB
      originalDate: event.date          // 狩?Calculation base
    }
  }));
}
```

---

### Layer 2: Metadata Preservation (UI)
<!-- ?덉씠??2: 硫뷀??곗씠??蹂댁〈 (UI) -->

**Anti-Pattern**: Direct form-to-object mapping
<!-- ?덊떚?⑦꽩: ?쇱뿉??媛앹껜濡?吏곸젒 留ㅽ븨 -->

```typescript
// ??BAD: Loses all metadata
const eventData = {
  id: editingEvent?.id,           // Virtual ID!
  title: formTitle,
  repeat: {                        // Brand new object, no metadata!
    type: formType,
    interval: formInterval
  }
};
```

**Correct Pattern**: Conditional preservation
<!-- ?щ컮瑜??⑦꽩: 議곌굔遺 蹂댁〈 -->

```typescript
// ??GOOD: Preserves metadata
const eventData = editingEvent
  ? {
      ...editingEvent,           // Preserve all metadata
      title: formTitle,          // Override with form
      repeat: {
        ...editingEvent.repeat,  // 狩?Preserve repeat metadata
        type: formType,
        interval: formInterval
      }
    }
  : {
      // New event: no metadata needed
      title: formTitle,
      repeat: { type: formType, interval: formInterval }
    };
```

**Critical Points**:
- Spread original object BEFORE form data
- Spread nested objects (especially `repeat`)
- Apply to ALL save handlers (normal save, overlap dialog, etc.)

---

### Layer 3: Metadata Utilization (Hooks)
<!-- ?덉씠??3: 硫뷀??곗씠???쒖슜 (Hooks) -->

**Nested Object Handling**:
```typescript
// ??BAD: Nested object override via spread
const { id, ...eventData } = event;
const updateData = {
  ...eventData,      // Contains repeat with metadata
  repeat: {          // Override attempt
    type: newType,
    interval: newInterval
  }
};
// Problem: Relying on override is risky

// ??GOOD: Explicit removal
const { id, repeat, ...eventData } = event;
const updateData = {
  ...eventData,      // Does NOT contain repeat
  repeat: {          // Clean new object
    type: newType,
    interval: newInterval
    // No metadata sent to server
  }
};
```

**ID Usage**:
```typescript
const saveEvent = async (event: Event) => {
  // 狩?Use persistent ID from metadata
  const updateId = event.repeat?.originalEventId || event.id;
  
  // 狩?Use original base date (not expanded date)
  const updateDate = event.repeat?.originalDate || event.date;
  
  await fetch(`/api/events/${updateId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...cleanEventData,
      date: updateDate  // Base date preserved
    })
  });
};
```

---

### Virtual vs Persistent IDs
<!-- Virtual vs Persistent ID -->

| Aspect | Virtual ID | Persistent ID |
|--------|------------|---------------|
| **Generated** | Client-side | Server/Database |
| **Lifespan** | Single render | Permanent |
| **Purpose** | Display differentiation | CRUD operations |
| **Example** | `temp-1`, `uuid-...` | `event-123` |
| **Can change** | Yes | No |

**Usage Rule**:
- **Display**: Use Virtual ID (React keys, UI differentiation)
- **Update/Delete**: Use Persistent ID (server operations)

---

### Metadata Pattern Summary
<!-- 硫뷀??곗씠???⑦꽩 ?붿빟 -->

**Complete Checklist**:

**For Utils (?몃룞??**:
- [ ] Inject `originalEventId` and `originalDate` during expansion
- [ ] Generate virtual IDs for display differentiation

**For UI (?몃룞??**:
- [ ] Spread original event when editing
- [ ] Spread nested objects (especially `repeat`)
- [ ] Apply pattern to ALL save handlers

**For Hooks (?몃룞??**:
- [ ] Extract persistent ID from metadata
- [ ] Extract base values (originalDate, etc.)
- [ ] Explicitly remove nested objects before creating clean data
- [ ] Never send metadata to server

**For Manager (愿由ъ옄)**:
- [ ] Verify metadata preserved across all layers
- [ ] Check virtual IDs not used in API calls
- [ ] Ensure base values used for updates
- [ ] Test edit scenarios thoroughly

---

### Test Pattern
<!-- ?뚯뒪???⑦꽩 -->

```typescript
it('諛섎났 ?쇱젙 ?섏젙 ???먮낯 ?대깽??ID濡???ν븳??, async () => {
  // 1. Create original
  const created = await createEvent({
    date: '2025-01-31',
    repeat: { type: 'monthly' }
  });
  
  // 2. Fetch (triggers expansion)
  const events = await fetchEvents();
  const marchEvent = events.find(e => e.date === '2025-03-31');
  
  // 3. Verify metadata exists
  expect(marchEvent.repeat.originalEventId).toBe(created.id);
  expect(marchEvent.repeat.originalDate).toBe('2025-01-31');
  
  // 4. Edit expanded event
  await updateEvent({
    ...marchEvent,
    title: 'Updated'
  });
  
  // 5. Verify: original record updated with base date
  const updated = await getEvent(created.id);
  expect(updated.date).toBe('2025-01-31');  // Base preserved
  expect(updated.title).toBe('Updated');
});
```

---

## Common Bug Patterns
<!-- ?쇰컲?곸씤 踰꾧렇 ?⑦꽩 -->

### Pattern 1: Metadata Loss in UI Layer
**Symptom**: 404 Error when updating recurring events
**Cause**: UI creates brand new object without preserving metadata
**Fix**: Spread original event + nested objects before form data

### Pattern 2: Virtual ID in API Calls
**Symptom**: Server can't find record (virtual ID sent instead of persistent ID)
**Cause**: Not extracting `originalEventId` from metadata
**Fix**: `const id = event.repeat?.originalEventId || event.id`

### Pattern 3: Nested Object Metadata Leakage
**Symptom**: Internal metadata sent to server, causing errors
**Cause**: Relying on spread override for nested objects
**Fix**: Explicitly remove nested object before spreading

### Pattern 4: Implementation Without Integration
**Symptom**: Tests pass but feature doesn't work
**Cause**: Utility function never called from UI
**Fix**: Complete integration checklist (import ??call ??use return value)

### Pattern 5: Date Calculation Errors
**Symptom**: Recurring dates drift over time
**Cause**: Incremental calculation accumulates errors
**Fix**: Use iteration-based calculation from stable base

---

## Storage Workflow
<!-- ????뚰겕?뚮줈 -->

### When Receiving Data from King
<!-- 嫄대Ъ二쇰줈遺???곗씠???섏떊 ??-->
1. **Categorize** - Organize by agent type and context
<!-- 遺꾨쪟 - ?먯씠?꾪듃 ?좏삎怨?留λ씫蹂꾨줈 ?뺣━ -->
2. **Extract Insights** - Identify patterns and lessons
<!-- ?몄궗?댄듃 異붿텧 - ?⑦꽩怨?援먰썕 ?앸퀎 -->
3. **Store** - Save in appropriate category
<!-- ???- ?곸젅??踰붿＜?????-->
4. **Index** - Make searchable for quick retrieval
<!-- ?몃뜳??- 鍮좊Ⅸ 寃?됱쓣 ?꾪빐 ?몃뜳??-->

## Memory Access Points
<!-- 硫붾え由??묎렐 ?ъ씤??-->

### For Planner (怨꾪쉷??
Provides: Historical project data, past approaches, successful patterns, failure analysis
<!-- ?쒓났: 怨쇨굅 ?꾨줈?앺듃 ?곗씠?? 怨쇨굅 ?묎렐, ?깃났 ?⑦꽩, ?ㅽ뙣 遺꾩꽍 -->

### For Worker (?몃룞??
Provides: Past code patterns, solutions, TDD patterns, refactoring techniques
<!-- ?쒓났: 怨쇨굅 肄붾뱶 ?⑦꽩, ?닿껐梨? TDD ?⑦꽩, 由ы뙥?좊쭅 湲곕쾿 -->

### For Manager (愿由ъ옄)
Provides: Historical quality patterns, common issues, past review feedback
<!-- ?쒓났: 怨쇨굅 ?덉쭏 ?⑦꽩, ?쇰컲?곸씤 臾몄젣, 怨쇨굅 寃???쇰뱶諛?-->

### For King (嫄대Ъ二?
Provides: Comprehensive overview of all past commands, decisions, and outcomes
<!-- ?쒓났: 怨쇨굅 紐⑤뱺 紐낅졊, 寃곗젙, 寃곌낵??????ш큵?곸씤 媛쒖슂 -->

---

## Review Patterns
<!-- 由щ럭 ?⑦꽩 -->

This section stores lessons learned from formal code reviews. Memory automatically extracts and categorizes insights to help all agents improve.
<!-- ???뱀뀡? 怨듭떇 肄붾뱶 由щ럭?먯꽌 ?숈뒿??援먰썕????ν빀?덈떎. Memory???먮룞?쇰줈 ?몄궗?댄듃瑜?異붿텧?섍퀬 遺꾨쪟?섏뿬 紐⑤뱺 ?먯씠?꾪듃媛 媛쒖꽑?????덈룄濡??뺤뒿?덈떎. -->

### Diagnostic Pattern: Root Cause Misdiagnosis (2025-10-29)
<!-- 吏꾨떒 ?⑦꽩: 洹쇰낯 ?먯씤 ?ㅼ쭊 (2025-10-29) -->

**Source**: `review/2025-10-29_integration-test-recurring-event-issue-v2.md`
<!-- 異쒖쿂: -->

**Problem**: Integration tests failing with "Found multiple elements with text"
<!-- 臾몄젣: "Found multiple elements with text"濡??듯빀 ?뚯뒪???ㅽ뙣 -->

**Initial Diagnosis (WRONG)**: Tests don't specify `repeat` field ??backend defaults to recurring ??events expand
<!-- 珥덇린 吏꾨떒 (?由?: ?뚯뒪?멸? `repeat` ?꾨뱶瑜?吏?뺥븯吏 ?딆쓬 ??諛깆뿏?쒓? 諛섎났?쇰줈 湲곕낯 ?ㅼ젙 ???대깽???뺤옣 -->

**Root Cause (CORRECT)**: System behavior is to expand recurring events. Tests should accept this reality, not fight it.
<!-- 洹쇰낯 ?먯씤 (?щ컮由?: ?쒖뒪???숈옉? 諛섎났 ?쇱젙???뺤옣?섎뒗 寃? ?뚯뒪?몃뒗 ???꾩떎???섏슜?댁빞 ?섎ŉ, ?몄슦吏 留먯븘????-->

**Solution**: Change test query from `getByText` to `getAllByText()[0]` (3 lines changed)
<!-- ?닿껐梨? ?뚯뒪??荑쇰━瑜?`getByText`?먯꽌 `getAllByText()[0]`濡?蹂寃?(3以?蹂寃? -->

**Anti-Pattern**: First solution tried to modify test data to force non-recurring behavior (7+ lines, fragile, high complexity)
<!-- ?덊떚?⑦꽩: 泥?踰덉㎏ ?닿껐梨낆? 諛섎났 ?녿뒗 ?숈옉??媛뺤젣?섎젮怨??뚯뒪???곗씠?곕? ?섏젙?섎젮 ??(7以??댁긽, 痍⑥빟, ?믪? 蹂듭옟?? -->

**Lessons**:
<!-- 援먰썕: -->
1. **Accept system behavior, don't fight it**: If events expand, handle it in tests
   <!-- ?쒖뒪???숈옉 ?섏슜, ?몄슦吏 留?寃? ?대깽?멸? ?뺤옣?섎㈃ ?뚯뒪?몄뿉??泥섎━ -->
2. **Choose simple solutions**: One line > seven lines
   <!-- 媛꾨떒???닿껐梨??좏깮: ??以?> ?쇨낢 以?-->
3. **Loose coupling**: Tests shouldn't depend on form state internals
   <!-- ?먯뒯??寃고빀: ?뚯뒪?멸? ???곹깭 ?대????섏〈?섏? ?딆븘????-->
4. **Verify assumptions**: Don't assume backend behavior without checking
   <!-- 媛??寃利? ?뺤씤 ?놁씠 諛깆뿏???숈옉 媛?뺥븯吏 留?寃?-->

**Applies To**: Manager (diagnostic process), Worker (test implementation), Planner (solution design)
<!-- ?곸슜 ??? Manager(吏꾨떒 ?꾨줈?몄뒪), Worker(?뚯뒪??援ы쁽), Planner(?닿껐梨??ㅺ퀎) -->

**Diagnostic Checklist for Manager**:
<!-- Manager瑜??꾪븳 吏꾨떒 泥댄겕由ъ뒪?? -->
- [ ] Don't assume root cause without verification
<!-- 寃利??놁씠 洹쇰낯 ?먯씤 媛?뺥븯吏 留?寃?-->
- [ ] Consider: Is this fighting system behavior?
<!-- 怨좊젮: ?쒖뒪???숈옉怨??몄슦怨??덈뒗媛? -->
- [ ] Prefer simple solutions over complex ones
<!-- 蹂듭옟??寃껊낫??媛꾨떒???닿껐梨??좏샇 -->
- [ ] Check if "fixing" behavior makes sense or accepting it is better
<!-- ?숈옉??"怨좎튂?? 寃껋씠 ?⑸━?곸씤吏 ?꾨땲硫??섏슜?섎뒗 寃껋씠 ???섏?吏 ?뺤씤 -->

---

### Testing Pattern: Query Method Selection (2025-10-29)
<!-- ?뚯뒪???⑦꽩: 荑쇰━ 硫붿꽌???좏깮 (2025-10-29) -->

**Source**: `review/2025-10-29_integration-test-recurring-event-issue-v2.md`
<!-- 異쒖쿂: -->

**Problem**: `getByText` throws error when multiple elements match
<!-- 臾몄젣: ?щ윭 ?붿냼媛 ?쇱튂????`getByText`媛 ?ㅻ쪟 諛쒖깮 -->

**Root Cause**: Using wrong query method for scenario with multiple matching elements
<!-- 洹쇰낯 ?먯씤: ?щ윭 ?쇱튂 ?붿냼媛 ?덈뒗 ?쒕굹由ъ삤???섎せ??荑쇰━ 硫붿꽌???ъ슜 -->

**Solution**: Use `getAllByText()[0]` when multiple instances expected
<!-- ?닿껐梨? ?щ윭 ?몄뒪?댁뒪媛 ?덉긽????`getAllByText()[0]` ?ъ슜 -->

**Guidelines**:
<!-- 媛?대뱶?쇱씤: -->

**Use `getByText`** when:
<!-- `getByText` ?ъ슜 ?쒖젏: -->
- Element guaranteed to be unique
- Testing specific instance matters
- Want test to fail if multiple exist

**Use `getAllByText()[0]`** when:
<!-- `getAllByText()[0]` ?ъ슜 ?쒖젏: -->
- Multiple instances expected (lists, recurring items)
- Only need to verify existence
- Don't care about specific instance

**Applies To**: Worker (test writing), Planner (test strategy)
<!-- ?곸슜 ??? Worker(?뚯뒪???묒꽦), Planner(?뚯뒪???꾨왂) -->

---

### Implementation Pattern: XOR Logic for Business Rules (2025-10-29)
<!-- 援ы쁽 ?⑦꽩: 鍮꾩쫰?덉뒪 洹쒖튃???꾪븳 XOR 濡쒖쭅 (2025-10-29) -->

**Source**: `review/2025-10-29_overlap-dialog-bug-fix.md`
<!-- 異쒖쿂: -->

**Problem**: Need to detect when one event is recurring and other is normal (but not both)
<!-- 臾몄젣: ???대깽?멸? 諛섎났?닿퀬 ?ㅻⅨ 寃껋씠 ?쇰컲????媛먯? ?꾩슂 (???ㅻ뒗 ?꾨떂) -->

**Solution**: Use XOR logic with `!==` operator
<!-- ?닿껐梨? `!==` ?곗궛?먮줈 XOR 濡쒖쭅 ?ъ슜 -->

```typescript
// ??Clean XOR implementation
const newIsRecurring = newEvent.repeat.type !== 'none';
const overlapIsRecurring = event.repeat.type !== 'none';
return newIsRecurring !== overlapIsRecurring;  // XOR: true only if one is true
```

**Anti-Pattern**: Complex conditional chains
<!-- ?덊떚?⑦꽩: 蹂듭옟??議곌굔遺 泥댁씤 -->

```typescript
// ??Complex and error-prone
if ((newIsRecurring && !overlapIsRecurring) || 
    (!newIsRecurring && overlapIsRecurring)) {
  return true;
}
```

**Lesson**: XOR can be elegantly expressed with `!==` operator
<!-- 援먰썕: XOR? `!==` ?곗궛?먮줈 ?곗븘?섍쾶 ?쒗쁽 媛??-->

**Applies To**: Worker (implementation), Planner (logic design)
<!-- ?곸슜 ??? Worker(援ы쁽), Planner(濡쒖쭅 ?ㅺ퀎) -->

---

### Code Quality Pattern: Pure Functions for Business Logic (2025-10-29)
<!-- 肄붾뱶 ?덉쭏 ?⑦꽩: 鍮꾩쫰?덉뒪 濡쒖쭅???꾪븳 ?쒖닔 ?⑥닔 (2025-10-29) -->

**Source**: `review/2025-10-29_overlap-dialog-bug-fix.md`
<!-- 異쒖쿂: -->

**Problem**: Business logic needs to be testable and reusable
<!-- 臾몄젣: 鍮꾩쫰?덉뒪 濡쒖쭅? ?뚯뒪??媛?ν븯怨??ъ궗??媛?ν빐????-->

**Solution**: Extract to pure function in utils
<!-- ?닿껐梨? utils???쒖닔 ?⑥닔濡?異붿텧 -->

```typescript
// ??Pure function: Easy to test, no side effects
export function hasRecurringNormalConflict(
  newEvent: Event | EventForm,
  overlappingEvents: Event[]
): boolean {
  // No side effects, deterministic
  const newIsRecurring = newEvent.repeat.type !== 'none';
  return overlappingEvents.some((event) => {
    const overlapIsRecurring = event.repeat.type !== 'none';
    return newIsRecurring !== overlapIsRecurring;
  });
}
```

**Benefits**:
<!-- ?댁젏: -->
- **Testability**: Can test in isolation without UI
  <!-- ?뚯뒪??媛?μ꽦: UI ?놁씠 ?낅┰?곸쑝濡??뚯뒪??媛??-->
- **Reusability**: Can use in multiple places
  <!-- ?ъ궗?⑹꽦: ?щ윭 怨녹뿉???ъ슜 媛??-->
- **Maintainability**: Logic centralized in one place
  <!-- ?좎?蹂댁닔?? 濡쒖쭅????怨녹뿉 吏묒쨷??-->
- **Type Safety**: Can use union types (`Event | EventForm`)
  <!-- ????덉쟾?? ?좊땲??????ъ슜 媛??-->

**Applies To**: Worker (implementation), Planner (architecture)
<!-- ?곸슜 ??? Worker(援ы쁽), Planner(?꾪궎?띿쿂) -->

---

### Test Coverage Pattern: Edge Cases First (2025-10-29)
<!-- ?뚯뒪??而ㅻ쾭由ъ? ?⑦꽩: ?ｌ? 耳?댁뒪 ?곗꽑 (2025-10-29) -->

**Source**: `review/2025-10-29_overlap-dialog-bug-fix.md`
<!-- 異쒖쿂: -->

**Problem**: Need comprehensive test coverage for business logic
<!-- 臾몄젣: 鍮꾩쫰?덉뒪 濡쒖쭅??????ш큵?곸씤 ?뚯뒪??而ㅻ쾭由ъ? ?꾩슂 -->

**Solution**: Test edge cases explicitly (7 test cases for XOR logic)
<!-- ?닿껐梨? ?ｌ? 耳?댁뒪瑜?紐낆떆?곸쑝濡??뚯뒪??(XOR 濡쒖쭅?????7媛??뚯뒪??耳?댁뒪) -->

**Test Categories**:
<!-- ?뚯뒪??踰붿＜: -->
1. **Base Cases**: Normal scenarios (2 tests)
   - Normal + Normal ??false
   - Recurring + Recurring ??false
2. **XOR Cases**: The actual logic (2 tests)
   - Recurring + Normal ??true
   - Normal + Recurring ??true
3. **Edge Cases**: Boundary conditions (3 tests)
   - Multiple overlaps with at least one XOR ??true
   - No overlaps ??false
   - Empty state handling

**Coverage Checklist**:
<!-- 而ㅻ쾭由ъ? 泥댄겕由ъ뒪?? -->
- [ ] Happy path
- [ ] Negative cases (should return false)
- [ ] Positive cases (should return true)
- [ ] Multiple items
- [ ] Empty/null cases
- [ ] Boundary conditions

**Applies To**: Worker (test writing), Manager (review checklist)
<!-- ?곸슜 ??? Worker(?뚯뒪???묒꽦), Manager(由щ럭 泥댄겕由ъ뒪?? -->

---

### Integration Pattern: Complete Implementation Checklist (2025-10-29)
<!-- ?듯빀 ?⑦꽩: ?꾩쟾??援ы쁽 泥댄겕由ъ뒪??(2025-10-29) -->

**Source**: From memoryHome.md patterns
<!-- 異쒖쿂: memoryHome.md ?⑦꽩?먯꽌 -->

**Problem**: Tests pass but feature doesn't work in production
<!-- 臾몄젣: ?뚯뒪?몃뒗 ?듦낵?섏?留??꾨줈?뺤뀡?먯꽌 湲곕뒫???묐룞?섏? ?딆쓬 -->

**Root Cause**: Implemented utility function but never integrated with UI/Hook
<!-- 洹쇰낯 ?먯씤: ?좏떥 ?⑥닔瑜?援ы쁽?덉?留?UI/Hook怨??듯빀?섏? ?딆쓬 -->

**Complete Checklist**:
<!-- ?꾩쟾??泥댄겕由ъ뒪?? -->
1. [ ] Utility Function - Core logic implementation
2. [ ] Unit Tests - Isolated testing
3. [ ] **Integration** 狩?- Connect to UI/Hook (CRITICAL)
   - Import in relevant files
   - Call from UI/Hook
   - Pass parameters correctly
   - Use return value
4. [ ] Integration Tests - End-to-end verification
5. [ ] Manual Testing - Browser verification

**Anti-Pattern**: Assuming "tests pass" means "feature complete"
<!-- ?덊떚?⑦꽩: "?뚯뒪???듦낵"媛 "湲곕뒫 ?꾩꽦"???섎??쒕떎怨?媛??-->

**Rule**: Tests Passing ??Feature Complete
<!-- 洹쒖튃: ?뚯뒪???듦낵 ??湲곕뒫 ?꾩꽦 -->

**Applies To**: Worker (implementation), Manager (review), Planner (task breakdown)
<!-- ?곸슜 ??? Worker(援ы쁽), Manager(由щ럭), Planner(?묒뾽 遺꾪빐) -->

---

## Diagnostic Checklist for All Agents
<!-- 紐⑤뱺 ?먯씠?꾪듃瑜??꾪븳 吏꾨떒 泥댄겕由ъ뒪??-->

### What to Avoid (Common Mistakes)
<!-- ?쇳빐????寃?(?쇰컲?곸씤 ?ㅼ닔) -->

**For Manager**:
- ??Assuming root cause without verification
<!-- 寃利??놁씠 洹쇰낯 ?먯씤 媛??-->
- ??Fighting system behavior instead of accepting it
<!-- ?쒖뒪???숈옉???섏슜?섎뒗 ????몄슦湲?-->
- ??Choosing complex solutions when simple ones exist
<!-- 媛꾨떒???닿껐梨낆씠 ?덉쓣 ??蹂듭옟???닿껐梨??좏깮 -->

**For Worker**:
- ??Using wrong query methods in tests
<!-- ?뚯뒪?몄뿉???섎せ??荑쇰━ 硫붿꽌???ъ슜 -->
- ??Implementing functions without integration
<!-- ?듯빀 ?놁씠 ?⑥닔留?援ы쁽 -->
- ??Writing complex conditionals for XOR logic
<!-- XOR 濡쒖쭅??蹂듭옟??議곌굔臾??묒꽦 -->

**For Planner**:
- ??Creating fragile test plans that depend on internals
<!-- ?대????섏〈?섎뒗 痍⑥빟???뚯뒪??怨꾪쉷 ?앹꽦 -->
- ??Skipping edge case planning
<!-- ?ｌ? 耳?댁뒪 怨꾪쉷 ?앸왂 -->
- ??Not verifying integration step in plans
<!-- 怨꾪쉷?먯꽌 ?듯빀 ?④퀎 寃利?????-->

### What to Try (Effective Techniques)
<!-- ?쒕룄?댁빞 ??寃?(?④낵?곸씤 湲곕쾿) -->

**For Manager**:
- ??Verify system behavior before diagnosing
<!-- 吏꾨떒 ???쒖뒪???숈옉 寃利?-->
- ??Consider: "Accept vs Fight" system behavior
<!-- 怨좊젮: ?쒖뒪???숈옉 "?섏슜 vs ?몄?" -->
- ??Prefer simple, robust solutions
<!-- 媛꾨떒?섍퀬 寃ш퀬???닿껐梨??좏샇 -->

**For Worker**:
- ??Use `getAllByText()[0]` for repeated elements
<!-- 諛섎났 ?붿냼??`getAllByText()[0]` ?ъ슜 -->
- ??Extract business logic to pure functions
<!-- 鍮꾩쫰?덉뒪 濡쒖쭅???쒖닔 ?⑥닔濡?異붿텧 -->
- ??Use `!==` for elegant XOR implementation
<!-- ?곗븘??XOR 援ы쁽??`!==` ?ъ슜 -->
- ??Always complete integration step
<!-- ??긽 ?듯빀 ?④퀎 ?꾨즺 -->

**For Planner**:
- ??Include integration step in all plans
<!-- 紐⑤뱺 怨꾪쉷???듯빀 ?④퀎 ?ы븿 -->
- ??Plan edge case tests explicitly
<!-- ?ｌ? 耳?댁뒪 ?뚯뒪?몃? 紐낆떆?곸쑝濡?怨꾪쉷 -->
- ??Design for loose coupling
<!-- ?먯뒯??寃고빀???꾪븳 ?ㅺ퀎 -->

---

**Memory Version**: 2.1 (Review Learning Added 2024-10-29)
<!-- 硫붾え由?踰꾩쟾: 2.1 (由щ럭 ?숈뒿 異붽? 2024-10-29) -->
