// Number of Endpoints Used: 5
// GET /api/users?page=2 (get all users)
// GET /api/users/2 (get single user)
// POST /api/users (create user)
// PUT /api/users/2 (update user)
// DELETE /api/users/2 (delete user)

import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('ReqRes API Test Suite', () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: 'https://reqres.in',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
  });


  test('GET /api/users?page=2 → List users', async () => {
    const res = await apiContext.get('/api/users?page=2');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('GET /api/users?page=2:\n', JSON.stringify(body, null, 2));
  });

  test('GET /api/users/2 → Single user', async () => {
    const res = await apiContext.get('/api/users/2');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('GET /api/users/2:\n', JSON.stringify(body, null, 2));
  });

  test('POST /api/users → Create user', async () => {
    const userData = {
      name: 'Tatev',
      job: 'QA Engineer',
    };
    const res = await apiContext.post('/api/users', { data: userData });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('POST /api/users response:\n', JSON.stringify(body, null, 2));
  });

  test('PUT /api/users/2 → Update user', async () => {
    const updatedData = {
      name: 'Tatev Updated',
      job: 'Automation Engineer',
    };
    const res = await apiContext.put('/api/users/2', { data: updatedData });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    console.log('PUT /api/users/2 response:\n', JSON.stringify(body, null, 2));
  });

  test('DELETE /api/users/2 → Delete user', async () => {
    const res = await apiContext.delete('/api/users/2');
    expect(res.status()).toBe(204); // 204 No Content is expected
    console.log('DELETE /api/users/2 → Status:', res.status());
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Check status of all endpoints', async () => {
    // GET /api/users?page=2
    const resList = await apiContext.get('/api/users?page=2');
    expect(resList.status()).toBe(200);

    // GET /api/users/2
    const resSingle = await apiContext.get('/api/users/2');
    expect(resSingle.status()).toBe(200);

    // POST /api/users
    const resCreate = await apiContext.post('/api/users', {
      data: { name: 'StatusCheck', job: 'Test' },
    });
    expect(resCreate.status()).toBe(201);

    // PUT /api/users/2
    const resUpdate = await apiContext.put('/api/users/2', {
      data: { name: 'StatusCheck Updated', job: 'Test Updated' },
    });
    expect(resUpdate.status()).toBe(200);

    // DELETE /api/users/2
    const resDelete = await apiContext.delete('/api/users/2');
    expect(resDelete.status()).toBe(204);
  });
});


// | Concept                  | What You Did                                                    |
// | ------------------------ | --------------------------------------------------------------- |
// | APIRequestContext        | Created once for all requests                                   |
// | GET requests             | Fetched user lists and single user details                      |
// | POST with body           | Created a user with `name` and `job`                            |
// | PUT with body            | Updated a user                                                  |
// | DELETE request           | Deleted a user and verified `204` status                        |
// | Logging responses        | Used `console.log` to print full responses in a readable format |
// | Assertions with `expect` | Validated that responses are OK or have specific status codes   |

/*
No API key is required for the ReqRes API (https://reqres.in). It is a public demo API and does not require authentication or an API key for any of its endpoints.
*/