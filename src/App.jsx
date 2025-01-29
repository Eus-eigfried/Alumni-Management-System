import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DashboardInfo from "./components/pages/developer/dashboard/DashboardInfo";
import MainHome from "./components/pages/developer/home/MainHome";
import { StoreProvider } from "./store/StoreContext";
function App() {
	return (
		<>
			<StoreProvider>
				<Router>
					<Routes>
						<Route
							path='/*'
							element={<MainHome />}
						/>
						<Route
							path='/graph'
							element={<DashboardInfo />}
						/>
					</Routes>
				</Router>
			</StoreProvider>
		</>
	);
}
export default App;
