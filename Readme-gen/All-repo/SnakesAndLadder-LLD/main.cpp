#include <iostream>
#include <vector>
#include <map>
#include <deque>
#include <cstdlib>
#include <ctime>

using namespace std;

// Observer Pattern
class IObserver {
public:
    virtual void update(string msg) = 0;
    virtual ~IObserver() {}
};

// Sample observer implementation
class SnakeAndLadderConsoleNotifier : public IObserver {
public:
    void update(string msg) override {
        cout << "[NOTIFICATION] " << msg << endl;
    }
};

// Dice class
class Dice {
private:
    int faces;
    
public:
    Dice(int f) {
        faces = f;
        srand(time(0));
    }
    
    int roll() {
        return (rand() % faces) + 1;
    }
};

// Base class for Snake and Ladder (both have start and end positions)
class BoardEntity {
protected:
    int startPosition;
    int endPosition;
    
public:
    BoardEntity(int start, int end) {
        startPosition = start;
        endPosition = end;
    }
    
    int getStart() { 
        return startPosition; 
    }

    int getEnd() { 
        return endPosition;
    }
    
    virtual void display() = 0;
    virtual string name() = 0;
    virtual ~BoardEntity() {}
};

// Snake class
class Snake : public BoardEntity {
public:
    Snake(int start, int end) : BoardEntity(start, end) {
        if(end >= start) {
            cout << "Invalid snake! End must be less than start." << endl;
        }
    }
    
    void display() override {
        cout << "Snake: " << startPosition << " -> " << endPosition << endl;
    }

    string name() override {
        return "SNAKE" ;
    }
};

// Ladder class
class Ladder : public BoardEntity {
public:
    Ladder(int start, int end) : BoardEntity(start, end) {
        if(end <= start) {
            cout << "Invalid ladder! End must be greater than start." << endl;
        }
    }
    
    void display() override {
        cout << "Ladder: " << startPosition << " -> " << endPosition << endl;
    }

    string name() override {
        return "LADDER" ;
    }
};

class BoardSetupStrategy;

// Board class
class Board {
private:
    int size;
    vector<BoardEntity*> snakesAndLadders;
    map<int, BoardEntity*> boardEntities;
    
public:
    Board(int s) {
        size = s * s;  // m*m board
    }
    
    bool canAddEntity(int position) {
        return boardEntities.find(position) == boardEntities.end();
    }
    
    void addBoardEntity(BoardEntity* boardEntity) {
        if(canAddEntity(boardEntity->getStart())) {
            snakesAndLadders.push_back(boardEntity);
            boardEntities[boardEntity->getStart()] = boardEntity;
        }
    }
    
    void setupBoard(BoardSetupStrategy* strategy);
    
    BoardEntity* getEntity(int position) {
        if(boardEntities.find(position) != boardEntities.end()) {
            return boardEntities[position];
        }
        return nullptr;
    }
    
    int getBoardSize() { 
        return size;
    }
    
    void display() {
        cout << "\n=== Board Configuration ===" << endl;
        cout << "Board Size: " << size << " cells" << endl;

        int snakeCount = 0;
        int ladderCount = 0;
        for(auto entity : snakesAndLadders) {
            if(entity->name() == "SNAKE") snakeCount++;
            else ladderCount++;
        }
        
        cout << "\nSnakes: " << snakeCount << endl;
        for(auto entity : snakesAndLadders) {
            if(entity->name() == "SNAKE") {
                entity->display();
            }
        }
        
        cout << "\nLadders: " << ladderCount << endl;
        for(auto entity : snakesAndLadders) {
            if(entity->name() == "LADDER") {
                entity->display();
            }
        }
        cout << "=========================" << endl;
    }
    
    ~Board() {
        for(auto entity : snakesAndLadders) {
            delete entity;
        }
    }
};


// Strategy Pattern for Board Setup
class BoardSetupStrategy {
public:
    virtual void setupBoard(Board* board) = 0;
    virtual ~BoardSetupStrategy() {}
};

