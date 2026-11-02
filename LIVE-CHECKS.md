# Lab 20 live checks

Live API: <https://hzh1103-portfolio-blog-api.netlify.app>

Repository: <https://github.com/HZH1103/portfolio-blog-api>

Checked: 2 November 2026 (Asia/Shanghai).

## Readiness

`GET /health` returns `200 {"status":"ok"}` after the database ping succeeds. The response contains no database address and no error details. After a redeploy, `/health` still returns 200 and a post created before the redeploy is still returned by `GET /api/blog/:id`, so the data is persisted in MongoDB Atlas rather than kept in memory.

## Checked features and permissions

| Check | Result |
| --- | --- |
| Public reads: blog list, blog detail, project list, project detail, comment list | 200 |
| Registration, login, contact submission | 201, 200, 201 |
| `/api/users/me` without a token | 401 |
| Author creates, updates and deletes their own post | 201, 200, 204 |
| Another author updates the post | 403 |
| Signed-in comment creation; public comment list | 201, 200 |
| Comment author and post author delete a comment | 204 |
| Deleting a post that still has comments | 409 until the comments are removed |
| Non-admin project write and non-admin contact list | 403, 403 |
| Admin project create, update and delete | 201, 200, 204 |
| Visitor contact receipt; admin contact list | 201, 200 |
| Invalid document ID; invalid JSON; oversized JSON body | 400, 400, 413 |
| Invalid login credentials | 401 |
| Public author data | `_id` and `username` only, no email or password |
| CORS preflight from the configured front-end origin | 204 with the allowed methods and headers |
| Contact rate limit (verified locally on the same code) | 6th request in 15 minutes returns 429 |
| Persistence across a service restart | a saved post is still returned after redeploy |

A scripted run of 38 HTTP checks passed against the live HTTPS address, and a separate restart check confirmed the saved post survived.

Test accounts use `@example.com` addresses. No secrets, password hashes, or tokens are included in this archive or in this document.
