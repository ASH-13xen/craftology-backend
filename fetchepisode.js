import fs from "fs";

const API_KEY = "AIzaSyD0Jq1tBwhJgh677GBrmy_tkZ-0yrxF3NQ";
// CHANGE THIS to your actual playlist ID (it usually starts with "PL")
const PLAYLIST_ID = "PL56Tn_uxujYPRufYwT0EC814xPFXPffS_";

// Helper to convert ISO 8601 duration (PT1H2M10S) to readable text
function parseDuration(pt) {
  const match = pt.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return {
    text: `${hours > 0 ? hours + " hr " : ""}${minutes} min`,
    totalSeconds,
  };
}

async function fetchPlaylistVideos() {
  let allVideos = [];
  let nextPageToken = "";
  const categories = ["Culture", "Food", "History", "Art"];

  console.log(`Fetching videos from Playlist: ${PLAYLIST_ID}...`);

  try {
    // 1. Loop through all pages of your specific playlist
    do {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;
      const playlistRes = await fetch(playlistUrl);
      const playlistData = await playlistRes.json();

      if (playlistData.error) {
        throw new Error(playlistData.error.message);
      }

      // 2. Extract video IDs
      const videoIds = playlistData.items
        .map((item) => item.snippet.resourceId.videoId)
        .join(",");

      if (!videoIds) break; // Exit if playlist is empty

      // 3. Fetch video details to get duration (Safety net to block accidental Shorts)
      const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${API_KEY}`;
      const videoRes = await fetch(videoUrl);
      const videoData = await videoRes.json();

      videoData.items.forEach((video) => {
        const durationData = parseDuration(video.contentDetails.duration);

        // FILTER OUT SHORTS: Only keep videos longer than 60 seconds
        if (durationData.totalSeconds > 60) {
          allVideos.push({
            id: allVideos.length + 1,
            title: video.snippet.title.replace(/"/g, "'"),
            category: categories[Math.floor(Math.random() * categories.length)], // Random assigned category
            date: new Date(video.snippet.publishedAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "2-digit", year: "numeric" },
            ),
            duration: durationData.text,
            image:
              video.snippet.thumbnails.high?.url ||
              video.snippet.thumbnails.default?.url,
            yt_url: `https://www.youtube.com/watch?v=${video.id}`,
          });
        }
      });

      nextPageToken = playlistData.nextPageToken || "";
    } while (nextPageToken);

    console.log(
      `Successfully fetched ${allVideos.length} episodes from your playlist!`,
    );

    // 4. Format and write the file
    const fileContent = `// src/data/episodelist.ts

export interface Episode {
  id: number;
  title: string;
  category: string;
  date: string;
  duration: string;
  image: string;
  yt_url: string;
}

export const CATEGORIES = ["All", "Culture", "Food", "History", "Art"];

export const episodesList: Episode[] = ${JSON.stringify(allVideos, null, 2)};
`;

    // Ensure directory exists or adjust path as needed
    fs.writeFileSync("./db/episodelist.ts", fileContent);
    console.log("Successfully generated src/data/episodelist.ts!");
  } catch (error) {
    console.error("Error fetching playlist:", error.message);
  }
}

fetchPlaylistVideos();
