// tests/restful-booker.spec.ts
import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('Restful-Booker API test suite', () => {
  let apiContext: APIRequestContext;
  const baseURL = 'https://restful-booker.herokuapp.com';
  let authToken: string;
  let createdBookingId: number;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { 'Content-Type': 'application/json' }
    });
  });

  test('GET /booking (all IDs)', async () => {
    const res = await apiContext.get('/booking');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('GET /booking response:\n', JSON.stringify(body, null, 2));
  });

  test('POST /booking → Create booking', async () => {
    const bookingData = {
      firstname: 'Jane',
      lastname: 'Doe',
      totalprice: 123,
      depositpaid: true,
      bookingdates: { checkin: '2025-07-01', checkout: '2025-07-05' },
      additionalneeds: 'Breakfast'
    };
    const res = await apiContext.post('/booking', { data: bookingData });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    createdBookingId = body.bookingid;
    console.log('POST /booking response:\n', JSON.stringify(body, null, 2));
  });
});
