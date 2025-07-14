#pragma once
#include<bits/stdc++.h>
using namespace std;

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