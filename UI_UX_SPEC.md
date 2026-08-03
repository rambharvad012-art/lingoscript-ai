# UI/UX Specification Document
**Project:** LingoScript AI
**Role:** Senior Product Designer & UI/UX Architect
**Version:** 1.0.0
**Target Aesthetic:** Premium, Minimal, Enterprise SaaS (Inspired by Linear, Vercel, Notion, Perplexity)
## 1. Design Philosophy
 * **Content-First Minimalism:** The interface must recede, allowing the user's video content, transcripts, and AI insights to take center stage.
 * **High Information Density:** Optimize for readability and scanning. Avoid unnecessary padding; use typography and subtle borders to establish hierarchy.
 * **Tactile & Responsive:** Every interaction (hover, click, focus) must have immediate visual feedback.
 * **Dark Mode Optimized:** Default to a sophisticated dark theme with deep grays (Zinc/Slate) to reduce eye strain for pro users, with a perfectly balanced high-contrast light mode.
## 2. Color Palette
Using a strictly controlled, monochromatic base with a singular, high-intent accent color.
| Role | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| **Background** | #FFFFFF | #09090B (Zinc 950) | Main app backgrounds. |
| **Surface** | #FAFAFA (Zinc 50) | #18181B (Zinc 900) | Cards, sidebars, secondary panels. |
| **Border** | #E4E4E7 (Zinc 200) | #27272A (Zinc 800) | Dividers, subtle input borders. |
| **Text Primary** | #09090B (Zinc 950) | #FAFAFA (Zinc 50) | Headings, primary body copy. |
| **Text Muted** | #71717A (Zinc 500) | #A1A1AA (Zinc 400) | Timestamps, placeholders, helper text. |
| **Primary Accent** | #18181B (Zinc 900) | #FFFFFF | Primary buttons (inverted contrast). |
| **Brand Accent** | #3B82F6 (Blue 500) | #3B82F6 (Blue 500) | Active states, focus rings, AI chat bubbles. |
| **Destructive** | #EF4444 (Red 500) | #F87171 (Red 400) | Deletion, critical errors. |
## 3. Typography
 * **Primary Font (Sans-Serif):** Inter or Geist Sans. Used for UI elements, dashboards, and general body text.
 * **Monospace Font:** JetBrains Mono or Geist Mono. Used strictly for timestamps, code blocks, and data exports.
 * **Scale:** Base size 14px for UI panels, 16px for long-form reading (transcripts). Line height set to 1.5 for body, 1.2 for headings.
 * **Tracking (Letter Spacing):** -0.02em on headings for a tighter, premium feel.
## 4. Spacing System
Based on a strict 4px grid (Tailwind defaults).
 * 2px / 4px: Component internal spacing (e.g., icon next to text).
 * 8px (p-2): Standard button/input padding.
 * 16px (p-4): Standard card padding, section gaps.
 * 24px (p-6): Modal padding, dashboard widget gaps.
 * 32px+: Section dividers, page-level padding.
## 5. Icon Style
 * **Library:** Lucide or Phosphor Icons.
 * **Style:** Stroke-based (1.5px to 2px weight), rounded caps, completely un-filled (except for active/selected states).
 * **Size:** Standard 16x16 for inline buttons, 20x20 for sidebar navigation, 24x24 for empty states.
## 6. Buttons
 * **Primary:** Solid background (Zinc-900 in Light, White in Dark). Text inverted. No border. Slight hover opacity drop (0.9).
 * **Secondary/Outline:** Transparent background, 1px solid border (Zinc-200/800). Text primary color. Hover state adds Surface background.
 * **Ghost:** No background, no border. Text muted, turns to text primary with Surface background on hover.
 * **Corner Radius:** 6px (rounded-md) for a sharp, modern enterprise feel.
 * **Focus State:** 2px offset focus ring using Brand Accent (Blue 500).
## 7. Inputs
 * **Style:** Minimal. 1px solid border matching the Surface color, transitioning to Zinc-300/700 on hover, and Brand Accent on focus.
 * **Background:** Transparent or slightly off-background (Zinc-50/900).
 * **Corner Radius:** 6px (rounded-md).
 * **Search/Chat Inputs:** Pill-shaped (rounded-full) for AI chat to distinguish conversational UI from data-entry UI. Soft internal shadow (shadow-inner).
