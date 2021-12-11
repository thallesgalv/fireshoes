import { useCallback, useState } from 'react'

const useFetch = () => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const request = useCallback(async (url: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(true)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { request, data, error, isLoading }
}

export default useFetch
