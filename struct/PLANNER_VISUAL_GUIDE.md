# AI Study Planner - Visual Integration Guide

## UI Layout Diagram

```
╔════════════════════════════════════════════════════════════════════════════╗
║                     🎓 AI STUDY PLANNER DASHBOARD                          ║
║                   Generate personalised GATE prep schedule                  ║
╚════════════════════════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────────────────────────┐
│                        📊 STATS SUMMARY (3 Cards)                           │
│  ┌─────────────────┬─────────────────┬─────────────────┐                   │
│  │   📅 Weeks: 12  │  ⏱️ Hours: 288h │  📚 Subjects: 10│                   │
│  └─────────────────┴─────────────────┴─────────────────┘                   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────┐  ┌──────────────────────────────────────────────────────┐
│                │  │                                                      │
│    SIDEBAR     │  │              MAIN CONTENT AREA                       │
│  (Sticky)      │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
├────────────────┤  │  ║ 🎯 GOAL TRACKER                               ║  │
│                │  │  ║ • Weekly Goals (15/15 hours) ████████████ 100% ║  │
│ 🎯 GOAL        │  │  ║ • Monthly Goals (65/100) ██████░░░░░░░░░░░░  65% ║  │
│ TRACKER        │  │  ║ • Target Rank: Top 50                        ║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
├────────────────┤  │  ╔════════════════════════════════════════════════╗  │
│                │  │  ║ 🤖 AI RECOMMENDATIONS          [▼ Collapse]  ║  │
│ ⚙️ CONFIG      │  │  ╠════════════════════════════════════════════════╣  │
│ FORM           │  │  ║ 📚 Study Today                                ║  │
│                │  │  ║  ✓ Deadlocks - Theory         [Start]         ║  │
│ 📅 Exam Date:  │  │  ║  ✓ Transactions - Examples    [Start]         ║  │
│ ┌───────────┐  │  │  ║                                                ║  │
│ │ 2026-06-15│  │  │  ║ 🔄 Revise Topics                              ║  │
│ └───────────┘  │  │  ║  ✓ SQL Joins               [Start]             ║  │
│                │  │  ║  ✓ Normalization           [Start]             ║  │
│ ⏱️ Study Hrs:  │  │  ║                                                ║  │
│ 1─────●─────12 │  │  ║ 📝 Mock Practice                              ║  │
│ 4 hours        │  │  ║  ✓ Full Mock Test (4h)     [Start]             ║  │
│                │  │  ║  ✓ OS Subject Mock         [Start]             ║  │
├────────────────┤  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
│ 📚 SUBJECTS    │  │  ╔════════════════════════════════════════════════╗  │
│ (Multi-select) │  │  ║ 📊 ANALYTICS DASHBOARD     [▼ Collapse]       ║  │
│                │  │  ╠════════════════════════════════════════════════╣  │
│ ☒ Eng. Math    │  │  ║ 📊 Daily Study Hours: 42h                    ║  │
│ ☒ Digital Log  │  │  ║ ┌──┬──┬──┬──┬──┬──┬──┐                        ║  │
│ ☒ Comp. Org    │  │  ║ │5h│6h│4h│7h│8h│5h│6h│ (Mon-Sun)           ║  │
│ ☒ Prog & DS    │  │  ║ └──┴──┴──┴──┴──┴──┴──┘                        ║  │
│ ☒ Algorithms   │  │  ║                                                ║  │
│ ... (10 total) │  │  ║ 🎯 Overall Accuracy: 72%                      ║  │
│                │  │  ║ ████████████████░░░░░░░░░░░░░░  72%           ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 🔥 Streak Days: 12                             ║  │
│                │  │  ║ Keep it up! 💪                                ║  │
│                │  │  ║                                                ║  │
│ [Generate AI]  │  │  ║ 📈 Subject Progress                           ║  │
│  Plan (↕)      │  │  ║ DSA:     ████████████████░░░░░░░░░  75%       ║  │
│                │  │  ║ OS:      ████████░░░░░░░░░░░░░░░░░░  60%       ║  │
│                │  │  ║ DB:      ███████████████████░░░░░░░░  85%       ║  │
│                │  │  ║ Networks:█████░░░░░░░░░░░░░░░░░░░░░░  50%       ║  │
│ [🎯 Focus]     │  │  ╚════════════════════════════════════════════════╝  │
│  Mode          │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
│ 💡 Tip: Focus  │  │  ║ 📅 STUDY SCHEDULE + CALENDAR  [▼ Collapse]   ║  │
│ Mode removes   │  │  ╠════════════════════════════════════════════════╣  │
│ distractions   │  │  ║ 📋 Daily Study Plan with Revision Tasks       ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 📐 Monday                                      ║  │
│                │  │  ║ Engineering Mathematics • Linear Algebra        ║  │
│                │  │  ║ ⏱️ 4h          🔄 Revise: Linear Systems      ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 🔌 Tuesday                                     ║  │
│                │  │  ║ Digital Logic • Boolean Algebra & Gates        ║  │
│                │  │  ║ ⏱️ 4h          🔄 Revise: K-Maps              ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 🌳 Wednesday                                   ║  │
│                │  │  ║ Data Structures • Trees & Graphs               ║  │
│                │  │  ║ ⏱️ 4h          🔄 Revise: Traversals          ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ ⚙️ Thursday                                    ║  │
│                │  │  ║ Algorithms • Sorting & Searching               ║  │
│                │  │  ║ ⏱️ 4h          🔄 Revise: Complexity Analysis ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 🖥️ Friday                                      ║  │
│                │  │  ║ Operating Systems • Process Management         ║  │
│                │  │  ║ ⏱️ 4h          🔄 Revise: Scheduling          ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 🌐 Saturday                                    ║  │
│                │  │  ║ Computer Networks • TCP/IP Stack               ║  │
│                │  │  ║ ⏱️ 4h          🔄 Revise: Protocol Layers     ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ 📋 Sunday                                      ║  │
│                │  │  ║ Revision + Mock Test                           ║  │
│                │  │  ║ ⏱️ 2h          🔄 Revise: Full Syllabus       ║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
│                │  │  ║ 📈 PROGRESS TRACKER            [▶ Expand]     ║  │
│                │  │  ╠════════════════════════════════════════════════╣  │
│                │  │  ║ [Collapsed - Click to expand]                 ║  │
│                │  │  ║ Shows: Completion %, Topic progress, Milestones║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
│                │  │  ║ 🧪 MOCK TEST DASHBOARD         [▶ Expand]     ║  │
│                │  │  ╠════════════════════════════════════════════════╣  │
│                │  │  ║ [Collapsed - Click to expand]                 ║  │
│                │  │  ║ Shows: Mock history, Average score, Trends    ║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
│                │  │  ║ 🛠️ STUDY TOOLS                  [▶ Expand]     ║  │
│                │  │  ╠════════════════════════════════════════════════╣  │
│                │  │  ║ [Collapsed - Click to expand]                 ║  │
│                │  │  ║ Contains: Pomodoro Timer, Error Tracker       ║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
│                │  │  ║ 📥 EXPORT & SHARE                             ║  │
│                │  │  ╠════════════════════════════════════════════════╣  │
│                │  │  ║ [📥 Download]  [🔗 Share]  [🖨️ Print]        ║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
│                │  │  ╔════════════════════════════════════════════════╗  │
│                │  │  ║ 🔍 WEAK TOPICS & FOCUS AREAS                  ║  │
│                │  │  ╠════════════════════════════════════════════════╣  │
│                │  │  ║ ❌ Deadlocks                                   ║  │
│                │  │  ║    💡 Practice 20 MCQs on Deadlocks           ║  │
│                │  │  ║    Priority: High ⬆️                           ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ ❌ Transactions                                ║  │
│                │  │  ║    💡 Watch theory video + solve examples     ║  │
│                │  │  ║    Priority: High ⬆️                           ║  │
│                │  │  ║                                                ║  │
│                │  │  ║ ❌ Normalization                               ║  │
│                │  │  ║    💡 Revise and practice normalization       ║  │
│                │  │  ║    Priority: High ⬆️                           ║  │
│                │  │  ╚════════════════════════════════════════════════╝  │
│                │  │                                                      │
└────────────────┘  └──────────────────────────────────────────────────────┘

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                  🔔         ║
║                              [Bell Icon]                                    ║
║                         Notification Center                                 ║
║                      (Fixed bottom-right)                                   ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Expanded Tools Section Detail

When Tools section is expanded, it shows a 2-column grid:

```
╔═══════════════════════════════════════════════════════════════╗
║ 🛠️ STUDY TOOLS                              [▲ Collapse]    ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌──────────────────────────┐  ┌──────────────────────────┐ ║
║  │ ⏱️ POMODORO TIMER        │  │ ❗ ERROR TRACKER         │ ║
║  ├──────────────────────────┤  ├──────────────────────────┤ ║
║  │                          │  │ 9 Errors Logged          │ ║
║  │       25:00              │  │                          │ ║
║  │                          │  │ Frequent Mistakes:       │ ║
║  │ [▶️ Start] [⏸ Pause]     │  │                          │ ║
║  │                          │  │ ❌ Deadlocks             │ ║
║  │ Sessions: 5              │  │    Type: conceptual | 4  │ ║
║  │                          │  │                          │ ║
║  │                          │  │ ❌ Transactions          │ ║
║  │                          │  │    Type: calculation | 3 │ ║
║  │                          │  │                          │ ║
║  │                          │  │ ❌ SQL Joins             │ ║
║  │                          │  │    Type: syntax | 2      │ ║
║  │                          │  │                          │ ║
║  └──────────────────────────┘  └──────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Focus Mode UI

