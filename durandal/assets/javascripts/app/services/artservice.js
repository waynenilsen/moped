define(['lastfm', 'lodash'], function (lastFm, _) {

	var API_KEY= '077c9fa281240d1c38b24d48bc234940';
	var API_SECRET = '';

	var fmcache = new LastFMCache();
	var lastfm = new LastFM({
        apiKey    : API_KEY,
        apiSecret : API_SECRET,
        cache     : fmcache
    });

	return {
		getTrackImage: function(track, size, callback) {
      var artistName = track.artists[0].name;
      var albumName = track.album !== null ? track.album.name : '';
			lastfm.album.getInfo({artist: artistName, album: albumName}, {
        success: function(data){
          var img = _.find(data.album.image, { size: size });
          if (img !== undefined) {
            callback(img['#text'], null);
          }
        }, error: function(code, message){
            console.log('Error #'+code+': '+message);
            callback(null, { code: code, message: message});
        }
      });
		},
		getAlbumImage: function(album, size, callback) {
      lastfm.album.getInfo({artist: album.artists[0].name, album: album.name}, {
        success: function(data){
          var img = _.find(data.album.image, { size: size });
          if (img !== undefined) {
            callback(img['#text'], null);
          }
        }, error: function(code, message){
            console.log('Error #'+code+': '+message);
            callback(null, { code: code, message: message});
        }
      });
		},
		getArtistImage: function(artist, size, callback) {
      lastfm.artist.getInfo({artist: artist.name}, {
        success: function(data){
          var img = _.find(data.album.image, { size: size });
          if (img !== undefined) {
            callback(img['#text'], null);
          }
        }, error: function(code, message){
            console.log('Error #'+code+': '+message);
            callback(null, { code: code, message: message});
        }
      });
		}
	};
});