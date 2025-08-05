let config = {};

async function loadConfig() {
  try {
    const res = await fetch("config.json");
    config = await res.json();
    updateAll();
    setInterval(updateAll, 30000);
  } catch (err) {
    console.error("Failed to load config.json", err);
  }
}

async function updateYouTube() {
  const el = document.getElementById("youtube");
  try {
    const ytURL = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${config.youtube_video_id}&key=${config.youtube_api_key}`;
    const res = await fetch(ytURL);
    const json = await res.json();
    const count = parseInt(json?.items?.[0]?.liveStreamingDetails?.concurrentViewers) || 0;
    if (count === 0) {
      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
      el.querySelector('span').textContent = count;
    }
  } catch {
    el.style.display = 'none';
  }
}

async function updateTwitch() {
  const el = document.getElementById("twitch");
  try {
    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${config.twitch_username}`, {
      headers: {
        'Client-ID': config.twitch_client_id,
        'Authorization': `Bearer ${config.twitch_token}`
      }
    });
    const userJson = await userRes.json();
    const userId = userJson.data?.[0]?.id;
    if (!userId) throw new Error("No user ID");
    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        'Client-ID': config.twitch_client_id,
        'Authorization': `Bearer ${config.twitch_token}`
      }
    });
    const streamJson = await streamRes.json();
    const count = parseInt(streamJson.data?.[0]?.viewer_count) || 0;
    if (count === 0) {
      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
      el.querySelector('span').textContent = count;
    }
  } catch {
    el.style.display = 'none';
  }
}

async function updateRumble() {
  const el = document.getElementById("rumble");
  try {
    const proxyURL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(config.rumble_api_url);
    const res = await fetch(proxyURL);
    const json = await res.json();
    const count = parseInt(json?.livestreams?.[0]?.watching_now) || 0;
    if (count === 0) {
      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
      el.querySelector('span').textContent = count;
    }
  } catch {
    el.style.display = 'none';
  }
}

function updateAll() {
  updateYouTube();
  updateTwitch();
  updateRumble();
}

loadConfig();
