#include<bits/stdc++.h>
using namespace std;

class Save {
public:
    virtual void save() = 0;
    virtual ~Save() = default;
    // safe cleanup when deleting via base pointer.
    // Always use it in base classes with virtual methods.
};

class SaveToFile : public Save {
public:
    void save() override {
        cout << "Saving to file..." << endl;
    }
};

class SaveToMDB : public Save {
public:
    void save() override {
        cout << "Saving to mdb..." << endl;
    }
};