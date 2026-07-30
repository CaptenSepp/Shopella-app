import '@testing-library/jest-dom/vitest' // jest-dom matchers for Vitest
import { vi } from 'vitest'

// Global test setup stays minimal to keep tests deterministic.
class TestResizeObserver {
  observe() { /* Layout size changes are not available in jsdom. */ }
  unobserve() { /* Nothing needs cleanup in this small test double. */ }
  disconnect() { /* Keep the browser API shape used by AI Elements. */ }
}

globalThis.ResizeObserver = TestResizeObserver as typeof ResizeObserver
vi.stubGlobal('scrollTo', vi.fn())
