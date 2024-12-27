# **Swift Sports Shop Documentation**

## **1. Overview**

**Swift Sports Shop** is a modern eCommerce platform for sports-related products. The backend is built with **Node.js**, **Express.js**, **MongoDB**, and **JWT** for authentication. It provides a robust API for user registration and authentication, product management, cart and order management, and an admin dashboard.

---

## **2. Technologies Used**

### **Frontend Technologies:**

-  **React.js**: JavaScript library for building the user interface.
-  **Tailwind CSS**: Utility-first CSS framework for fast UI development.
-  **ShadCN UI**: Tailwind CSS-based component library for building modern user interfaces.
-  **Redux**: State management for managing the global state of the app.
-  **React Router**: For routing and navigation within the app.

### **Backend Technologies:**

-  **Node.js**: JavaScript runtime environment for the server-side logic.
-  **Express.js**: Web framework for building RESTful APIs.
-  **Mongoose**: MongoDB object modeling for Node.js.
-  **MongoDB**: NoSQL database for storing product, user, and order data.
-  **JWT (JSON Web Tokens)**: For user authentication and securing routes.

---

## **3. Features**

### **User Features**

-  **User Registration & Login**: Secure user authentication using JWT tokens.
-  **Product Catalog**: Browse products, view product details, and filter products.
-  **Shopping Cart**: Add, update, and remove products from the cart.
-  **Checkout & Orders**: Place orders, view order history, and check order status.
-  **Profile Management**: Update user details, such as name, email, and shipping address.

### **Admin Features**

-  **Admin Login**: Admin authentication via JWT tokens.
-  **Product Management**: Add, update, or delete products.
-  **User Management**: View and manage user details (e.g., roles).
-  **Order Management**: Manage and update the status of orders.
-  **Admin Dashboard**: View key metrics like total orders, total products, total users.

### **Cart and Order Management**

-  **Cart Operations**: Users can add, update, or delete products from their cart.
-  **Order Placement**: After checkout, the order is stored in the database, and users can view the status of their orders.
-  **Order Status Tracking**: Users and admins can view the status of orders.

### **Authentication and Authorization**

-  **JWT Authentication**: Secure login and authorization for users and admins.
-  **Admin Authorization**: Admin routes are protected and require a valid token with an admin role.
