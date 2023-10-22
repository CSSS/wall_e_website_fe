import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Pages } from './Pages';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const routes = Pages.map(page => {
	return (
		<Route
			path={page.path}
			element={
				<App path={page.path} element={page.element} />
			}
		/>
	);
});
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				{routes}
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
