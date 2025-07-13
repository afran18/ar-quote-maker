# Quotation Maker

## Project Overview

The "Quotation Maker" is a web application designed to simplify the process of creating professional quotations. My dad currently faces challenges with manually formatting quotes in Word or CorelDraw, which is time-consuming and prone to inconsistencies. This application aims to streamline this by providing a user-friendly interface to input line items, view them in a structured table, and ultimately generate a clean, printable PDF document.

The primary goal is to make the quotation generation process efficient, accurate, and easy to manage for small businesses or individuals who frequently need to issue quotes.

## Key Features (Planned)

* **Intuitive Form for Item Entry:**

  * A dedicated form on the left half of the screen for entering details of each line item (e.g., item name, description, quantity, unit price, tax rate).

  * Dynamic addition/removal of line items.

* **Real-time Tabular Display:**

  * The right half of the screen will display all entered items in a clear, tabular format.

  * Automatic calculation of sub-totals, taxes, and grand total as items are added or modified.

* **Quotation Details:**

  * Fields for customer information (name, email, mobile, address).

  * Fields for quote number, date, and validity period.

* **PDF Generation:**

  * Ability to generate a professional-looking PDF document of the complete quotation.

  * Options to include company logo, terms and conditions.

* **Data Persistence (Future):**

  * Ability to save quotations for future reference and editing.

  * Load previously saved quotations.

  * Will use SQLite for local data storage as this will be used locally.

## Technologies

### Frontend

* **React:** For building the dynamic and interactive user interface.

* **HTML/CSS/JavaScript:** Core web technologies, using vanilla CSS for styling.

* **PDF Generation Library (TBD):** A library like `jsPDF` or `react-pdf` will be used for client-side PDF generation.

### Backend (Future Integration)

* A backend service will be developed later to handle persistent storage of quotations using SQLite.
