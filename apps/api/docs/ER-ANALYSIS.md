# ER Diagram Analysis — WiGarn

Analysis of the original sketch vs. a production-ready restaurant review schema.

## Original diagram issues

| Issue | Why it breaks in production |
| ----- | --------------------------- |
| **User 1:N Restaurant** | Implies every restaurant belongs to a user (owner). Review apps (Yelp, Google Maps) treat restaurants as first-class listings; users only **review** them. Owner/claim flows need a separate optional link. |
| **No Restaurant → Review relationship** | `rest_id` exists on Review but no cardinality line. Reviews must belong to exactly one restaurant. |
| **Mixed PK types** | User `uuid` vs Restaurant `id` — use `uuid` everywhere for consistency and distributed IDs. |
| **`password` on User** | Store `password_hash` only; never plaintext. Support OAuth with nullable hash. |
| **`avg_rating` without `review_count`** | Cached average needs a count for empty-state UX and integrity checks. |
| **Single `location` field** | Cannot filter by city/country or geosearch; split address + lat/lng. |
| **`reviews description` naming** | Use `body` (or `content`); add optional `title`. |
| **No timestamps** | Required for sorting, moderation, and audit. |
| **No unique (user, restaurant)** | Users could spam duplicate reviews for the same place. |
| **No rating constraints** | Enforce 1–5 at DB level (`CHECK` / `smallint`). |

## Corrected model (see `src/er.mermaid`)

```
User ──writes──▶ Review ◀──has── Restaurant
                      │
                      └──▶ ReviewPhoto (optional)
Restaurant ◀──▶ Cuisine (many-to-many via restaurant_cuisine)
```

### Core rules

1. **USER** — accounts that write reviews; `email` unique; `role` for admin/moderation.
2. **RESTAURANT** — listings independent of users; `slug` for URLs; structured address + optional coordinates.
3. **REVIEW** — FK to `restaurant_id` and `user_id`; **unique (user_id, restaurant_id)**; rating 1–5.
4. **REVIEW_PHOTO** — optional images attached to a review.
5. **CUISINE / RESTAURANT_CUISINE** — tags for discovery (Thai, vegan, etc.).

### Cached fields on Restaurant

`avg_rating` and `review_count` are **denormalized** for fast list pages. Update them in a transaction when reviews are inserted, updated, or deleted (or use a DB trigger / materialized view).

### Optional future tables (not in v1 ER)

- `restaurant_claim` — business owner verifies listing
- `review_helpful_vote` — “Was this helpful?”
- `bookmark` / `favorite` — user saves restaurants
- `moderation_flag` — reported content

## Drizzle implementation notes

When `packages/db` is added:

- Use `pgTable`, `uuid().primaryKey().defaultRandom()`, `timestamp` with `defaultNow()`.
- Add `uniqueIndex` on `reviews(user_id, restaurant_id)`.
- Add `check` on `rating` between 1 and 5.
- Reference `@repo/types` instead of duplicating shapes in `apps/api`.
