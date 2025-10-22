<template>
  <!-- Nav Bar -->
  <Transition>
    <div
      v-if="showSticky"
      class="fixed top-4 left-4 bg-primary px-4 py-2 rounded-lg shadow-lg z-50"
    >
      <h3 class="font-bold text-2xl text-text-contrast">Knight Wallet</h3>
    </div>
  </Transition>
  <!-- Title Area -->
  <div class="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary to-accent">
    <div class="p-12 md:p-24 w-full grid xl:grid-cols-2 text-center xl:text-left grid-cols-1 grow">
      <div class="flex justify-center items-center mb-12">
        <div class="flex flex-col text-text-contrast w-min">
          <div class="drop-shadow-[0_10px_60px_rgba(0,0,0,1)] shrink">
            <h1 class="md:text-[6rem] text-[4rem] font-extrabold text-nowrap">Knight Wallet</h1>
            <p class="text-3xl font-medium">"Track Together, Settle Smarter"</p>
          </div>
          <div class="mt-4 text-xl font-mono shrink min-h-[6rem]">
            <Typewriter
              text="Simplify shared expenses among friends and family. Add costs, split bills, and settle up seamlessly for trips, events, and everyday life."
              :speed="100"
              @update:is-typing="handleTypingStatus"
            />
            <Transition name="slide-in">
            <div v-if="!isTyping">
              <button @click="$inertia.visit('/dashboard')" class="bg-text-contrast rounded-md text-primary mt-8 mr-2 px-5 py-2 hover:bg-white hove:text-accent hover:cursor-pointer">Open App</button>
              <button @click="$inertia.visit('/design-artifacts')" class="outline-text-contrast text-text-contrast rounded-md outline px-5 py-2 hover:cursor-pointer hover:bg-white hover:text-accent">Design Artifacts</button>
            </div>
            </Transition>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center w-full grow">
        <img
          src="/resources/images/iphone-screenshot.png"
          alt="Knight Wallet iPhone Screenshot"
          class="max-h-[75vh] w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,1)]"
        />
      </div>
    </div>
  </div>
  <!-- Mission Statement -->
  <div
    class="flex min-w-full min-h-auto w-full py-16 bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_rgba(0,0,0,0.4)_inset]"
  >
    <div class="xs:mx-2 mx-8 md:mx-16 lg:mx-32 my-auto drop-shadow-[0_10px_60px_rgba(0,0,0,1)]">
      <p class="font-bold text-text-contrast text-6xl w-full text-center mb-12">Our Mission</p>
      <p class="text-center text-text-contrast text-3xl mt-2 mb-8 text-secondary-text">
        The Knight Wallet is a shared expense tracker designed to simplify the process of managing
        and settling shared expenses among groups of people. It aims to provide a user-friendly
        platform where users can easily add expenses, split costs, and view balances in real-time.
        The app is designed to assist in various scenarios such as trips, events, or household
        expenses, making it easier for people to keep track of who owes what and conveniently settle
        up at the end.
      </p>
    </div>
  </div>
  <div class="flex justify-center min-h-screen w-full py-16">
    <div class="mx-8 md:mx-16 lg:mx-32 my-auto">
      <p class="font-bold text-6xl w-full text-center">Features</p>
      <p class="text-center text-3xl mt-2 mb-8 text-secondary-text">
        Discover the powerful features that make our app stand out.
      </p>
      <transition-group
        name="card-shuffle"
        tag="div"
        class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4"
      >
        <Card
          v-for="card in featureCards"
          :key="card.id"
          @click="shuffleCards()"
          class="cursor-pointer"
        >
          <template #icon>
            <Icon class="text-7xl text-accent" :icon="card.icon" />
          </template>
          <template #title>
            {{ card.name }}
          </template>
          <template #description>
            {{ card.description }}
          </template>
        </Card>
      </transition-group>
    </div>
  </div>

  <div class="flex min-h-screen w-full py-16 bg-gradient-to-br from-primary to-accent">
    <div class="mx-8 md:mx-16 lg:mx-32 my-auto">
      <p
        class="font-bold text-6xl w-full text-center mb-12 text-text-contrast drop-shadow-[0_10px_60px_rgba(0,0,0,1)]"
      >
        Meet the Development Team
      </p>
      <div class="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Card v-for="(card, index) in bioCards" :key="index">
          <template #icon>
            <img
              :src="card.photo"
              alt="Profile Photo"
              class="w-32 h-32 object-cover rounded-full border-4 border-accent mx-auto"
            />
          </template>
          <template #title>
            {{ card.name }}
          </template>
          <template #description>
            {{ card.description }}
          </template>
        </Card>
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center min-h-screen p-16">
    <div class="">
      <p class="font-bold text-6xl w-full text-center mb-12">Watch Our Introduction Video</p>
      <VideoContainer
        url="https://cdnapisec.kaltura.com/p/2619912/sp/261991200/embedIframeJs/uiconf_id/45753661/partner_id/2619912?iframeembed=true&playerId=kaltura_player&entry_id=1_oltyq32v&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_6ker1nld"
      />
      <button @click="visible = true">HELLO</button>
      <Dialog v-model="visible"></Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Card from './components/Card.vue'