## 8. Cards
 * **Design:** Flat, no heavy drop shadows. Rely on 1px borders and subtle background differentiation.
 * **Hover Effect (for clickable cards):** Subtle transform (translate-y-[-1px]) and a soft, diffused shadow (shadow-sm) to indicate interactivity.
## 9. Sidebar
 * **Layout:** Fixed left side, 240px wide. Collapsible to 64px (icon-only mode).
 * **Visuals:** Separated from the main content area by a 1px right border. No background color difference from the main canvas.
 * **Active Item:** Highlighted with a subtle Surface background and a 2px left-border indicator in Brand Accent.
## 10. Navigation
 * **Top Bar:** Minimal header inside the dashboard. Contains breadcrumbs (e.g., Dashboard / Videos / Q3 All Hands), Global Search input (Cmd+K), and User Profile dropdown.
 * **Sticky Behavior:** Top bar remains sticky with a glassmorphism effect (backdrop-blur-md + rgba background) on scroll.
## 11. Dashboard Layout
 * **Grid:** 12-column CSS Grid.
 * **Structure:** Sidebar (Left) | Main Canvas (Center/Right).
 * **Main Canvas Max-Width:** 1200px for readability, centered if the screen is ultra-wide.
## 12. Mobile Responsive Layout
 * **Sidebar:** Hides behind a hamburger menu; slides in as a drawer from the left.
 * **Navigation:** Top bar remains fixed.
 * **Complex UI (Transcripts/Chat):** Stacked vertically. Transcript on top, AI Chat acts as a bottom sheet that can be pulled up or toggled via a floating action button (FAB).
## 13. Landing Page Sections
 * **Hero:** Bold, oversized typography. Gradient text accent. Floating UI mockup showcasing the transcript and AI chat simultaneously.
 * **Social Proof:** Grayscale logos of trusted companies.
 * **Features (Bento Box):** Asymmetrical grid layout showcasing features (Bilingual, Unlimited Video, Export) in distinct, subtly bordered cards with micro-animations.
 * **Interactive Demo:** A simplified, read-only version of the app showing a pre-transcribed video with functioning timestamps.
 * **Pricing & CTA:** Clear tiers, massive primary button.
## 14. Login Page
 * **Layout:** Split screen. Left side: Centered, minimal login form (Email, Password, Google OAuth button). Right side: Ethereal, abstract dark-mode gradient or subtle 3D mesh animation.
 * **Form Style:** Floating labels or clean top-labels.
## 15. Signup Page
 * **Flow:** Identical layout to Login. Includes password strength indicator (progress bar) and a clear "Terms of Service" checkbox.
## 16. Forgot Password
 * **UI:** Focused, single input for email. "Back to Login" ghost button. Success state replaces the form with a minimal checkmark icon and instructions.
## 17. Dashboard
 * **Header:** "Welcome back, [Name]".
 * **Quick Actions:** Large, dashed-border dropzone for "Upload New Video".
 * **Recent Activity:** Table or list view of recent videos. Columns: Title, Status (Pill indicator), Duration, Language, Upload Date, Action Menu (...).
## 18. Upload Video Page (Modal/Drawer)
 * **Component:** Centered modal or slide-out drawer.
 * **Interaction:** Drag-and-drop zone. Supported formats and size limits listed in muted text.
 * **Configuration:** Once dropped, reveal a minimal form: Target Language (Auto-detect/English/Hindi), Generate Summary (Toggle), Generate Subtitles (Toggle).
## 19. Upload Progress Screen
 * **Visuals:** Clean, linear progress bar.
 * **Data:** Upload speed (MB/s), time remaining, file size.
 * **State:** "Please do not close this window" warning in a muted, non-aggressive tone.
## 20. Processing Screen
 * **Visuals:** Skeleton loaders replacing the final UI components.
 * **Status Text:** Stepper showing backend progress (1. Extracting Audio -> 2. Transcribing -> 3. Summarizing). Uses a subtle pulsing animation on the active step.
