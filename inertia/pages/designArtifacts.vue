<template>
  <div class="p-4 overflow-x-hidden">
    <!-- Main navigation -->
     <div class="flex flex-col items-center justify-center gap-1 mb-4">
       <TabMenu
         :tabs="navItems"
         :model-value="activeHref"
         @update:model-value="handlePersonChange"
       />
       <!-- Person selector for non-features pages -->
       <TabMenu
         v-if="type !== 'features'"
         :tabs="personNavItems"
         :model-value="activeHref"
         @update:model-value="handlePersonChange"
       />
     </div>
    <Transition name="slide-right" mode="out-in">
      <div v-if="type === 'personas' && person">
        <Personas :name="person.name" :age="person.age" :persona="person.persona" />
      </div>
  
      <div v-else-if="type === 'scenarios' && person">
        <h2>{{ person.name }} - Scenarios</h2>
        <div v-for="(scenario, index) in person.scenarios" :key="index">
          <h3>{{ scenario.title }}</h3>
          <p>{{ scenario.description }}</p>
        </div>
      </div>
  
      <div v-else-if="type === 'stories' && person">
        <h2>{{ person.name }} - Stories</h2>
        <div v-for="(scenario, sIndex) in person.scenarios" :key="sIndex">
          <h3>{{ scenario.title }}</h3>
          <ul>
            <li v-for="(story, stIndex) in scenario.stories" :key="stIndex">{{ story }}</li>
          </ul>
        </div>
      </div>
  
      <div v-else-if="type === 'interviews' && person">
        <Interview :interview="person.interview" :name="person.name"/>
      </div>
  
      <div v-else-if="type === 'features' && data">
        <h2>Features</h2>
        <div v-for="(feature, index) in data" :key="index">
          <h3>{{ feature.title }}</h3>
          <ul>
            <li v-for="(desc, dIndex) in feature.description" :key="dIndex">{{ desc }}</li>
          </ul>
          <p><strong>Constraints:</strong> {{ feature.constraints }}</p>
          <p><strong>Comments:</strong> {{ feature.comments }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { router } from '@inertiajs/vue3'
import TabMenu from './components/TabMenu.vue'
import Personas from './components/Personas.vue'
import Interview from './components/Interview.vue'

interface Person {
  name: string
  age: number
  persona: string
  scenarios: Array<{
    title: string
    description: string
    stories: string[]
  }>
  interview: Array<{
    question: string
    answer: string
  }>
}

interface Feature {
  title: string
  description: string[]
  constraints: string
  comments: string
}

export default {
  components: { 
    TabMenu,
    Interview,
    Personas
  },
  props: {
    type: String,
    id: Number,
    person: Object as () => Person,
    people: Array as () => Person[],
    data: Array as () => Feature[]
  },
  data() {
    return {
      selectedPersonId: this.id || 1
    }
  },
  computed: {
    navItems() {
      return [
        { label: 'Personas', value: `/design-artifacts/personas/${this.selectedPersonId}` },
        { label: 'Scenarios', value: `/design-artifacts/scenarios/${this.selectedPersonId}` },
        { label: 'Stories', value: `/design-artifacts/stories/${this.selectedPersonId}` },
        { label: 'Interviews', value: `/design-artifacts/interviews/${this.selectedPersonId}` },
        { label: 'Features', value: '/design-artifacts/features' }
      ]
    },
    personNavItems() {
      if (!this.people) return []
      return this.people.map((p, index) => ({
        label: p.name,
        value: `/design-artifacts/${this.type}/${index + 1}`
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
    }
  },
  methods: {
    handlePersonChange(event: any) {
      router.visit(event, {
        preserveState: true,
        preserveScroll: true
      })
    }
  },
  watch: {
    id(newId) {
      this.selectedPersonId = newId || 1
    }
  }
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
</style>