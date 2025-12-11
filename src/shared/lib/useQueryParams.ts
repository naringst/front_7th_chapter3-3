import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useCallback, useState } from "react"

/**
 * URL 쿼리 파라미터를 관리하는 공통 훅 (문자열용)
 */
export const useQueryParam = (paramName: string, defaultValue: string = ""): [string, (value: string) => void] => {
  const navigate = useNavigate()
  const location = useLocation()

  // URL에서 초기값 읽기
  const getValue = useCallback((): string => {
    const queryParams = new URLSearchParams(location.search)
    const value = queryParams.get(paramName)
    return value || defaultValue
  }, [paramName, defaultValue, location.search])

  const [value, setValue] = useState<string>(getValue())

  // URL이 변경되면 상태 동기화
  useEffect(() => {
    setValue(getValue())
  }, [location.search, getValue])

  // Setter 함수
  const setParam = useCallback(
    (newValue: string) => {
      setValue(newValue)
      const params = new URLSearchParams(location.search)
      if (newValue && newValue !== defaultValue && newValue !== "") {
        params.set(paramName, String(newValue))
      } else {
        params.delete(paramName)
      }
      navigate(`?${params.toString()}`, { replace: true })
    },
    [paramName, defaultValue, location.search, navigate],
  )

  return [value, setParam]
}

/**
 * URL 쿼리 파라미터를 관리하는 공통 훅 (숫자용)
 */
export const useQueryParamNumber = (paramName: string, defaultValue: number = 0): [number, (value: number) => void] => {
  const navigate = useNavigate()
  const location = useLocation()

  // URL에서 초기값 읽기
  const getValue = useCallback((): number => {
    const queryParams = new URLSearchParams(location.search)
    const value = queryParams.get(paramName)
    return value ? parseInt(value) || defaultValue : defaultValue
  }, [paramName, defaultValue, location.search])

  const [value, setValue] = useState<number>(getValue())

  // URL이 변경되면 상태 동기화
  useEffect(() => {
    setValue(getValue())
  }, [location.search, getValue])

  // Setter 함수
  const setParam = useCallback(
    (newValue: number) => {
      setValue(newValue)
      const params = new URLSearchParams(location.search)
      if (newValue !== defaultValue && newValue !== 0) {
        params.set(paramName, String(newValue))
      } else {
        params.delete(paramName)
      }
      navigate(`?${params.toString()}`, { replace: true })
    },
    [paramName, defaultValue, location.search, navigate],
  )

  return [value, setParam]
}
