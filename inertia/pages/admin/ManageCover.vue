<script setup lang="ts">
import type CoversController from '#controllers/covers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { ref } from 'vue'
import AppHead from '~/components/AppHead.vue'
import DefaultCoverManageDialog from '~/components/media/DefaultCoverManageDialog.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import DashboardLayout from '~/layouts/DashboardLayout.vue'

defineProps<{
  defaultCoverUrl: InferPageProps<CoversController, 'showManage'>['defaultCoverUrl']
}>()

defineOptions({
  layout: DashboardLayout,
})

const coverModalRef = ref<InstanceType<typeof DefaultCoverManageDialog> | null>(null)

function handleManageCover() {
  coverModalRef.value?.open()
}
</script>

<template>
  <AppHead title="Gestion des cover" />

  <div>
    <div>
      <h3>Cover par défaut</h3>
      <span>Gestion de la cover par défaut utilisée sur le site.</span>
    </div>
    <ButtonComp @click="handleManageCover"> Modifier la cover par défaut </ButtonComp>
  </div>

  <DefaultCoverManageDialog ref="coverModalRef" :default-cover-url="defaultCoverUrl" />
</template>
