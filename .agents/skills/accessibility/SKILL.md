---
name: accessibility
description: Use whenever you build or change UI.
---

# Accessibility

Follow the project's spec.md for headings, landmarks, accessible names, focus sequence, image alternatives and colour pairs. Preserve the requested design and task scope. Do not alter the test suite to conceal an implementation failure.

- Use native button, a, label, dialog, nav, input and select elements. A clickable div does not inherit button semantics or keyboard activation. Do not put interactive elements inside other interactive elements.
- Every control needs a meaningful accessible name. Prefer a visible label; use aria-label for icon-only buttons. Keep visible words in the accessible name. Hide decorative icons with aria-hidden, not the whole button. A toggle uses a stable name and aria-pressed reflecting its actual state.
- Make all actions reachable in logical DOM order with Tab/Shift+Tab and operable with native keys. Keep focus visibly outlined, not obscured or clipped. Never use positive tabindex. Provide a working first skip link.
- Open modal dialogs with showModal(). Give the dialog a title with aria-labelledby, move focus inside, keep background content inert, support Escape and a visible Close button, and return focus to the exact opener on every close path. Verify this behavior in a real browser.
- Name each form field with label/for and use required and appropriate types/autocomplete. Show textual errors beside fields only after attempted submission. Synchronize aria-invalid and aria-describedby with displayed errors; render errors before focusing the first invalid field. Announce ordinary success with an existing role=status region without moving focus. Do not announce every keystroke as an urgent alert.
- Describe meaningful images according to their purpose. Use alt="" for decorative images, including redundant decorative cover artwork as specified in spec.md. Do not use filenames as alternatives.
- Make touch targets at least 24×24 CSS px; prefer 44×44 for standalone controls. Preserve contrast of text, borders, icons and focus outlines. Never convey an error or saved state by colour alone. Keep content operable at narrow widths and 200% zoom.
- Check keyboard paths and live announcements as well as axe results. Automated checks do not prove complete accessibility; report exact tests run, outcomes and environmental blockers. Never invent screen-reader or manual-test results.

When you are done, run the tests and fix what fails.
