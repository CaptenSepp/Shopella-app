import { RouterProvider } from 'react-router-dom'
import router from '@/app/router'
import { ThemeProvider } from '@/app/theme'

const App = () => ( // app root renders router
  <ThemeProvider>
    <RouterProvider router={router} /> {/* bind the route tree */}
  </ThemeProvider>
)

export default App
