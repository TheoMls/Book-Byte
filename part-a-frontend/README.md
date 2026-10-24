# Book & Byte

**Book & Byte** is a responsive web application designed to bridge the gap between computer science, business, and design education and the essential textbooks required to master them. The portal allows users to explore curated university-level courses, discover required reading materials, search and filter catalog items, and go through a multi-step account registration workflow.

---

## Built With

- **HTML5**: Semantic markup for page structure (`index.html`, `courses.html`, `books.html`, `course-details.html`, `about.html`, `sign_up.html`).
- **CSS3**: Custom styling using CSS variables (`theme.css`), component abstractions (`components.css`), responsive layouts (`layout.css`), and CSS resets (`reset.css`).
- **JavaScript (ES6)**: Vanilla JS for DOM manipulation, dynamic page rendering, interactive filtering, menu drawers, and multi-step form handling.
- **JSON / JS Objects**: In-memory static datasets (`courses.js`, `books.js`, `categories.js`) acting as a lightweight client-side data store.

---

## Features & Functionality

### Home Page (`index.html`)
- **Category Navigation**: Dynamically renders core learning domains (Computer Science, Business & Finance, Art & Graphic Design, Data Science, Web Development) fetched from `categories.js`.
- **Featured / Suggested Textbooks**: Horizontally scrollable recommended book collection with wheel-event support.

### Courses Catalog & Details (`courses.html`, `course-details.html`)
- **Course Catalog**: Displays course cards showing target skill levels (Beginner, Intermediate, Advanced), duration (in weeks), dynamic category badges, and assigned instructor details.
- **Filtering & Search**:
  - Full-text search across course titles, descriptions, and instructor names.
  - Category checkbox filtering.
  - Interactive range sliders for **Max Duration** and **Max Difficulty**.
- **Course Detail View**: Displays complete course summaries alongside the required dynamic textbook list pulled directly from the catalog.

### Books Catalog (`books.html`)
- **Book Listings**: Exhibits detailed textbook entries including cover art, author/publisher details, associated course links, stock availability, and publication years.
- **Multi-criteria Filtering**:
  - Title, description, and publisher keyword search.
  - "In-Stock Only" availability checkbox.
  - Publication year range filter.
  - Publisher and Course associations checkboxes.

### Interactive User Onboarding (`sign_up.html`)
- **Multi-Step Registration & Login Flow**:
  **Email Verification**: Checks whether an email exists in the local database.
  **Authentication / Password Setup**: Dynamic real-time password strength validation checking:
     - Minimum length (8+ characters)
     - At least one lowercase letter
     - At least one uppercase letter
     - At least one number
  **Personal Profile Setup**: First name, last name, and date of birth validation (age restriction: 16–120 years).
  **Feed Customization**: Selection of user experience level and primary learning domain interests.
  **Review & Terms Confirmation**: Summary view of user details and terms agreement confirmation before final creation.

### Responsive Navigation (`menu.js`, `layout.css`)
- **Dual Navigation**: Top navigation bar for desktop viewports and a smooth slide-out side navigation drawer (`sidenav`) with backdrop blur overlay for mobile viewports.

---

## Project Structure
```text
.
├── index.html
├── courses.html
├── course-details.html
├── books.html
├── about.html
├── sign_up.html
└── assets/
    ├── css/
    │   ├── reset.css
    │   ├── theme.css
    │   ├── components.css
    │   └── layout.css
    ├── js/
    │   ├── index.js
    │   ├── courses.js
    │   └── data/
    │       ├── books.js
    │       └── courses.js
    └── img/
        └── logo.png
```
---

## Local Setup & Usage

**Clone or Download** the repository to your local machine.
**Open the Application**:
   - No server configuration or `npm install` is required.
   - Simply open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
**Demo Account Details**:
   - Pre-configured login credentials for testing:
     - **Email**: `mail@aueb.gr`
     - **Password**: `123456Aa`

---

Developed as an academic web development project (2024–2025)
