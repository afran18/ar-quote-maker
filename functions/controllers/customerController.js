import { getDb, getFieldValue } from "../config/firebase.js";

export const addOrGetCustomer = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const db = getDb();
    const FieldValue = getFieldValue();

    const customerRef = db.collection("customers");
    const querySnapshot = await customerRef.where("phone", "==", phone).get();

    if (!querySnapshot.empty) {
      // Mean customer already exists
      // const existingCustomer = querySnapshot.docs[0].data(); // This line had a bug and did not return id for existing customer

      const doc = querySnapshot.docs[0];
      const existingCustomer = { id: doc.id, ...doc.data() };
      return res
        .status(200)
        .json({
          customer: existingCustomer,
          message: "Existing customer found",
        });
    }

    // Else add new customer
    const newCustomer = {
      name,
      phone,
      email,
      address,
      quotes: [],
      createdAt: FieldValue.serverTimestamp(),
    };
    const newDocRef = await customerRef.add(newCustomer);

    return res.status(201).json({
      customer: { id: newDocRef.id, ...newCustomer },
      message: "New customer added",
    });
  } catch (error) {
    console.error("Error adding customer", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const db = getDb();
    const snapshot = await db.collection("customers").get();
    // console.log(snapshot);

    const customers = [];

    snapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers: ", error);

    return res.status(500).json({ message: "Server error", error });
  }
};

export const getAllCustomersPaginate = async (req, res) => {
  try {
    const db = getDb();

    const limit = parseInt(req.query.limit) || 5;
    const lastDocId = req.query.lastDocId;

    let query = db.collection("customers").orderBy("createdAt", "desc");

    if (lastDocId) {
      const lastDocSnapshot = await db
        .collection("customers")
        .doc(lastDocId)
        .get();

      if (!lastDocSnapshot.exists) {
        return res
          .status(404)
          .json({ message: "Last document ID not found for pagination" });
      }

      query = query.startAfter(lastDocSnapshot);
    }

    const snapshot = await query.limit(limit).get();
    // console.log(snapshot);
    if (snapshot.empty) {
      return res
        .status(200)
        .json({
          customers: [],
          lastVisible: null,
          message: "No more customers found.",
        });
    }

    const customers = [];

    snapshot.forEach((doc) => {
      customers.push({id: doc.id, ...doc.data()});
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const lastVisibleId = lastVisible ? lastVisible.id : null;

    return res.status(200).json({ customers, lastVisible: lastVisibleId });
  } catch (error) {
    console.error("Error fetching customers: ", error);

    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phone, email, address } = req.body;

    const db = getDb();
    const customerRef = db.collection("customers").doc(id);
    const doc = await customerRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customerRef.update({ name, phone, email, address });

    return res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const db = getDb();
    const customerRef = db.collection("customers").doc(id);
    const doc = await customerRef.get();

    if (!doc.exists) {
      return res.status(400).json({ message: "Customer not found" });
    }

    await customerRef.delete();

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer: ", error);

    return res.status(500).json({ message: "Server error", error });
  }
};
