import { Route } from 'react-router-dom';
import Home from "../components/Home";
import OurFreelancer from "../components/OurFreelancer";
import FreelancerProfile from "../components/FreelancerProfile";
import LearnToHire from "../components/LearnToHire";
import WayToEarn from '../components/WayToEarn';
import AllProject from '../components/Project/AllProject';
import OurPrices from '../components/OurPrices';
import AboutUs from '../components/AboutUs';
import TermCondition from '../components/TermCondtion';
import ContactUs from '../components/ContactUs';
import PrivacyPolicy from '../components/PrivacyPolicy';
import AllResources from '../components/AllResources';
import SingleResourceDetail from '../components/SingleResourceDetail';
// Add other public routes...

const PublicRoutes = () => (
  <>
    <Route path='/' element={<Home />} />
    <Route path='/our-freelancer' element={<OurFreelancer />} />
    <Route path='/resources' element={<AllResources />} />
    <Route path='/resource/detail/:resource_id' element={<SingleResourceDetail />} />
    <Route path='/freelancer-profile' element={<FreelancerProfile />} />
    <Route path='/learn-how-to-hire' element={<LearnToHire />} />
    <Route path='/way-to-earn' element={<WayToEarn />} />
    <Route path='/projects' element={<AllProject />} />
    <Route path='/our-prices' element={<OurPrices />} />
    <Route path='/about-us' element={<AboutUs />} />
    <Route path='/term-conditions' element={<TermCondition />} />
    <Route path='/contact-us' element={<ContactUs />} />
    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
  </>
);

export default PublicRoutes;
