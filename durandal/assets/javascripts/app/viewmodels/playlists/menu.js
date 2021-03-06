define(['services/mopidyservice', 'durandal/app'], function (mopidyservice, app) {

  return {
    playlists: [],
    activate: function() {
      var self = this;
      app.on('mopidy:state:online mopidy:event:playlistsLoaded', function() {
        mopidyservice.getPlaylists().then(function(data) {
          self.playlists = data;
        }, console.error);
      });
    }
  };
});