import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL;

if (!URL) {
  console.error(
    "VITE_BASE_URL is not set — check your .env file and restart the Vite dev server (env changes require a restart, they aren't hot-reloaded).",
  );
}

export const socket = io(URL, {
  autoConnect: true,
  auth: (cb) => {

    cb({
      token: localStorage.getItem("access-token"),
    });
  },
});

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connect_error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});