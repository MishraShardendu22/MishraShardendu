#include <iostream>
#include <vector>
using namespace std;

// --- Model ---
class Docs {
public:
    string content;
    string media;
    Docs() = default;
};

// --- Abstract Layer for Application Behavior ---
class ApplicationDocs {
public:
    vector<Docs*> docs;
    virtual void GetOneDoc() = 0;
    virtual void GetAllDocs() = 0;
    virtual void CreateNewDoc() = 0;
    virtual ~ApplicationDocs() = default;
};

// --- Base Document Interface ---
class Doc {
public:
    Docs* docs;
    virtual void save() = 0;
    virtual void write() = 0;
    virtual void render() = 0;
    virtual ~Doc() = default;
};

// --- Persistence Interface ---
class SaveToDb {
public:
    virtual void save() = 0;
    virtual ~SaveToDb() = default;
};

// --- File Save Implementation ---
class SaveToFile : public SaveToDb {
public:
    void save() override {
        cout << "Saving to file..." << endl;
    }
};

// --- Data Adding Interface ---
class AddData {
public:
    virtual void addData() = 0;
    virtual ~AddData() = default;
};

class AddText : public AddData {
public:
    void addData() override {
        cout << "Adding text data..." << endl;
    }
};

class AddImage : public AddData {
public:
    void addData() override {
        cout << "Adding image data..." << endl;
    }
};

// --- Doc Rendering Element Interface ---
class DocElement {
public:
    virtual void render() = 0;
    virtual ~DocElement() = default;
};

class TextElement : public DocElement {
public:
    void render() override {
        cout << "Rendering text element..." << endl;
    }
};

class ImageElement : public DocElement {
public:
    void render() override {
        cout << "Rendering image element..." << endl;
    }
};
