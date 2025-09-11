import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import NextBigOpertunity from "../components/Freelancer/Setup/NextBigOpertunity";
import InitalSetup from "../components/Freelancer/Setup/InitalSetup";
import CreateProfileStep1 from "../components/Freelancer/ProfileCreate/Step1";
import CreateProfileStep2 from "../components/Freelancer/ProfileCreate/Step2";
import CreateProfileStep3 from "../components/Freelancer/ProfileCreate/Step3";
import CreateProfileStep4 from "../components/Freelancer/ProfileCreate/Step4";
import CreateProfileStep5 from "../components/Freelancer/ProfileCreate/Step5";
import CreateProfileStep6 from "../components/Freelancer/ProfileCreate/Step6";
import CreateProfileStep7 from "../components/Freelancer/ProfileCreate/Step7";
import CreateProfileStep8 from "../components/Freelancer/ProfileCreate/Step8";
import CreateProfileStep9 from "../components/Freelancer/ProfileCreate/Step9";
import CreateProfileStep10 from "../components/Freelancer/ProfileCreate/Step10";
// Other freelancer routes...
import ViewFreelancerProfile from "../components/Freelancer/ViewProfile";
import ViewFreelancerResume from "../components/Freelancer/ResumePreview";
import Chat from '../components/Chat';
import MyAppliedJob from '../components/Freelancer/MyAppliedJob';
import MyProjectContract from '../components/Freelancer/MyProjectContract';
import ContractDetail from '../components/Client/ContractDetail';
const FreelancerRoutes = () => (
	<>
		<Route path='/freelancer/next-big-opertunity'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<NextBigOpertunity />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/inital-setup'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<InitalSetup />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-one'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep1 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-two'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep2 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-three'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep3 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-four'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep4 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-five'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep5 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-six'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep6 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-seven'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep7 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-eight'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep8 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-nine'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep9 />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/setup-profile-step-ten'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<CreateProfileStep10 />
				</ProtectedRoute>
			}
		/>

		<Route path='/chat/:chat_id?/:contract_id?'
			element={
				<ProtectedRoute allowedRoles={['freelancer', 'client']}>
					<Chat />
				</ProtectedRoute>
			}
		/>
		<Route path='/freelancer/applied-jobs'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<MyAppliedJob />
				</ProtectedRoute>
			}
		/>

<Route path='/freelancer/job-contracts'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<MyProjectContract />
				</ProtectedRoute>
			}
		/>

<Route path='/freelancer/contracts-details/:contract_id'
			element={
				<ProtectedRoute allowedRoles={['freelancer']}>
					<ContractDetail />
				</ProtectedRoute>
			}
		/>

		<Route path='/freelancer/view-profile/:user_id' element={<ViewFreelancerProfile />} key="viewFreelancerProfile" />
		<Route path='/freelancer/view-resume' element={<ViewFreelancerResume />} key="viewFreelancerResume" />
	</>
);

export default FreelancerRoutes;