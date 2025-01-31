import { useEffect, useState } from 'react'

const useIsCsr = (): boolean => {
  const [isCsr, setIsCsr] = useState<boolean>(false)

  useEffect(() => {
    setIsCsr(true)
  }, [])

  return isCsr
}

export default useIsCsr