// Random Strategy with difficulty levels
class RandomBoardSetupStrategy : public BoardSetupStrategy {
public:
    enum Difficulty {
        EASY,    // More ladders, fewer snakes
        MEDIUM,  // Equal snakes and ladders
        HARD     // More snakes, fewer ladders
    };
    
private:
    Difficulty difficulty;
    
    void setupWithProbability(Board* board, double snakeProbability) {
        int boardSize = board->getBoardSize();
        int totalEntities = boardSize / 10; // Roughly 10% of board has entities
        
        for(int i = 0; i < totalEntities; i++) {
            double prob = (double)rand() / RAND_MAX;
            
            if(prob < snakeProbability) {
                // Add snake
                int attempts = 0;
                while(attempts < 50) {
                    int start = rand() % (boardSize - 10) + 10;
                    int end = rand() % (start - 1) + 1;
                    
                    if(board->canAddEntity(start)) {
                        board->addBoardEntity(new Snake(start, end));
                        break;
                    }
                    attempts++;
                }
            } else {
                // Add ladder
                int attempts = 0;
                while(attempts < 50) {
                    int start = rand() % (boardSize - 10) + 1;
                    int end = rand() % (boardSize - start) + start + 1;
                    
                    if(board->canAddEntity(start) && end < boardSize) {
                        board->addBoardEntity(new Ladder(start, end));
                        break;
                    }
                    attempts++;
                }
            }
        }
    }
    
public:
    RandomBoardSetupStrategy(Difficulty d) {
        difficulty = d;
    }
    
    void setupBoard(Board* board) override {
        switch(difficulty) {
            case EASY:
                setupWithProbability(board, 0.3);  // 30% snakes, 70% ladders
                break;
            case MEDIUM:
                setupWithProbability(board, 0.5);  // 50% snakes, 50% ladders
                break;
            case HARD:
                setupWithProbability(board, 0.7);  // 70% snakes, 30% ladders
                break;
        }
    }
};

// Custom Strategy - User provides count
class CustomCountBoardSetupStrategy : public BoardSetupStrategy {
private:
    int numSnakes;
    int numLadders;
    bool randomPositions;
    vector<pair<int, int>> snakePositions;
    vector<pair<int, int>> ladderPositions;
    
public:
    CustomCountBoardSetupStrategy(int snakes, int ladders, bool random) {
        numSnakes = snakes;
        numLadders = ladders;
        randomPositions = random;
    }
    
    void addSnakePosition(int start, int end) {
        snakePositions.push_back(make_pair(start, end));
    }
    
    void addLadderPosition(int start, int end) {
        ladderPositions.push_back(make_pair(start, end));
    }
    
    void setupBoard(Board* board) override {
        if(randomPositions) {
            // Random placement with user-defined counts
            int boardSize = board->getBoardSize();
            
            // Add snakes
            int snakesAdded = 0;
            while(snakesAdded < numSnakes) {
                int start = rand() % (boardSize - 10) + 10;
                int end = rand() % (start - 1) + 1;
                
                if(board->canAddEntity(start)) {
                    board->addBoardEntity(new Snake(start, end));
                    snakesAdded++;
                }
            }
            
            // Add ladders
            int laddersAdded = 0;
            while(laddersAdded < numLadders) {
                int start = rand() % (boardSize - 10) + 1;
                int end = rand() % (boardSize - start) + start + 1;
                
                if(board->canAddEntity(start) && end < boardSize) {
                    board->addBoardEntity(new Ladder(start, end));
                    laddersAdded++;
                }
            }
        } 
        else {
            // User-defined positions
            for(auto& pos : snakePositions) {
                if(board->canAddEntity(pos.first)) {
                    board->addBoardEntity(new Snake(pos.first, pos.second));
                }
            }
            
            for(auto& pos : ladderPositions) {
                if(board->canAddEntity(pos.first)) {
                    board->addBoardEntity(new Ladder(pos.first, pos.second));
                }
            }
        }
    }
};

