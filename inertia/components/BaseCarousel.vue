<script setup lang="ts" generic="T">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import LeftChevronIcon from '~/components/ui/icons/LeftChevronIcon.vue'
import RightChevronIcon from '~/components/ui/icons/RightChevronIcon.vue'

interface Props {
  title?: string
  items?: T[]
}

const { title = '', items = [] } = defineProps<Props>()

const carouselRef = useTemplateRef<HTMLDivElement>('carouselRef')

const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateScrollState = () => {
  const el = carouselRef.value
  if (!el) return

  // 1px threshold for sub-pixel rounding differences
  const threshold = 1
  canScrollLeft.value = el.scrollLeft > threshold
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - threshold
}

const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return

  const scrollAmount = carouselRef.value.clientWidth * 0.75
  const offset = direction === 'left' ? -scrollAmount : scrollAmount

  carouselRef.value.scrollBy({
    left: offset,
    behavior: 'smooth',
  })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const el = carouselRef.value
  if (!el) return

  updateScrollState()

  // Passive event listener for high performance scrolling
  el.addEventListener('scroll', updateScrollState, { passive: true })

  // Recalculate if window or container resizes
  resizeObserver = new ResizeObserver(updateScrollState)
  resizeObserver.observe(el)
})

onUnmounted(() => {
  const el = carouselRef.value
  if (!el) return
  el.removeEventListener('scroll', updateScrollState)
  resizeObserver?.disconnect()
})
</script>

<template>
  <section class="w-full">
    <div class="flex items-center justify-between mb-3 px-1">
      <div>
        <slot name="title">
          <h2 v-if="title" class="text-xl font-bold tracking-tight">{{ title }}</h2>
        </slot>
      </div>

      <div class="hidden sm:flex items-center gap-1">
        <BaseButton
          variant="ghost"
          size="sm"
          shape="circle"
          :disabled="!canScrollLeft"
          aria-label="Scroll left"
          @click="scroll('left')"
        >
          <LeftChevronIcon class="size-6" />
        </BaseButton>

        <BaseButton
          variant="ghost"
          size="sm"
          shape="circle"
          :disabled="!canScrollRight"
          aria-label="Scroll right"
          @click="scroll('right')"
        >
          <RightChevronIcon class="size-6" />
        </BaseButton>
      </div>
    </div>

    <div
      ref="carouselRef"
      scroll-region
      class="carousel w-full gap-4 scroll-smooth py-2 snap-proximity overscroll-x-contain scroll-px-4"
    >
      <template v-if="items.length > 0">
        <div v-for="(item, index) in items" :key="index" class="carousel-item">
          <slot name="item" :item="item" :index="index" />
        </div>
      </template>

      <!-- Fallback raw slot for custom children -->
      <slot v-else />

      <!-- Optional trailing slot for "See More" cards for ex -->
      <div v-if="$slots.append" class="carousel-item">
        <slot name="append" />
      </div>
    </div>
  </section>
</template>
