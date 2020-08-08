<template>
  <div class="h-screen w-screen flex flex-col">
    <!-- enter the konami code if you're cool! -->
    <div v-if="konami" class="absolute h-full w-full flex justify-center items-center">
      <div class="absolute opacity-50 text-6xl text-red-600 text-white font-extrabold uppercase underline">Konami</div>
      <iframe
        class="w-screen h-screen"
        src="https://www.embed.com/app/arcade/asteroids.html"
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </div>
    <div v-if="!loading && !konami" class="h-full sm:pl-32 text-white flex items-center sm:justify-left justify-center">
      <div class="w-full title">
        <div class="sm:text-left text-center leading-snug">
          <div class="sm:text-5xl text-4xl font-bold">Hi, I'm Ven.</div>
          <div class="sm:text-2xl text-xl font-base text-gray-300 tracking-tight subpixel-antialiased">
            17-year-old software developer.
          </div>
        </div>
        <div
          class="mt-4 sm:px-0 px-6 flex flex-wrap sm:justify-start justify-center text-indigo-200 overflow-hidden tracking-wider font-medium"
        >
          <a href="https://github.com/ven" target="_blank" class="flex items-center mr-5 hover:text-indigo-300 mt-2">
            <font-awesome-icon class="mr-2" :icon="['fab', 'github']" />
            <div class="text-xs">ven</div>
          </a>
          <a
            href="https://twitter.com/venolol"
            target="_blank"
            class="flex items-center mr-5 hover:text-indigo-300 mt-2"
          >
            <font-awesome-icon class="mr-2" :icon="['fab', 'twitter']" />
            <div class="text-xs">@venolol</div>
          </a>
          <a href="https://dsc.bio/v" target="_blank" class="flex items-center mr-5 hover:text-indigo-300 mt-2">
            <font-awesome-icon class="mr-2" :icon="['fab', 'discord']" />
            <div class="text-xs">ven#9999</div>
          </a>
          <a href="mailto:admin@veno.dev" target="_blank" class="flex items-center hover:text-indigo-300 mt-2">
            <font-awesome-icon class="mr-2" :icon="['fa', 'envelope']" />
            <div class="text-xs">admin@veno.dev</div>
          </a>
        </div>
        <div v-show="false" class="mt-4 sm:px-0 px-6 flex flex-wrap sm:justify-start justify-center text-sm opacity-75">
          <font-awesome-icon class="mr-4" :icon="['fab', 'node-js']" />
          <font-awesome-icon class="mr-4" :icon="['fab', 'python']" />
          <font-awesome-icon class="mr-4" :icon="['fab', 'vuejs']" />
          <font-awesome-icon class="mr-4" :icon="['fab', 'html5']" />
          <font-awesome-icon class="mr-4" :icon="['fab', 'css3-alt']" />
          <font-awesome-icon :icon="['fab', 'ubuntu']" />
        </div>
      </div>
    </div>
    <div class="relative w-full flex justify-center items-center">
      <div
        v-if="!konami"
        class="text-white p-8 absolute font-medium bottom-0 lg:right-0 text-green-500 text-sm opacity-50 fadeIn"
      >
        <font-awesome-icon class="mr-1" :icon="['fab', 'spotify']" /> Listening to
        <span class="italic">{{ lastFM.recenttracks.track[0].artist['#text'] }}</span> on Spotify
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const konami = require('../assets/konami.mp3');

export default {
  data() {
    return {
      loading: true,
      lastFM: null,
      konami: false,
      keys: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
      isChecked: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      },
      current: 0,
    };
  },
  created() {
    window.addEventListener('keyup', this.listen);
  },
  mounted() {
    axios
      .get(
        'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=venoras&api_key=96942f94e74b8ab4ae1b96534da87f00&format=json&limit=1',
      )
      .then(response => {
        this.lastFM = response.data;
        this.loading = false;
      })
      .catch(e => console.error(e));
  },
  methods: {
    reset() {
      Object.keys(this.isChecked).forEach(k => {
        this.isChecked[k] = false;
      });
      this.current = 0;
    },
    listen(e) {
      const key = e.which || e.keyCode || e.detail;
      if (this.keys.includes(key)) {
        if (key === this.keys[this.current]) {
          this.current += 1;
          this.isChecked[this.current - 1] = true;
          if (this.current === this.keys.length) {
            this.trigger();
            this.reset();
          }
        } else {
          this.reset();
        }
      }
    },
    trigger() {
      var audio = new Audio(konami);
      audio.play();
      document.body.style.backgroundColor = 'black';
      this.konami = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 50%;
  }
}

.title {
  animation: 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0s 1 slideInFromLeft;
}

.fadeIn {
  animation: 2s cubic-bezier(0.22, 1, 0.36, 1) 0s 1 fadeIn;
}
</style>
