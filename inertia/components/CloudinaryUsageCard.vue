<script setup lang="ts">
import type CoversController from '#controllers/covers_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { computed, useTemplateRef } from 'vue'
import InfoIcon from '~/components/icons/InfoIcon.vue'
import ButtonComp from '~/components/ui/ButtonComp.vue'
import ModalComp from '~/components/ui/ModalComp.vue'
import StatusDotComp from '~/components/ui/StatusDotComp.vue'

const props = defineProps<{
  cloudinaryUsage: InferPageProps<CoversController, 'showManage'>['cloudinaryUsage']
}>()

const infoModalRef = useTemplateRef<InstanceType<typeof ModalComp>>('infoModalRef')

// template cleaner purpose
const { transformations, bandwidth, storage } = props.cloudinaryUsage.breakdown

const transformationsWidth = computed(() => transformations.percentOfLimit)
const bandwidthWidth = computed(() => bandwidth.percentOfLimit)
const storageWidth = computed(() => storage.percentOfLimit)

function openInfoModal() {
  infoModalRef.value?.showModal()
}

function closeInfoModal() {
  infoModalRef.value?.close()
}
</script>

<template>
  <h3>Services Cloudinary</h3>
  <span>Détails de l'utilisation des services Cloudinary</span>
  <div class="usage-card">
    <div class="card-header">
      <span class="plan-badge">{{ cloudinaryUsage.plan }}</span>
      <span class="last-updated">{{ cloudinaryUsage.lastUpdated }}</span>
    </div>

    <div class="credits-title">
      <h3>Utilisation des crédits</h3>
      <button @click="openInfoModal" class="info-button" aria-label="Plus d'informations">
        <InfoIcon size="18" />
      </button>
    </div>
    <div class="credits-display">
      <span class="total-credits-text">{{ cloudinaryUsage.credits.display }}</span>
      <StatusDotComp class="dot" size="12" :status="cloudinaryUsage.credits.status" />
    </div>

    <div class="stacked-progress-bar">
      <div
        class="progress-segment segment-transformations"
        :style="{ width: transformationsWidth + '%' }"
      ></div>
      <div
        class="progress-segment segment-bandwidth"
        :style="{ width: bandwidthWidth + '%' }"
      ></div>
      <div class="progress-segment segment-storage" :style="{ width: storageWidth + '%' }"></div>
    </div>

    <ul class="legend">
      <li class="legend-item">
        <StatusDotComp class="dot" size="12" color="#48bb78" />
        <div class="legend-content">
          <div class="legend-row">
            <span class="legend-title">Transformations</span>
            <span class="legend-text">{{ transformations.creditsUsage }} crédits</span>
          </div>
          <span class="usage-detail">{{ transformations.display }}</span>
        </div>
      </li>

      <li class="legend-item">
        <StatusDotComp class="dot" size="12" color="#4299e1" />
        <div class="legend-content">
          <div class="legend-row">
            <span class="legend-title">Bande passante</span>
            <span class="legend-text">{{ bandwidth.creditsUsage }} crédits</span>
          </div>
          <span class="usage-detail">{{ bandwidth.display }}</span>
        </div>
      </li>

      <li class="legend-item">
        <StatusDotComp class="dot" size="12" color="#9f7aea" />
        <div class="legend-content">
          <div class="legend-row">
            <span class="legend-title">Stockage</span>
            <span class="legend-text">{{ storage.creditsUsage }} crédits</span>
          </div>
          <span class="usage-detail">{{ storage.display }}</span>
        </div>
      </li>
    </ul>

    <div class="card-footer">
      <span class="resources-text">{{ cloudinaryUsage.resources.display }}</span>
    </div>
  </div>

  <ModalComp ref="infoModalRef" @close-modal="closeInfoModal">
    <template #header>
      <h2>Fonctionnement des crédits</h2>
    </template>
    <template #content>
      <p>
        L'utilisation est calculée à partir de trois métriques, chacune consommant des crédits du
        plan.
      </p>

      <div class="rates-box">
        <p class="rates-box-text"><strong>Équivalence des crédits :</strong></p>
        <span>1 crédit = 1 000 transformations</span>
        <span>1 crédit = 1 Go de bande passante</span>
        <span>1 crédit = 1 Go de stockage</span>
      </div>

      <ul class="modal-info-list">
        <li>
          <strong>Transformations :</strong> Le nombre de nouvelles images générées. Calculé sur une
          fenêtre glissante de 30 jours. Les modifications au sein de l'url (lorsqu'elles sont
          activées) sont également prises en compte.
        </li>
        <li>
          <strong>Bande passante :</strong> La quantité de données transférées lors de l'affichage
          des médias. Calculée sur une fenêtre glissante de 30 jours.
        </li>
        <li>
          <strong>Stockage :</strong> L'espace total occupé par tous vos fichiers. Calculé en temps
          réel.
        </li>
      </ul>
      <div class="modal-footer">
        <ButtonComp type="button" @click="closeInfoModal">Retour</ButtonComp>
      </div>
    </template>
  </ModalComp>
</template>

<style scoped>
.usage-card {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 400px;
}
.card-header {
  border-bottom: 1px solid #4a5568;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer {
  border-top: 1px solid #4a5568;
  padding-top: 1rem;
  margin-top: 1.5rem;
  text-align: center;
}

.credits-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.credits-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.25rem 0 1rem;
}

.total-credits-text {
  display: block;
  color: #a0aec0;
}

.plan-badge {
  background-color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.last-updated {
  font-size: 0.8rem;
  color: #a0aec0;
  font-style: italic;
}

.stacked-progress-bar {
  display: flex;
  width: 100%;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #4a5568;
}
.progress-segment {
  height: 100%;
  transition: width 0.3s ease-in-out;
}
.segment-transformations {
  background-color: #48bb78;
}
.segment-storage {
  background-color: #9f7aea;
}
.segment-bandwidth {
  background-color: #4299e1;
}

.legend {
  padding: 0;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.legend-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.legend-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.legend-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.legend-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}
.usage-detail {
  font-size: 0.8rem;
  color: #a0aec0;
}

.dot {
  margin-top: 4px;
}

.resources-text {
  font-size: 0.9rem;
  color: #a0aec0;
  text-align: center;
}

.rates-box {
  padding: 1rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
}
.rates-box-text {
  margin: 0;
  font-weight: 600;
}

.info-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.modal-info-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.modal-info-list li {
  line-height: 1.5;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
