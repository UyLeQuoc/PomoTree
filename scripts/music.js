const header = $(".name-wrap");
const audio = $("#audio");
const togglePlay = $("#control .btn-pause-play");
const progress = $("#progress");
const volumeProgress = $("#volume-progress");
const nextBtn = $("#control .btn-next");
const prevBtn = $("#control .btn-prev");
const randBtn = $("#control .btn-random");
const repeatBtn = $("#control .btn-repeat");
const playlist = $("#playlist");
const timeNow = $(".currentTime");
const duration = $("#time .duration");
const maxVolume = $(".volume-max");
const minVolume = $(".volume-min");
const musicClose = $(".music__modal--box .music-close");
const musicOpen = $(".nav__items .music");
const musicModalOverlay = $(".music__modal");

// format time
function formatTime(sec) {
  let min, newSec;
  min = Math.floor(sec / 60);
  newSec = sec - min * 60;
  if (newSec < 10) {
    return `${min}:0${newSec}`;
  } else {
    return `${min}:${newSec}`;
  }
}

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Pusheen's Autumn Cat Nap",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/Pusheen'sAutumnCatNap.mp3?alt=media&token=5d55cd78-8295-4568-a49d-e5e47b5f1614",
    },
    {
      name: "Rain And Sad Piano",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/RainAndSadPiano.mp3?alt=media&token=198c58ff-5db0-40d6-a6c1-680ad7a6d90d",
    },
    {
      name: "Soft Guitar Music",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/SoftGuitarMusic.mp3?alt=media&token=b35c2ff9-2955-4d01-9bee-bbfed5b19979",
    },
    {
      name: "Nature Sound",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/NatureSound.mp3?alt=media&token=c7d3b9cf-1f7a-4219-a803-68111c74342d",
    },
    {
      name: "Fire Sound",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/sounds_music_FireSound.mp3?alt=media&token=40df9a1c-a640-43b1-8570-077f1585238a",
    },
    {
      name: "Lofi Chill Mix - 30 min",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/ChillLofiMix-30mix.mp3?alt=media&token=566d0785-441b-4ec8-9ee9-a4bf2511df6a",
    },
    {
      name: "Cute Japanese Lofi Mix",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/cute%20lofi%20mix%20%20songs%20to%20help%20you%20be%20happy%20-%20%E5%AF%9B%E3%81%92%E3%82%8B%20%5B%20J%20A%20P%20A%20N%20E%20S%20E%20%20%20L%20O%20F%20I%20%20%20F%20U%20T%20U%20R%20E%20%20%20B%20A%20S%20S%5D(MP3_128K).mp3?alt=media&token=fdd577a1-0874-4b17-badf-a06477cb15b8",
    },
    {
      name: "Japanese Night Cafe Vibes",
      path: "https://firebasestorage.googleapis.com/v0/b/mockdb-123.appspot.com/o/japanese%20night%20cafe%20vibes%20_%20a%20lofi%20hip%20hop%20mix%20_%20chill%20with%20taiki.mp3?alt=media&token=90958042-1b05-4c2a-b6a3-802272825164",
    },
  ],

  // print all playlist song
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
    <div class="song  ${
      index === this.currentIndex ? "active" : ""
    }" data-index="${index}">
      <div class="body">
        <div class="title">${song.name}</div>
      </div>
    </div>
    `;
    });
    $("#playlist").innerHTML = htmls.join("");
  },

  // define Properties
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  // loadcurrentsong
  loadCurrentSong: function () {
    header.textContent = this.currentSong.name;
    audio.src = this.currentSong.path;
  },

  // next song
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  // prev song
  prevSong: function () {
    if (this.currentIndex === 0) {
      this.currentIndex = this.songs.length - 1;
    } else {
      this.currentIndex--;
    }
    this.loadCurrentSong();
  },
  // random song
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  hangleEvent: function () {
    const _this = this;
    // open, close music modals
    musicOpen.addEventListener("click", function () {
      musicModalOverlay.style.display = "block";
    });
    musicClose.addEventListener("click", function () {
      musicModalOverlay.style.display = "none";
    });
    musicModalOverlay.addEventListener("click", function (e) {
      if (e.target.classList == "music__modal") {
        musicModalOverlay.style.display = "none";
      }
    });
    // Play when click pause and vice versa
    togglePlay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // When song is played
    audio.onplay = function () {
      togglePlay.classList.add("playing");
      _this.isPlaying = true;
    };
    // When song is paused
    audio.onpause = function () {
      togglePlay.classList.remove("playing");
      _this.isPlaying = false;
    };
    // When time of song has changed
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
        // update time
        timeNow.innerHTML = formatTime(Math.floor(audio.currentTime));
        duration.innerHTML = formatTime(Math.floor(audio.duration));
      }
    };
    //When timeline is skip little time
    progress.onchange = function (e) {
      const seekTime = Math.floor((e.target.value / 100) * audio.duration);
      audio.currentTime = seekTime;
      // update time
      timeNow.innerHTML = formatTime(seekTime);
      duration.innerHTML = formatTime(Math.floor(audio.duration));
    };
    // when adjust volume
    volumeProgress.oninput = function (e) {
      const newVolume = e.target.value / 50;
      audio.volume = newVolume;
    };
    // click max volumn
    maxVolume.onclick = function () {
      audio.volume = 1;
      volumeProgress.value = 100;
    };
    // click min volumn(mute)
    minVolume.onclick = function () {
      audio.volume = 0;
      volumeProgress.value = 0;
    };

    // When next button is clicked
    nextBtn.onclick = function () {
      if (_this.isRandom == true) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // When prev button is clicked
    prevBtn.onclick = function () {
      if (_this.isRandom == true) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // on/off random button
    randBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randBtn.classList.toggle("active", _this.isRandom);
    };
    // on/off repeat button
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // when song had ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // playlist on click
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        // when click other song
        if (songNode) {
          const newIndex = Number(songNode.getAttribute("data-index"));
          _this.currentIndex = newIndex;
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // when click option playlist
        // waiting update
      }
    };
  },

  // First Function Running
  start: function () {
    // define Properties
    this.defineProperties();

    //a lot of events
    this.hangleEvent();

    // load current song
    this.loadCurrentSong();

    // print all playlist song
    this.render();
  },
};
app.start();
