const path = require("path");
const fs = require("fs");

// HELPERS
const { getFiles } = require("./helpers.js");

const DOWNLOADS_DIR = path.join(__dirname, "/DOWNLOADS");

(async () => {
  try {
    const artists = await getFiles(DOWNLOADS_DIR);

    const artistsPaths = artists
      .filter((fileName) => fileName !== ".DS_Store")
      .map((fileName) => path.join(DOWNLOADS_DIR, fileName));

    artistsPaths.forEach(async (artistPath) => {
      const albums = await getFiles(artistPath);
      const albumsPaths = albums
        .filter((file) => /\(Album|Single\)$/.test(file))
        .map((album) => path.join(artistPath, album));

      albumsPaths.forEach((albumPath) => {
        fs.readdir(albumPath, {}, (err, files) => {
          const flacSongs = files.filter((file) => /\.flac$/.test(file));

          flacSongs.forEach((flacSong) => {
            const flacSongOldPath = path.join(albumPath, flacSong);
            const flacSongsNewPath = path.join(
              __dirname,
              "ConvertedSongs",
              flacSong
            );
            fs.rename(flacSongOldPath, flacSongsNewPath, (err) => {
              if (err) return console.log(err);
              console.log(
                `${flacSong} was succesfully moved to ConvertedSongs folder`
              );
            });
          });
        });
      });
    });
  } catch (e) {
    throw new Error(e);
  }
})();
