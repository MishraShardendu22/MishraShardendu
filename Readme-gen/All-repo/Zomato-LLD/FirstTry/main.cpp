#include <iostream>
#include <vector>
#include <string>
using namespace std;

// ------------------------- Models -------------------------

class Menu {
public:
    string name;
    int id;
    float price;

    Menu(string name, int id, float price) : name(name), id(id), price(price) {}

    string getName() { return name; }
    void setName(string newName) { name = newName; }

    float getPrice() { return price; }
    void setPrice(float newPrice) { price = newPrice; }
};

class Restaurant {
public:
    int id;
    string address;
    vector<Menu*> menu;

    Restaurant(int id, string address) : id(id), address(address) {}
};

class Admin {
public:
    int id;
    int pass;

    void setRestaurants(vector<Restaurant*> r) { restaurants = r; }
    void add(Restaurant* r) { restaurants.push_back(r); }
    void deleteRestaurant(int rid);
    void editRestaurant(int rid, string newAddress);

private:
    vector<Restaurant*> restaurants;
};

void Admin::deleteRestaurant(int rid) {
    for (auto it = restaurants.begin(); it != restaurants.end(); ++it) {
        if ((*it)->id == rid) {
            restaurants.erase(it);
            break;
        }
    }
}

void Admin::editRestaurant(int rid, string newAddress) {
    for (auto& r : restaurants) {
        if (r->id == rid) {
            r->address = newAddress;
            break;
        }
    }
}

class User {
public:
    int id;
    string name;
    string location;
    vector<string> cart;

    User(int id, string name, string location) : id(id), name(name), location(location) {}
};

class Cart {
public:
    int id;
    vector<Menu*> items;

    void addToCart(Menu* m) { items.push_back(m); }
    void checkOut() {}
};

// ------------------------- Order -------------------------

class Order {
public:
    int id;
    vector<Menu*> items;
    User* user;
    Restaurant* restaurant;
    bool paid;
    bool placed;
    bool delivered;

    Order(int id, User* u, Restaurant* r) : id(id), user(u), restaurant(r), paid(false), placed(false), delivered(false) {}
};

// ------------------------- Strategy Pattern -------------------------

class PaymentStrategy {
public:
    virtual void pay() = 0;
    virtual ~PaymentStrategy() {}
};

class CreditPayment : public PaymentStrategy {
public:
    void pay() override {
        cout << "Credit payment done.\n";
    }
};

class CODPayment : public PaymentStrategy {
public:
    void pay() override {
        cout << "Cash on Delivery done.\n";
    }
};

class OtherPayment : public PaymentStrategy {
public:
    void pay() override {
        cout << "Other 3rd party payment done.\n";
    }
};

// ------------------------- Delivery -------------------------

class DeliveryService {
public:
    void pickOrder(Order* o) {
        cout << "Order picked\n";
    }

    void deliver(Order* o) {
        o->delivered = true;
        cout << "Order delivered\n";
    }
};

// ------------------------- Notification -------------------------

class NotificationService {
public:
    void notify(string msg) {
        cout << "Notification: " << msg << endl;
    }
};

// ------------------------- Entry -------------------------

int main() {
    // Sample usage
    Menu* burger = new Menu("Burger", 1, 150.0);
    Menu* fries = new Menu("Fries", 2, 70.0);

    Restaurant* rest = new Restaurant(101, "Block A");
    rest->menu.push_back(burger);
    rest->menu.push_back(fries);

    User* user = new User(1, "John", "Sector 21");

    Cart* cart = new Cart();
    cart->addToCart(burger);
    cart->addToCart(fries);

    Order* order = new Order(201, user, rest);

    DeliveryService ds;
    ds.pickOrder(order);
    ds.deliver(order);

    PaymentStrategy* payment = new CreditPayment();
    payment->pay();

    NotificationService ns;
    ns.notify("Order delivered successfully");

    delete burger;
    delete fries;
    delete rest;
    delete user;
    delete cart;
    delete order;
    delete payment;

    return 0;
}