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
      return res.status(200).json({
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
      return res.status(200).json({
        customers: [],
        lastVisible: null,
        message: "No more customers found.",
      });
    }

    const customers = [];

    snapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() });
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const lastVisibleId = lastVisible ? lastVisible.id : null;

    return res.status(200).json({ customers, lastVisible: lastVisibleId });
  } catch (error) {
    console.error("Error fetching customers: ", error);

    return res.status(500).json({ message: "Server error", error });
  }
};

export const getCustomerById = async (req, res) => {
  const customerId = req.params.id;

  if (!customerId) {
    return res.status(400).json({ message: "Customer id is required" });
  }

  try {
    const db = getDb();
    const customerRef = db.collection("customers").doc(customerId);
    const customerDoc = await customerRef.get();

    if (!customerDoc.exists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const customer = {
      id: customerDoc.id,
      ...customerDoc.data(),
    };

    return res.status(200).json({ customer });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export const getCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res
        .status(400)
        .json({ message: "Phone number query parameter is required." });
    }

    // Trim any whitespace from the phone number for a cleaner search
    const sanitizedPhone = phone.trim();

    // Log the incoming phone number to your console to confirm what's being received
    console.log(`Received phone number for search: '${sanitizedPhone}'`);

    const db = getDb();

    // Create a query to find the customer by phone number
    const customerRef = db.collection("customers");
    const querySnapshot = await customerRef
      .where("phone", "==", sanitizedPhone)
      .limit(1)
      .get();

    // Log whether the snapshot is empty
    console.log(`Query snapshot empty status: ${querySnapshot.empty}`);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Customer not found." });
    }

    // Get the first (and only) matching document
    const doc = querySnapshot.docs[0];
    const customer = { id: doc.id, ...doc.data() };

    // Log the found customer's data
    console.log("Customer found:", customer);

    return res.status(200).json({ customer });
  } catch (error) {
    console.error("Error searching for customer by phone:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phone, email, address } = req.body;

    if(!id) {
      return res.status(400).json({message: "Customer ID is required"});
    }

    if(!name && !phone && !email && !address) {
      return res.status(400).json({message: "Atleast one field must be provided for update"})
    }

    const db = getDb();
    const customerRef = db.collection("customers").doc(id);
    const doc = await customerRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const updatePayload = {};
    if(name !== undefined) updatePayload.name = name;
    if(phone !== undefined) updatePayload.phone = phone;
    if(email !== undefined) updatePayload.email = email;
    if(address !== undefined) updatePayload.address = address;

    await customerRef.update(updatePayload);
    const updatedCustomer = { id, ...doc.data(), ...updatePayload };

    res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });

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
