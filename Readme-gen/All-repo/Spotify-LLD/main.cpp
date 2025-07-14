#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <cstdlib>
#include <ctime>
#include <stdexcept>
#include <algorithm>

using namespace std ;

// Models
class Song {
public:
    string title;
    string artist;
    Song(const string& t = "", const string& a = "") : title(t), artist(a) {}
};

class Playlist {
    vector<Song> songs;
public:
    void addSong(const Song& song) { songs.push_back(song); }
    void removeSong(size_t index) {
        if (index < songs.size()) songs.erase(songs.begin() + index);
    }
    const vector<Song>& getSongs() const { return songs; }
    size_t size() const { return songs.size(); }
};

// Enums
enum class DeviceType { BLUETOOTH, WIRED, HEADPHONES };
enum class PlayStrategyType { SEQUENTIAL, RANDOM, CUSTOM_QUEUE };

// External device APIs (simulated)
class BluetoothSpeakerAPI {
public:
    void initialize() { /* simulate init */ }
    void play(const string& data) {
        cout << "[BluetoothSpeakerAPI] Playing data: " << data << endl;
    }
};
class WiredSpeakerAPI {
public:
    void initialize() { /* simulate init */ }
    void play(const string& data) {
        cout << "[WiredSpeakerAPI] Playing data: " << data << endl;
    }
};
class HeadphonesAPI {
public:
    void initialize() { /* simulate init */ }
    void play(const string& data) {
        cout << "[HeadphonesAPI] Playing data: " << data << endl;
    }
};

// IAudioOutputDevice interface
class IAudioOutputDevice {
public:
    virtual void playSound(const Song& song) = 0;
    virtual ~IAudioOutputDevice() = default;
};

// Adapters
class BluetoothSpeakerAdapter : public IAudioOutputDevice {
    BluetoothSpeakerAPI api;
public:
    BluetoothSpeakerAdapter() { api.initialize(); }
    void playSound(const Song& song) override {
        string data = "Bluetooth play: " + song.title + " by " + song.artist;
        api.play(data);
    }
};

class WiredSpeakerAdapter : public IAudioOutputDevice {
    WiredSpeakerAPI api;
public:
    WiredSpeakerAdapter() { api.initialize(); }
    void playSound(const Song& song) override {
        string data = "Wired play: " + song.title + " by " + song.artist;
        api.play(data);
    }
};

class HeadphonesAdapter : public IAudioOutputDevice {
    HeadphonesAPI api;
public:
    HeadphonesAdapter() { api.initialize(); }
    void playSound(const Song& song) override {
        string data = "Headphones play: " + song.title + " by " + song.artist;
        api.play(data);
    }
};

// DeviceFactory
class DeviceFactory {
public:
    static unique_ptr<IAudioOutputDevice> create(DeviceType type) {
        switch (type) {
            case DeviceType::BLUETOOTH:
                return make_unique<BluetoothSpeakerAdapter>();
            case DeviceType::WIRED:
                return make_unique<WiredSpeakerAdapter>();
            case DeviceType::HEADPHONES:
                return make_unique<HeadphonesAdapter>();
            default:
                return nullptr;
        }
    }
};

// PlayStrategy interface
class PlayStrategy {
public:
    virtual const Song& getNextSong(const Playlist& playlist) = 0;
    virtual void reset() = 0;
    virtual ~PlayStrategy() = default;
};

// Sequential strategy
class SequentialPlayStrategy : public PlayStrategy {
    size_t index = 0;
public:
    const Song& getNextSong(const Playlist& playlist) override {
        if (playlist.size() == 0) throw runtime_error("Playlist is empty");
        const Song& s = playlist.getSongs()[index % playlist.size()];
        index = (index + 1) % playlist.size();
        return s;
    }
    void reset() override { index = 0; }
};

// Random strategy
class RandomPlayStrategy : public PlayStrategy {
public:
    RandomPlayStrategy() { srand(static_cast<unsigned>(time(nullptr))); }
    const Song& getNextSong(const Playlist& playlist) override {
        if (playlist.size() == 0) throw runtime_error("Playlist is empty");
        size_t idx = rand() % playlist.size();
        return playlist.getSongs()[idx];
    }
    void reset() override {}
};

// Custom queue strategy
class CustomQueueStrategy : public PlayStrategy {
    vector<size_t> queueIndices;
    size_t pos = 0;
public:
    void setQueue(const vector<size_t>& q) {
        queueIndices = q;
        pos = 0;
    }
    const Song& getNextSong(const Playlist& playlist) override {
        if (playlist.size() == 0) throw runtime_error("Playlist is empty");
        if (queueIndices.empty()) throw runtime_error("Custom queue is empty");
        size_t idx = queueIndices[pos % queueIndices.size()];
        if (idx >= playlist.size()) throw runtime_error("Queue index out of range");
        const Song& s = playlist.getSongs()[idx];
        pos = (pos + 1) % queueIndices.size();
        return s;
    }
    void reset() override { pos = 0; }
};

