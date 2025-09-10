import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/auth-context"
import AuthPage from "./pages/AuthPage"
import { ProtectedRoute } from "./components/ProtectedRoutes"
import MainPage from "./pages/MainPage"

export const queryClient= new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:true
    }
  }
})

function App(){

  return(
    <MantineProvider >
      <ToastContainer/>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools  initialIsOpen={false}/>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={<AuthPage/>}/>
              <Route path="/"  element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}


export default App