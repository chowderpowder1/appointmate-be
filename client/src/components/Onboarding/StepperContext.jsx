import {React, createContext} from 'react'

const StepperContext = createContext();
export const StepperProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <StepperContext.Provider value={{ formData, updateFormData }}>
      {children}
    </StepperContext.Provider>
  );

}

export const useStepperContext = () => {
  return useContext(StepperContext);
};

export default StepperContext
