import { http, HttpResponse } from "msw"

// Mock data
export const mockPosts = {
  posts: [
    {
      id: 1,
      title: "Test Post 1",
      body: "This is test post body 1",
      userId: 1,
      tags: ["history", "american"],
      reactions: { likes: 10, dislikes: 2 },
    },
    {
      id: 2,
      title: "Test Post 2",
      body: "This is test post body 2",
      userId: 2,
      tags: ["crime", "mystery"],
      reactions: { likes: 5, dislikes: 1 },
    },
    {
      id: 3,
      title: "Search Target Post",
      body: "This post contains searchable content",
      userId: 1,
      tags: ["history"],
      reactions: { likes: 20, dislikes: 0 },
    },
  ],
  total: 3,
  skip: 0,
  limit: 10,
}

export const mockUsers = {
  users: [
    { id: 1, username: "user1", image: "https://example.com/user1.jpg" },
    { id: 2, username: "user2", image: "https://example.com/user2.jpg" },
  ],
}

export const mockTags = [
  { slug: "history", name: "History", url: "https://dummyjson.com/posts/tag/history" },
  { slug: "american", name: "American", url: "https://dummyjson.com/posts/tag/american" },
  { slug: "crime", name: "Crime", url: "https://dummyjson.com/posts/tag/crime" },
  { slug: "mystery", name: "Mystery", url: "https://dummyjson.com/posts/tag/mystery" },
]

export const mockComments = {
  comments: [
    {
      id: 1,
      body: "Test comment 1",
      postId: 1,
      userId: 1,
      likes: 5,
      user: { id: 1, username: "user1", image: "https://example.com/user1.jpg" },
    },
    {
      id: 2,
      body: "Test comment 2",
      postId: 1,
      userId: 2,
      likes: 3,
      user: { id: 2, username: "user2", image: "https://example.com/user2.jpg" },
    },
  ],
  total: 2,
  skip: 0,
  limit: 30,
}

export const mockUser = {
  id: 1,
  username: "user1",
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john@example.com",
  phone: "123-456-7890",
  image: "https://example.com/user1.jpg",
  address: { address: "123 Main St", city: "New York", state: "NY" },
  company: { name: "Test Corp", title: "Developer" },
}

export const handlers = [
  // Posts
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url)
    const limit = Number(url.searchParams.get("limit")) || 10
    const skip = Number(url.searchParams.get("skip")) || 0
    return HttpResponse.json({
      ...mockPosts,
      posts: mockPosts.posts.slice(skip, skip + limit),
      limit,
      skip,
    })
  }),

  // Search posts
  http.get("/api/posts/search", ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get("q") || ""
    const filtered = mockPosts.posts.filter(
      (post) => post.title.toLowerCase().includes(q.toLowerCase()) || post.body.toLowerCase().includes(q.toLowerCase()),
    )
    return HttpResponse.json({
      posts: filtered,
      total: filtered.length,
      skip: 0,
      limit: 10,
    })
  }),

  // Posts by tag
  http.get("/api/posts/tag/:tag", ({ params }) => {
    const { tag } = params
    const filtered = mockPosts.posts.filter((post) => post.tags.includes(tag as string))
    return HttpResponse.json({
      posts: filtered,
      total: filtered.length,
      skip: 0,
      limit: 10,
    })
  }),

  // Tags
  http.get("/api/posts/tags", () => {
    return HttpResponse.json(mockTags)
  }),

  // Users list
  http.get("/api/users", () => {
    return HttpResponse.json(mockUsers)
  }),

  // Single user
  http.get("/api/users/:id", () => {
    return HttpResponse.json(mockUser)
  }),

  // Comments by post
  http.get("/api/comments/post/:postId", () => {
    return HttpResponse.json(mockComments)
  }),

  // Add post
  http.post("/api/posts/add", async ({ request }) => {
    const body = (await request.json()) as { title: string; body: string; userId: number }
    return HttpResponse.json({
      id: 100,
      ...body,
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
    })
  }),

  // Update post
  http.put("/api/posts/:id", async ({ request, params }) => {
    const body = (await request.json()) as { title: string; body: string }
    return HttpResponse.json({
      id: Number(params.id),
      ...body,
    })
  }),

  // Delete post
  http.delete("/api/posts/:id", () => {
    return HttpResponse.json({ isDeleted: true })
  }),

  // Add comment
  http.post("/api/comments/add", async ({ request }) => {
    const body = (await request.json()) as { body: string; postId: number; userId: number }
    return HttpResponse.json({
      id: 100,
      ...body,
      likes: 0,
      user: { id: body.userId, username: "user1" },
    })
  }),

  // Update comment
  http.put("/api/comments/:id", async ({ request, params }) => {
    const body = (await request.json()) as { body: string; postId: number }
    return HttpResponse.json({
      id: Number(params.id),
      ...body,
    })
  }),

  // Delete comment
  http.delete("/api/comments/:id", () => {
    return HttpResponse.json({ isDeleted: true })
  }),

  // Like comment
  http.patch("/api/comments/:id", async ({ request, params }) => {
    const body = (await request.json()) as { likes: number }
    return HttpResponse.json({
      id: Number(params.id),
      ...body,
    })
  }),
]
