import { useEffect } from 'react'
import packageInfo from '../../package.json'

export function showVersion() {
  useEffect(() => {
    const version = packageInfo.version
    console.log(
      `\n\n%c 🔥 Current Version: %c   ${version}  \n`,
      'background: #eee; color: #F63C3C',
      'background: #F63C3C; color: #fff'
    )
  }, [])
}

export default showVersion
