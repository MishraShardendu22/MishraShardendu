import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

app.use(cors());

let waitingPlayer: Socket | null = null;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("findMatch", () => {
    if (waitingPlayer) {
      const opponent = waitingPlayer;
      waitingPlayer = null;

      const isFirstPlayerX = Math.random() < 0.5;
      const gameData = {
        playerX: isFirstPlayerX ? socket.id : opponent.id,
        playerO: isFirstPlayerX ? opponent.id : socket.id,
      };

      socket.join(gameData.playerX);
      socket.join(gameData.playerO);
      io.to(gameData.playerX).emit("matchFound", {
        symbol: "X",
        opponentId: gameData.playerO,
      });
      io.to(gameData.playerO).emit("matchFound", {
        symbol: "O",
        opponentId: gameData.playerX,
      });
    } else {
      waitingPlayer = socket;
    }
  });

  socket.on("makeMove", ({ index, symbol, room }) => {
    io.to(room).emit("moveMade", { index, symbol });
  });

  socket.on("disconnect", () => {
    if (waitingPlayer?.id === socket.id) {
      waitingPlayer = null;
    }
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
