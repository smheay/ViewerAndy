<img width="384" height="214" alt="image" src="https://github.com/user-attachments/assets/59d5fc21-94b2-4a26-b7cf-9fed8df57e15" />

# Multi-Platform Viewer Count Overlay Setup

This overlay fetches live viewer counts from YouTube, Twitch, and Rumble and displays them in OBS.

## Prerequisites

* A **Twitch** Developer application (Client ID & Client Secret)
* A **YouTube** API key with access to the YouTube Data API v3
* A **Rumble** livestream API URL

## Generating a Twitch OAuth Token (Client Credentials Flow)

Use the following PowerShell snippet to obtain a non-user OAuth token that lasts for 60 days:

```powershell
# Replace with your Twitch application credentials
$clientId     = "YOUR_TWITCH_CLIENT_ID"
$clientSecret = "YOUR_TWITCH_CLIENT_SECRET"

# Request a new access token
$response = Invoke-RestMethod -Method Post -Uri "https://id.twitch.tv/oauth2/token" -Body @{
  client_id     = $clientId;
  client_secret = $clientSecret;
  grant_type    = "client_credentials"
}

# Output the access token
$response.access_token
```

Copy the printed token and paste it into `config.json` under `twitch_token`.

## config.json

```json
{
  "youtube_api_key": "YOUR_YOUTUBE_API_KEY",
  "youtube_video_id": "YOUR_YOUTUBE_VIDEO_ID",
  "twitch_client_id": "YOUR_TWITCH_CLIENT_ID",
  "twitch_token": "PASTE_YOUR_ACCESS_TOKEN_HERE",
  "twitch_username": "your_twitch_username",
  "rumble_api_url": "https://rumble.com/-livestream-api/get-data?key=YOUR_RUMBLE_KEY"
}
```

## Usage

1. Place `index.html`, `multistream_viewcount.js`, `config.json`, and your SVGs in the same folder.
2. In OBS, add a **Browser Source**, point to `index.html`, enable **Local File**, and set an appropriate width/height.
3. Enable **"Refresh browser when scene becomes active"** and reload.

Enjoy your unified viewer count overlay!
