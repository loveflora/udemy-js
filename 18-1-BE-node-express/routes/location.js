//=== routes 폴더 내부 ===

const express = require('express');

const router = express.Router();
// 여러 다양한 라우트를 등록하기 쉽게 해줌

const locationStorage = {
  locations: [],
};

router.post('/add-location', (req, res, next) => {
  const id = Math.random();

  locationStorage.locations.push({
    id: id,
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });

  res.json({ message: 'Stored location!', locId: id });
});

router.get('/location/:lid', (req, res, next) => {
  const locationId = +req.params.lid;
  const location = locationStorage.locations.find((loc) => {
    return loc.id === locationId;
  });
  if (!location) {
    return res.status(404).json({ message: 'Not found!' });
  }
  res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router; // 다른 파일로 내보내기
// 받은 파일(app.js)에서
// const locationRoutes = require('./routes/location'); 라고 입력
