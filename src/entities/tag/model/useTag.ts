import { useState } from "react"
import { fetchTags } from "../api/fetchTags"

export const useTag = () => {
  const [tags, setTags] = useState([])

  // 태그 가져오기
  const loadTags = async () => {
    try {
      const data = await fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  return {
    tags,
    fetchTags: loadTags,
  }
}