When Focus Mode is activated:

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║                                                                ║
║                                                                ║
║                                                                ║
║                     🎯 FOCUS MODE                             ║
║                                                                ║
║              GATE Exam Preparation                            ║
║                                                                ║
║                     25:00                                     ║
║                                                                ║
║         No distractions. Pure focus on learning.             ║
║                                                                ║
║                [▶️ START]    [✕ EXIT FOCUS]                  ║
║                                                                ║
║                                                                ║
║                                                                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## Responsive Breakpoints

### Mobile (< 768px)
```
┌─────────────────────────┐
│   SIDEBAR MOVES TO TOP  │
├─────────────────────────┤
│ ⚙️ Config Form          │
│ (Full width)            │
├─────────────────────────┤
│ MAIN CONTENT (below)    │
│ (Full width)            │
│                         │
│ All sections stack      │
│ vertically              │
└─────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌────────────┬─────────────────┐
│ SIDEBAR    │ MAIN CONTENT    │
│            │ (Narrower)      │
│ ⚙️ Config  │                 │
│            │ Stats: 3 cols   │
│            │ or 2 cols       │
│            │                 │
└────────────┴─────────────────┘
```

### Desktop (> 1024px)
```
┌──────────────┬──────────────────────────────┐
│ SIDEBAR      │ MAIN CONTENT                 │
│ (360px)      │ (Flex: 1fr)                  │
│              │                              │
│ ⚙️ Config    │ Stats: 3 cols grid           │
│              │ Sections: Full width         │
│              │                              │
└──────────────┴──────────────────────────────┘
```

