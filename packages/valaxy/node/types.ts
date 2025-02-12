import type Vue from '@vitejs/plugin-vue'
import type Components from 'unplugin-vue-components/vite'
import type { VitePluginConfig as UnoCSSConfig } from 'unocss/vite'
import type Pages from 'vite-plugin-pages'
import type { UserConfig as ViteUserConfig } from 'vite'
import type { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import type { Hookable } from 'hookable'
import type { DefaultTheme, PartialDeep, ValaxyAddon, ValaxyConfig } from '../types'
import type { ResolvedValaxyOptions } from './options'
import type { MarkdownOptions } from './markdown/types'

export type ValaxyNodeConfig<ThemeConfig = DefaultTheme.Config> = ValaxyConfig<ThemeConfig> & ValaxyExtendConfig
export type UserValaxyNodeConfig<ThemeConfig = DefaultTheme.Config> = PartialDeep<ValaxyNodeConfig<ThemeConfig>>
/**
 * fn with options for theme config
 */
export type ValaxyConfigFn<ThemeConfig = DefaultTheme.Config> = (options: ResolvedValaxyOptions<ThemeConfig>) => ValaxyNodeConfig | Promise<ValaxyNodeConfig>
export type ValaxyConfigExport<ThemeConfig = DefaultTheme.Config> = ValaxyNodeConfig<ThemeConfig> | ValaxyConfigFn<ThemeConfig>

export type HookResult = Promise<void> | void

export interface ValaxyHooks {
  'options:resolved': () => HookResult
  'config:init': () => HookResult
  'build:before': () => HookResult
  'build:after': () => HookResult
}

export interface ValaxyNode {
  version: string

  hooks: Hookable<ValaxyHooks>
  hook: ValaxyNode['hooks']['hook']

  options: ResolvedValaxyOptions
}

export interface ValaxyExtendConfig {
  /**
   * internal modules
   */
  modules: {
    rss: {
      /**
       * enable rss
       */
      enable: boolean
    }
  }

  /**
   * Markdown Feature
   */
  features: {
    /**
     * enable katex for global
     */
    katex: boolean
  }

  vite?: ViteUserConfig
  vue?: Parameters<typeof Vue>[0]
  components?: Parameters<typeof Components>[0]
  unocss?: UnoCSSConfig
  /**
   * unocss presets
   */
  unocssPresets?: {
    uno?: Parameters<typeof presetUno>[0]
    attributify?: Parameters<typeof presetAttributify>[0]
    icons?: Parameters<typeof presetIcons>[0]
    typography?: Parameters<typeof presetTypography>[0]
  }
  pages?: Parameters<typeof Pages>[0]
  /**
   * for markdown
   */
  markdown?: MarkdownOptions
  extendMd?: (ctx: {
    route: {
      meta: { frontmatter: Record<string, any>, layout?: string } & object
      path: string
      component: string
    }
    data: Readonly<Record<string, any>>
    content: string
    excerpt?: string
    path: string
  }) => void
  addons?: ValaxyAddons

  hooks?: Partial<ValaxyHooks>
}

export type ValaxyAddonLike = ValaxyAddon | false | null | undefined
export type ValaxyAddons = (ValaxyAddon | string)[] | Record<string, ValaxyAddonLike>

export type ValaxyAddonFn<ThemeConfig = DefaultTheme.Config> = (addonOptions: ValaxyAddonResolver, valaxyOptions: ResolvedValaxyOptions<ThemeConfig>) => ValaxyNodeConfig | Promise<ValaxyNodeConfig>
export type ValaxyAddonExport<ThemeConfig = DefaultTheme.Config> = ValaxyNodeConfig<ThemeConfig> | ValaxyAddonFn<ThemeConfig>

export interface ValaxyAddonResolver {
  name: string
  root: string
  enable: boolean
  global: boolean
  props: Record<string, any>
  options: Record<string, any>
  configFile?: string
  pkg: Record<string, any>

  setup?: (node: ValaxyNode) => void
}
