import { RouterProvider } from "react-router-dom"
import { QueryProvider } from "./providers/QueryProvider"
import { router } from "./routes"

export const App = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
