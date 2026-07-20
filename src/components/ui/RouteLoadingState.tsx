const RouteLoadingState = ({ label = "Loading page..." }: { label?: string }) => (
  <div className="app-page-shell app-page-shell--center app-route-loading" role="status" aria-live="polite">
    <span className="app-route-loading__spinner" aria-hidden="true" />
    <span>{label}</span>
  </div>
)

export default RouteLoadingState