// Standard Board Strategy - Traditional Snake & Ladder positions
class StandardBoardSetupStrategy : public BoardSetupStrategy {
public:
    void setupBoard(Board* board) override {
        // Only works for 10x10 board (100 cells)
        if(board->getBoardSize() != 100) {
            cout << "Standard setup only works for 10x10 board!" << endl;
            return;
        }
        
        // Standard snake positions (based on traditional board)
        board->addBoardEntity(new Snake(99, 54));
        board->addBoardEntity(new Snake(95, 75));
        board->addBoardEntity(new Snake(92, 88));
        board->addBoardEntity(new Snake(89, 68));
        board->addBoardEntity(new Snake(74, 53));
        board->addBoardEntity(new Snake(64, 60));
        board->addBoardEntity(new Snake(62, 19));
        board->addBoardEntity(new Snake(49, 11));
        board->addBoardEntity(new Snake(46, 25));
        board->addBoardEntity(new Snake(16, 6));
        
        // Standard ladder positions
        board->addBoardEntity(new Ladder(2, 38));
        board->addBoardEntity(new Ladder(7, 14));
        board->addBoardEntity(new Ladder(8, 31));
        board->addBoardEntity(new Ladder(15, 26));
        board->addBoardEntity(new Ladder(21, 42));
        board->addBoardEntity(new Ladder(28, 84));
        board->addBoardEntity(new Ladder(36, 44));
        board->addBoardEntity(new Ladder(51, 67));
        board->addBoardEntity(new Ladder(71, 91));
        board->addBoardEntity(new Ladder(78, 98));
        board->addBoardEntity(new Ladder(87, 94));
    }
};

// Now definining setupBoard for Board class
void Board::setupBoard(BoardSetupStrategy* strategy) {
    strategy->setupBoard(this);
}

// Player class
class SnakeAndLadderPlayer {
private:
    int playerId;
    string name;
    int position;
    int score;
    
public:
    SnakeAndLadderPlayer(int playerId, string n) {
        this->playerId = playerId;
        name = n;
        position = 0;
        score = 0;
    }
    
    // Getters and Setters
    string getName() { 
        return name;
    }
    int getPosition() { 
        return position; 
    }
    void setPosition(int pos) { 
        position = pos; 
    }
    int getScore() { 
        return score;
    }
    void incrementScore() { 
        score++; 
    }
};

// Strategy Pattern for game rules
class SnakeAndLadderRules {
public:
    virtual bool isValidMove(int currentPos, int diceValue, int boardSize) = 0;
    virtual int calculateNewPosition(int currentPos, int diceValue, Board* board) = 0;
    virtual bool checkWinCondition(int position, int boardSize) = 0;
    virtual ~SnakeAndLadderRules() {}
};

// Standard rules
class StandardSnakeAndLadderRules : public SnakeAndLadderRules {
public:
    bool isValidMove(int currentPos, int diceValue, int boardSize) override {
        return (currentPos + diceValue) <= boardSize;
    }
    
    int calculateNewPosition(int currentPos, int diceValue, Board* board) override {
        int newPos = currentPos + diceValue;
        BoardEntity* entity = board->getEntity(newPos);
        
        if(entity != nullptr) {
            return entity->getEnd();
        }
        return newPos;
    }
    
    bool checkWinCondition(int position, int boardSize) override {
        return position == boardSize;
    }
};

// Game class
class SnakeAndLadderGame {
private:
    Board* board;
    Dice* dice;
    deque<SnakeAndLadderPlayer*> players;
    SnakeAndLadderRules* rules;
    vector<IObserver*> observers;
    bool gameOver;
    
public:
    SnakeAndLadderGame(Board* b, Dice* d) {
        board = b;
        dice = d;
        rules = new StandardSnakeAndLadderRules();
        gameOver = false;
    }
    
