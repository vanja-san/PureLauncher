import { ipcRenderer } from 'electron'
import { protocol } from '../../packages/web-api'
import * as T from './types'
import install from './install'
import P from '../models/index'
import GameStore from '../models/GameStore'

const gameStore = P.getStore(GameStore)
const mappings = {
  Install: (r: T.ProtocolInstall) => install(r.resource),
  Launch (data: T.ProtocolLaunch) {
    gameStore.launch(typeof data.version === 'object' ? data.version.id : data.version)
  }
}

ipcRenderer.on('pure-launcher-protocol', (_, args: any) => {
  try {
    const data: T.Protocol = typeof args === 'string' ? JSON.parse(args) : args
    if (!data || typeof data !== 'object') return
    if (data.type in mappings) mappings[data.type](data)
  } catch (e) {
    console.error(e)
  }
})
const data: T.ProtocolInstall = { type: 'Install', resource: 'http://acode.apisium.cn/libraries/mod.json' }
;(window as any).h = () => protocol(data).then(console.log, console.error)
