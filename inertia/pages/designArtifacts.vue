<template>
  <div class="p-4 overflow-x-hidden px-8 grow">
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
          v-if="type !== 'features'"
          class="relative z-0"
          :tabs="personNavItems"
          :model-value="activeHref"
          @update:model-value="handlePersonChange"
        />
      </Transition>
    </div>
    <Transition name="slide-right" mode="out-in">
      <div v-if="type === 'personas' && person">
        <Personas :name="person.name" :age="person.age" :persona="person.persona" />
      </div>

      <div v-else-if="type === 'scenarios' && person">
        <Scenarios :scenarios="person.scenarios" />
      </div>

      <div v-else-if="type === 'stories' && person">
        <Stories :name="person.name" :scenarios="person.scenarios"/>
      </div>

      <div v-else-if="type === 'interviews' && person">
        <Interview :interview="person.interview" :name="person.name" />
      </div>

      <div v-else-if="type === 'features' && features">
        <Features :features="features" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { router } from '@inertiajs/vue3'
import TabMenu from './components/TabMenu.vue'
import Personas from './components/Personas.vue'
import Interview from './components/Interview.vue'
import Stories from './components/Stories.vue'
import Features from './components/Features.vue'
import Scenarios from './components/Scenarios.vue'

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
    Scenarios
  },
  props: {
    type: String,
    id: Number,
    person: Object as () => Person,
    people: Array as () => Person[],
    features: Array as () => Feature[],
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
      const types = ['personas', 'scenarios', 'stories', 'interviews', 'features']
      return types.indexOf(this.type || 'interviews')
    },
    activeHref() {
      if (this.type === 'features') {
        return `/design-artifacts/features`
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
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.15s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(25vw);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-25vw);
}

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
