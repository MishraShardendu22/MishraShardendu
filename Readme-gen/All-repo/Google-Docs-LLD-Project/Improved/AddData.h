#include <bits/stdc++.h>
using namespace std;

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