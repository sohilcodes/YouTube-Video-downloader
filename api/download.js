import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url, itag, format } = req.query;

  if (!ytdl.validateURL(url)) {
    return res.status(400).send('Invalid URL');
  }

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

  if (format === 'audio') {
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
    ytdl(url, { filter: 'audioonly' }).pipe(res);
  } else {
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
    ytdl(url, { quality: itag }).pipe(res);
  }
}
