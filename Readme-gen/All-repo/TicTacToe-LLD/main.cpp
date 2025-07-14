#include <iostream>
#include <vector>
#include <queue>
#include <deque>

using namespace std;

// Observer Pattern - for future notification service
class IObserver {
public:
    virtual void update(string msg) = 0;
    virtual ~IObserver() {}
};

// Sample observer implementation
class ConsoleNotifier : public IObserver {
public:
    void update(string msg) override {
        cout << "[Notification] " << msg << endl;
    }
};

// Symbol/Mark class
class Symbol {
private:
    char mark;
    
public:
    Symbol(char m) {
        mark = m;
    }
    
    char getMark() {
        return mark;
    }
};

// Board class - Dumb object that only manages the grid
class Board {
private:
    vector<vector<Symbol*>> grid;
    int size;
    Symbol* emptyCell;
    
public:
    Board(int s) {
        size = s;
        emptyCell = new Symbol('-');
        grid = vector<vector<Symbol*>>(size, vector<Symbol*>(size, emptyCell));
    }
    
    bool isCellEmpty(int row, int col) {
        if(row < 0 || row >= size || col < 0 || col >= size) {
            return false;
        }
        return grid[row][col] == emptyCell;
    }
    
    bool placeMark(int row, int col, Symbol* mark) {
        if(row < 0 || row >= size || col < 0 || col >= size) {
            return false;
        }
        if(!isCellEmpty(row, col)) {
            return false;
        }
        grid[row][col] = mark;
        return true;
    }
    
    Symbol* getCell(int row, int col) {
        if(row < 0 || row >= size || col < 0 || col >= size) {
            return emptyCell;
        }
        return grid[row][col];
    }
    
    int getSize() {
        return size;
    }
    
    Symbol* getEmptyCell() {
        return emptyCell;
    }
    
    void display() {
        cout << "\n  ";
        for(int i = 0; i < size; i++) {
            cout << i << " ";
        }
        cout << endl;
        
        for(int i = 0; i < size; i++) {
            cout << i << " ";
            for(int j = 0; j < size; j++) {
                cout << grid[i][j]->getMark() << " ";
            }
            cout << endl;
        }
        cout << endl;
    }
};

// Player class --> 
class TicTacToePlayer {
private:
    int playerId;
    string name;
    Symbol* symbol;
    int score;
    
public:
    TicTacToePlayer(int playerId, string n, Symbol* s) {
        this->playerId = playerId;
        name = n;
        symbol = s;
        score = 0;
    }
    
    // Getters and setters
    string getName() { 
        return name; 
    }

    Symbol* getSymbol() { 
        return symbol; 
    }

    int getScore() { 
        return score; 
    }

    void incrementScore() { 
        score++;
    }
    
    ~TicTacToePlayer() {
        delete symbol;
    }
};

// Strategy Pattern for game rules
class TicTacToeRules {
public:
    virtual bool isValidMove(Board* board, int row, int col) = 0;
    virtual bool checkWinCondition(Board* board, Symbol* symbol) = 0;
    virtual bool checkDrawCondition(Board* board) = 0;
    virtual ~TicTacToeRules() {}
};

// Standard Tic Tac Toe rules
class StandardTicTacToeRules : public TicTacToeRules {
public:
    bool isValidMove(Board* board, int row, int col) override {
        return board->isCellEmpty(row, col);
    }
    
