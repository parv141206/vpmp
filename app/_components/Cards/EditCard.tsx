import React, { useState } from "react";

export default function EditCard({ id, name, position, src, onSave }): any {
  const [isEditing, setIsEditing] = useState(false);
  const [editableName, setEditableName] = useState(name);
  const [editablePosition, setEditablePosition] = useState(position);
  const [editableFile, setEditableFile] = useState(null);

  const handleFileChange = (event) => {
    setEditableFile(event.target.files[0]);
  };

  const handleSave = () => {
    const updatedData = {
      id, // Ensure id is passed
      name: editableName,
      position: editablePosition,
    };

    if (editableFile) {
      updatedData.file = editableFile;
    }

    onSave(updatedData);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative justify-end bg-white h-60 flex flex-col rounded-md shadow-lg"
    >
      <div className="bottom-0 bg-gradient-to-t from-black to-transparent left-0 right-0 p-4 text-white rounded-b-md">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
            <input
              type="text"
              value={editablePosition}
              onChange={(e) => setEditablePosition(e.target.value)}
              className="w-full p-2 mt-2 border rounded"
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 mt-2 border rounded"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 my-1 py-1 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <div className="font-bold">{name}</div>
            <div>{position}</div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500/25 backdrop-blur-lg text-white px-2 my-1 py-1 rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
