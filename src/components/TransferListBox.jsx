import React, { useState } from 'react';
import TransferItem from './TransferItem';

// TransferListBox component
 const TransferListBox = ({ items, selectedIds, onItemSelect, title }) => {
    return (
      <div className="transfer-list-box">
        <h3>{title}</h3>
        <div className="list-container">
          {items.length === 0 ? (
            <p className="no-items">No items</p>
          ) : (
            items.map(item => (
              <TransferItem
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onClick={onItemSelect}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  export default TransferListBox;

// import React, { useState } from "react";
// import TransferItem from "./TransferItem";

// // TransferListBox component
// const TransferListBox = ({ items, selectedIds, onItemSelect, title }) => {
//   return (
//     <div className="transfer-list-box">
//       <h3>{title}</h3>
//       <div className="list-container">
//         {/* Show no items when items are is empty */}
//         <p className="no-items">No items</p>
//         {/* render TransferItem component based items recieved and pass the required props */}
//         {/* isSelected prop in TransferItem indicates whether item is selected or not.
//             use selectedIds array to determine isSelected value for each item.
//             pass onItemSelect function to TransferItem component to handle item selection.
//           */}
//       </div>
//     </div>
//   );
// };

// export default TransferListBox;