    void addPlayer(SnakeAndLadderPlayer* player) {
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
    
    void displayPlayerPositions() {
        cout << "\n=== Current Positions ===" << endl;
        for(auto player : players) {
            cout << player->getName() << ": " << player->getPosition() << endl;
        }
        cout << "======================" << endl;
    }
    
    void play() {
        if(players.size() < 2) {
            cout << "Need at least 2 players!" << endl;
            return;
        }
        
        notify("Game started");

        board->display();
        
        while(!gameOver) {
            SnakeAndLadderPlayer* currentPlayer = players.front();
            
            cout << "\n" << currentPlayer->getName() << "'s turn. Press Enter to roll dice...";
            cin.ignore();
            cin.get();
            
            int diceValue = dice->roll();
            cout << "Rolled: " << diceValue << endl;
            
            int currentPos = currentPlayer->getPosition();
            
            if(rules->isValidMove(currentPos, diceValue, board->getBoardSize())) {
                int intermediatePos = currentPos + diceValue;
                int newPos = rules->calculateNewPosition(currentPos, diceValue, board);
                
                currentPlayer->setPosition(newPos);
                
                // Check if player encountered snake or ladder
                BoardEntity* entity = board->getEntity(intermediatePos);
                if(entity != nullptr) {
                    bool isSnake = (entity->name() == "SNAKE");
                    if(isSnake) {
                        cout << "Oh no! Snake at " << intermediatePos << "! Going down to " << newPos << endl;
                        notify(currentPlayer->getName() + " encountered snake at " + to_string(intermediatePos) + " now going down to " + to_string(newPos));
                    }
                    else {
                        cout << "Great! Ladder at " << intermediatePos << "! Going up to " << newPos << endl;
                        notify(currentPlayer->getName() + " encountered ladder at " + to_string(intermediatePos) + " now going up to " + to_string(newPos));
                    }
                }
                
                notify(currentPlayer->getName() + " played. New Position : " + to_string(newPos));
                displayPlayerPositions();
                
                if(rules->checkWinCondition(newPos, board->getBoardSize())) {
                    cout << "\n" << currentPlayer->getName() << " wins!" << endl;
                    currentPlayer->incrementScore();

                    notify("Game Ended. Winner is : " + currentPlayer->getName());
                    gameOver = true;
                }
                else {
                    // Move player to back of queue
                    players.pop_front();
                    players.push_back(currentPlayer);
                }
            }
            else {
                cout << "Need exact roll to reach " << board->getBoardSize() << "!" << endl;
                // Move player to back of queue
                players.pop_front();
                players.push_back(currentPlayer);
            }
        }
    }
    
    ~SnakeAndLadderGame() {
        delete rules;
    }
};

// Factory Pattern
class SnakeAndLadderGameFactory {
public:
    static SnakeAndLadderGame* createStandardGame() {
        Board* board = new Board(10);  // Standard 10x10 board
        BoardSetupStrategy* strategy = new StandardBoardSetupStrategy();
        board->setupBoard(strategy);
        delete strategy;
        
        Dice* dice = new Dice(6);  // Standard 6-faced dice
        
        return new SnakeAndLadderGame(board, dice);
    }
    
    static SnakeAndLadderGame* createRandomGame(int boardSize, RandomBoardSetupStrategy::Difficulty difficulty) {
        Board* board = new Board(boardSize);
        BoardSetupStrategy* strategy = new RandomBoardSetupStrategy(difficulty);
        board->setupBoard(strategy);
        delete strategy;
        
        Dice* dice = new Dice(6);
        
        return new SnakeAndLadderGame(board, dice);
    }
    
