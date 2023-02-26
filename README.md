# Interactive Live Streaming (aka ILS) Demo with [Daily](https://daily.co)

![Interactive Live Streaming](./public/image.png)

### Live example

**[See it in action here ➡️](https://daily-ils.vercel.app/)**

---

## Getting Started

### Create Daily Room

We are creating the room via Daily's [REST API](https://docs.daily.co/reference/rest-api/rooms/create-room),
we need Daily's API Key to process this request, you can get the API Request from the Daily [Dashboard](https://dashboard.daily.co/developers).

Replace `$TOKEN` with API token

```
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -XPOST -d \
     '{
        "name": "ils",
        "properties" : {
          "permissions": {
            "canSend": false,
            "hasPresence": false,
           },
        }}' \
     https://api.daily.co/v1/rooms/
```

### Install dependencies

```
yarn install

# Enable husky
yarn husky install
```

### Copy & update the env variables

```
# set DAILY_API_KEY, NEXT_PUBLIC_DAILY_DOMAIN & NEXT_PUBLIC_DAILY_ROOM
cp env.example .env.local
```

### Start your dev server

```
yarn dev
```

Demo should be live at - http://localhost:3000

## Deploy your own on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone-flow?repository-url=https%3A%2F%2Fgithub.com%2Fdaily-solutions%2Fils.git&env=NEXT_PUBLIC_DAILY_DOMAIN%2CNEXT_PUBLIC_DAILY_ROOM%2CDAILY_API_KEY)
