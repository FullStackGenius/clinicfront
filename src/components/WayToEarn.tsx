import { useEffect, useState } from 'react'
import Header from './layouts/partials/Header'
import Footer from './layouts/partials/Footer'
import Loader from './Common/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';

function WayToEarn() {

    const [loading, setLoading] = useState(true);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);


    const handleRedirectToSignup = (): void => {
        let roleId = 3;
        navigate(`/sign-up?role=${roleId}`);
    };
    return (
        <>
            <Loader isLoading={loading} />
            <Header />
            <section className="earn-more-section">
                <div className="main-container">
                    <div className="work-content-block">
                        <div className="colm-6">
                            <div className="work-banner-content">
                                <h1>Earn More,<br /> Work Freely</h1>
                                <p>Break free from firm limitations! Keep more of what you earn, gain clients effortlessly, and enjoy flexible, risk-free independence as an accountant.</p>
                                <div className="find-work-btns">
                                    {(user) ? <Link to="/projects">Find Work</Link> : <a onClick={(e) => {
                                        e.preventDefault();
                                        handleRedirectToSignup()
                                    }}>Find Work</a>}
                                </div>
                            </div>
                        </div>
                        <div className="colm-6">
                            <div className="work-image-block">
                                <img loading="lazy" className="img-fluid" src="/assets/images/accountant-amico-image.png" alt="" title="" />
                            </div>
                        </div>
                    </div>


                </div>
            </section>
            <section className="earn-more-content-sec">
                <div className="main-container">
                    <div className="value-content-block-sec">
                        <div className="increase-grid-container right-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Increase Your Hourly Value</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Large firms take a significant portion of your earnings in exchange for
                                                        <br /> providing clients. By working independently, you can eliminate that
                                                        <br /> middleman and keep more of what you earn. </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Accountants working at firms see their time billed out at $150–$400 per
                                                        <br /> hour to clients, but they’re often paid only $40–$75 per hour. Meanwhile,
                                                        <br /> independent accountants keep up to 70–90% of what they bill.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>You get to retain a much higher percentage of the revenue you
                                                        <br /> generate by working directly with clients, increasing income by multiples
                                                        <br /> without increasing your hours. </p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/right-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                        <div className="increase-grid-container left-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Clients Without the Hassle</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Many accountants avoid going solo because they find client acquisition daunting and time-consuming. With our platform, you gain access to a marketplace of pre-qualified clients actively seeking accountants,
                                                        without spending hours on networking, cold calling, or advertising.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>A 2023 study by Accounting Today found that 43% of solo accounting practitioners
                                                        <br /> struggle to attract new clients consistently. Those using client-acquisition platforms saw a
                                                        <br /> 60% increase in client leads and a 30% faster conversion rate to paying clients. </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>You can skip the struggle of marketing and let the platform match you with
                                                        <br /> ready-to-go clients, optimizing your time and revenue.</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/left-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                        <div className="increase-grid-container right-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>No Initial Costs or Risk</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Signing up for this platform is completely free. There are no upfront costs, and you only
                                                        <br /> pay once you start earning. We take care of the client matching, so you don’t have to
                                                        <br /> worry about overhead or marketing costs.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>According to The Entrepreneur’s Guide to Starting a Business, 90% of new small business owners face financial barriers, with the most common being startup costs for marketing and client acquisition. Our platform
                                                        eliminates this risk by providing you with a built-in client base.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>You can start building your own practice with zero upfront investment—
                                                        <br /> allowing you to dip your toes in the entrepreneurial waters without the risk
                                                        <br /> of financial loss.</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/right-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>


                        <div className="increase-grid-container left-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Flexibility & Work-Life Balance</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Unlike traditional accounting jobs, being self-employed provides you with the
                                                        <br /> flexibility to choose when and how much you work. This can lead to a better work-
                                                        <br /> life balance, reduced stress, and more time for personal pursuits.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>According to a FlexJobs survey, 73% of self-employed accountants say they have a
                                                        <br /> better work-life balance compared to when they worked for larger firms. This flexibility
                                                        <br /> can contribute to less burnout and greater job satisfaction.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>You’re in control of your schedule, so you can enjoy a
                                                        <br /> healthier, more balanced life while increasing your income.</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/left-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                        <div className="increase-grid-container right-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Grow Your Network and Expertise</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>By joining a community of like-minded professionals, you get access to shared resources, mentorship, and industry insights that can help you grow your practice. You also gain visibility within a larger network,
                                                        which could open the door to high-value referrals and partnerships.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>According to Inc. Magazine, 80% of small business owners say referrals are their most
                                                        <br /> valuable source of new business. The more you network and grow your expertise through
                                                        <br /> interactions with other accountants, the more likely you are to secure long-term clients. </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p> Not only will you get clients directly, but you’ll also build a valuable
                                                        <br /> network that can help you scale your practice over time.</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/right-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                        <div className="increase-grid-container left-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Tools to Simplify Your Practice</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>As an independent CPA, managing clients, invoicing, and tracking payments can be
                                                        <br /> cumbersome. Our platform provides you with tools to streamline these tasks, so you can focus
                                                        <br /> on what you do best—providing value to clients.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>A QuickBooks survey revealed that 55% of small business owners waste 10 hours or more a
                                                        <br /> week on manual administrative tasks. By using automation tools, self-employed accountants
                                                        <br /> report saving up to 15 hours a week, which can then be spent on billable hours or personal time.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Access to these productivity tools allows you to maximize your efficiency, so
                                                        <br /> you can increase both your billable time and personal free time.</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/left-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                        <div className="increase-grid-container right-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Work with Diverse Clients</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>Working in-house can often mean working with the same types of clients year after year. By running your own practice, you can diversify your portfolio, working with a variety of industries and individuals. This
                                                        can make your work more interesting and help you expand your skill set.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>According to a report by The Balance Careers, 66% of independent CPAs
                                                        <br /> said they enjoyed a broader range of work, and 59% felt more fulfilled due
                                                        <br /> to the variety of clients they served.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>The diversity of clients means you'll gain a wider range of
                                                        <br /> experiences and develop skills that can increase your overall
                                                        <br /> marketability and earning potential. </p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/right-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                        <div className="increase-grid-container left-image-block">
                            <div className="content-LeftColm">
                                <div className="value-content-block">
                                    <h3>Stay Ahead of Industry Trends</h3>

                                    <div className="hourly-inner-content">

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/filling-document-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Proposition</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>The accounting industry is evolving with automation, AI, and new
                                                        <br /> regulations. By working independently, you have more control over how you
                                                        <br /> adopt and integrate these technologies to stay competitive.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/database-maintenance-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Supporting Data</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>A 2024 Deloitte report highlights that 47% of accountants are already using AI tools to
                                                        <br /> streamline their work, and independent accountants tend to adopt these technologies
                                                        <br /> faster than those in larger firms, giving them a competitive edge.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hourly-inner-block">
                                            <div className="hourly-image-block">
                                                <div className="icons-div">
                                                    <img loading="lazy" className="img-fluid" src="/assets/images/benefits-icon.png" alt="" title="" />
                                                </div>
                                                <div className="hourly-title-block">
                                                    <h5>Benefit</h5>
                                                </div>
                                            </div>
                                            <div className="hour-texts-boxs">
                                                <div className="max-width-block">
                                                    <p>By working independently, you can more quickly
                                                        <br /> adapt to industry trends,</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div className="image-RightColm">
                                <div className="earn-image-block">
                                    <img loading="lazy" className="img-fluid" src="/assets/images/left-img-01.png" alt="" title="" />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>

    )
}

export default WayToEarn