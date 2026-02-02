import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/auth-context"
import { ProtectedRoute } from "./components/ProtectedRoutes"
import { AuthContainer } from "./components/AuthContainer"
import { Dashboard } from "./components/Dashboard"
import { Notifications } from "@mantine/notifications"

//import { useAuth } from "./hooks/useAuth"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

/* 
const AppContent: React.FC = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <AuthContainer />;

}; */

function App(){
  return(
    <MantineProvider
      theme={{
        primaryColor: 'blue',
        defaultRadius: 'md',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        headings: {
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          fontWeight: '700',
        },
        breakpoints: {
          xs: '36em',
          sm: '48em',
          md: '62em',
          lg: '75em',
          xl: '88em',
        },
        colors: {
          blue: [
            '#e7f5ff',
            '#d0ebff',
            '#a5d8ff',
            '#74c0fc',
            '#339af0',
            '#228be6',
            '#1c7ed6',
            '#1971c2',
            '#1864ab',
            '#0c5aa6',
          ],
        },
      }}
    >
      <Notifications/>
      <ToastContainer/>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools  initialIsOpen={false}/>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={<AuthContainer/>}/>
              <Route path="/" element={<AuthContainer/>}/>
              <Route path="/dashboard"  element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}


export default App