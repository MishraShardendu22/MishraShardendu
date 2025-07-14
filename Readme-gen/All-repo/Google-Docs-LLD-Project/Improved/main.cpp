#include <bits/stdc++.h>
using namespace std;

#include "Save.h"
#include "AddData.h"
#include "DocElement.h"

class Docs {
public:
    string content;
    string media;
    Docs() = default;
};

class Document {
    private:
    Docs* doc;
    Save* persistence;
    DocElement* renderer;
    AddData* dataAdder;

    public:
    Document(Docs* d, Save* p, DocElement* r, AddData* a) {
        doc = d;
        renderer = r;
        dataAdder = a;
        persistence = p;
    }


    void save() { persistence->save(); }
    void render() { renderer->render(); }
    void write() { dataAdder->addData(); }
};

int main() {
    Docs* myDoc = new Docs();

    AddData* adder = new AddText();
    Save* fileSaver = new SaveToFile();
    DocElement* renderer = new TextElement();

    Document* doc = new Document(myDoc, fileSaver, renderer, adder);

    doc->write();
    doc->render();
    doc->save();

    return 0;
}
