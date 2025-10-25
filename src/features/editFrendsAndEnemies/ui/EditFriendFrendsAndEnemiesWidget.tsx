import React, { useState, useEffect } from "react";
import { Modal } from "../../../shared/atoms/modal/Modal";
import { Search } from "../../../shared/atoms/input-fields/search/Search";

export const EditFrendsAndEnemiesWidget: React.FC = () => {

  const [isOpen, setModalState] = useState(true);
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");

  function closeAll(): void {
    setModalState(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeAll}>
      <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}>
      <Search value={uid} placeholder={"поиск по имени"} />
      <Search value={name} placeholder={"поиск по uid"} />
      </div>
      
    </Modal>
  );
};
