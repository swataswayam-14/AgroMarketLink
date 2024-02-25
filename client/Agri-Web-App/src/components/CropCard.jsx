import React from 'react';

const CropCard = ({ crop, onEditClick }) => {
  return (
    <div className="crop-card">
      <div className="crop-card-info">
        <h2 className="crop-card-name">{crop.nameOfcrop}</h2>
        <p>
          Season: {crop.startMonth} - {crop.endMonth}
        </p>
        {/* ...other crop details as needed... */}
      </div>
      {/* Enhanced edit functionality: */}
      <button className="crop-card-edit" onClick={() => onEditClick(crop)}>
        Edit
      </button>
    </div>
  );
};

export default CropCard;