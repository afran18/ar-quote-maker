# Quotation Maker

## Project Overview

The "Quotation Maker" is a web application designed to simplify the process of creating professional quotations. My dad currently faces challenges with manually formatting quotes in Word or CorelDraw, which is time-consuming and prone to inconsistencies. This application aims to streamline this by providing a user-friendly interface to input line items, view them in a structured table, and ultimately generate a clean, printable PDF document.

The primary goal is to make the quotation generation process efficient, accurate, and easy to manage for small businesses or individuals who frequently need to issue quotes.

## Key Features

* **Intuitive Form for Item Entry:**

  * Feature for adding customer details and storing quotes for each customer.

  * A dedicated form for entering details of each line item (e.g., item name, description, quantity, unit price, tax rate).

  * Dynamic addition and removal of line items.

  * Easy retrieval for previously stored customers, quotes and editing customer details and quotations.


* **Real-time Tabular Display:**

  * All entered items are displayed in a clear, tabular format.

  * Automatic calculation of sub-totals, taxes, and a grand total as items are added or modified.

* **Quotation Details:**

  * Fields for customer information (name, email, mobile, address).

  * Fields for quote items, date.

* **PDF Generation:**

  * Ability to generate a professional-looking PDF document of the complete quotation.

  * Options to include a company logo and terms and conditions.

* **Data Persistence:**

  * Ability to save and load quotations for future reference and editing.

## Technologies

### Frontend

* **React:** For building the dynamic and interactive user interface.

* **HTML/CSS/JavaScript:** Core web technologies, using vanilla CSS for styling.

* **PDF Generation Library:** A client-side library `react-pdf` is used for PDF generation.

### Backend

* **Firebase:** Utilized for a powerful and scalable backend and hosting solution.

  * **Firebase Authentication:** Handles user management and authentication.

  * **Cloud Firestore:** A NoSQL database for securely storing quotation data.

  * **Firebase Hosting:** Deploys the application and serves it to users.