import { describe, it, expect } from 'vitest';

describe('Testing Setup Verification', () => {
  it('should run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string comparisons', () => {
    const greeting = 'Hello, World!';
    expect(greeting).toContain('World');
  });

  it('should work with objects', () => {
    const user = { name: 'Test User', age: 25 };
    expect(user).toHaveProperty('name');
    expect(user.age).toBeGreaterThan(18);
  });

  it('should work with arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });
});

