// src/routes/clientRoutes.tsx
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateProjectStep1 from "../components/Client/CreateProject/Step1";
import CreateProjectStep2 from "../components/Client/CreateProject/Step2";
import CreateProjectStep3 from "../components/Client/CreateProject/Step3";
import CreateProjectStep4 from "../components/Client/CreateProject/Step4";
import CreateProjectStep5 from "../components/Client/CreateProject/Step5";
import CreateProjectStep6 from "../components/Client/CreateProject/Step6";
import CreateProjectStep7 from "../components/Client/CreateProject/Step7";



const ClientRoutes = () => (
	<>
		<Route path='/client/create-project-step-one' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep1 />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/create-project-step-two' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep2 />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/create-project-step-three' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep3 />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/create-project-step-four' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep4 />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/create-project-step-five' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep5 />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/create-project-step-six' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep6 />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/create-project-step-seven' 
				element={
				<ProtectedRoute allowedRoles={['client']}>
					<CreateProjectStep7 />
				</ProtectedRoute>
			}
		/>
	</>
);

export default ClientRoutes;