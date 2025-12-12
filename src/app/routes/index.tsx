import { createBrowserRouter } from "react-router-dom"
import { Layout } from "../../widgets/layout"
import { PostsManagerPage } from "../../pages/postManager"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PostsManagerPage />,
      },
    ],
  },
])
