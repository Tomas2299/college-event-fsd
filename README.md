
# Henosis — College Event Website

**Repository:** [pariksith/college-event-fsd](https://github.com/pariksith/college-event-fsd)

**Henosis** is the official event website created for the **Department of Artificial Intelligence & Data Science (AIDS)**. It provides details of the college event, including registration, contact, statistics, and more — all built using a simple PHP + MySQL backend with HTML, CSS, and JavaScript frontend.

---

## Live Demo

👉 [Henosis Website](https://pariksith.github.io/college-event-fsd) *(Update if hosted elsewhere, e.g., InfinityFree, 000webhost, or custom server)*

---

## Features

* Responsive event homepage (`index.html`)
* Registration form with backend handling (`register.php`)
* Contact form connected to database (`contact.php`)
* Real-time stats page (`stats.php`)
* Config file for easy database connection (`config.php`)
* SQL schema provided (`database.sql`)
* Simple client-side interactivity (`script.js`)
* Custom styles with `style.css`

---

## Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** PHP
* **Database:** MySQL
* **Deployment:** GitHub Pages (static) / PHP-supported hosting (for dynamic parts)

---

## Getting Started

### Prerequisites

* XAMPP / WAMP / MAMP (local development) OR any PHP + MySQL hosting
* Git installed locally

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/pariksith/college-event-fsd.git
   cd college-event-fsd
   ```

2. Import the database:

   * Open phpMyAdmin
   * Create a database (e.g., `henosis`)
   * Import `database.sql`

3. Configure database:

   * Open `config.php`
   * Update with your DB name, username, and password

4. Run locally:

   * Place files in `htdocs` (XAMPP) or server root
   * Visit `http://localhost/college-event-fsd`

---

## Project Structure

```
college-event-fsd/
├─ index.html       # Homepage
├─ style.css        # Styles
├─ script.js        # Client-side JS
├─ config.php       # DB connection settings
├─ register.php     # Registration logic
├─ contact.php      # Contact form logic
├─ stats.php        # Stats display
├─ database.sql     # Database schema
└─ README.md
```

---

## Deployment

* **Static version (HTML/CSS/JS only):** Deploy via GitHub Pages.
* **Dynamic version (PHP + MySQL):** Use a hosting service like InfinityFree, 000webhost, Heroku (with PHP buildpack), or a custom cPanel server.

---

## License

```
MIT License
Copyright (c) 2025 PariKsith
```

---

## Contact

Maintained by **PariKsith**.
GitHub: [@pariksith](https://github.com/pariksith)

---

🎉 Henosis — A celebration of unity, creativity, and innovation through technology and culture!
