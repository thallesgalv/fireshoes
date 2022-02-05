import { useEffect } from 'react'
import { primary } from '../utils/colorVariables'
import packageInfo from '../../package.json'

export const showVersion = () => {
  useEffect(() => {
    const version = packageInfo.version
    console.log(
      `\n\n%c 🔥 Current Version: %c   ${version}  \n`,
      `background: #eee; color: ${primary}`,
      `background: ${primary}; color: #fff`
    )
  }, [])
}

export default showVersion