---

## Color & Icon Reference

### Icons Used
```
🎓 - Planner/Dashboard
🎯 - Goals/Focus
⚙️  - Settings/Config
📅 - Date/Calendar
⏱️  - Time/Timer
📚 - Subjects/Books
🤖 - AI/Smart
📊 - Analytics/Charts
📈 - Progress/Growth
🧪 - Tests/Mock
🛠️  - Tools
📥 - Export/Download
❗ - Error/Important
🔍 - Search/Weak topics
🔔 - Notifications
🔥 - Streak
📐 - Math
🔌 - Logic
🌳 - Trees/Structures
⚙️  - Algorithms
🖥️  - Systems
🌐 - Networks
💡 - Tips/Suggestions
✓  - Checkmark/Done
↕️  - Expand/Collapse
▼  - Collapse arrow
▶  - Expand arrow
```

### Color Codes
```
Primary Green:  #22C58B  (buttons, accent)
Primary Blue:   #3B82F6  (info, links)
Success Green:  #10B981  (progress, success)
Warning Orange: #F59E0B  (alerts, weak topics)
Danger Red:     #EF4444  (errors, issues)
Text Dark:      #1e293b  (main text)
Text Muted:     #64748B  (secondary text)
Border Light:   #F0F9F4  (light borders)
Background:     #fff     (white)
```

