<template>
  <div class="p-4">
    <h1 class="text-2xl">Debug Page</h1>
    <div>
      <img src="/images/headshot.jpg" class="aspect-square h-48"/>
    </div>
    <Button @click="dialogVisible=true" label="Open Dialog"/>
    <Dialog header="Test Header" v-model:visible="dialogVisible" :actions="dialogActions">
      <p>This is a test dialog.</p>
    </Dialog>
    {{ myText }}
  </div>
</template>


<script lang="ts">
import { Severity } from '~/types/severity';
import Button from './components/Button.vue';
import Dialog from './components/Dialog.vue';


export default {
  name: 'DebugPage',
  components: {
    Button,
    Dialog
  },
  data() {
    return {
      dialogVisible: false,
      myText: 'This is some debug text.',
    }
  },
  computed: {
    dialogActions() {
      return [
        {
          label: 'Cancel',
          severity: 'secondary' as Severity,
          action: () => {
            this.myText = 'Dialog was cancelled.';
          }
        },
        {
          label: 'Confirm',
          severity: 'primary' as Severity,
          action: () => {
            this.myText = 'Dialog was confirmed.';
          }
        }
      ];
    }
  }
}

</script>