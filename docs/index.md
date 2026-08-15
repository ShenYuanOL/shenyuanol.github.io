---
title: ShenYuan|深远
description: ShenYuan博客站，深远博客站
home: true
---

<HomeHero />

<!-- <div class="x-home-grid">
  <aside class="x-home-aside">
    <CategoryWidget />
    <TagWidget />
  </aside>
  <main class="x-home-main">
    <div class="x-home-section-head">最新文章</div>
    <PostList />
    <a class="x-home-more" href="/archives">查看全部文章 →</a>
  </main>
</div> -->

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const repos = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/orgs/ShenYuanOR/repos?per_page=100')
    const data = await res.json()

    repos.value = (Array.isArray(data) ? data : [])
      .filter((repo) => !repo.private)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  } catch (error) {
    console.error('Failed to load GitHub organization repositories:', error)
    repos.value = []
  } finally {
    loading.value = false
  }
})
</script>

<div class="x-work-section">
  <div class="x-work-title">作品集</div>

  <div v-if="loading" class="x-work-list x-work-loading">
    <div class="x-work-card x-work-skeleton"></div>
    <div class="x-work-card x-work-skeleton"></div>
    <div class="x-work-card x-work-skeleton"></div>
  </div>

  <div v-else class="x-work-list">
    <a
      v-for="repo in repos"
      :key="repo.id"
      class="x-work-card"
      :href="repo.html_url"
      target="_blank"
      rel="noreferrer"
    >
      <div class="x-work-card-header">
        <div class="x-work-card-title">{{ repo.name }}</div>
        <Icon icon="mdi:github"/>
      </div>
      <div class="x-work-card-subtitle">{{ repo.description || '暂无项目描述' }}</div>
      <div class="x-work-card-meta">
        <span v-if="repo.language">{{ repo.language }}</span>
        <span>⭐ {{ repo.stargazers_count }}</span>
        <span>🍴 {{ repo.forks_count }}</span>
      </div>
    </a>
  </div>
</div>

<div class="x-blog-section x-work-section">
  <div class="x-work-header">
    <div class="x-work-title">最新文章</div>
    <a class="x-work-more" href="/archives">查看全部文章 →</a>
  </div>
  <PostList :limit="3" />
</div>

<style>
.x-work-section {
  margin: 3rem auto 0;
  max-width: var(--page-width);
}

.x-blog-section {
  margin-top: 3.5rem;
}

.x-work-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.x-work-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--deep-text);
}

.x-work-more {
  color: var(--primary);
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.x-work-more:hover {
  opacity: 0.8;
}

.x-work-list {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.x-work-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.1rem 1rem 0.9rem;
  border-radius: var(--radius-large);
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: var(--deep-text);
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.x-work-card:hover {
  /* border-color: rgba(120, 130, 255, 0.28); */
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.1);
}

html.dark .x-work-card {
  background: rgba(22, 27, 38, 0.68);
  border-color: rgba(255, 255, 255, 0.08);
}

.x-work-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.x-work-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.4;
}

.x-work-card-badge {
  font-size: 5rem;
  /* font-weight: 700; */
  /* letter-spacing: 0.04em; */
  background: rgba(122, 92, 255, 0.12);
  color: var(--primary);
}

.x-work-card-subtitle {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.92rem;
  min-height: 2.8em;
}

.x-work-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.8rem;
  margin-top: auto;
  padding-top: 0.5rem;
  font-size: 0.76rem;
  color: var(--text-faint);
}

.x-work-loading {
  opacity: 0.9;
}

.x-work-skeleton {
  min-height: 150px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  background-size: 200% 100%;
  animation: x-work-shimmer 1.3s linear infinite;
}

html.dark .x-work-skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.04)
  );
  background-size: 200% 100%;
}

@keyframes x-work-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 640px) {
  .x-work-section {
    margin-top: 2.25rem;
  }

  .x-work-list {
    grid-template-columns: 1fr;
  }
}
</style>


