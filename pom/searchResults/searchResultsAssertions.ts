// import { expect, Page } from '@playwright/test';
// import { SearchResultsLocators } from '../searchResults/searchResultsLocators';

// export class SearchResultAssertions {
//   constructor(private page: Page) {}

//   async isVisible() {
//     await expect(this.page.locator(SearchResultsLocators.searchResultSection)).toBeVisible();
//   }

//   async hasAtLeastOneResult() {
//     const results = this.page.locator(SearchResultsLocators.resultItems);
//     await expect(results).toHaveCountGreaterThan(0);
//   }

//   async resultsMatchKeyword(keyword: string) {
//     const items = this.page.locator(SearchResultsLocators.resultTitles);
//     const count = await items.count();

//     for (let i = 0; i < count; i++) {
//       const title = await items.nth(i).innerText();
//       expect(title.toLowerCase()).toContain(keyword.toLowerCase());
//     }
//   }

//   async noResultsDisplayed() {
//     const message = this.page.locator(SearchResultsLocators.noResultsText);
//     await expect(message).toBeVisible();
//     await expect(message).toContainText(/no results/i);
//   }

//   async itemCountEquals(expected: number) {
//     const items = this.page.locator(SearchResultsLocators.resultItems);
//     await expect(items).toHaveCount(expected);
//   }
// }
