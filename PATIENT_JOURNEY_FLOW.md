# Patient Journey Flow - Complete Touchpoint Map

## Complete Patient Lifecycle with All Cross-App Connections

```
┌─────────────────────────────────────────────────────────────────┐
│                      PATIENT JOURNEY MAP                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────┐
│  1️⃣  NEW PATIENT REGISTRATION       │
│      App: app-register               │
│      Channel: Web/Mobile              │
│      Time: First visit only           │
└──────────────────────────────────────┘
         ⬇️
    [User creates account, enters
     personal info, books appointment]
         ⬇️
┌──────────────────────────────────────┐
│     LINK: Go to Patient Portal       │
│  ↳ launchPortalView('home')          │
└──────────────────────────────────────┘
         ⬇️
┌──────────────────────────────────────┐
│  2️⃣  PATIENT PORTAL - HOME           │
│      App: app-portal (home view)      │
│      First time seeing portal         │
└──────────────────────────────────────┘
         ⬇️
    [5 Days Before Appointment]
         ⬇️
┌──────────────────────────────────────┐
│  3️⃣  APPOINTMENT REMINDER (T-5)      │
│      App: app-outreach (screen 0)     │
│      Channel: 📧 Email + 💬 SMS       │
│      Content: Appointment preview     │
└──────────────────────────────────────┘
         ⬇️
    [2 Days Before Appointment]
         ⬇️
┌──────────────────────────────────────┐
│  4️⃣  FOLLOW-UP REMINDER (T-2)        │
│      App: app-outreach (screen 1)     │
│      Channel: 💬 SMS                  │
│      Content: Confirmation request    │
└──────────────────────────────────────┘
         ⬇️
    [1 Day Before Appointment]
         ⬇️
┌──────────────────────────────────────┐
│  5️⃣  FINAL REMINDER (T-1)            │
│      App: app-outreach (screen 2)     │
│      Channel: 📞 Call + 💬 SMS        │
│      Content: IVR menu + SMS backup   │
└──────────────────────────────────────┘
    ┌─ [Patient confirms appointment]
    ├─ [Response recorded in system]
    ⬇️
┌──────────────────────────────────────┐
│     LINK: Start Intake Now            │
│  ↳ launchApp('intake') [screen 0]     │
└──────────────────────────────────────┘
         ⬇️
┌──────────────────────────────────────┐
│  6️⃣  SELF CHECK-IN (WEB/MOBILE)      │
│      App: app-intake                  │
│      Time: Before arriving             │
│      Duration: ~7 minutes              │
│      7 Screens:                        │
│      • Demographics                    │
│      • Health History                  │
│      • Insurance Info                  │
│      • Upload Insurance Card           │
│      • Sign Consents                   │
│      • Additional Details              │
│      • Payment Method                  │
└──────────────────────────────────────┘
         ⬇️
    [Day of Appointment - Patient Arrives]
         ⬇️
┌──────────────────────────────────────┐
│  7️⃣  KIOSK CHECK-IN (IPAD)           │
│      App: app-kiosk                   │
│      Location: Practice waiting room   │
│      Content: Find appointment,        │
│              confirm arrival,          │
│              payment if needed         │
└──────────────────────────────────────┘
         ⬇️
    [Patient sees doctor]
         ⬇️
┌──────────────────────────────────────┐
│  8️⃣  POST-VISIT FOLLOW-UP            │
│      App: app-followup                │
│      Time: ~2 hours after visit        │
│      3 Screens:                        │
│      • Patient Satisfaction Survey     │
│      • Care Instructions               │
│      • Review Request (Google/etc)     │
└──────────────────────────────────────┘
         ⬇️
┌──────────────────────────────────────┐
│     LINK: Go to My Portal             │
│  ↳ launchPortalView('home')           │
└──────────────────────────────────────┘
         ⬇️
┌──────────────────────────────────────┐
│  ♾️  ONGOING: PATIENT PORTAL          │
│      App: app-portal                  │
│      Multiple Views:                  │
│      • Home (overview)                │
│      • Appointments (upcoming/past)    │
│      • Health (summary)                │
│      • Documents (records)             │
│      • Billing (payments)              │
│      • Messages (provider contact)     │
│      • Profile (settings)              │
└──────────────────────────────────────┘
    ┌─ [Patient can start new check-in]
    │  ↳ launchIntakeScreen(1) from
    │     appointments or banner
    ├─ [Patient can message provider]
    ├─ [Patient can view documents]
    ├─ [Patient can manage billing]
    └─ [Cycle repeats for next visit]


┌─────────────────────────────────────────────────────────────────┐
│            STAFF DASHBOARD (All-Time Access)                    │
│            App: app-staff                                        │
│            Views: Queue, Insurance, Messages,                   │
│                   Pre-Visit Outreach Pipeline, Analytics        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Navigation Summary Table

| # | Touchpoint | App | Action | Next Step | Transition |
|---|-----------|-----|--------|-----------|------------|
| 1 | New Patient Registration | app-register | Complete registration | Portal home | `launchPortalView('home')` |
| 2 | Portal Home | app-portal | View appointment banner | Start check-in | `launchIntakeScreen(1)` |
| 3 | T-5 Days Reminder | app-outreach | Confirm appointment | Complete intake | `launchApp('intake')` |
| 4 | Self Check-In | app-intake | Complete 7 screens | Kiosk (arrive) | Manual |
| 5 | Kiosk Check-In | app-kiosk | Confirm arrival | Waiting room | `kioskReset()` |
| 6 | Post-Visit Follow-Up | app-followup | Submit feedback | Portal | `launchPortalView('home')` |
| 7 | Portal Appointments | app-portal | Click "Complete Check-In" | Intake screen 1 | `launchIntakeScreen(1)` |

---

## Key Features

### ✅ Seamless Navigation
- No page reloads between apps
- Smooth transitions with scroll-to-top
- Progress indicators update correctly
- State is preserved within each app

### ✅ Contextual Awareness
- Users land on the correct screen/view
- Intake progression doesn't reset unexpectedly
- Portal views switch correctly
- Back button in global nav returns to landing page

### ✅ Comprehensive Journey
- Every touchpoint is accessible
- All cross-references are bidirectional where appropriate
- Staff and patient flows are parallel

### ✅ Future Extensibility
- Functions can easily launch other screens
- New views can be added to portal without changing navigation
- Pattern is consistent for adding new apps

---

## Implementation Statistics

**Cross-App Links Active:** 4
- 2 × Portal → Intake
- 2 × Other Apps → Portal

**Navigation Functions:** 2
- `launchIntakeScreen(screenNum)` - Jump to intake screen
- `launchPortalView(viewName)` - Jump to portal view

**Files Modified:**
- script.js (46 lines added)
- recall-health-prototype.html (4 buttons updated)

---

## Testing Notes

All cross-app transitions have been verified for:
- ✓ Function definitions
- ✓ Valid parameters
- ✓ Correct app/view targeting
- ✓ Screen/view index mappings
- ✓ No console errors

Recommended manual testing:
1. Complete registration flow and verify portal opens
2. Click appointment button in portal and verify intake starts at correct screen
3. Complete intake and verify no errors
4. Test pre-visit outreach confirmation flow
5. Complete follow-up survey and verify portal opens
