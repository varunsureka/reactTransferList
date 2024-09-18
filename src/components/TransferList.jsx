import React, { useState } from "react";
import TransferListBox from "./TransferListBox";

// TransferList component
const TransferList = ({ items }) => {
  const [leftSideList, setLeftSideList] = useState(items);
  const [rightSideList, setRightSideList] = useState([]);
  const [selectedLeftSideIds, setSelectedLeftSideIds] = useState([]);
  const [selectedRightSideIds, setSelectedRightSideIds] = useState([]);

  const handleSelectItem = (id, listType) => {
    if (listType === "left") {
      setSelectedLeftSideIds((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedRightSideIds((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    }
  };

  const moveRight = () => {
    const itemsToMove = leftSideList.filter((item) =>
      selectedLeftSideIds.includes(item.id)
    );
    setRightSideList([...rightSideList, ...itemsToMove]);
    setLeftSideList(
      leftSideList.filter((item) => !selectedLeftSideIds.includes(item.id))
    );
    setSelectedLeftSideIds([]);
  };

  const moveLeft = () => {
    const itemsToMove = rightSideList.filter((item) =>
      selectedRightSideIds.includes(item.id)
    );
    setLeftSideList([...leftSideList, ...itemsToMove]);
    setRightSideList(
      rightSideList.filter((item) => !selectedRightSideIds.includes(item.id))
    );
    setSelectedRightSideIds([]);
  };

  return (
    <div className="transfer-list-container">
      <TransferListBox
        items={leftSideList}
        selectedIds={selectedLeftSideIds}
        onItemSelect={(id) => handleSelectItem(id, "left")}
        title="Available Items"
        data-testid="leftItems"
      />
      <div className="transfer-buttons">
        <button
          data-testid="moveRightBtn"
          onClick={moveRight}
          disabled={selectedLeftSideIds.length === 0}
        >
          Move Right &gt;&gt;
        </button>
        <button
          data-testid="moveLeftBtn"
          onClick={moveLeft}
          disabled={selectedRightSideIds.length === 0}
        >
          Move Left &lt;&lt;
        </button>
      </div>
      <TransferListBox
        items={rightSideList}
        selectedIds={selectedRightSideIds}
        onItemSelect={(id) => handleSelectItem(id, "right")}
        title="Selected Items"
        data-testid="rightItems"
      />
    </div>
  );
};

export default TransferList;


// import React, { useState } from "react";
// import TransferListBox from "./TransferListBox";

// // TransferList component
// const TransferList = ({ items }) => {
//   const [leftSideList, setLeftSideList] = useState(items);
//   const [rightSideList, setRightSideList] = useState([]);
//   const [selectedLeftSideIds, setSelectedLeftSideIds] = useState([]);
//   const [selectedRightSideIds, setSelectedRightSideIds] = useState([]);

//   const handleSelectItem = (id, listType) => {
//     if (listType === "left") {
//         // update selectedLeftSideIds state based on selected item
//     } else {
//         // update selectedRightSideIds state based on selected item
//     }
//   };

//   const moveRight = () => {
//     // move selected items from leftSideList to rightSideList
//     // update leftSideList and rightSideList states
//     // clear selectedLeftSideIds state
//   };

//   const moveLeft = () => {
//     // move selected items from rightSideList to leftSideList
//     // update leftSideList and rightSideList states
//     // clear selectedRightSideIds state
//   };

//   return (
//     <div className="transfer-list-container">
//       <TransferListBox
//         items={leftSideList}
//         selectedIds={selectedLeftSideIds}
//         onItemSelect={(id) => handleSelectItem(id, "left")}
//         title="Available Items"
//         data-testid="leftItems"
//       />
//       <div className="transfer-buttons">
//         {/* disable the button if no items on left side are selected */}
//         <button
//           data-testid="moveRightBtn"
//           onClick={moveRight}
//         >
//           Move Right &gt;&gt;
//         </button>
//         {/* disable the button if no items on right side are selected */}
//         <button
//           data-testid="moveLeftBtn"
//           onClick={moveLeft}
//         >
//           Move Left &lt;&lt;
//         </button>
//       </div>
//       <TransferListBox
//         items={rightSideList}
//         selectedIds={selectedRightSideIds}
//         onItemSelect={(id) => handleSelectItem(id, "right")}
//         title="Selected Items"
//         data-testid="rightItems"
//       />
//     </div>
//   );
// };

// export default TransferList;
