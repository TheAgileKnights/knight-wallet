<template>
  <div
    class="flex rounded-4xl bg-gradient-to-br grow from-primary to-accent border-border p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
  >
    <iframe
      id="kaltura_player"
      class="m-auto aspect-video grow"
      :src="url"
      allowfullscreen
      webkitallowfullscreen
      mozAllowFullScreen
      allow="autoplay *; fullscreen *; encrypted-media *"
      sandbox="allow-downloads allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
      title="Knight Wallet"
    ></iframe>
  </div>
</template>

<script lang="ts">
export default {
  name: "VideoContainer",
  props: {
    url: {
      type: String,
      required: true
    }
  }
};
</script>