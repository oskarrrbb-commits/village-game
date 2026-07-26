# API Contract

Shared reference for endpoints and data shapes between frontend and backend.
Update this whenever a field or endpoint changes — treat it as the source
of truth both sides code against.

## Endpoints

### GET /api/village/
Returns the current saved village state.

Success response (200):
```json
{
  "resources": { "wheat": 12, "coal": 4, "wood": 30 },
  "buildings": [
    { "type": "house", "gridX": 2, "gridY": 3 },
    { "type": "farm", "gridX": 5, "gridY": 5 }
  ]
}
```

If no village exists yet, either return an empty village in the same shape,
or a 404 — frontend currently treats ANY failure/error here as "no save yet,
start fresh," so either is acceptable, but let's agree which one you're doing.

### POST /api/village/
Saves the current village state, replacing whatever was previously saved.

Request body: same shape as the GET response above.

Expected response: 200 or 201, body not currently used by frontend
(frontend ignores the response body right now — just needs a success status).
## Data shapes

### Building
| Field | Type | Notes |
|---|---|---|
| type | string | one of: "house", "farm", "mine" (more added over time — check BuildingRegistry.ts on frontend for the current list) |
| gridX | number | integer, tile column |
| gridY | number | integer, tile row |

### Resources
Plain object, resource type name -> amount (number). Currently: "wheat", "coal", "wood".
Not a fixed list — frontend can produce any string key, don't assume only these three long-term.
