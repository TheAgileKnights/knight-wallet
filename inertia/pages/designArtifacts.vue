<template>
  <p class="text-3xl">Design Artifacts</p>
  <div>
  <interviews :interviews="jsonData.interviews" :name="jsonData.name"/>
  </div>
</template>

<script lang="ts">
import Interviews from './components/interviews.vue'
export default {
  components: {
    Interviews
  },
  data() {
    return {
        jsonData: {
            name: "Jimmy Dean",
            interviews: [
                {
                    "question": "Question 1",
                    "answer": "BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH"
                },
                {
                    "question": "Question 2",
                    "answer": "BLAH BLAH BLAHBLAH BLAH BLAH"
                },
                {
                    "question": "Question 3",
                    "answer": "BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH"
                },
            ]
        },
    }
  },
}

</script>