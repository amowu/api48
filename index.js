'use strict';

// Set the DEBUG environment variable to enable debug output of Swagger
// Middleware AND Swagger Parser
process.env.DEBUG = 'swagger:*';

var path            = require('path'),
    express         = require('express'),
    swagger         = require('swagger-express-middleware'),
    Middleware      = swagger.Middleware,
    MemoryDataStore = swagger.MemoryDataStore,
    Resource        = swagger.Resource;

var app = express();
var middleware = new Middleware(app);

middleware.init(path.join(__dirname, 'swagger.yaml'), function(err) {
  // Create a custom data store with some initial mock data
  var db = new MemoryDataStore();
  db.save(
    new Resource('/api/v1/member/1', {id: 1, name: 'Itano Tomomi'}),
    new Resource('/api/v1/member/2', {id: 2 , name: 'Usami Yuki'}),
    new Resource('/api/v1/member/3', {id: 3 , name: 'Urano Kazumi'}),
    new Resource('/api/v1/member/4', {id: 4 , name: 'Ohe Tomomi'}),
    new Resource('/api/v1/member/5', {id: 5 , name: 'Oshima Mai'}),
    new Resource('/api/v1/member/6', {id: 6 , name: 'Orii Ayumi'}),
    new Resource('/api/v1/member/7', {id: 7 , name: 'Kawasaki Nozomi'}),
    new Resource('/api/v1/member/8', {id: 8 , name: 'Komatani Hitomi'}),
    new Resource('/api/v1/member/9', {id: 9 , name: 'Kojima Haruna'}),
    new Resource('/api/v1/member/10', {id: 10 , name: 'Sato Yukari'}),
    new Resource('/api/v1/member/11', {id: 11 , name: 'Takahashi Minami'}),
    new Resource('/api/v1/member/12', {id: 12 , name: 'Tojima Hana'}),
    new Resource('/api/v1/member/13', {id: 13 , name: 'Nakanishi Rina'}),
    new Resource('/api/v1/member/14', {id: 14 , name: 'Narita Risa'}),
    new Resource('/api/v1/member/15', {id: 15 , name: 'Hirajima Natsumi'}),
    new Resource('/api/v1/member/16', {id: 16 , name: 'Hoshino Michiru'}),
    new Resource('/api/v1/member/17', {id: 17 , name: 'Maeda Atsuko'}),
    new Resource('/api/v1/member/18', {id: 18 , name: 'Masuyama Kayano'}),
    new Resource('/api/v1/member/19', {id: 19 , name: 'Minegishi Minami'}),
    new Resource('/api/v1/member/20', {id: 20 , name: 'Watanabe Shiho'}),
    new Resource('/api/v1/member/21', {id: 21 , name: 'Shinoda Mariko'})
  );

  // Enable Express' case-sensitive and strict options
  // (so "/pets/Fido", "/pets/fido", and "/pets/fido/" are all different)
  app.enable('case sensitive routing');
  app.enable('strict routing');

  // Add all the Swagger Express Middleware, or just the ones you need.
  // NOTE: Some of these accept optional options (omitted here for brevity)
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock(db)
  );

  app.listen(8000, function() {
    console.log('The Swagger mock server is now running at http://localhost:8000');
  });
});
