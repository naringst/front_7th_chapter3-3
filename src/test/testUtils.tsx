import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { render, renderHook, RenderOptions, RenderHookOptions } from "@testing-library/react"
import { ReactElement, ReactNode } from "react"

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  })

interface WrapperProps {
  children: ReactNode
}

const AllTheProviders = ({ children }: WrapperProps) => {
  const testQueryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const customRenderHook = <TResult, TProps>(
  hook: (props: TProps) => TResult,
  options?: Omit<RenderHookOptions<TProps>, "wrapper">
) => renderHook(hook, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render, customRenderHook as renderHook }
