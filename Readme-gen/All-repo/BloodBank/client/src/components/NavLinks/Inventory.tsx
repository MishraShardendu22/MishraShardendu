/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/util/axiosInstance";
import { useUserStore } from "@/store/store";
import Layout from "./_Layout";

const Inventory = () => {
  const user = useUserStore((state: any) => state.user);
  const email = user.email;
  const organisation = user._id;

  enum InventoryType {
    IN = "in",
    OUT = "out",
  }

  enum BloodGroup {
    A_POS = "A+",
    A_NEG = "A-",
    B_POS = "B+",
    B_NEG = "B-",
    AB_POS = "AB+",
    AB_NEG = "AB-",
    O_POS = "O+",
    O_NEG = "O-",
  }

  const [inventoryType, setInventoryType] = useState<InventoryType | "">("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | "">("");
  const [quantity, setQuantity] = useState(0);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axiosInstance.get("/inventory/get-inventory", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setInventory(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/inventory/create-inventory",
        {
          inventoryType,
          bloodGroup,
          quantity,
          organisation,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message);
      setInventory([...inventory, res.data.newInventory]); // Update the inventory list
    } catch (error) {
      console.error("Error creating inventory:", error);
      toast.error("Error creating inventory");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Inventory
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Inventory Type</label>
            <select
              value={inventoryType}
              onChange={(e) =>
                setInventoryType(e.target.value as InventoryType)
              }
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Inventory Type</option>
              <option value={InventoryType.IN}>In</option>
              <option value={InventoryType.OUT}>Out</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Blood Group</option>
              <option value={BloodGroup.A_POS}>A+</option>
              <option value={BloodGroup.A_NEG}>A-</option>
              <option value={BloodGroup.B_POS}>B+</option>
              <option value={BloodGroup.B_NEG}>B-</option>
              <option value={BloodGroup.AB_POS}>AB+</option>
              <option value={BloodGroup.AB_NEG}>AB-</option>
              <option value={BloodGroup.O_POS}>O+</option>
              <option value={BloodGroup.O_NEG}>O-</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter donor email"
              disabled
              className="mt-2 p-3 w-full border border-gray-300 rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Inventory
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Inventory List</h2>
        {inventory.length > 0 ? (
          <ul>
            {inventory.map((item: any, index: number) => (
              <li key={index} className="p-2 border-b">
                {JSON.stringify(item)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No inventory records found.</p>
        )}
      </div>
    </Layout>
  );
};

export default Inventory;
