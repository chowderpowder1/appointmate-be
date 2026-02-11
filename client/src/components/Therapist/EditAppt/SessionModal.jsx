import React, { useState } from 'react'
import sessionStyles from './SessionModal.module.css'
import TextField from '@mui/material/TextField';
import { FaFileUpload } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import Button from '@mui/material/Button';

const SessionModal = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setFile(selectedFile);
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Add your mutation here
    // updateDocumentMutation(formData)
    
    console.log('File ready to upload:', selectedFile);
    setUploading(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
  };

  return (
    <div className={sessionStyles.container}>
      <h1>Session Notes</h1>
      
      <TextField
        rows={4}
        multiline
        label="Subjective"
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            resize: 'vertical',
          }
        }}
        fullWidth
        required
      />
      
      <TextField
        rows={4}
        multiline
        label="Objective"
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            resize: 'vertical',
          }
        }}
        fullWidth
        required
      />
      
      <TextField
        rows={4}
        multiline
        label="Assessment"
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            resize: 'vertical',
          }
        }}
        fullWidth
        required
      />
      
      <TextField
        rows={4}
        multiline
        label="Plan"
        variant="outlined"
        fullWidth
        required
        sx={{
          '& .MuiInputBase-input': {
            resize: 'vertical',
          }
        }}
      />

        <TextField
            rows={2}
            multiline
            label="Notes"
            variant="outlined"
            fullWidth
            required
            sx={{
              '& .MuiInputBase-input': {
                resize: 'vertical',
              }
            }}
        />

      {/* File Upload Section */}
      <div className={sessionStyles.uploadSection}>
        <input 
          style={{ display: 'none' }} 
          type="file" 
          id="sessionFile" 
          name="sessionFile"
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
<Button variant='contained'>Submit</Button>
      </div>

      
    </div>
  )
}

export default SessionModal