---

## Section States

### Expanded State (Header active)
```
┌────────────────────────────────┐
│ 📊 Section Title    [▲ Close]  │
├────────────────────────────────┤
│ [Content area expanded]         │
│ Component renders full content  │
│                                │
│                                │
└────────────────────────────────┘
```

### Collapsed State (Header inactive)
```
┌────────────────────────────────┐
│ 📊 Section Title    [▼ Expand] │
└────────────────────────────────┘
```

### Hover Effects
```
Button hover:      Opacity change + scale
Link hover:        Color change
Card hover:        Slight background shift
Icon rotation:     Arrow rotates on toggle
```

---

## User Journey Map

### First-Time User
```
1. Land on /ai/planner
   ↓
2. See form on sidebar
   ├─ Fill exam date
   ├─ Adjust study hours
   ├─ Select subjects
   ↓
3. Click "Generate AI Plan"
   ↓
4. See stats summary
   ↓
5. Scroll through sections
   ├─ View AI recommendations
   ├─ See analytics
   ├─ Check schedule
   ├─ Explore progress (collapsed)
   ├─ Expand mocks (collapsed)
   ├─ Expand tools (collapsed)
   ↓
6. Try Focus Mode button
   ↓
7. Return from Focus Mode
   ↓
8. Click Export/Share
```

### Returning User
```
1. Land on /ai/planner
   ↓
2. Plan still visible (if cached)
   ├─ Modify form
   ├─ Regenerate plan
   ↓
3. Check what's new
   ├─ Progress update
   ├─ Weak topics changed
   ↓
4. Use Focus Mode
   ↓
5. Review performance (analytics)
```

---

## Accessibility Features

### Keyboard Navigation
```
Tab: Navigate between buttons
Enter: Activate button
Space: Toggle checkbox/section
Arrow keys: Slider controls
```

### Screen Reader
```
Semantic HTML heading structure
Alt text for icons (implicit in emoji)
ARIA labels for buttons
Proper color contrast
```

### Mobile Friendly
```
Touch targets ≥ 48px
Responsive layout
No horizontal scroll
Clear visual hierarchy
```

---

## Animation Details

### Section Toggle
```
Arrow rotation: 0.2s ease
Content fade: Immediate (no fade, just show/hide)
Button hover: 0.2s ease
```

### Transitions
```
Button hover background: 0.2s ease
Card hover lift: No lift, just background change
Focus Mode appearance: Immediate
```

---

## Breakpoint Values

```
Mobile:  max-width: 768px
Tablet:  768px - 1024px
Desktop: min-width: 1024px

Sidebar width: 360px (fixed, max-width 100% on mobile)
Main content: Flex: 1fr (auto, full width on mobile)

Grid gaps: 12-24px (responsive)
Card padding: 16-28px (responsive)
```

---

## Summary

The merged AI Study Planner now provides:
- ✅ Clean, organized dashboard
- ✅ Collapsible advanced sections
- ✅ Sticky sidebar for easy access
- ✅ Focus Mode for distraction-free work
- ✅ All 13 features in one place
- ✅ Responsive mobile-first design
- ✅ Consistent color scheme
- ✅ Clear visual hierarchy
