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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 jusitfy-start items-start">
      <div className="justify-center text-center p-2 text-xl font-bold text-black/75 flex">
        Import Alumni
      </div>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" className="btn">Upload CSV</button>
    </form>
  );
};

export default ImportAlumni;
