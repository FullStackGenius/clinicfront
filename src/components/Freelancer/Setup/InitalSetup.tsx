import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../layouts/partials/Header';
import ContentLoader from '../../Common/ContentLoader';
import ButtonLoader from '../../Common/ButtonLoader'; 
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";
import Loader from '../../Common/Loader';

interface StepQuestion {
  id: number;
  name: string;
  description: string;
  icon_image: string;
  icon_image_path: string;
}

const pageTitles = [
  'A few Quick Questions: have you freelanced before?',
  'Got it. What’s your biggest goal freelancing?',
  'And how would you like to work?'
];

function InitialSetup() {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [selectedOption, setSelectedOption] = useState<number>(0);
	const [questions, setQuestions] = useState<StepQuestion[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const fetchStepQuestions = async () => {
			try {
				setLoading(true);
				const stepUrl =
				  currentStep === 1
					? 'get-your-experience'
					: currentStep === 2
					? 'get-your-goal'
					: 'get-how-like-to-work';

				const response = await axiosInstance.get(stepUrl);
				const questionData =
				  currentStep === 1
					? response.data.yourExperiences
					: currentStep === 2
					? response.data.yourGoals
					: response.data.howLikeToWorks;

				setQuestions(questionData);
			} catch (error) {
				console.error("Error in API request:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStepQuestions();
	}, [currentStep]);

	const saveQuestionAnswers = async () => {
		try {
			setSubmitting(true);
			const submitUrl =
			  currentStep === 1
				? 'save-freelance-exp'
				: currentStep === 2
				? 'save-freelance-goal'
				: 'save-like-to-work';
			//var form_data = await prepareSubmitData();
			const response: any = await axiosInstance({
						url: submitUrl,
						method: "POST",
						data: await prepareSubmitData()
					});
			//console.log('response', response)
			if(response.error === "false"){
				handleNextStep();
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setSubmitting(false);
		}
    };
	
	const prepareSubmitData = async() => {
		if(currentStep === 1){
			return {user_freelance_exp: selectedOption};
		}else if(currentStep === 2){
			return {user_freelance_goal: selectedOption};
		}else if(currentStep === 3){
			//return {user_like_to_work: selectedOption};
			return { user_like_to_work: Array.isArray(selectedOption) ? selectedOption : [selectedOption] };
		}
	}

	const handleNextStep = () => {
		if (currentStep < 3) setCurrentStep(currentStep + 1);
		else navigate("/freelancer/setup-profile-step-one"); // Replace with your next page route
	};

	const handlePreviousStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};
	//console.log('selectedOption', selectedOption)
  return (
    <>
    	<Loader isLoading={loading} />
      <Header />
      <section className="quick-question-section">
        <div className="main-container">
          <div className="biggest-goal-content">
            <div className="quick-progress-title">
              <div className="progressBar">
                <div className="air-progress air-progress-bar">
                  <div className="air-progress-bar">
                    <div
                      className="air-progress-bar-complete"
                      style={{ width: helpers.calculateStepPercent(3, currentStep) }}
                    ></div>
                  </div>
                  <span className="air-progress-label">{currentStep}/3</span>
                </div>
              </div>
              <div className="quick-question-title">
                <h1>{pageTitles[currentStep - 1]}</h1>
              </div>
            </div>
            <div className="quick-question-form">
              <div className="quick-form-items">
                <div className="quik-text">
                  <p>
                    Let us know how much help to give you along the way. We won’t share your answers with anyone else, including potential clients.
                  </p>
                </div>
               
                  <div className="quick-radio-btns">
                    {questions && questions.map((item) => (
                      <div key={item.id} className="air3-radioBtn-box" onClick={() => setSelectedOption(item.id)}>
                        <input className="form-check-input"
                          type="radio"
                          name="goal-radio"
                          id={`goal-radio-${item.id}`}
                        />
                        <div className="form-radio-bg">
                          <div className="air3-radio-label-check-icon">
                            <div className="air3-checkbox-input">
                              <span className="air3-radio-icon">
                                <img
                                  className="img-fluid"
                                  src="/assets/images/active-check-icon.svg"
                                  alt="check icon"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="air3-icon-lg">
                            <img
                              className="img-fluid"
                              src={item.icon_image_path}
                              alt={item.name}
                              title={item.name}
                            />
                          </div>
                          <div className="air3-btn-box-label">
                            <h4>{item.name}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                
              </div>
              <div className="quik-button-container">
                <div className="quik-left-btn">
                  <button className="back-air-btn outline-border-btns" onClick={handlePreviousStep}>Back</button>
                </div>
                <div className="quik-right-btn">
                  <button className="skip-air-btn" onClick={handleNextStep}>
                    Skip for Now
                  </button>
                  <button className="started-air-btn bg-back-btns" onClick={() => saveQuestionAnswers()}>Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InitialSetup;
