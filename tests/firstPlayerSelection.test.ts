import { test, expect } from '@playwright/test';

test('First Player Selection Test', async ({ page }) => {
  // Navigate to the app locally
  await page.goto('http://localhost:3000');
  
  // Initial status should show Player X's turn by default
  await expect(page.locator('.status-message')).toContainText("Player X's turn");
  
  // Select O as the first player
  await page.locator('input[value="O"]').click();
  
  // Status should now show Player O's turn since we modified the code to update currentPlayer
  await expect(page.locator('.status-message')).toContainText("Player O's turn");
  
  // Make a move with O by clicking a cell
  await page.locator('.board .cell').first().click();
  
  // Check that it alternates to X's turn
  await expect(page.locator('.status-message')).toContainText("Player X's turn");
  
  // Make a move with X
  await page.locator('.board .cell').nth(1).click();
  
  // Should be back to O's turn
  await expect(page.locator('.status-message')).toContainText("Player O's turn");
  
  // Reset the game (we need to play until someone wins or it's a draw)
  // Let's just play until someone wins
  await page.locator('.board .cell').nth(2).click(); // O plays
  await page.locator('.board .cell').nth(3).click(); // X plays
  await page.locator('.board .cell').nth(4).click(); // O plays
  await page.locator('.board .cell').nth(5).click(); // X plays
  await page.locator('.board .cell').nth(6).click(); // O plays
  
  // Game should be over with O winning
  await expect(page.locator('.status-message')).toContainText("Player O wins!");
  
  // Reset game
  await page.locator('button.reset-button').click();
  
  // Verify O starts again
  await expect(page.locator('.status-message')).toContainText("Player O's turn");
});
