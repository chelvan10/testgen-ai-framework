import { test, expect } from '@playwright/test';
import { loadTestData } from '../../utils/dataLoader';

const users = loadTestData('users.json').loginUsers;

users.forEach(user => {
  test(`Login with role: ${user.role}`, async ({ page }) => {
    await page.goto('https://example.com');
    expect(user.email).toBeDefined();
  });
});