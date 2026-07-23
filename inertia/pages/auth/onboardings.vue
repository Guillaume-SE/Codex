<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
import { ref } from 'vue'

const props = defineProps<{
  recoveryCode: string
}>()

const isSaved = ref(false)
const isCopied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.recoveryCode)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <div class="form-container">
    <div>
      <h1>Save Your Recovery Code</h1>
      <p>
        This code is the <strong>only way</strong> to recover your account if you lose your
        password. Please keep it safe—it will <strong>never be shown again</strong>.
      </p>
    </div>

    <!-- Display Code Box + Copy Button -->
    <div class="code-box">
      <code>{{ props.recoveryCode }}</code>
      <button type="button" @click="copyCode" class="button-secondary">
        {{ isCopied ? 'Copied!' : 'Copy Code' }}
      </button>
    </div>

    <!-- Form to submit confirmation and delete code from session -->
    <div>
      <Form v-slot="{ processing }" route="onboardings.destroy">
        <div>
          <input id="confirm-saved" type="checkbox" v-model="isSaved" />
          <label for="confirm-saved"> I have saved this recovery code in a secure location. </label>
        </div>

        <div>
          <button type="submit" class="button" :disabled="!isSaved || processing">
            Continue to App
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
