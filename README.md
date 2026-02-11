# Playwright Asana Evaluation

Data-driven Playwright test suite for validating tasks and tags in a demo Asana-style application.

---

## Tech Stack

- JavaScript  
- Playwright Test Runner  

---

## Approach

This test suite uses a data-driven design pattern to eliminate code duplication and improve scalability.

All test scenarios are driven from a JSON-like array (`testCases`), allowing new cases to be added without modifying test logic.

Each test:

1. Logs into the demo application  
2. Navigates to the correct area (Web or Mobile)  
3. Locates the appropriate column dynamically  
4. Verifies the task exists  
5. Confirms associated tags  

---

## How to Run

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

---

## Notes

- Selectors use accessible roles where possible.  
- Column detection is dynamic via heading matching.  
- Task cards are validated within scoped column containers.  
- Tests are fully data-driven and scalable.  
