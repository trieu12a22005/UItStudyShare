import React, { useState } from "react";
import UploadStep1 from "../../components/Upload/UploadStep1";
import UploadStep2 from "../../components/Upload/UploadStep2";
import UploadStep3 from "../../components/Upload/UploadStep3";
function UploadFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    file: null,
    title: "",
    subject: "",
    tags: "",
    description: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div>
      {step === 1 && <UploadStep1 next={nextStep} updateFormData={updateFormData} formData={formData} />}
      {step === 2 && <UploadStep2 next={nextStep} prev={prevStep} updateFormData={updateFormData} formData={formData} />}
      {step === 3 && <UploadStep3 prev={prevStep} formData={formData} />}
    </div>
  );
}

export default UploadFlow;
