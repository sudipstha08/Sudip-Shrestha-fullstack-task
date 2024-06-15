import { QueryClient } from '@tanstack/react-query'

/**
 * Create a new query client instance
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 4 * 60 * 1000,
    },
    mutations: {
      onError(error, _, __) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('Mutation Error: ', error)
        }
      },
    },
  },
})
