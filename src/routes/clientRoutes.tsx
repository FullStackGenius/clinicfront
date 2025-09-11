import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateProjectStep1 from "../components/Client/CreateProject/Step1";
import CreateProjectStep2 from "../components/Client/CreateProject/Step2";
import CreateProjectStep3 from "../components/Client/CreateProject/Step3";
import CreateProjectStep4 from "../components/Client/CreateProject/Step4";
import CreateProjectStep5 from "../components/Client/CreateProject/Step5";
import CreateProjectStep6 from "../components/Client/CreateProject/Step6";
import CreateProjectStep7 from "../components/Client/CreateProject/Step7";
import MyJobs from '../components/Client/MyJobs';
import ProjectProposal from '../components/Client/ProjectProposal';
import ClientProjectContract from '../components/Client/ClientProjectContract';
import ContractDetail from '../components/Client/ContractDetail';
import PaymentSetting from '../components/Payment/PaymentSetting';
import MakeContractPayment from '../components/Payment/MakeContractPayment';
import AllTransaction from '../components/Payment/AllTransaction';



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

		<Route path='/client/project-proposal/:project_id'
			element={
				<ProtectedRoute allowedRoles={['client']}>
					<ProjectProposal />
				</ProtectedRoute>
			}
		/>

		<Route path='/client/my-jobs'
			element={
				<ProtectedRoute allowedRoles={['client']}>
					<MyJobs />
				</ProtectedRoute>
			}
		/>

		<Route path='/client/job-contracts'
			element={
				<ProtectedRoute allowedRoles={['client']}>
					<ClientProjectContract />
				</ProtectedRoute>
			}
		/>
		<Route path='/client/contracts-details/:contract_id'
			element={
				<ProtectedRoute allowedRoles={['client']}>
					<ContractDetail />
				</ProtectedRoute>
			}
		/>

		<Route path='/payment-setting'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<PaymentSetting />
				</ProtectedRoute>
			}
		/>

		<Route path='/contract/payment/:contract_id'
			element={
				<ProtectedRoute allowedRoles={['client']}>
					<MakeContractPayment />
				</ProtectedRoute>
			}
		/>

		<Route path='/all-transactions'
			element={
				<ProtectedRoute allowedRoles={['client', 'freelancer']}>
					<AllTransaction />
				</ProtectedRoute>
			}
		/>

	</>
);

export default ClientRoutes;