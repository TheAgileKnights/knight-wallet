<template>
  <div class="flex flex-col p-4 overflow-x-hidden px-8 grow">
    <!-- Main navigation -->
    <div class="flex flex-col items-center justify-center gap-1 mb-4 relative">
      <TabMenu
        class="relative z-10"
        :tabs="navItems"
        :model-value="activeHref"
        @update:model-value="handlePersonChange"
      />
      <!-- Person selector for non-features pages -->
      <Transition name="slide-up">
        <TabMenu
          v-if="type !== 'features' && type !== 'video'"
          class="relative z-0"
          :tabs="personNavItems"
          :model-value="activeHref"
          @update:model-value="handlePersonChange"
        />
      </Transition>
    </div>
    <Personas
      v-if="type === 'personas' && person"
      :name="person.name"
      :age="person.age"
      :persona="person.persona"
    />
    <Scenarios v-else-if="type === 'scenarios' && person" :scenarios="person.scenarios" />
    <Stories
      v-else-if="type === 'stories' && person"
      :name="person.name"
      :scenarios="person.scenarios"
    />
    <Interview
      v-else-if="type === 'interviews' && person"
      :interview="person.interview"
      :name="person.name"
    />
    <Features v-else-if="type === 'features' && features" :features="features" />
    <ArtifactVideo v-else-if="type === 'video'" :url="videoUrl" />
  </div>
</template>

<script lang="ts">
import { router } from '@inertiajs/vue3'
import TabMenu from './components/TabMenu.vue'
import Personas from './components/designArtifacts/Personas.vue'
import Interview from './components/designArtifacts/Interview.vue'
import Stories from './components/designArtifacts/Stories.vue'
import Features from './components/designArtifacts/Features.vue'
import Scenarios from './components/designArtifacts/Scenarios.vue'
import ArtifactVideo from './components/designArtifacts/ArtifactVideo.vue'

export interface Person {
  name: string
  age: number
  persona: string
  scenarios: Scenario[]
  interview: Array<{
    question: string
    answer: string
  }>
}

export interface Scenario {
  title: string
  description: string
  stories: string[]
}

export interface InterviewQuestion {
  question: string
  answer: string
}

export interface Feature {
  title: string
  icon: string
  description: string[]
  constraints: string
  comments: string
}

export default {
  components: {
    TabMenu,
    Interview,
    Personas,
    Stories,
    Features,
    Scenarios,
    ArtifactVideo,
  },
  props: {
    type: String,
    id: Number,
    person: Object as () => Person,
    people: Array as () => Person[],
    features: Array as () => Feature[],
    videoUrl: String,
  },
  data() {
    return {
      selectedPersonId: this.id || 1,
    }
  },
  computed: {
    navItems() {
      return [
        { label: 'Interviews', value: `/design-artifacts/interviews/${this.selectedPersonId}` },
        { label: 'Personas', value: `/design-artifacts/personas/${this.selectedPersonId}` },
        { label: 'Scenarios', value: `/design-artifacts/scenarios/${this.selectedPersonId}` },
        { label: 'Stories', value: `/design-artifacts/stories/${this.selectedPersonId}` },
        { label: 'Features', value: '/design-artifacts/features' },
        { label: 'Video', value: '/design-artifacts/video' },
      ]
    },
    personNavItems() {
      if (!this.people) return []
      return this.people.map((p, index) => ({
        label: p.name,
        value: `/design-artifacts/${this.type}/${index + 1}`,
      }))
    },
    activeIndex() {
      const types = ['interviews', 'personas', 'scenarios', 'stories', 'features', 'video']
      return types.indexOf(this.type || 'interviews')
    },
    activeHref() {
      if (this.type === 'features') {
        return `/design-artifacts/features`
      } else if (this.type === 'video') {
        return `/design-artifacts/video`
      }
      return `/design-artifacts/${this.type}/${this.selectedPersonId}`
    },
  },
  methods: {
    handlePersonChange(event: any) {
      router.visit(event, {
        preserveState: true,
        preserveScroll: true,
      })
    },
  },
  watch: {
    id(newId) {
      this.selectedPersonId = newId || 1
    },
  },
}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.15s ease-out;
}

.slide-up-enter-from {
  transform: translateY(calc(-100% - 4px));
}

.slide-up-leave-to {
  transform: translateY(calc(-100% - 4px));
}
</style>
