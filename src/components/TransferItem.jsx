// TransferItem component
import React, { useState } from 'react';

const TransferItem = ({ item, isSelected, onClick }) => {
    return (
      <div
        onClick={() => onClick(item.id)}
        className={`transfer-item ${isSelected ? 'selected' : ''}`}
      >
        {item.label}
      </div>
    );
  };

  export default TransferItem;