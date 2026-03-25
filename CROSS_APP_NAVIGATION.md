# Cross-App Navigation Map

## Overview
All patient journey touchpoints are now interconnected. Users can seamlessly navigate between apps following the logical flow of their appointment lifecycle.

---

## Navigation Functions

### `launchIntakeScreen(screenNum)`
Launches the Self Check-In app at a specific screen number.

**Parameters:**
- `screenNum` (0-7): Screen index to launch at
  - 0: Demographics & Personal Info
  - 1: Health History & Medications
  - 2: Insurance Information
  - 3: Insurance Upload
  - 4: Consent Forms
  - 5: Additional Details
  - 6: Payment Method Selection
  - 7: Confirmation

**Usage:**
```js
launchIntakeScreen(1)  // Start at health history
launchIntakeScreen(0)  // Start at demographics
```

### `launchPortalView(viewName)`
Launches the Patient Portal at a specific view.

**Parameters:**
- `viewName` (string): View to display
  - `'home'` - Home/Overview
  - `'appointments'` - Appointments
  - `'health'` - Health Summary
  - `'documents'` - Documents & Records
  - `'billing'` - Billing & Payments
  - `'messages'` - Messages
  - `'profile'` - Profile & Settings

**Usage:**
```js
launchPortalView('home')         // Dashboard
launchPortalView('appointments') // Appointments list
launchPortalView('billing')      // Billing section
```

---

## Connected Flows

### 1. Patient Portal → Self Check-In
**Entry Points:**
- Portal banner "Start Check-In" button → `launchIntakeScreen(1)`
- Appointment card "Complete Check-In" button → `launchIntakeScreen(1)`

**Context:** Patient has pre-registered and is ready to complete intake forms

---

### 2. Self-Registration → Patient Portal
**Entry Point:**
- Registration completion screen "Open My Patient Portal" → `launchPortalView('home')`

**Context:** New patient has created account and booked appointment, now sees portal for first time

---

### 3. Post-Visit Follow-Up → Patient Portal
**Entry Point:**
- Review submission "Go to My Portal" → `launchPortalView('home')`

**Context:** Patient has completed survey and care instructions, ready to access portal

---

### 4. Pre-Visit Outreach → Self Check-In
**Entry Point:**
- Response confirmation screen "Start Intake Now" → `launchApp('intake')` [starts at screen 0]

**Context:** Patient confirmed appointment, now completing intake to prepare for visit

---

### 5. Kiosk Check-In → Landing Page
**Entry Point:**
- Kiosk completion "Return to Home Screen" → `kioskReset()` [returns to landing page]

**Context:** Patient has checked in at kiosk, ready to proceed to waiting room

---

## Implementation Details

### File: script.js
**Lines 46-70:** Cross-app navigation functions

```javascript
// ══ CROSS-APP NAVIGATION ══
// Launch intake app starting at screen N
function launchIntakeScreen(screenNum) {
  cur = screenNum || 0;
  const screens = document.querySelectorAll('#app-intake .screen');
  screens.forEach((s, i) => s.classList.remove('active'));
  if (screens[cur]) screens[cur].classList.add('active');
  buildProgress();
  switchApp('intake');
  window.scrollTo(0, 0);
}

// Launch portal app starting at view (home, appointments, health, documents, billing, messages, profile)
function launchPortalView(viewName) {
  switchApp('portal');
  setTimeout(() => {
    const navItems = document.querySelectorAll('.pni');
    const viewMap = {home:0, appointments:1, health:2, documents:3, billing:5, messages:6, profile:7};
    const idx = viewMap[viewName] !== undefined ? viewMap[viewName] : 0;
    if (navItems[idx]) {
      showPV(viewName || 'home', navItems[idx]);
    }
    window.scrollTo(0, 0);
  }, 80);
}
```

### File: recall-health-prototype.html
**Fixed Buttons:**

| Line | Location | Old Handler | New Handler | Context |
|------|----------|-------------|-------------|---------|
| 2386 | Portal Banner | `launchApp('intake')[1])` | `launchIntakeScreen(1)` | Start Check-In |
| 2435 | Portal Appointment Card | `launchApp('intake')[1])` | `launchIntakeScreen(1)` | Complete Check-In |
| 2889 | Registration Completion | `launchApp('portal')[2])` | `launchPortalView('home')` | Open Portal |
| 3034 | Post-Visit Follow-Up End | `launchApp('portal')[2])` | `launchPortalView('home')` | Go to Portal |
| 3303 | Pre-Visit Outreach Confirm | `launchApp('intake')` | `launchApp('intake')` | Start Intake (OK as-is) |

---

## Testing Checklist

- [ ] Portal → Self Check-In (banner button)
- [ ] Portal → Self Check-In (appointment card)
- [ ] Self-Registration → Portal (completion)
- [ ] Post-Visit Follow-Up → Portal (completion)
- [ ] Pre-Visit Outreach → Self Check-In (confirmation)
- [ ] Kiosk → Landing Page (completion)
- [ ] All transitions scroll to top
- [ ] Progress indicators update correctly
- [ ] Correct screens/views are displayed

---

## Future Enhancements

1. **Staff Dashboard Cross-Links:**
   - Patient name click → Patient detail view
   - Queue item → Check-in flow
   - Message thread → Message detail

2. **Mobile Optimization:**
   - Smooth transitions between apps
   - Back button integration
   - History stack management

3. **Analytics:**
   - Track cross-app navigation flows
   - Measure conversion rates between touchpoints
   - Identify drop-off points in journey