    bool checkWinCondition(Board* board, Symbol* symbol) override {
        int size = board->getSize();
        
        // Check rows
        for(int i = 0; i < size; i++) {
            bool win = true;
            for(int j = 0; j < size; j++) {
                if(board->getCell(i, j) != symbol) {
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
        
        // Check columns
        for(int j = 0; j < size; j++) {
            bool win = true;
            for(int i = 0; i < size; i++) {
                if(board->getCell(i, j) != symbol) {
                    win = false;
                    break;
                }
            }
            if(win) return true;
        }
        
        // Check main diagonal
        bool win = true;
        for(int i = 0; i < size; i++) {
            if(board->getCell(i, i) != symbol) {
                win = false;
                break;
            }
        }
        if(win) return true;
        
        // Check anti-diagonal
        win = true;
        for(int i = 0; i < size; i++) {
            if(board->getCell(i, size-1-i) != symbol) {
                win = false;
                break;
            }
        }
        return win;
    }
    
    // If all cells are filled and no winner
    bool checkDrawCondition(Board* board) override {
        int size = board->getSize();
        for(int i = 0; i < size; i++) {
            for(int j = 0; j < size; j++) {
                if(board->getCell(i, j) == board->getEmptyCell()) {
                    return false;
                }
            }
        }
        return true;
    }
};

// Game class --> Observable
class TicTacToeGame {
private:
    Board* board;
    deque<TicTacToePlayer*> players;
    TicTacToeRules* rules;
    vector<IObserver*> observers;
    bool gameOver;
    
public:
    TicTacToeGame(int boardSize) {
        board = new Board(boardSize);
        rules = new StandardTicTacToeRules();
        gameOver = false;
    }
    
    void addPlayer(TicTacToePlayer* player) {
        players.push_back(player);
    }
    
    void addObserver(IObserver* observer) {
        observers.push_back(observer);
    }

    void notify(string msg) {
        for(auto observer : observers) {
            observer->update(msg);
        }
    }
    
    void play() {
        if(players.size() < 2) {
            cout << "Need at least 2 players!" << endl;
            return;
        }
        
        notify("Tic Tac Toe Game Started!");
        
        while(!gameOver) {
            board->display();
            
            // Take out the current player from dequeue
            TicTacToePlayer* currentPlayer = players.front();
            cout << currentPlayer->getName() << " (" << currentPlayer->getSymbol()->getMark() << ") - Enter row and column: ";
            
            int row, col;
            cin >> row >> col;
            
            // check if move is valid
            if(rules->isValidMove(board, row, col)) {
                board->placeMark(row, col, currentPlayer->getSymbol());
                notify(currentPlayer->getName() + " played (" + to_string(row) + "," + to_string(col) + ")");
                
                if(rules->checkWinCondition(board, currentPlayer->getSymbol())) {
                    board->display();
                    cout << currentPlayer->getName() << " wins!" << endl;
                    currentPlayer->incrementScore();

                    notify(currentPlayer->getName() + " wins!");

                    gameOver = true;
                }
                else if(rules->checkDrawCondition(board)) {
                    board->display();
                    
                    cout << "It's a draw!" << endl;
                    notify("Game is Draw!");

                    gameOver = true;
                }
                else {
                    // Move player to back of queue
                    players.pop_front();
                    players.push_back(currentPlayer);
                }
            }
            else {
                cout << "Invalid move! Try again." << endl;
            }
        }
    }
    
    ~TicTacToeGame() {
        delete board;
        delete rules;
    }
};

// Enum & Factory Pattern for game creation
enum GameType {
    STANDARD
};

class TicTacToeGameFactory {
public:
    static TicTacToeGame* createGame(GameType gt, int boardSize) {
        if(GameType::STANDARD == gt) {
            return new TicTacToeGame(boardSize);
        }
        return nullptr;
    }
};

// Main function for Tic Tac Toe
int main() {
    cout << "=== TIC TAC TOE GAME ===" << endl;
    
    // Create game with custom board size
    int boardSize;
    cout << "Enter board size (e.g., 3 for 3x3): ";
    cin >> boardSize;
    
    TicTacToeGame* game = TicTacToeGameFactory::createGame(GameType::STANDARD, boardSize);
    
    // Add observer
    IObserver* notifier = new ConsoleNotifier();
    game->addObserver(notifier);
    
    // Create players with custom symbols
    TicTacToePlayer* player1 = new TicTacToePlayer(1, "Aditya", new Symbol('X'));
    TicTacToePlayer* player2 = new TicTacToePlayer(2, "Harshita", new Symbol('O'));
    
    game->addPlayer(player1);
    game->addPlayer(player2);
    
    // Play the game
    game->play();
    
    // Cleanup
    delete game;
    delete player1;
    delete player2;
    delete notifier;
    
    return 0;
}
