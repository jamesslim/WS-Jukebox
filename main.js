let elPause = document.getElementById('pause')
  , elPlay = document.getElementById('play')
  , elForward = document.getElementById('forward')
  , elBackward = document.getElementById('backward')
  , elRandom = document.getElementById('random')
  , elVolume;

function Song( title, artist, file ){
  this.title = title;
  this.artist = artist;
  this.file = file;
}
function Player( el ) {
  this.el = el;
  this.currentSong = 0;
  this.songs = [];
  this.newSongIndex = 0;
}
// adds songs to the array as well as creates a playlist from all songs added
Player.prototype.addSong = function( song ){
  if( song instanceof Song ){
    this.songs.push(song);
    document.getElementById('list').innerHTML += "<li id='" + this.newSongIndex + "'>" + song.artist + " - " + song.title + "</li>";
      this.newSongIndex ++;
    return true;
    if ( !song instanceof Song ) return false;
  }
};
// button functionality while also toggling the play/pause options
Player.prototype.play = function(){
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  console.log( this.el.src);
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
Player.prototype.pause = function(){
  this.el.pause();
  document.getElementById('play').style.display = "inline-block";
  document.getElementById('pause').style.display = "none";
};
// not shuffle for a queue, just selects a random song from list
Player.prototype.random = function(){
  this.currentSong = parseInt(Math.random()*this.songs.length);
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  console.log( this.el.src);
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
Player.prototype.playNext = function(){
  this.currentSong = (this.currentSong + 1) % this.songs.length;
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  console.log( this.el.src);
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
Player.prototype.playPrevious = function(){
  // if notation to loop the songs being played to the back of list if at track 1
  if( this.currentSong >= 1 ){
    this.currentSong = (this.currentSong - 1) % this.songs.length;
  }
  if( this.currentSong === 0 ){
    this.currentSong = this.songs.length - 1;
  }
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  console.log( this.el.src);
  document.getElementById('pause').style.display = "inline-block";
  document.getElementById('play').style.display = "none";
};
// to continue to the next song after one song has ended
Player.prototype.end = function(){
  this.currentSong = (this.currentSong + 1) % this.songs.length;
  this.el.src = this.songs[this.currentSong].file;
  this.el.play();
  document.querySelector('h3').innerText = this.songs[this.currentSong].artist + " - " + this.songs[this.currentSong].title;
  console.log( this.el.src);
};

document.addEventListener("DOMContentLoaded",function(){

  Jukebox = new Player(document.querySelector("audio"));

  elVolume = document.getElementById('volume');
  noUiSlider.create(elVolume,{
    start: 0.8,
    range: {
      min: 0,
      max: 1
    }
  });
  elVolume.noUiSlider.on('slide',function(){
    // get the value of the slider
    // set the player volume to that value
    document.querySelector('audio').volume = parseFloat(elVolume.noUiSlider.get());
  });

  elPlay.addEventListener("click", function(){
    Jukebox.play();
  });
  elPause.addEventListener("click", function(){
    Jukebox.pause();
  });
  elForward.addEventListener("click", function(){
    Jukebox.playNext();
  });
  elBackward.addEventListener("click", function(){
    Jukebox.playPrevious();
  });
  elRandom.addEventListener("click", function(){
    Jukebox.random();
  });

  document.querySelector('audio').addEventListener("ended", function(){
    Jukebox.end();
  });

  elPlay.addEventListener("click", function(){
    Jukebox.play();
  });
  elPause.addEventListener("click", function(){
    Jukebox.pause();
  });
  elForward.addEventListener("click", function(){
    Jukebox.playNext();
  });
  elBackward.addEventListener("click", function(){
    Jukebox.playPrevious();
  });
  elRandom.addEventListener("click", function(){
    Jukebox.random();
  });

  document.querySelector('audio').addEventListener("ended", function(){
    Jukebox.end();
  });
  // elSelectSong.addEventListener("click", function(){
  //   Jukebox.selectSong();
  // });
  var Radiohead = new Song( "The National Anthem", "Radiohead", "Radiohead.mp3");
  var BADBADNOTGOOD = new Song( "Cant Leave the Night", "BADBADNOTGOOD", "BADBADNOTGOOD.mp3");
  var Nirvana = new Song( "Come As You Are", "Nirvana", "Nirvana.mp3");
  var Chromatics = new Song("Cherry", "Chromatics", "Chromatics.mp3");
  var INXS = new Song("New Sensation", "INXS", "INXS.mp3");
  var SCNTST = new Song("Waves Change", "SCNTST", "SCNTST.mp3");
  var Sade = new Song("Your Love Is King", "Sade", "Sade.mp3");
  Jukebox.addSong(Radiohead);
  Jukebox.addSong(BADBADNOTGOOD);
  Jukebox.addSong(Nirvana);
  Jukebox.addSong(Chromatics);
  Jukebox.addSong(INXS);
  Jukebox.addSong(SCNTST);
  Jukebox.addSong(Sade)

  // clickable list items for the playlist to play the song clicked
  for(i=0; i<Jukebox.songs.length ; i++){
   elSelectSong = document.getElementsByTagName('li')[i];
   elSelectSong.addEventListener("click", function(){
     currentSong = Jukebox.songs[this.getAttribute('id')];
     Jukebox.el.src = currentSong.file;
     document.getElementsByTagName('h3')[0].innerText = currentSong.artist + " - " + currentSong.title;
     Jukebox.el.play();
     document.getElementById('pause').style.display = "inline-block";
     document.getElementById('play').style.display = "none";
   })
 };

//jQuery functions to hide and show playlist
 $('#playlist').hide();
 $('#hide').hide();
 $('#list').hide();
 $('#clickme').click(
   function(){
      $('#playlist').slideDown(1000);
      $('#list').slideDown(3000);
      $('#clickme').slideUp(500);
      $('#hide').slideDown(500);
   }
    )
 $('#hide').click(
   function(){
      $('#playlist').slideUp(3000);
      $('#list').slideUp(1000);
      $('#clickme').slideDown(500);
      $('#hide').slideUp(500);
   }
 )
});



