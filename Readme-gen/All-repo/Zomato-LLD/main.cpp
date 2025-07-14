#include <bits/stdc++.h>
using namespace std;

// MenuItem
class MenuItem {
private:
    string code;
    string name;
    int price;
public:
    MenuItem(const string& code, const string& name, int price)
        : code(code), name(name), price(price) {}
    string getCode() const { return code; }
    string getName() const { return name; }
    int getPrice() const { return price; }
    void setName(const string& n) { name = n; }
    void setPrice(int p) { price = p; }
};

// Restaurant
class Restaurant {
private:
    int id;
    string name;
    string address;
    vector<shared_ptr<MenuItem>> menuItems;
public:
    Restaurant(int id, const string& name, const string& address)
        : id(id), name(name), address(address) {}
    int getId() const { return id; }
    string getName() const { return name; }
    string getAddress() const { return address; }
    void setName(const string& n) { name = n; }
    void setAddress(const string& addr) { address = addr; }
    void addMenuItem(shared_ptr<MenuItem> item) { menuItems.push_back(item); }
    const vector<shared_ptr<MenuItem>>& getMenu() const { return menuItems; }
};

// User
class User {
private:
    int id;
    string name;
    string address;
public:
    User(int id, const string& name, const string& address)
        : id(id), name(name), address(address) {}
    int getId() const { return id; }
    string getName() const { return name; }
    string getAddress() const { return address; }
    void setName(const string& n) { name = n; }
    void setAddress(const string& addr) { address = addr; }
};

// Cart
class Cart {
private:
    unordered_map<string, int> itemQty;
public:
    void addItem(const shared_ptr<MenuItem>& item, int qty = 1) {
        if (qty <= 0) return;
        itemQty[item->getCode()] += qty;
    }
    void removeItem(const shared_ptr<MenuItem>& item) {
        itemQty.erase(item->getCode());
    }
    void clear() { itemQty.clear(); }
    const unordered_map<string,int>& getItems() const { return itemQty; }
    bool empty() const { return itemQty.empty(); }
};

// Order base
class Order {
protected:
    int orderId;
    shared_ptr<User> user;
    shared_ptr<Restaurant> restaurant;
    vector<shared_ptr<MenuItem>> items;
    double totalAmount = 0.0;
    string scheduledTime;
    bool paid = false;
public:
    Order(int id, shared_ptr<User> u, shared_ptr<Restaurant> r)
        : orderId(id), user(u), restaurant(r) {}
    virtual ~Order() = default;
    int getOrderId() const { return orderId; }
    shared_ptr<User> getUser() const { return user; }
    shared_ptr<Restaurant> getRestaurant() const { return restaurant; }
    const vector<shared_ptr<MenuItem>>& getItems() const { return items; }
    double getTotal() const { return totalAmount; }
    string getScheduled() const { return scheduledTime.empty() ? "Now" : scheduledTime; }
    void addItem(shared_ptr<MenuItem> item) {
        items.push_back(item);
        totalAmount += item->getPrice();
    }
    void setScheduled(const string& sched) { scheduledTime = sched; }
    bool isPaid() const { return paid; }
    void markPaid() { paid = true; }
    virtual string getType() const = 0;
};

// DeliveryOrder
class DeliveryOrder : public Order {
private:
    string deliveryAddress;
public:
    DeliveryOrder(int id, shared_ptr<User> u, shared_ptr<Restaurant> r)
        : Order(id, u, r), deliveryAddress(u->getAddress()) {}
    void setDeliveryAddress(const string& addr) { deliveryAddress = addr; }
    string getDeliveryAddress() const { return deliveryAddress; }
    string getType() const override { return "Delivery"; }
};

// PickupOrder
class PickupOrder : public Order {
public:
    PickupOrder(int id, shared_ptr<User> u, shared_ptr<Restaurant> r)
        : Order(id, u, r) {}
    string getType() const override { return "Pickup"; }
};

// RestaurantManager
class RestaurantManager {
private:
    vector<shared_ptr<Restaurant>> restaurants;
public:
    void addRestaurant(shared_ptr<Restaurant> r) { restaurants.push_back(r); }
    void removeRestaurant(int id) {
        restaurants.erase(
            remove_if(restaurants.begin(), restaurants.end(),
                      [id](const shared_ptr<Restaurant>& r){ return r->getId()==id; }),
            restaurants.end());
    }
    vector<shared_ptr<Restaurant>> searchByLocation(const string& location) {
        return restaurants;
    }
    shared_ptr<Restaurant> getById(int id) {
        for(auto& r: restaurants) if(r->getId()==id) return r;
        return nullptr;
    }
    const vector<shared_ptr<Restaurant>>& getAll() const { return restaurants; }
};

// PaymentStrategy
class PaymentStrategy {
public:
    virtual ~PaymentStrategy() = default;
    virtual void pay(double amount) = 0;
};

class CreditCardPaymentStrategy : public PaymentStrategy {
private:
    string cardNumber;
public:
    CreditCardPaymentStrategy(const string& card) : cardNumber(card) {}
    void pay(double amount) override {
        cout << "Paid ₹" << amount << " using Credit Card (" << cardNumber << ")\n";
    }
};

class UpiPaymentStrategy : public PaymentStrategy {
private:
    string upiId;
public:
    UpiPaymentStrategy(const string& upi) : upiId(upi) {}
    void pay(double amount) override {
        cout << "Paid ₹" << amount << " using UPI (" << upiId << ")\n";
    }
};