import Typewriter from './components/Typewriter.vue'
import VideoContainer from './components/VideoContainer.vue'
import Dialog from './components/Dialog.vue'

export default {
  components: {
    Typewriter,
    Card,
    VideoContainer,
    Dialog
  },
  data() {
    return {
      featureCards: [
        {
          id: 1,
          name: 'Group Creation',
          description: 'Create friend groups and manage members on the go.',
          icon: 'mdi:people',
        },
        {
          id: 2,
          name: 'Organization',
          description: 'Add and categorize expenses with ease.',
          icon: 'eos-icons:organization',
        },
        {
          id: 3,
          name: 'Multiple Groups',
          description: 'Split expenses among selectable group members.',
          icon: 'material-symbols:groups',
        },
        {
          id: 4,
          name: 'Multi-Currency',
          description: 'Multi-currency support for international use.',
          icon: 'bi:currency-exchange',
        },
        {
          id: 5,
          name: 'Real-Time Updates',
          description: 'Instantly see payment updates.',
          icon: 'tabler:clock-filled',
        },
        {
          id: 6,
          name: 'Payment App Integration',
          description: 'Integration with Venmo and other payment platforms.',
          icon: 'si:credit-card-detailed-fill',
        },
      ],
      bioCards: [
        {
          name: 'Marti Lonnemann',
          description:
            'Software developer and Bellarmine student with a passion for web development. Enjoys creating user-friendly applications that solve real-world problems.',
          photo: '/resources/images/MartiHeadshot.jpeg',
        },
        {
          name: 'Sam Kauffman',
          description:
            'Aspiring software developer and designer attending Bellarmine University pursuing a degree in computer science. Enjoys creating and designing websites using a unique and creative style.',
          photo: '/resources/images/SamHeadshot.jpg',
        },
        {
          name: 'Ronish Gautam',
          description:
            'Computer scince student at Bellarmine University with a passion for software development, who also enjoys traveling the world and staying active through fitness.',
          photo: '/resources/images/RonishHeadshot.jpg',
        },
        {
          name: 'Kirin Sharma',
          description:
            'College senior at Bellarmine University and aspiring software engineer passionate about developing impactful, innovative, and efficient software solutions to solve real-world challenges.',
          photo: '/resources/images/KirinHeadshot.jpeg',
        },
      ],
      showSticky: false,
      visible: false,
      isTyping: true,
    }
  },
  mounted() {
    // Sets showSticky to true when scrolled down half the viewport height
    // (continuously updates through scroll event listener)
    window.addEventListener('scroll', () => {
      this.showSticky = window.scrollY > window.innerHeight / 2
    })
  },
  methods: {
    handleTypingStatus(typingStatus: boolean){
      this.isTyping = typingStatus;
    },
    shuffleCards() {
      for (let i = this.featureCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.featureCards[i], this.featureCards[j]] = [this.featureCards[j], this.featureCards[i]]
      }
    },
  },
}
</script>

<style scoped>
.card-shuffle-move {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* See https://vuejs.org/guide/built-ins/transition for vue transitions */
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.slide-in-enter-active {
  transition: all 0.6s ease-out;
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-in-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
