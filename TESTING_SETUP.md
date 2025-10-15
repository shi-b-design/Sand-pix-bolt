# Testing Setup Complete ✅

## Installed Packages

- `vitest` - Fast test runner for Vite projects
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - DOM matchers for assertions
- `@testing-library/user-event` - User interaction simulation
- `jsdom` - DOM environment for Node.js
- `@vitest/ui` - Visual UI for test results

## Configuration Files

### `vite.config.ts`

- Added vitest configuration
- Set `globals: true` for global test functions
- Set `environment: 'jsdom'` for DOM testing
- Added setup file reference

### `src/test/setup.ts`

- Imports jest-dom matchers for better assertions

### `package.json`

New test scripts added:

- `npm test` - Run tests in watch mode
- `npm run test:ui` - Open visual test UI in browser
- `npm run test:coverage` - Generate coverage report

## Next Steps

### 1. Create Your First Test

Create a test file: `src/utils/__tests__/preferenceInference.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { inferUserPreferences } from "../preferenceInference";

describe("Preference Inference", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
```

### 2. Run Tests

```bash
# Watch mode (recommended for development)
npm test

# Run once
npm test -- --run

# With UI
npm run test:ui

# With coverage
npm run test:coverage
```

### 3. Test Structure

Organize tests with `__tests__` directories:

```
src/
  utils/
    __tests__/
      preferenceInference.test.ts
      geminiApi.test.ts
  components/
    __tests__/
      SwipeInterface.test.tsx
  store/
    __tests__/
      useSwipeStore.test.ts
```

## Test Categories to Implement

1. **Unit Tests**

   - `preferenceInference.ts` - Calculation logic
   - `geminiApi.ts` - API calls (with mocks)
   - `brandData.ts` - Data validation

2. **Integration Tests**

   - Store + Components interaction
   - Complete user flow (swipe → calculate → generate)

3. **Component Tests**
   - SwipeInterface rendering
   - BrandInfoForm validation
   - HeroPreview display

## TDD Workflow

1. **Red** - Write a failing test
2. **Green** - Write minimal code to pass
3. **Refactor** - Improve code while keeping tests green

```bash
# Start with watch mode
npm test

# Tests will automatically re-run when files change
```

## Useful Commands

```bash
# Run specific test file
npm test preferenceInference

# Run tests with specific pattern
npm test -- --grep "calculation"

# Run tests in a specific directory
npm test src/utils

# Generate coverage report
npm run test:coverage
```

## Example Test Structure

```typescript
describe("Feature Name", () => {
  // Setup before each test
  beforeEach(() => {
    // Reset state, mock functions, etc.
  });

  it("should do something specific", () => {
    // Arrange - Set up test data
    const input = {
      /* test data */
    };

    // Act - Call the function
    const result = myFunction(input);

    // Assert - Check the result
    expect(result).toBe(expectedValue);
  });

  it("should handle edge cases", () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

## Resources

- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## Status

✅ Testing framework installed
✅ Configuration files updated
✅ Test setup file created
✅ Scripts added to package.json
🎯 Ready to write tests!
