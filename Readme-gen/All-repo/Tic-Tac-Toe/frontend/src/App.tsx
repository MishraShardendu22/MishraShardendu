import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { X, Circle, Users, Trophy, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Card, CardContent } from "./components/ui/card";

const socket = io("http://localhost:3000");

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    socket.on("matchFound", ({ symbol, opponentId }) => {
      setPlayerSymbol(symbol);
      setOpponentId(opponentId);
      setIsGameActive(true);
      setIsSearching(false);
      setCurrentPlayer(symbol);
      toast.success("Opponent found! Game starting...", {
        icon: "🎮",
        duration: 3000,
      });
    });

    socket.on("moveMade", ({ index, symbol }) => {
      const newSquares = squares.slice();
      newSquares[index] = symbol;
      setSquares(newSquares);
      setCurrentPlayer(symbol === "X" ? "O" : "X");
      checkWinner(newSquares);
    });

    return () => {
      socket.off("matchFound");
      socket.off("moveMade");
    };
  }, [squares]);

  const handleClick = (index : number) => {
    if (squares[index] || currentPlayer !== playerSymbol || winner) return;
    socket.emit("makeMove", { index, symbol: playerSymbol, room: opponentId });
    const newSquares = squares.slice();
    newSquares[index] = playerSymbol;
    setSquares(newSquares);
    setCurrentPlayer(playerSymbol === "X" ? "O" : "X");
    checkWinner(newSquares);
  };

  const checkWinner = (squares: (string | null)[]) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        setIsGameActive(false);
        toast.success(`Player ${squares[a]} wins! 🎉`, { duration: 5000 });
        return;
      }
    }
    
    if (!squares.includes(null)) {
      setIsGameActive(false);
      toast("It's a draw!", {
        icon: "🤝",
        duration: 4000,
      });
    }
  };

  const findOpponent = () => {
    setIsSearching(true);
    socket.emit("findMatch");
    toast.loading("Searching for opponent...", {
      id: "searching",
    });
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsGameActive(false);
    setIsSearching(false);
    setWinner(null);
    findOpponent();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-indigo-800 mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Multiplayer Tic Tac Toe
      </motion.h1>

      <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
        <CardContent>
          {!isGameActive && !winner && (
            <motion.button
              onClick={findOpponent}
              disabled={isSearching}
              className={`flex items-center justify-center gap-2 w-full p-4 rounded-lg text-white font-medium transition-colors ${
                isSearching ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              whileHover={{ scale: isSearching ? 1 : 1.02 }}
              whileTap={{ scale: isSearching ? 1 : 0.98 }}
            >
              {isSearching ? (
                <>
                  <Users className="animate-pulse" />
                  Searching for Opponent...
                </>
              ) : (
                <>
                  <Users />
                  Find Opponent
                </>
              )}
            </motion.button>
          )}

          {isGameActive && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {squares.map((value, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg ${
                    value ? 'bg-white' : 'bg-gray-100 hover:bg-gray-200'
                  } shadow-md transition-colors`}
                  whileHover={{ scale: value ? 1 : 1.05 }}
                  whileTap={{ scale: value ? 1 : 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {value === "X" ? (
                        <X size={36} className="text-rose-500" />
                      ) : (
                        <Circle size={36} className="text-indigo-500" />
                      )}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {winner && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-indigo-800 mb-4">
                <Trophy className="text-yellow-500" />
                Player {winner} Wins!
              </div>
              <motion.button
                onClick={restartGame}
                className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          )}

          {isGameActive && !squares.includes(null) && !winner && (
            <motion.button
              onClick={restartGame}
              className="w-full mt-6 p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Play Again
            </motion.button>
          )}

          {isGameActive && (
            <div className="mt-4 text-center text-sm text-gray-600">
              {currentPlayer === playerSymbol ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <AlertCircle size={16} />
                  Your turn!
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="animate-pulse">Opponent's turn...</div>
                </motion.div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
