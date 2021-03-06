import { Router } from 'express';
import url from 'url';

import ad, { jsonAd } from '../services/ad-service';
import db, { getAd } from '../db';
import { trackClick, trackImpression } from '../utils/tracking';

export default app => {
  // get random ad page
  app.get('/ad', async (req, res) => {
    const referrer = req.header('Referer');
    let a;
    if (referrer) {
      const referrerUrl = url.parse(referrer);
      a = await ad({ referrer: referrerUrl.host });
    } else {
      a = await ad();
    }
    res.send(a);
  });

  app.get('/ad.json', async (req, res) => {
    const referrer = req.header('Referer');
    let a;
    if (referrer) {
      const referrerUrl = url.parse(referrer);
      a = await jsonAd({ referrer: referrerUrl.host });
    } else {
      a = await jsonAd();
    }
    console.log(a);
    res.send(a);
  });

  app.get('/:id/redirect', async (req, res) => {
    const adId = req.params.id;
    const { ref: referrer } = req.query;
    try {
      const { url } = await getAd(adId);
      trackClick(adId, referrer);
      return res.redirect(`${url}?ref=${referrer}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.get('/:id/image', async (req, res) => {
    const adId = req.params.id;
    const { ref: referrer } = req.query;
    try {
      const { image } = await getAd(adId);
      trackImpression(adId, referrer);
      var img = new Buffer(image, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
};
