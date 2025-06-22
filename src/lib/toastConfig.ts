export const toastConfig = {
  style: {
    background: "rgba(255, 255, 255, 0.05)", // subtle glassy bg
    color: "#d1dae3", // light text for contrast
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  success: {
    style: {
      background: "rgba(34, 197, 94, 0.1)", // Soft green with transparency
      color: "#d1dae3", // Green text
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(6px)",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#dcfce7",
    },
  },
  error: {
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fee2e2",
    },
  },
};
