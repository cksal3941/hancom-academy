# Hancom Academy Design System

## 1. Direction

The interface uses a restrained academy-notice style: white editorial surfaces, Hancom navy as the anchor, clear blue accents for navigation and state, and generous spacing for readability.

## 2. Tokens

- Brand: `--color-brand` `#010859`
- Accent: `--color-accent` `#1e4fcc`
- Soft accent hover: `--color-accent-soft` `rgba(86, 137, 241, 0.14)`
- Soft accent hover text: `--color-accent-soft-text` `#123ca5`
- Accent light: `--color-point` `#5689F1`
- Surface: `--color-surface` `#ffffff`
- Page background: `--color-bg` `#F6F9FF`
- Subtle background: `--color-bg-subtle` `#f4f6fb`
- Border: `--border-color` `#e8eaf0`
- Text primary: `#151823`
- Text secondary: `#3b3f4a`
- Text muted: `#6f7481`
- Form border: `#7f8798`
- Form hint text: `#737b8c`

## 3. Typography

- Font family: `--font-sans`
- Detail category label: 20px, 800 weight
- Detail title: responsive `clamp(30px, 3vw, 46px)`, 1.3 line-height
- Detail body: 18px, 1.9 line-height

## 4. Spacing And Shape

- Page sections use 24px side padding and wide content containers.
- Detail pages use 4px and 8px radii only.
- Detail content uses airy vertical rhythm with 4px-based spacing.

## 5. Components

- `notice-detail`: detailed article surface shared by notices, opening notices, and news.
- `notice-board__table`: notice/opening notice list table with a bold navy header-bottom rule, bold column headers, six desktop columns, roomy 82px rows, 18px medium-weight titles, and a soft blue hover state.
- `notice-detail__head`: elevated header block with no top rule, accent category label, balanced title, and compact metadata.
- `notice-detail__body`: readable article body with a subtle section boundary and comfortable paragraph rhythm.
- `notice-detail__actions`: primary and destructive actions with visible hover and focus states.
- `news-card-grid`: image-led news listing used only on `/notice/news`, with three desktop columns, thumbnail-first cards, 18px titles, and author/view/date metadata.
- `nw-form`: notice writing form with stacked desktop fields, 16px controls, compact title input width, and readable medium-gray helper text.
- `chatbot-panel`: floating consultation assistant with quick question chips, keyword-based guidance, phone/location actions, and polite Korean copy.

## 6. Responsive Behavior

- Detail pages keep a single-column reading flow at all breakpoints.
- News cards use three columns on desktop, two on tablet, and one on mobile.
- Metadata and action rows stack below 768px.
- Long Korean titles use balanced wrapping where supported.

## 7. Accessibility

- Interactive controls must keep visible focus rings.
- Body text contrast must stay comfortably above WCAG AA.
- Motion is limited to opacity, color, and transform transitions.
