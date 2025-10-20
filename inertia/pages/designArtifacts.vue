<template>
Design Artifacts
<Personas :name="jsonData.name" :age="jsonData.age" :persona="jsonData.persona" />
</template>

<script>
import Personas from './components/Personas.vue';

export default {
  components: { Personas },
  data() {
    return {
      jsonData: { name: "Hayley Bratcher", age: 21, persona: "Hayley Bratcher, age 21, is a waitress at Olive Garden who works Monday through Friday and manages her expenses on a tight budget. She uses Venmo for settling shared expenses with friends and maintains a monthly written budget where she tracks who she owes money to, the amounts, and payment due dates. Hayley describes herself as straightforward and prefers direct communication about money rather than beating around the bush. She reviews her finances every Friday, calculating her weekly earnings and expenses before going to the bank, which takes approximately an hour.\n\n Hayley's primary challenge is saving money while managing numerous monthly bills and daily expenses. She finds her current manual tracking system inefficient, writing down each person's name, amount owed, and due date in a new budget every month. Her biggest frustration with shared expenses occurred when it took nearly a year to get reimbursed for a trip. She values directness when requesting payment, believing that gentle reminders often don't get results. Her ideal solution would help her save money more effectively while streamlining the expense tracking process she currently handles manually each week." }
    }
  }
}
</script>