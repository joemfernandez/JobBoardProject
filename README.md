# Job Board Widget Project

A maintainable, testable, and mobile-friendly jQuery widget for SharePoint 2016.

## 🛠 Pre-Deployment Preparation (Local)

Perform these steps in your code editor before moving files to SharePoint.

- [ ] **Path Configuration**:
  - [ ] Open `src/sp-widget.html`.
  - [ ] Update **Line 9**: Set `href` to the absolute path of `job-board.css` in your Style Library.
  - [ ] Update **Line 39**: Set `src` to the absolute path of `job-board.js` in your Style Library.
  - [ ] Update **Line 46**: Set `dataUrl` to the absolute path of your `job-data.txt` file.

---

## 🚀 Manual Deployment (SharePoint)

Follow these steps to move the files into your production environment.

- [ ] **Upload Assets**:

  - [ ] Navigate to `/sites/YourSite/Style Library/`.
  - [ ] Create a folder named `JobBoard`.
  - [ ] Upload `src/job-board.js` and `src/job-board.css`.

- [ ] **Upload Data**:

  - [ ] Navigate to your target Document Library.
  - [ ] Upload your JSON file (ensure it is named `job-data.txt`).

- [ ] **Upload Entry Point**:
  - [ ] Upload the edited `src/sp-widget.html` to a library (e.g., `Site Assets`).
  - [ ] **Copy the direct URL** to this file.

---

## 📺 Page Integration

- [ ] Navigate to the public-facing SharePoint page.
- [ ] Click **Edit Page**.
- [ ] Add a **Content Editor Web Part** (CEWP).
- [ ] Open the Web Part Tool Pane (**Edit Web Part**).
- [ ] Paste the URL to `sp-widget.html` into the **Content Link** box.
- [ ] In the "Appearance" section, set **Chrome Type** to `None` (optional, for a cleaner look).
- [ ] Click **Apply** and then **Stop Editing** the page.

---

## 🧪 Post-Deployment Verification

- [ ] Refresh the page and confirm the "Loading..." message appears.
- [ ] Verify the DataTable renders with the correct columns.
- [ ] Sort by **Announcement Date** to ensure sorting logic works.
- [ ] Click a **Position** button and verify:
  - [ ] The modal opens.
  - [ ] The HTML details are rendered correctly.
  - [ ] The "X" button closes the modal.
- [ ] (Optional) Test on a mobile device to ensure the modal body scrolls smoothly.

### Summary of Folder Roles

- **`/src`**: Production files. These are the ONLY files that ever go to SharePoint.
- **`/dev`**: Local workbench. Use `index.html` here to test new UI changes without affecting the live site.
- **`/tests`**: Quality control. Run `tests.html` after any logic changes to ensure you haven't broken the formatting or modal functions.
