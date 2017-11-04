const Actions = {}

export const STOP_LOADING = "STOP_LOADING"

Actions.stopLoading = function stopLoading(loading) {
  return {
    type: STOP_LOADING,
    loading
  }
}

export default Actions
