import React, { useState,useEffect } from 'react'
import sessionStyles from './SessionModal.module.css'
import TextField from '@mui/material/TextField';
import { FaFileUpload } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import Button from '@mui/material/Button';
import { useUpdateSession,useGetSessionData} from '../../../queries/useEmployees'

const SessionModal = ({apptData, serviceData}) => {
  const { mutate: updateSessionMutation, isPending } = useUpdateSession();

    const sessionId = serviceData.sessionId;
    console.log(sessionId)
    const {
      data: sessionData,
      isLoading: sessionDataIsLoading,
      error: sessionDataError
    } = useGetSessionData(sessionId);

    console.log(sessionData)
    
  const [formData, setFormData] = useState({
    sessionId: serviceData?.sessionId || '',
    subjective: sessionData?.sessionResult.subjective || '',
    objective: sessionData?.sessionResult.objective ||'',
    assessment: sessionData?.sessionResult.assessment || '',
    plan: sessionData?.sessionResult.plan || '',
    notes: sessionData?.sessionResult.notes || '',
    patientId: apptData?.patientID || '',
    appointmentId: apptData?.apptId || '',
  });

  useEffect(() => {
  if (sessionData) {
    setFormData({
      sessionId: sessionData?.sessionResult.session_id,
      subjective: sessionData?.sessionResult.subjective || '',
      objective: sessionData?.sessionResult.objective || '',
      assessment: sessionData?.sessionResult.assessment || '',
      plan: sessionData?.sessionResult.plan || '',
      notes: sessionData?.sessionResult.session_notes || '',
      patientId: sessionData?.sessionResult.patient_id || '',
      appointmentId: sessionData?.sessionResult.appt_id || ''
    });
  }
}, [sessionData]);

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
  };

  //  Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
console.log(formData)
    // Optional: basic validation safeguard
    if (!formData.subjective || !formData.objective || 
        !formData.assessment || !formData.plan || !formData.notes) {
      setError('All fields are required');
      return;
    }

    const submissionData = new FormData();

    // Append text fields
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });

    // Append file if exists
    if (file) {
      submissionData.append('file', file);
    }

    updateSessionMutation(submissionData, {
      onSuccess: () => {
        // Reset form after successful submission
        setFormData({
          subjective: '',
          objective: '',
          assessment: '',
          plan: '',
          notes: ''
        });
        setFile(null);
      }
    });
  };

  if(sessionDataIsLoading) return <div>...Loading</div>
  if(sessionDataError) return <div>...Error</div>
  console.log(sessionData)
  return (
    <form onSubmit={handleSubmit} className={sessionStyles.container}>
      <h1>Session Notes</h1>

      <TextField
        name="subjective"
        value={formData.subjective}
        onChange={handleChange}
        rows={3}
        multiline
        label="Subjective"
        variant="outlined"
        fullWidth
        required
        sx={{ '& .MuiInputBase-input': { resize: 'vertical' } }}
      />

      <TextField
        name="objective"
        value={formData.objective}
        onChange={handleChange}
        rows={3}
        multiline
        label="Objective"
        variant="outlined"
        fullWidth
        required
        sx={{ '& .MuiInputBase-input': { resize: 'vertical' } }}
      />

      <TextField
        name="assessment"
        value={formData.assessment}
        onChange={handleChange}
        rows={4}
        multiline
        label="Assessment"
        variant="outlined"
        fullWidth
        required
        sx={{ '& .MuiInputBase-input': { resize: 'vertical' } }}
      />

      <TextField
        name="plan"
        value={formData.plan}
        onChange={handleChange}
        rows={4}
        multiline
        label="Plan"
        variant="outlined"
        fullWidth
        required
        sx={{ '& .MuiInputBase-input': { resize: 'vertical' } }}
      />

      <TextField
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={2}
        multiline
        label="Notes"
        variant="outlined"
        fullWidth
        required
        sx={{ '& .MuiInputBase-input': { resize: 'vertical' } }}
      />

      {/* File Upload Section */}
      <div className={sessionStyles.uploadSection}>
        <input 
          style={{ display: 'none' }} 
          type="file" 
          id="sessionFile" 
          onChange={handleUpload}
        />

        <label htmlFor="sessionFile" className={sessionStyles.uploadBtn}>
          <FaFileUpload className={sessionStyles.uploadIcon} />
          Attach File
        </label>

        {error && <p className={sessionStyles.error}>{error}</p>}

        {file && (
          <div className={sessionStyles.filePreview}>
            <CgNotes />
            <span>{file.name}</span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className={sessionStyles.removeBtn}
            >
              <FaTrash />
            </button>
          </div>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

export default SessionModal;