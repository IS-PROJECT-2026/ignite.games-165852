# Project Submission Report

## 1. Student Details

- **Full Name:** Njenga Martin Njuguna
- **GitHub Username:** Dassino
- **Email:** martin.njenga@strathmore.edu

---

## 2. Deployed Project Link

- **Live GitHub Pages URL:** https://is-project-2026.github.io/ignite.games-165852/
  *(Example: https://is-project-2026.github.io/hospital-management-138141/)*

---

## 3. Reflection — Grounded in Your Git History

> **Rules:** Every answer below **must include a direct link** to the specific commit, PR, issue, or branch in your repository that demonstrates what you are describing. Answers without working links will not be graded. Generic explanations that could apply to any project will receive zero marks.
>
> **Marks:** A (2 marks) · B (1 mark) · C (1 mark) · D (1 mark) = **5 marks total**

### A. Your Best Commit

- **Commit URL:** https://github.com/IS-PROJECT-2026/ignite.games-165852/pull/21/changes/fa3e6c9a427d70dbd913f14a55bea4f5f9ae6d93
- **Why this one?** It follows the Conventional Commits spec cleanly — a clear `feat` type, a concise imperative subject line, and it represents a genuinely complete, self-contained unit of work (a full game's logic) rather than a vague or partial change.

### B. A Mistake or Struggle

- **Link to the evidence:** https://github.com/IS-PROJECT-2026/ignite.games-165852/commit/87cdd66
- **What happened and how did you recover?** I resolved a merge conflict locally and pushed directly to `main`, which shouldn't have been possible under branch protection. I discovered my rule only had "Require a pull request before merging" checked, but not "Do not allow bypassing the above settings" — meaning it never applied to me as repo owner. I enabled that setting immediately and routed every conflict resolution afterward through a proper branch and PR.

### C. A Pull Request You're Proud Of

- **PR URL:** https://github.com/IS-PROJECT-2026/ignite.games-165852/pull/20
- **What did you check before merging?** I reviewed the full diff on the Files changed tab to confirm both games' logic worked as described, checked that the PR description accurately listed what was and wasn't tested, and confirmed the linked issues matched the actual scope of the changes before merging.

### D. One Thing You Would Do Differently

- **What would you change?** I'd scope Scrabble to include real dictionary word validation from the start, rather than treating any placed letter sequence as a scorable "word." Given the one-week timeline, I made a deliberate call to skip it, but with more time I'd budget for integrating a proper word-list dependency.
- **Link to the evidence of the original decision:** https://github.com/IS-PROJECT-2026/ignite.games-165852/commit/86a091c

---

## 4. Screenshots of Key GitHub Features

Demonstrate your workflow mechanics by embedding your screenshots below.

> **CRITICAL FOR WORKING IMAGES:** Do not type manual folder paths. Edit this file directly on the GitHub web interface, click on the blank line below each prompt, and **paste (Ctrl+V / Cmd+V)** your screenshot. GitHub will automatically upload the file and generate a permanent, working image link for you.

### A. Milestones and Issues
*Provide a screenshot showing your active milestone(s) and the granular tracking issues linked directly to them.*
<img width="940" height="456" alt="image" src="https://github.com/user-attachments/assets/8c93a37f-35b7-4448-9c23-91fb742b477c" />
<img width="940" height="451" alt="image" src="https://github.com/user-attachments/assets/0e822637-61df-457f-9569-6613ff1d5840" />




* **Caption:** All four milestones tracked, with Core Platform, Authentication, and Game Modules fully complete and Polish/Deployment/Submission in progress.

### B. Project Board
*Provide a screenshot of your GitHub Project Board with your issues organized dynamically across columns (To Do, In Progress, Done).*
<img width="838" height="780" alt="image" src="https://github.com/user-attachments/assets/70f41a2f-b2b7-4a75-9ad4-3e22f800a87c" />



* **Caption:** Issues distributed across To Do, In Progress, and Done, reflecting actual day-by-day progress rather than a static end-state list.

### C. Branching Architecture
*Provide a screenshot showing your local or remote Git branch list, highlighting your use of conventional, issue-linked naming patterns (e.g., `feat/`, `fix/`, `style/`).*

<img width="940" height="215" alt="image" src="https://github.com/user-attachments/assets/b6c05c3c-bd83-4651-8ca2-27ca061bb2a4" />
<img width="859" height="902" alt="image" src="https://github.com/user-attachments/assets/b8e74bbd-770b-4aec-82e0-aae8ebdcae64" />


* **Caption:** Feature branches following the feat/[issue-number]-[description] convention, including conflict-demonstration branches used for the required merge conflict exercises.

### D. Pull Requests & Traceability
*Provide a screenshot of a completed or open Pull Request (PR) on GitHub that clearly shows it is linked to a related development issue.*

[PASTE YOUR PULL REQUEST SCREENSHOT DIRECTLY HERE]


<img width="940" height="193" alt="image" src="https://github.com/user-attachments/assets/e3a16305-e959-4f8a-bde5-6363616568ba" />

<img width="940" height="386" alt="image" src="https://github.com/user-attachments/assets/9bdbe10e-5163-4d89-bccc-c00db49c0126" />


* **Caption:**  A merged pull request explicitly linked to its closed issues via the Closes # footer, with a clear Summary/Testing description structure.

---

## 5. Merge Conflict Evidence

You must engineer **three merge conflicts**, each triggered by a **different cause** from those covered in the lecture. For Conflict 1, document the full resolution lifecycle. For Conflicts 2 and 3, provide the conflict marker screenshot and identify the cause.

> **Marks:** Conflict 1 full chronology (2 marks) · Conflict 2 (1 mark) · Conflict 3 (1 mark) · All three use distinct causes (1 mark) = **5 marks total**

---

### Conflict 1 — Full Chronology

**What cause did you use?** Same-line edit conflict — two branches modifying the same line of the same file with different content.

#### Step 1: Generating the Clash
*Screenshot showing the merge attempt and the conflict warning.*

[PASTE SCREENSHOT OF ATTEMPTED MERGE / TERMINAL WARNING HERE]

<img width="1455" height="160" alt="conflict_evidence_1" src="https://github.com/user-attachments/assets/1e04ded6-dc93-451e-b6cf-41b4c5ff31d0" />


* **Caption:** Attempted merge of conflict/branch-a and conflict/branch-b, both modifying the tagline text on app/page.tsx, triggering a content conflict.

#### Step 2: Inside the Code Editor (Conflict Markers)
*Screenshot showing the raw, unresolved conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) in your editor.*

[PASTE SCREENSHOT OF RAW CONFLICT MARKERS HERE]

<img width="1455" height="160" alt="conflict_evidence_1" src="https://github.com/user-attachments/assets/8e973bc3-085e-4b43-b558-6437e8644f78" />


* **Caption:** Raw <<<<<<< HEAD / ======= / >>>>>>> markers shown in VS Code around the conflicting tagline line.

#### Step 3: Resolution & Clean Merge
*Screenshot of your clean Git history or completed PR showing the conflict was resolved and merged.*

[PASTE SCREENSHOT OF CLEAN RESOLUTION HERE]

**Caption:** Conflict resolved by combining elements of both proposed taglines into a single new line, committed and merged into main.

---

### Conflict 2 — Different Cause

**What cause did you use?** Modify/delete conflict.

**Why does this cause trigger a conflict?** One branch modified components/GameCard.tsx while another branch deleted the same file entirely — Git cannot automatically reconcile an update against a deletion, since it doesn't know whether the file should exist afterward.

[PASTE SCREENSHOT OF CONFLICT MARKERS FOR CONFLICT 2 HERE]

<img width="1443" height="398" alt="conflict_evidence_2" src="https://github.com/user-attachments/assets/c788b3a9-af5a-4192-9e3c-2af87ce00a5a" />


* **Caption:** conflict/branch-c added a hover effect to GameCard.tsx while conflict/branch-d deleted the same file; merging both produced a modify/delete conflict, resolved by retaining the file since the home page depends on it.

---

### Conflict 3 — Different Cause

**What cause did you use?** Dependency/lockfile conflict.

**Why does this cause trigger a conflict?** Two branches independently ran npm install for different packages (date-fns and clsx), each modifying package.json and package-lock.json in incompatible ways — the generated lockfile diverged between branches, producing conflicts in both files on merge.

[PASTE SCREENSHOT OF CONFLICT MARKERS FOR CONFLICT 3 HERE]

<img width="1385" height="198" alt="conflict_evidence_3" src="https://github.com/user-attachments/assets/7d7a88a3-133b-4d7f-8cc5-6412ce7e7b20" />


* **Caption:** conflict/branch-e added date-fns and conflict/branch-f added clsx; merging both conflicted in package.json and package-lock.json, resolved by keeping both dependencies and regenerating the lockfile via npm install rather than hand-editing it.

---
##
## 6. Feedback & Evaluation

To help improve this course for future engineering cohorts, please take 2 minutes to fill out the anonymous feedback form. Your honest review helps shape how this program is taught next semester!
- [ ] **Anonymous Evaluation Form:** [Course & Instructor Evaluation](https://forms.gle/YLybnsyXXErKEg3s9)

---
 
## Final Submission
 
Once your repository is complete, submit your work through the official submission form below. The form will **stop accepting responses after Monday, August 17th, 2026** — no late submissions will be accepted.
 
> **Submission Form:** [https://forms.gle/KrT4VxtFtkU3wtYu8](https://forms.gle/KrT4VxtFtkU3wtYu8)
