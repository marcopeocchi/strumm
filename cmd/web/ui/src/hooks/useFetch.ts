import { useEffect, useState } from "react"

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState<unknown>()

  const fetchJson = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
      setError(await res.text())
      return
    }

    setData(await res.json())
  }

  useEffect(() => {
    fetchJson(url)
  }, [url])

  return {
    data,
    error,
    mutate: setData,
  }
}

export default useFetch