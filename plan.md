Context:
I have a portfolio website built with Flutter (target: web + mobile). I want a professional, modern UI and better asset management. Please implement UI improvements, move all images into a single assets folder, update paths, and add a project image gallery modal.

Goal:
Polish the UI, centralize images into `assets/images/`, make each project clickable to open a dialog with that project's images in a carousel, and ensure performance and accessibility.

Technical assumptions:
- Framework: Flutter (if you prefer React/Vanilla JS say so and adapt).
- Current images are scattered across the repo (various folders and/or remote URLs).
- Use `package:flutter` widgetry and standard packages. If using 3rd-party packages, prefer well-known ones (e.g., `carousel_slider` or `photo_view` for Flutter) and add to pubspec.

Tasks:

A. Visual / UX
1. Header / Hero
   - Clean hero with name, role, CTA button (View Projects or Contact).
   - Add subtle background (gradient or patterned SVG) and a small profile/avatar on desktop.
2. Typography & colors
   - Choose 2 fonts (display + body). Use consistent sizes and spacing.
   - Provide a neutral professional palette (primary, accent, background, surface).
3. Layout & cards
   - Project grid responsive: 1 column mobile, 2 tablet, 3 desktop (adjustable).
   - Project card includes: thumbnail, title, short summary (max 2 lines), tech tags, and a hover/tap elevation effect.
4. Footer
   - Simple footer with social links and copy.

B. Asset management
1. Create `assets/images/` root (or `web/assets/images/` if web-specific).
2. Move all existing images into that folder.
3. Normalize filenames: use lowercase, hyphens/underscores, e.g.:
   - `avatar.jpg`, `project-01-thumb.jpg`, `project-01-01.jpg`, `project-01-02.jpg`, etc.
4. Update references:
   - Flutter: update `pubspec.yaml` to include `assets/images/` and update all Image.asset/Image.file/Image.network usages to use the new paths.
   - If React: update imports/paths accordingly.

C. Project modal & gallery
1. For each project, read images with a naming convention or a small JSON list:
   - Option A: If backend/static JSON exists, wire it to the project entry that already references a `images: [ ... ]` list.
   - Option B: If not, infer by `project-<id>-*.jpg` pattern and produce a list in code.
2. When clicking a project card:
   - Open a centered modal/dialog overlay with:
     - Carousel/gallery of images (swipe on mobile, arrow/keyboard navigation on desktop).
     - Project title, date, technologies, short description.
     - Buttons for visiting live/demo and GitHub (if available), and a close button (Esc to close).
   - Allow fullscreen image view / pinch-to-zoom optionally.
   - Preload the first image and lazy-load subsequent ones.
3. Accessibility:
   - Modal should trap focus while open.
   - Provide alt text for images and semantic labels for buttons.
   - Ensure color contrast for text/buttons.
4. UX niceties:
   - Smooth fade/slide animations for opening modal and image transitions.
   - Show image thumbnails below main carousel if >1 image.

D. Performance & best practices
1. Generate multiple image sizes or use srcset-like approach if possible, or at least use appropriately sized thumbnails for gallery and larger images for modal.
2. Use lazy-loading for offscreen images.
3. Optimize images (crop/resize) — if you can't perform binary optimization, at least document recommended sizes and which images to compress.

E. Code quality, commits & documentation
1. Make small, logical commits:
   - `chore(assets): move images to assets/images and update paths`
   - `feat(ui): implement responsive projects grid and polished hero`
   - `feat(project-modal): add modal gallery carousel for projects`
2. Add or update README with:
   - How to add a new project and images (file naming convention).
   - How to run the app locally and build for web.
3. Provide a short test checklist for QA (responsive breakpoints, keyboard navigation tests, image load tests).

Acceptance Criteria (must satisfy)
1. All images exist in `assets/images/` and no references remain to the old scattered paths.
2. Project cards show thumbnails; clicking opens a dialog with a working carousel and project details.
3. Responsive layout: grid adjusts at breakpoints (mobile/tablet/desktop).
4. Modal traps focus, Esc closes modal, and arrow keys navigate images.
5. All pages pass basic accessibility checks (alt text present, color contrast OK).
6. Lazy loading implemented and pubspec.yaml (or equivalent) updated.
7. Provide a short README update and a list of changed files.

Extras (nice-to-have)
- Light/dark theme toggle.
- Integrate tiny image placeholder (LQIP) while images load.
- Add subtle micro-interactions (button ripple, card hover shadow).
- Analytics event on “project open” (only if privacy-considered).

If you need sample code or a starting PR, create small production-ready snippets and include them in the PR description. If adapting to React, do the same with `public/assets/images/` and update imports.

Deliverables:
- Updated repo (commits with messages).
- `assets/images/` filled with moved images and naming scheme.
- README changes with instructions to add new project images.
- Short QA checklist and a 1–2 line developer note summarizing what changed.

Time: implement incrementally in commits; stop and list any images that could not be moved or missing metadata.
