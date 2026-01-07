
# Book & Byte - Server Application

Το backend API της εφαρμογής, υλοποιημένο με **Node.js**, **Express** και **MongoDB**.

## Εγκατάσταση

```bash
cd server
npm install
```

## Ρύθμιση Περιβάλλοντος (.env)

TODO

# Εκτέλεση
Για να ξεκινήσετε τον server:

```bash
npm run
```
Ο server θα τρέχει στο http://localhost:5000.

## API Endpoints
* **GET /api/courses:** Λήψη όλων των μαθημάτων (υποστηρίζει φιλτράρισμα).
* **GET /api/course-details/:id:** Λήψη λεπτομερειών ενός μαθήματος.
* **GET /api/books:** Λήψη λίστας βιβλίων (υποστηρίζει φιλτράρισμα).
* **GET /api/categories:** Λήψη κατηγοριών.
* **POST /api/auth/register:** Εγγραφή νέου χρήστη.
* **POST /api/auth/login:** Σύνδεση χρήστη.
* TODO