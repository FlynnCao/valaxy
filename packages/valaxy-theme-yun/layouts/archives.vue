<script lang="ts" setup>
import { defineWebPage, useSchemaOrg } from '@unhead/schema-org'
import { useFrontmatter, usePostTitle, useSiteStore } from 'valaxy'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const frontmatter = useFrontmatter()

const title = usePostTitle(frontmatter)
const site = useSiteStore()

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
  }),
])
</script>

<template>
  <Layout>
    <template #main-header>
      <YunPageHeader :title="title || t('menu.archives')" :icon="frontmatter.icon || 'i-ri-archive-line'" :color="frontmatter.color" />
    </template>
    <template #main-content>
      <RouterView />
      <YunPostCollapse :posts="site.postList" />
    </template>
  </Layout>
</template>