// Managers
class PlaylistManager {
    Playlist playlist;
public:
    void addSong(const Song& song) { playlist.addSong(song); }
    void removeSong(size_t index) { playlist.removeSong(index); }
    const Playlist& getPlaylist() const { return playlist; }
};

class DeviceManager {
    unique_ptr<IAudioOutputDevice> device;
public:
    void selectDevice(DeviceType type) {
        device = DeviceFactory::create(type);
        if (!device) throw runtime_error("Failed to create device");
    }
    IAudioOutputDevice* getDevice() const { return device.get(); }
};

class StrategyManager {
public:
    static unique_ptr<PlayStrategy> createStrategy(PlayStrategyType type) {
        switch (type) {
            case PlayStrategyType::SEQUENTIAL:
                return make_unique<SequentialPlayStrategy>();
            case PlayStrategyType::RANDOM:
                return make_unique<RandomPlayStrategy>();
            case PlayStrategyType::CUSTOM_QUEUE:
                return make_unique<CustomQueueStrategy>();
            default:
                return nullptr;
        }
    }
};

// AudioEngine
class AudioEngine {
    const Playlist* playlist = nullptr;
    PlayStrategy* strategy = nullptr;
    IAudioOutputDevice* device = nullptr;
public:
    void loadPlaylist(const Playlist& pl) { playlist = &pl; }
    void setStrategy(PlayStrategy* ps) { strategy = ps; strategy->reset(); }
    void setDevice(IAudioOutputDevice* dev) { device = dev; }
    void playNext() {
        if (!playlist || !strategy || !device) throw runtime_error("AudioEngine not configured");
        const Song& s = strategy->getNextSong(*playlist);
        device->playSound(s);
    }
    void playMultiple(size_t count) {
        for (size_t i = 0; i < count; ++i) playNext();
    }
};

// Facade
class MusicPlayerFacade {
    PlaylistManager playlistManager;
    DeviceManager deviceManager;
    unique_ptr<PlayStrategy> strategyPtr;
    AudioEngine engine;
public:
    void addSongToPlaylist(const Song& song) {
        playlistManager.addSong(song);
    }
    void removeSongFromPlaylist(size_t index) {
        playlistManager.removeSong(index);
    }
    void configure(DeviceType dt, PlayStrategyType pst) {
        deviceManager.selectDevice(dt);
        strategyPtr = StrategyManager::createStrategy(pst);
        if (!strategyPtr) throw runtime_error("Invalid strategy type");
        engine.setDevice(deviceManager.getDevice());
        engine.setStrategy(strategyPtr.get());
        engine.loadPlaylist(playlistManager.getPlaylist());
    }
    void configureCustom(DeviceType dt, const vector<size_t>& customQueue) {
        deviceManager.selectDevice(dt);
        strategyPtr = StrategyManager::createStrategy(PlayStrategyType::CUSTOM_QUEUE);
        if (!strategyPtr) throw runtime_error("Invalid strategy type");
        auto cqs = dynamic_cast<CustomQueueStrategy*>(strategyPtr.get());
        if (!cqs) throw runtime_error("Failed to cast to CustomQueueStrategy");
        cqs->setQueue(customQueue);
        engine.setDevice(deviceManager.getDevice());
        engine.setStrategy(strategyPtr.get());
        engine.loadPlaylist(playlistManager.getPlaylist());
    }
    void playNext() { engine.playNext(); }
    void playMultiple(size_t count) { engine.playMultiple(count); }
    const Playlist& getPlaylist() const {
        return playlistManager.getPlaylist();
    }
};

// main
int main() {
    MusicPlayerFacade player;

    // Add songs
    player.addSongToPlaylist(Song("Lose Yourself", "Eminem"));
    player.addSongToPlaylist(Song("Bohemian Rhapsody", "Queen"));
    player.addSongToPlaylist(Song("Blinding Lights", "The Weeknd"));
    player.addSongToPlaylist(Song("Imagine", "John Lennon"));

    // 1) Sequential on HEADPHONES
    player.configure(DeviceType::HEADPHONES, PlayStrategyType::SEQUENTIAL);
    player.playMultiple(4);

    // 2) Random on BLUETOOTH
    player.configure(DeviceType::BLUETOOTH, PlayStrategyType::RANDOM);
    player.playMultiple(4);

    // 3) Custom queue on WIRED
    vector<size_t> order = {1, 0, 3, 2};
    player.configureCustom(DeviceType::WIRED, order);
    player.playMultiple(4);

    return 0;
}
