import { useNavigate, useLocation } from "react-router-dom"
import { useCallback, useMemo } from "react"

/**
 * URL 쿼리 파라미터를 관리하는 공통 훅 (문자열용)
 */
export const useQueryParam = (paramName: string, defaultValue: string = ""): [string, (value: string) => void] => {
  const navigate = useNavigate()
  const location = useLocation()

  // URL에서 값 읽기 (location.search가 변경되면 자동으로 리렌더링됨)
  const value = useMemo(() => {
    const queryParams = new URLSearchParams(location.search)
    const value = queryParams.get(paramName)
    return value || defaultValue
  }, [paramName, defaultValue, location.search])

  // Setter 함수
  const setParam = useCallback(
    (newValue: string) => {
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

  // URL에서 값 읽기 (location.search가 변경되면 자동으로 리렌더링됨)
  const value = useMemo(() => {
    const queryParams = new URLSearchParams(location.search)
    const value = queryParams.get(paramName)
    return value ? parseInt(value) || defaultValue : defaultValue
  }, [paramName, defaultValue, location.search])

  // Setter 함수
  const setParam = useCallback(
    (newValue: number) => {
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