    static SnakeAndLadderGame* createCustomGame(int boardSize, BoardSetupStrategy* strategy) {
        Board* board = new Board(boardSize);
        board->setupBoard(strategy);
        
        Dice* dice = new Dice(6);
        
        return new SnakeAndLadderGame(board, dice);
    }
};

// Main function for Snake and Ladder
int main() {
    cout << "=== SNAKE AND LADDER GAME ===" << endl;
    
    SnakeAndLadderGame* game = nullptr;
    Board* board = nullptr;
    
    cout << "Choose game setup:" << endl;
    cout << "1. Standard Game (10x10 board with traditional positions)" << endl;
    cout << "2. Random Game with Difficulty" << endl;
    cout << "3. Custom Game" << endl;
    
    int choice;
    cin >> choice;
    
    if(choice == 1) {
        // Standard game
        game = SnakeAndLadderGameFactory::createStandardGame();
        board = new Board(10);
        
    }
    else if(choice == 2) {
        // Random game with difficulty
        int boardSize;
        cout << "Enter board size (e.g., 10 for 10x10 board): ";
        cin >> boardSize;
        
        cout << "Choose difficulty:" << endl;
        cout << "1. Easy (more ladders)" << endl;
        cout << "2. Medium (balanced)" << endl;
        cout << "3. Hard (more snakes)" << endl;
        
        int diffChoice;
        cin >> diffChoice;
        
        RandomBoardSetupStrategy::Difficulty diff;
        switch(diffChoice) {
            case 1: diff = RandomBoardSetupStrategy::EASY; break;
            case 2: diff = RandomBoardSetupStrategy::MEDIUM; break;
            case 3: diff = RandomBoardSetupStrategy::HARD; break;
            default: diff = RandomBoardSetupStrategy::MEDIUM;
        }
        
        game = SnakeAndLadderGameFactory::createRandomGame(boardSize, diff);
        board = new Board(boardSize);
        
    } 
    else if(choice == 3) {
        // Custom game
        int boardSize;
        cout << "Enter board size (e.g., 10 for 10x10 board): ";
        cin >> boardSize;
        
        cout << "Choose custom setup type:" << endl;
        cout << "1. Specify counts only (random placement)" << endl;
        cout << "2. Specify exact positions" << endl;
        
        int customChoice;
        cin >> customChoice;
        
        if(customChoice == 1) {
            int numSnakes, numLadders;
            cout << "Enter number of snakes: ";
            cin >> numSnakes;
            cout << "Enter number of ladders: ";
            cin >> numLadders;
            
            BoardSetupStrategy* strategy = new CustomCountBoardSetupStrategy(numSnakes, numLadders, true);
            game = SnakeAndLadderGameFactory::createCustomGame(boardSize, strategy);
            delete strategy;
            
        } 
        else {
            int numSnakes, numLadders;
            cout << "Enter number of snakes: ";
            cin >> numSnakes;
            cout << "Enter number of ladders: ";
            cin >> numLadders;
            
            CustomCountBoardSetupStrategy* strategy = new CustomCountBoardSetupStrategy(numSnakes, numLadders, false);
            
            // Get snake positions
            for(int i = 0; i < numSnakes; i++) {
                int start, end;
                cout << "Enter snake " << (i+1) << " start and end positions: ";
                cin >> start >> end;
                strategy->addSnakePosition(start, end);
            }
            
            // Get ladder positions
            for(int i = 0; i < numLadders; i++) {
                int start, end;
                cout << "Enter ladder " << (i+1) << " start and end positions: ";
                cin >> start >> end;
                strategy->addLadderPosition(start, end);
            }
            
            game = SnakeAndLadderGameFactory::createCustomGame(boardSize, strategy);
            delete strategy;
        }
        
        board = new Board(boardSize);
    }
    
    if(game == nullptr) {
        cout << "Invalid choice!" << endl;
        return 1;
    }
    
    // Add observer
    IObserver* notifier = new SnakeAndLadderConsoleNotifier();
    game->addObserver(notifier);
    
    // Create players
    int numPlayers;
    cout << "Enter number of players: ";
    cin >> numPlayers;
    
    for(int i = 0; i < numPlayers; i++) {
        string name;
        cout << "Enter name for player " << (i+1) << ": ";
        cin >> name;
        SnakeAndLadderPlayer* player = new SnakeAndLadderPlayer(i+1, name);
        game->addPlayer(player);
    }
    
    // Play the game
    game->play();
    
    // Cleanup
    delete game;
    delete board;
    delete notifier;
    
    return 0;
}