## 21. Transcript Viewer
 * **Layout:** Left/Center column.
 * **Video Player:** Sticky top or floating Picture-in-Picture (PiP) so the user can scroll text while watching.
 * **Text Blocks:** Segmented by timestamps (JetBrains Mono). Active timestamp block is highlighted (Surface color) as the video plays.
 * **Interaction:** Clicking any text block seeks the video to that exact millisecond.
## 22. AI Chat Interface
 * **Layout:** Right column (or toggleable sidebar).
 * **Style:** Chat bubbles. User (Primary Accent background, white text). AI (Surface background, primary text).
 * **Citations:** AI responses include clickable footnote chips (e.g., [01:14]) that instantly seek the video to the referenced moment.
## 23. Summary Screen
 * **Location:** Tab inside the Transcript Viewer (Tabs: Transcript | Summary | Key Points).
 * **Design:** Rich text layout. Large heading. Bullet points for key takeaways. Uses a slightly larger font size (16px) for readability.
## 24. Export Screen (Dialog)
 * **Component:** Popover or Modal.
 * **Options:** Grid of format icons (TXT, PDF, DOCX, SRT).
 * **Toggles:** "Include Timestamps", "Include Speaker Names".
 * **Action:** "Download" (Primary button).
## 25. History Screen
 * **Layout:** Full-page data table.
 * **Features:** Search bar, date range picker, filter by language/status.
 * **Pagination:** Standard numeric pagination or infinite scroll for seamless browsing.
## 26. Profile
 * **Layout:** Simple form layout in the center canvas.
 * **Fields:** Avatar upload, Name, Email, Password change.
## 27. Settings
 * **Categories:** Account, Billing, API Keys, Preferences.
 * **UI:** Vertical tabs on the left, corresponding forms on the right.
 * **Danger Zone:** Red bordered section at the bottom for "Delete Account".
## 28. Pricing Page
 * **Layout:** 3-column card layout.
 * **Hierarchy:** Center card (Pro Tier) slightly elevated and highlighted with a Brand Accent border.
 * **Features:** Checkmark lists. Tooltips for complex feature explanations.
## 29. Error Pages (404 / 500)
 * **Visuals:** Massive typography for the error code (e.g., "404"). Minimal explanation.
 * **Action:** Primary button to "Return to Dashboard".
## 30. Loading Skeletons
 * **Design:** Replaces spinners. Blocks of muted background color that pulse subtly (animate-pulse).
 * **Fidelity:** Match the exact shape, height, and border-radius of the content they are replacing (e.g., circular for avatars, text-height lines for transcripts).
## 31. Empty States
 * **Visuals:** Center-aligned. A large, thin-stroke icon.
 * **Copy:** Clear title (e.g., "No videos yet"). Helpful subtitle.
 * **Action:** Primary button prompting the core action (e.g., "Upload your first video").
## 32. Toast Notifications
 * **Location:** Bottom right.
 * **Style:** Dark mode floating card regardless of theme, ensuring high contrast.
 * **States:** Success (Green icon), Error (Red icon), Info (Blue icon).
 * **Behavior:** Auto-dismiss after 4 seconds. Stackable.
## 33. Accessibility Rules
 * **Contrast:** Minimum WCAG AA 4.5:1 ratio for all text against backgrounds.
 * **Keyboard:** Full keyboard navigability. Focus states must never be disabled (outline: none only if replaced by custom focus ring).
 * **ARIA:** Use aria-live for transcript text changes and AI chat responses. All icons must have aria-label if not accompanied by text.
## 34. Responsive Breakpoints (Tailwind Standards)
| Name | Width | Usage |
|---|---|---|
| sm | 640px | Large phones. Convert bottom sheets to modals. |
| md | 768px | Tablets. Adjust grids to 2-column. |
| lg | 1024px | Small laptops. Show persistent sidebar. |
| xl | 1280px | Standard desktops. Expand canvas to max-width. |
| 2xl | 1536px | Ultra-wide monitors. Center the main wrapper. |
## 35. Component Library Base
 * **Framework:** Built on **shadcn/ui** or a custom **Radix UI** implementation.
 * **Headless Approach:** Logic and state are decoupled from styles. Tailwind CSS handles all styling injected into class names.
 * **Variants:** Utilize cva (class variance authority) for managing button and badge states cleanly in the codebase.
