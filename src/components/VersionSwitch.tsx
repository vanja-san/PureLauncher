import './version-switch.less'
import React from 'react'
import Dialog from 'rc-dialog'
import moment from 'moment'
import ProfilesStore from '../models/ProfilesStore'
import { useStore } from 'reqwq'

const VersionSwitch: React.FC<{ open: boolean, onClose: () => void }> = (props) => {
  const pm = useStore(ProfilesStore)
  const noTitle = $('No Title')
  const unknown = $('Unknown')
  const lastPlayed = $('Last played')
  const lastRelease = $('last-release')
  const lastSnapshot = $('last-snapshot')
  return <Dialog
    animation='zoom'
    maskAnimation='fade'
    className='version-switch'
    onClose={props.onClose}
    visible={props.open}
  >
    <ul>
      {pm.sortedVersions.map(ver => <li data-sound key={ver.key} onClick={() => {
        pm.setSelectedVersion(ver.key)
        props.onClose()
      }}>{ver.type === 'latest-release' ? lastRelease
          : ver.type === 'latest-snapshot' ? lastSnapshot : ver.name || noTitle}
        <span data-sound>({ver.lastVersionId})</span>
        <div data-sound>{lastPlayed}: {ver.lastUsed.valueOf() ? ver.lastUsed.fromNow() : unknown}</div></li>)
      }
    </ul>
  </Dialog>
}

export default VersionSwitch
