import { useState } from "react"
import { User, UserDetail } from "../../../entities/user/model/userTypes"

export const useUserDetail = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  const open = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowDialog(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  const close = () => {
    setShowDialog(false)
    setSelectedUser(null)
  }

  return {
    showDialog,
    setShowDialog,
    selectedUser,
    open,
    close,
  }
}
