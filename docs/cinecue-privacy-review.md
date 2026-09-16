# CineCue implementation review — September 16, 2026

Reviewed local source, not a deployed binary. App: `/Users/johnlewis/Desktop/TeleprompterPoC`; backend: `/Users/johnlewis/Desktop/fanline`.

| Topic | Evidence | Website treatment |
| --- | --- | --- |
| Script/settings | `modules/Teleprompter/context/TeleprompterProvider.jsx` uses React state | Current script held in memory, not cloud-saved |
| Clipboard | `components/ScriptEditor.jsx` reads on Paste and bulk insertion | Disclosed local clipboard use |
| Media | `utils/createRecordingBackupStore.js`, `utils/mediaFiles.js` | Documents backups/metadata; cache and temporary files |
| Deletion | `components/RecordingsSheet.jsx`, backup store | Delete individual backups; new take clears previous app-managed videos; Photos copies separate |
| Background | `hooks/useBackgroundImage.js`, native `BackgroundImageStore.swift` | Selected system-picker image copied to documents; local selection metadata; cleanup attempted on removal/replacement |
| Photos | `screens/RecordingPreviewScreen.jsx` requests write-only permission | Add-only saving on iPhone |
| Speech | `speech/createNativeSpeechAdapter.js`, `speech/createVoiceSyncController.js` | Prefers on-device; recovery can switch to network. No unconditional offline claim |
| FanLine | `modules/Fanline/api.js`, `useCreatorLogin.js`, `CreatorAccessProvider.jsx`; backend `db/graphQL/mutations/cineCueVerification.js` | HTTPS email/password or Apple identity token; existing account read; eligibility/reason response; no persistent token or newly created session |
| Promotions | `components/SaveAdModal.jsx` | Random configured first-party product video streamed from CDN; no third-party ad network or content targeting |
| Diagnostics | `package.json`, `cinematic/exportDiagnostics.js`, native `CinematicDiagnostics.swift` | Local rotating diagnostic files; no automatic upload or analytics/crash SDK found |
| Existing in-app policy | `components/PrivacyPolicy.jsx` | Cross-checked against implementation, not treated as implementation evidence alone |
| Website | `app/`, `package.json` | No analytics, tracking cookies, or contact form in repository; email links and normal hosting requests |

Apple speech privacy reference: https://www.apple.com/legal/privacy/data/en/ask-siri-dictation/

## Items not established by repository inspection

- Actual App Store listing URL: download badge intentionally disabled until supplied.
- Legal operator/contact use the portfolio's existing Real Connection Lab LLC and support@realconnectionlabllc.com; confirmation requested.
- Deployed CDN/backend/website logging configuration and retention periods cannot be established from these repositories. Policy acknowledges request information and potential infrastructure logging without inventing durations. Confirm operational settings before treating the policy as a final production compliance review.
- Local source may differ from the shipping binary or deployed backend.

## Validation

`npm run build` succeeded, generating `/cinecue` and `/cinecue/privacy`. Browser visual QA unavailable because computer-use reported no available browser.
