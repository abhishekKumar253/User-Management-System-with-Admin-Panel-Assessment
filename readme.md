# User Management System with Admin Panel

## Overview

The **User Management System with Admin Panel** is a comprehensive solution that provides secure user authentication, profile management, and a robust notification system. It allows both users and admins to interact seamlessly through a set of features such as sending notifications, profile updates, and role-based access.

This system is built with **Node.js**, **Express.js**, and **MongoDB** on the backend and includes secure authentication, an easy-to-use admin panel, and a notification system designed for different user availabilities.

## Key Features

### User Functionality
1. **User Authentication**:
   - Secure login and signup using email and password.
   
2. **Profile Management**:
   - Users can update their profiles with:
     - Name
     - Mobile Number
     - Bio
     - Availability Time (time slots when the user is available for notifications).

3. **Profile Updates**:
   - Users can update their profile details at any time.

4. **Notification System**:
   - Users can send notifications to one or multiple recipients.
   - **Availability Time**:
     - Notifications are delivered based on the recipient's availability.
     - **Available Time**: Delivered immediately.
     - **Unavailable Time**: Queued until the user becomes available.

### Admin Functionality
1. **Notification Management**:
   - Admin can send notifications to one or multiple users.
   - Admin can classify notifications as:
     - **Critical Notifications**: Delivered immediately, regardless of the recipient's availability.
     - **Non-Critical Notifications**: Delivered based on recipient availability.

2. **Admin Control**:
   - Admin has access to the full list of sent notifications and can monitor their status.

### Additional Features
1. **Secure Data Handling**:
   - All sensitive data, such as passwords and tokens, are encrypted using industry-standard encryption mechanisms (bcrypt for passwords, JWT for tokens).

2. **Timestamps**:
   - Notifications are timestamped to track when they were sent and delivered.

3. **Validation & Error Handling**:
   - Validation of input data and error handling is implemented to ensure data integrity and reliability.

4. **Deployment**:
   - The application is deployed on **Render**.

---

## Installation and Setup

To run the project locally, follow these steps:


### Steps to Setup:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abhishekKumar253/User-Management-System-with-Admin-Panel-Assessment
   cd user-management-system
