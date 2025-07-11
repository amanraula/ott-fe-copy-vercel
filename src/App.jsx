import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { lazy, Suspense,useEffect } from "react";
import { Loader } from "lucide-react";
// import SearchPage from "./pages/SearchPage";
// import SearchHistoryPage from "./pages/SearchHistoryPage";
// import NotFoundPage from "./pages/404";

// Lazy load route components
// const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const WatchPage = lazy(() => import("./pages/WatchPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SearchHistoryPage = lazy(() => import("./pages/SearchHistoryPage"));
const NotFoundPage = lazy(() => import("./pages/404"));
function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-green-600 size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
		 	<Suspense fallback={<div className='flex justify-center items-center h-screen'><Loader className='animate-spin text-green-600 size-10' /></div>}>
			<Routes>
				<Route path='/' element={<HomePage />} />
			
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				<Route path='/*' element={<NotFoundPage />} />
			
			</Routes>
			<Footer />
			</Suspense>
			<Toaster />
		
		</>
	);
}

export default App;
