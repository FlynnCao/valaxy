import { defineValaxyAddon } from 'valaxy'
import pkg from '../package.json'

export const addonSakana = defineValaxyAddon(options => ({
  name: pkg.name,
  enable: true,
  options,
}))
