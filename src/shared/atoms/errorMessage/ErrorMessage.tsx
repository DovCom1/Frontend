import Icon from "../icons/Icon";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div
      style={{
        width: "90%",
        margin: "10px 0 20px 0",
        padding: "12px 16px",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderRadius: "8px",
        color: "#fecaca",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <span style={{ fontSize: "14px", lineHeight: "1.4" }}>{message}</span>
    </div>
  );
};
