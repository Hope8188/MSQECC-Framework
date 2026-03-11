import { test, expect } from '@playwright/test';

test('chat flow renders a delayed local response', async ({ page }) => {
  await page.route('http://127.0.0.1:11434/api/generate', async (route) => {
    await page.waitForTimeout(1200);
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ response: 'Delayed local inference complete.' }),
    });
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const input = page.getByTestId('chat-input');
  await expect(input).toBeVisible();
  await input.fill('Run a local systems check');

  const send = page.getByTestId('send-button');
  await expect(send).toBeEnabled();
  await send.click();

  await expect(page.getByText('Run a local systems check').last()).toBeVisible();
  await expect(page.getByText('Delayed local inference complete.')).toBeVisible();
  await expect(page.getByText('[ Processed via Local Web Bridge ]')).toHaveCount(0);
});
