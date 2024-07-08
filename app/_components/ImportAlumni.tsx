import React, { useState } from 'react';

const ImportAlumni: React.FC = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCsvFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (csvFile) {
      try {
        const formData = new FormData();
        formData.append('file', csvFile);

        const response = await fetch('/api/db/import', {
          method: 'POST',
          body: csvFile,
        });

        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error uploading CSV file:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload CSV</button>
    </form>
  );
};

export default ImportAlumni;
