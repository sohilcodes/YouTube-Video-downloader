import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const info = await ytdl.getInfo(url);
  const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
  const qualities = formats
    .filter(f => f.qualityLabel)
    .map(f => ({
      itag: f.itag,
      qualityLabel: f.qualityLabel,
      container: f.container
    }));

  res.json({
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails.pop().url,
    qualities
  });
}
