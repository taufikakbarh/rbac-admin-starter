import { toast } from "sonner"

interface Options<TData, TVariables> {
  mutation: {
    mutate: (
      variables: TVariables,
      options?: {
        onSuccess?: (data: TData) => void
        onError?: (error: any) => void
      }
    ) => void
  }
  variables: TVariables
  loadingMessage: string
  successMessage: string
  errorMessage?: string
  onSuccess?: (data: TData) => void
}

export function mutateWithToast<TData, TVariables>({
  mutation,
  variables,
  loadingMessage,
  successMessage,
  errorMessage = "Something went wrong",
  onSuccess,
}: Options<TData, TVariables>) {
  const id = toast.loading(loadingMessage)

  mutation.mutate(variables, {
    onSuccess: (data) => {
      toast.success(successMessage, { id })
      onSuccess?.(data)
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || errorMessage,
        { id }
      )
    },
  })
}