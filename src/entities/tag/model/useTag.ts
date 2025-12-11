import { useEffect, useState } from "react"
import { fetchTags } from "../api/fetchTags"
import { Tag } from "./tagType"

export const useTag = () => {
  const [tags, setTags] = useState<Tag[]>([])

  // 태그 가져오기
  const loadTags = async () => {
    try {
      const data = await fetchTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags().then(setTags).catch(console.error)
  }, [])

  return {
    tags,
    fetchTags: loadTags,
  }
}
