## Exercise 2

### 1. Server Component Exercise

- Create a new Server Component page at `/products`
- Fetch data from `https://dummyjson.com/products`
- Display 5 product titles in a list

### 2. Client Component Exercise

- Create a component with `"use client"` at the top
- Add a counter with a button that updates `count` on click
- Render it inside a Server Component

### 3. SSR Simulation Exercise

- Create a page that renders `new Date().toLocaleTimeString()`
- Refresh the page and observe if the time updates

### 4. Static Page Exercise

- Create a page with `export const dynamic = "force-static"`
- Render static content like “About Us”
- Build the app and confirm the HTML is static

### 5. Streaming Exercise

- Create a `slowComponent` that waits 3 seconds using `setTimeout`
- Use it inside a page with `<Suspense fallback="Loading...">`
- Confirm that the fallback appears before the content

## Run the app

Use a different port than exercise-1, for example:

```bash
npm run dev -- --port 3001
```

Then open:

- http://localhost:3001