// TimeUtils
class TimeUtils {
public:
    static string getCurrentTime() {
        time_t t = time(nullptr);
        tm* tmPtr = localtime(&t);
        char buf[20];
        strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", tmPtr);
        return string(buf);
    }
    static string getScheduledTime() {
        time_t t = time(nullptr) + 30*60;
        tm* tmPtr = localtime(&t);
        char buf[20];
        strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", tmPtr);
        return string(buf);
    }
};

// OrderFactory
class OrderFactory {
public:
    virtual ~OrderFactory() = default;
    virtual shared_ptr<Order> createOrder(int id, shared_ptr<User> user, shared_ptr<Restaurant> rest) = 0;
};

class NowOrderFactory : public OrderFactory {
public:
    shared_ptr<Order> createOrder(int id, shared_ptr<User> user, shared_ptr<Restaurant> rest) override {
        if(!user || !rest) return nullptr;
        return make_shared<DeliveryOrder>(id, user, rest);
    }
};

class ScheduledOrderFactory : public OrderFactory {
public:
    shared_ptr<Order> createOrder(int id, shared_ptr<User> user, shared_ptr<Restaurant> rest) override {
        if(!user || !rest) return nullptr;
        auto order = make_shared<DeliveryOrder>(id, user, rest);
        order->setScheduled(TimeUtils::getScheduledTime());
        return order;
    }
};

// NotificationService
class NotificationService {
public:
    static void notify(shared_ptr<Order> order) {
        cout << "\n[Notification] New " << order->getType() << " order placed!\n";
        cout << "Order ID: " << order->getOrderId() << "\n";
        cout << "Customer: " << order->getUser()->getName() << "\n";
        cout << "Restaurant: " << order->getRestaurant()->getName() << "\n";
        cout << "Items:\n";
        for(auto& item: order->getItems()) {
            cout << "  - " << item->getName() << " (₹" << item->getPrice() << ")\n";
        }
        cout << "Total: ₹" << order->getTotal() << "\n";
        cout << "Scheduled For: " << order->getScheduled() << "\n";
        cout << "Payment: " << (order->isPaid() ? "Done" : "Pending") << "\n";
    }
};

// TomatoApp
class TomatoApp {
private:
    RestaurantManager restaurantManager;
    unordered_map<int, shared_ptr<Cart>> userCarts;
    int nextOrderId = 1000;
public:
    TomatoApp() {
        auto r1 = make_shared<Restaurant>(1, "Spicy Hub", "Delhi");
        r1->addMenuItem(make_shared<MenuItem>("M1","Burger",100));
        r1->addMenuItem(make_shared<MenuItem>("M2","Pizza",200));
        restaurantManager.addRestaurant(r1);
        auto r2 = make_shared<Restaurant>(2, "Green Eats", "Delhi");
        r2->addMenuItem(make_shared<MenuItem>("M3","Salad",150));
        r2->addMenuItem(make_shared<MenuItem>("M4","Juice",80));
        restaurantManager.addRestaurant(r2);
    }
    vector<shared_ptr<Restaurant>> searchRestaurants(const string& location) {
        return restaurantManager.searchByLocation(location);
    }
    void addToCart(shared_ptr<User> user, shared_ptr<MenuItem> item, int qty=1) {
        int uid = user->getId();
        if(userCarts.find(uid)==userCarts.end()) userCarts[uid] = make_shared<Cart>();
        userCarts[uid]->addItem(item, qty);
    }
    void printUserCart(shared_ptr<User> user) {
        auto it = userCarts.find(user->getId());
        if(it==userCarts.end() || it->second->empty()) {
            cout << "Cart empty\n";
            return;
        }
        cout << "Cart contents:\n";
        for(auto& p: it->second->getItems()) {
            cout << "  ItemCode: " << p.first << " Qty: " << p.second << "\n";
        }
    }
    shared_ptr<Order> checkoutNow(shared_ptr<User> user, shared_ptr<PaymentStrategy> payment) {
        auto it = userCarts.find(user->getId());
        if(it==userCarts.end() || it->second->empty()) return nullptr;
        auto restList = restaurantManager.getAll();
        if(restList.empty()) return nullptr;
        auto rest = restList.front();
        shared_ptr<OrderFactory> factory = make_shared<NowOrderFactory>();
        auto order = factory->createOrder(nextOrderId++, user, rest);
        for(auto& p: it->second->getItems()) {
            for(auto& mi: rest->getMenu()) {
                if(mi->getCode()==p.first) {
                    for(int i=0;i<p.second;i++){
                        order->addItem(mi);
                    }
                    break;
                }
            }
        }
        it->second->clear();
        NotificationService::notify(order);
        return order;
    }
    void payForOrder(shared_ptr<User> user, shared_ptr<Order> order, shared_ptr<PaymentStrategy> payment) {
        if(!order) return;
        if(payment) {
            payment->pay(order->getTotal());
            order->markPaid();
        }
        NotificationService::notify(order);
    }
};

int main() {
    auto tomato = make_shared<TomatoApp>();
    auto user = make_shared<User>(101, "Aditya", "Delhi");
    auto restaurants = tomato->searchRestaurants("Delhi");
    cout << "Restaurants:\n";
    for(auto& r: restaurants) {
        cout << "  ID:" << r->getId() << " Name:" << r->getName() << "\n";
    }
    if(!restaurants.empty() && !restaurants.front()->getMenu().empty()) {
        tomato->addToCart(user, restaurants.front()->getMenu().front(), 2);
    }
    tomato->printUserCart(user);
    auto order = tomato->checkoutNow(user, make_shared<UpiPaymentStrategy>("aditya@upi"));
    if(order) {
        tomato->payForOrder(user, order, make_shared<CreditCardPaymentStrategy>("4111-xxxx-xxxx-1234"));
    }
    return 0;
}
