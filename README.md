# E-Commerce Product Multi-Filter Sidebar

A full-stack marketplace browsing interface where users can filter an extensive product inventory using category, price range, and minimum star rating. 

## Key Features
- **Sticky Filter Sidebar:** Category checklist, dual-point price range slider, and minimum star rating radio buttons.
- **Instant State Feedback:** The product grid updates instantly on every click or slider adjustment without a "Submit" button.
- **Graceful Null Handling:** Displays a "No items match your criteria. Reset filters" screen when filters are too strict. Shows the full inventory when no filters are selected.
- **Vibe Check (Sorting):** "Sort By" dropdown (Price: Low to High, Top Rated First). The logic filters the dataset first, then sorts the remaining items.

## Architecture & Tech Stack
- **Backend (Server-Side Logic):** Node.js + Express. Handles all business logic, combinatorial intersect filtering, and sorting.
- **Frontend (Presentation):** HTML, CSS, Vanilla JavaScript. Handles UI interactions and API fetching.

## How to Run Locally
1. **Start the Backend:**
   - Open terminal and navigate to the `backend` folder.
   - Run `npm install`
   - Run `node server.js` (Server starts on `http://localhost:5000`)
2. **Start the Frontend:**
   - Open the `frontend` folder in VS Code.
   - Right-click `index.html` and select "Open with Live Server".
