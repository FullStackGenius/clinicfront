import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import axiosInstance from "../../../_helpers/axiosInstance";
import helpers from "../../../_helpers/common";

type HourlyRateState = {
  hour_rate: number | string;
  service_rate: number | string;
  income: number | string;
};

function Step9() {
  const service_charge = 10; // 10% service charge
  const navigate = useNavigate();
  const [formData, setFormData] = useState<HourlyRateState>({ hour_rate: '', service_rate: '', income: '' });
  const [errors, setErrors] = useState<Partial<HourlyRateState>>({});
  const [submitting, setSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
		fetchPreData();
	}, []);
	
	const fetchPreData = async () => {
		try {
			setLoading(true);
			const response: any = await axiosInstance({
					url: 'get-user-step-data',
					method: "POST",
					data: {name: 'step9'}
				});
			//console.log('get-user-step-data step 9', response)
			var hourly_rate = response.data.details.user_details.hourly_rate;
			
			if(hourly_rate){
				//setFormData({...formData, hour_rate: hourly_rate});
				const amount = parseFloat(hourly_rate);
				let service_amount = calculateAmount(amount, service_charge);
				let user_amount = amount - service_amount;
				setFormData({ 
					...formData, 
					service_rate: service_amount.toFixed(2), 
					income: user_amount.toFixed(2),
					hour_rate: hourly_rate
				  });
			}
		} catch (error) {
			console.error("Error in API request:", error);
		} finally {
			setLoading(false);
		}
	};

  // Handle input change for each language/proficiency
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    const clean_val = value.replace(/\D/g, "");
    
    // Ensure the value is a valid number
    if (!isNaN(parseFloat(clean_val))) {
      const amount = parseFloat(clean_val);
      let service_amount = calculateAmount(amount, service_charge);
      let user_amount = amount - service_amount;
      
      // Update form data with calculated service_rate and income
      setFormData({ 
        ...formData, 
        service_rate: service_amount.toFixed(2), 
        income: user_amount.toFixed(2),
        [name]: clean_val // Update the current field
      });
    }else{
		setFormData({ 
        ...formData, 
        service_rate: '', 
        income: '',
        [name]: '' // Update the current field
      });
	}

    // Clear error for this field if it exists
    setErrors({
      ...errors,
      [name]: undefined
    });
  };

  const calculateAmount = (total: number, percent: number) => {
    return (total * percent) / 100;
  };

  /* Validate Form */
  const validate = (): boolean => {
    const newErrors: Partial<HourlyRateState> = {};
    if (!formData.hour_rate || isNaN(Number(formData.hour_rate))) {
      newErrors.hour_rate = 'Hourly rate is required and must be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Submit Form */
  const saveData = async (): Promise<void> => {
    if (validate()) {
      setSubmiting(true);
      try {
        const response: any = await axiosInstance({
          url: "save-freelance-rate",
          method: "POST",
          data: formData
        });
        
        if(response.error === 'false'){
          navigate("/freelancer/setup-profile-step-ten");
        }
      } catch (error) {
        console.error("Error in api request:", error);
      } finally {
        setSubmiting(false);
      }
    }
  };

  const handleNextStep = () => {
    navigate("/freelancer/setup-profile-step-ten");
  };

  const handlePreviousStep = () => {
    navigate("/freelancer/setup-profile-step-eight");
  };

  return (
    <Layout backButton={true} pagetitle="" currentStep={9} issubmitting={submitting} getStarted={saveData}>
      <div className="air-wiz-body">
        <div className="air-carousel-items">
          <div id="step-item-9" className="air-step-items">
            <div className="step-title-container">
              <h2>Tell us your desired hourly rate.</h2>
              <h5 className="step-subtitle">We can’t guarantee you’ll get this for every contract. It might be more, it might be less. Our specialists will work with you to get you contracts that you feel suit your skills and value.</h5>
            </div>
            <div className="rate-widget-section">
              <div className="rate-widget-content">
                <div className="rate-widget-items currency-boxs">
                  <div className="span-col-7">
                    <h3 className="title-h4">Hourly Rate</h3>
                    <div className="des-text-base">How much would you like to bill per hour?</div>
                  </div>
                  <div className="span-col-5">
                    <div className="currency-input-items">
                      <div className="currency-input">
                        <div className="input-group">
                          <input 
                            type="text" 
                            className="air-input" 
                            placeholder="$0.00"
                            name="hour_rate"
                            id="hour_rate"
                            value={formData.hour_rate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <span id="hourly-rate-description" className="sr-only">/hr</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="air-form-message form-message-error"
                    style={{ display: errors.hour_rate ? 'flex' : 'none' }}
                  >
                    <div className="air-icons">
                      <img className="img-fluid" src="/assets/images/error-icon.svg" alt="" title="" />
                    </div>
                    <span>{errors.hour_rate}</span>
                  </div>
                </div>
                <div className="rate-fee-items currency-boxs">
                  <div className="span-col-7">
                    <h3 className="title-h4">Services Fee</h3>
                    <div className="des-text-base">Our service fee for building your business. It will be {service_charge}%</div>
                  </div>
                  <div className="span-col-5">
                    <div className="currency-input-items">
                      <div className="currency-input">
                        <div className="input-group">
                          <input type="text" className="air-input" disabled={true} placeholder="$0.00" value={formData.service_rate} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rate-fee-items currency-boxs">
                  <div className="span-col-7">
                    <h3 className="title-h4">Income</h3>
                    <div className="des-text-base">Your retained income per hour.</div>
                  </div>
                  <div className="span-col-5">
                    <div className="currency-input-items">
                      <div className="currency-input">
                        <div className="input-group">
                          <input type="text" className="air-input" disabled={true} placeholder="$0.00" value={formData.income} />
                        </div>
                        <span id="hourly-rate-description" className="sr-only">/hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Step9;