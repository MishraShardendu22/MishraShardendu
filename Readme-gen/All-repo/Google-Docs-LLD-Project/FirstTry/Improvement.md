### Design Flaws (w\.r.t. SOLID)

S => Doc handles save, write, render → too many roles, Should separate persistence, writing, and rendering

O => Can’t extend new save targets (e.g., CloudSave) without modifying code Save logic is hardcoded

L => If SaveToDb has multiple types (e.g. file, Mongo), but some throw errors → LSP break Derived must not break expected behavior

I => Doc interface forces all classes to implement all 3 methods A doc that only renders (like preview) shouldn’t implement save()

D => Doc depends on concrete save logic (SaveToFile) instead of abstract interface High-level logic should depend on abstraction like SaveToDb

### How to Improve

* Split `Doc` into separate interfaces: `Writable`, `Renderable`, `Persistable`
* Use dependency injection for `SaveToDb`
* Use composition for `AddData` strategies (text, image)
* Keep each class focused on one responsibility