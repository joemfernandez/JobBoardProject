# Manual Testing Protocol

This document outlines the steps required to verify the Job Board Widget's functionality and accessibility.

## 1. Functional Tests
- [ ] **Data Load**: Verify "Loading..." appears and is replaced by the table.
- [ ] **Modal Open**: Click a job title; verify the modal appears with correct details.
- [ ] **Modal Close (Button)**: Click the 'X' button; verify modal disappears.
- [ ] **Modal Close (Overlay)**: Click the darkened background; verify modal disappears.
- [ ] **Scroll Reset**: Scroll to the bottom of a long job description, close it, and open a new one. Verify the new description starts at the top.

## 2. Accessibility (A11y) Tests
- [ ] **Keyboard Navigation**: Use `Tab` to navigate to a "View" button and press `Enter`.
- [ ] **Focus Management**: Upon opening the modal, focus must move to the Close button.
- [ ] **Escape Key**: Press `Esc` while the modal is open; verify it closes.
- [ ] **Focus Return**: Upon closing the modal (via any method), focus must return to the table button that opened it.

## 3. Browser Compatibility
- [ ] Verify layout in Chrome/Edge.
- [ ] Verify layout in Internet Explorer 11 (if applicable).