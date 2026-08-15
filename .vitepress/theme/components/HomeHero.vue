<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData, withBase } from 'vitepress';
import { Icon } from '@iconify/vue';
import { site } from '../../site.config';

const { theme } = useData();

const initials = (site.author.name ?? site.title ?? '晓').slice(0, 1);
const imgFailed = ref(false);
const hasDevDocs = computed(() => theme.value?.hasDevDocs === true);
</script>

<template>
  <section class="x-home-hero">
    <div class="x-home-hero-avatar">
      <img v-if="site.author.avatar && !imgFailed" :src="withBase(site.author.avatar)" :alt="site.author.name"
        loading="eager" @error="imgFailed = true" />
      <span v-else>{{ initials }}</span>
    </div>
    <h1 class="x-home-hero-title">{{ site.title }}</h1>
    <p class="x-home-hero-subtitle">{{ site.subtitle }}</p>
    <p v-if="site.author.intro" class="x-home-hero-intro">{{ site.author.intro }}</p>
    <div class="x-home-hero-actions">
      <a v-for="s in site.social" :key="s.name" :href="s.link" target="_blank" rel="me noopener" class="x-profile-link"
        :aria-label="s.name">
        <Icon :icon="s.mdi" />
      </a>
    </div>
  </section>
</template>
