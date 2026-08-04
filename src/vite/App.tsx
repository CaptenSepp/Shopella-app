import { ThemeProvider } from '@/app/theme'
import router from '@/vite/router'
import { RouterProvider } from 'react-router-dom'

const App = () => ( // app root renders router
  <ThemeProvider>
    <RouterProvider router={router} /> {/* bind the route tree */}
  </ThemeProvider>
)

export default App
