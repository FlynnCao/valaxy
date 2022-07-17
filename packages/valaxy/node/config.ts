import type { VitePluginConfig as UnoCssConfig } from 'unocss/vite'
import type { Awaitable } from '@antfu/utils'
import type { DefaultThemeConfig, SiteConfig, UserSiteConfig } from '../types'
import type { ResolvedValaxyOptions } from './options'
import type { UserConfig, ValaxyConfig } from './types'

/**
 * Type site helper
 */
export function defineSite<ThemeConfig>(config: UserSiteConfig<ThemeConfig>) {
  return config
}

/**
 * Type site helper for custom theme site
 */
export function defineSiteWithTheme<ThemeConfig>(
  config: UserSiteConfig<ThemeConfig>,
) {
  return config
}

/**
 * Type valaxy config helper
 */
export function defineConfig<ThemeConfig>(config: UserConfig<ThemeConfig>) {
  return config
}

export type ValaxyConfigExtendKey = 'vite' | 'vue' | 'unocss' | 'unocssPresets' | 'markdown' | 'extendMd'
export type ValaxyTheme<ThemeConfig = DefaultThemeConfig> = Pick<ValaxyConfig, ValaxyConfigExtendKey> & { themeConfig?: ThemeConfig }
export function defineTheme<ThemeConfig = DefaultThemeConfig>(
  theme: ValaxyTheme<ThemeConfig> | ((options: ResolvedValaxyOptions<ThemeConfig>) => ValaxyTheme<ThemeConfig>),
) {
  return theme
}

export const defaultSiteConfig: SiteConfig = {
  mode: 'auto',
  url: '/',
  lang: 'en',
  title: 'Valaxy Blog',
  description: 'A blog generated by Valaxy.',
  subtitle: 'Next Generation Static Blog Framework.',
  author: {
    // todo valaxy logo
    avatar: 'https://www.yunyoujun.cn/images/avatar.jpg',
    email: 'i@valaxy.site',
    link: 'https://valaxy.site',
    name: 'VALAXY Developer',
    status: {
      emoji: '🌌',
      message: 'The moonlight is beautiful.',
    },
  },
  favicon: '/favicon.svg',
  feed: {
    name: '',
    favicon: '/favicon.svg',
  },
  social: [],

  date: {
    format: '',
  },
  lastUpdated: true,

  license: {
    enabled: true,
    language: '',
    type: 'by-nc-sa',
  },

  sponsor: {
    enable: true,
    title: '赞助',
    methods: [],
  },

  search: {
    enable: false,
    algolia: {
      enable: false,
      appId: '',
      apiKey: '',
      indexName: '',
    },
  },

  comment: {
    enable: false,
    waline: {
      enable: false,
      serverURL: '',
    },
    twikoo: {
      enable: false,
      envId: 'https://twikoo.vercel.app',
    },
  },

  cdn: {
    prefix: 'https://npm.elemecdn.com/',
  },

  features: {
    katex: true,
  },

  theme: 'yun',
  themeConfig: {
    pkg: {
      name: '',
      version: '',
    },
  },

  // markdown: {
  //   excerpt: '<!-- more -->',
  // },
}

export type UnoSetup = () => Awaitable<Partial<UnoCssConfig> | undefined>

export function defineUnoSetup(fn: UnoSetup) {
  return fn
}
