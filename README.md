# Book & Byte — Full Stack Web Application

**Book & Byte** είναι μια διαδικτυακή εφαρμογή σχεδιασμένη για να γεφυρώσει το χάσμα μεταξύ της εκπαίδευσης στον προγραμματισμό, τη διοίκηση επιχειρήσεων και το design με τα απαραίτητα συγγράμματα και βιβλία που απαιτούνται για την εκμάθησή τους. 

Η εφαρμογή αναπτύχθηκε σε δύο φάσεις: αρχικά ως στατική εφαρμογή (Μέρος Α) και στη συνέχεια εξελίχθηκε σε μια δυναμική Full Stack εφαρμογή βασισμένη στην αρχιτεκτονική MEAN (Μέρος Β).

---

## Στοιχεία Φοιτητών

- **Θοδωρής Μαλέας**
- **Ανδρέας Χαράλαμπος Παναγόπουλος**

---

## Αρχιτεκτονική & Τεχνολογίες

### Μέρος Α: Frontend & Static Prototype
- **HTML5 & CSS3**: Σημανσιολογική δομή, custom CSS variables (`theme.css`), responsive layouts (`layout.css`), εξειδικευμένα UI components (`components.css`) και CSS reset (`reset.css`).
- **Vanilla JavaScript (ES6)**: Δυναμική παραγωγή περιεχομένου, χειρισμός DOM, φιλτράρισμα καταλόγων και διαδραστική φόρμα εγγραφής πολλαπλών βημάτων.
- **Static Data Integration**: In-memory JSON/JS αντικείμενα για μαθήματα, βιβλία και κατηγορίες.

### Μέρος Β: Full Stack (MEAN Architecture)
- **Frontend (Client)**: Angular (Φάκελος `/client`)
- **Backend (Server)**: Node.js + Express (Φάκελος `/server`)
- **Database**: MongoDB

---

## Χαρακτηριστικά & Λειτουργικότητες

### Αρχική Σελίδα (`/` / `index.html`)
- **Category Navigation**: Δυναμική προβολή θεματικών κατηγοριών (Computer Science, Business & Finance, Art & Graphic Design, Data Science, Web Development).
- **Suggested Textbooks**: Οριζόντια κυλιόμενη συλλογή προτεινόμενων βιβλίων με υποστήριξη wheel-event.

### Κατάλογος & Λεπτομέρειες Μαθημάτων (`/courses`, `/course-details`)
- **Course Catalog**: Κάρτες μαθημάτων με επίπεδα δυσκολίας (Beginner, Intermediate, Advanced), διάρκεια (σε εβδομάδες), badges κατηγορίας και στοιχεία εισηγητή.
- **Φιλτράρισμα & Αναζήτηση**:
  - Αναζήτηση κειμένου σε τίτλους, περιγραφές και ονόματα καθηγητών.
  - Φίλτρα Checkbox ανά κατηγορία.
  - Range sliders για μέγιστη διάρκεια και επίπεδο δυσκολίας.
- **Course Details**: Πλήρης περιγραφή μαθήματος και δυναμική λίστα των απαιτούμενων συγγραμμάτων.

### Κατάλογος Βιβλίων (`/books`)
- **Book Listings**: Λεπτομερείς καταχωρίσεις συγγραμμάτων (εξώφυλλο, συγγραφέας, εκδότης, συνδεδεμένα μαθήματα, διαθεσιμότητα, έτος έκδοσης).
- **Πολυκριτηριακό Φιλτράρισμα**: Αναζήτηση με λέξεις-κλειδιά, φίλτρο διαθεσιμότητας (In-Stock), εύρος ετών έκδοσης και επιλογή εκδοτών/μαθημάτων.

### Interactive User Onboarding (`/sign-up` / `sign_up.html`)
- **Ροή Εγγραφής 5 Βημάτων**:
  1. *Email Verification*: Έλεγχος ύπαρξης email στη βάση.
  2. *Authentication Setup*: Έλεγχος ισχύος κωδικού πρόσβασης σε πραγματικό χρόνο (8+ χαρακτήρες, κεφαλαία, πεζά, αριθμοί).
  3. *Personal Profile*: Έλεγχος ονοματεπώνυμου και ηλικιακού ορίου (16–120 ετών).
  4. *Feed Customization*: Επιλογή επιπέδου εμπειρίας και τομέων ενδιαφέροντος.
  5. *Review & Terms*: Επισκόπηση στοιχείων και αποδοχή όρων.

### Responsive Navigation
- Προσαρμοστικό Desktop Header και Slide-out Side Navigation Drawer (`sidenav`) με backdrop blur overlay για φορητές συσκευές.

---

## Δομή Έργου

```text
.
├── client/                 # Frontend Εφαρμογή (Angular - Μέρος Β)
│   ├── src/
│   │   └── app/
│   │       └── services/
│   │           └── api.service.ts
│   └── README-client.md
│
├── server/                 # Backend REST API (Node.js & Express - Μέρος Β)
│   ├── src/
│   │   ├── app.js
│   │   └── middlewares/
│   │       ├── errorHandler.ts
│   │       └── validateRequest.ts
│   └── README-server.md
│
├── static-version/         # Στατική Εφαρμογή (HTML/CSS/JS - Μέρος Α)
│   ├── index.html
│   ├── courses.html
│   ├── books.html
│   ├── course-details.html
│   ├── about.html
│   ├── sign_up.html
│   └── assets/
│       ├── css/
│       ├── js/
│       └── img/
│
└── README.md               # Κεντρικό Αρχείο Οδηγιών
```

---

## Οδηγίες Εκτέλεσης

### Εκτέλεση Full Stack Εφαρμογής (Μέρος Β)
Για να λειτουργήσει πλήρως η εφαρμογή, εκτελείται πρώτα ο Server και στη συνέχεια ο Client:

1. **Backend Server**:
   ```bash
   cd server
   npm install
   npm run start
   ```
2. **Frontend Client**:
   ```bash
   cd client
   npm install
   npm run start
   ```

*(Αναλυτικές οδηγίες και ρυθμίσεις endpoints/περιβάλλοντος βρίσκονται στα `README-server.md` και `README-client.md`).*

### Εκτέλεση Στατικής Εφαρμογής (Μέρος Α)
Δεν απαιτείται εγκατάσταση εξαρτήσεων ή διακομιστή. Αρκεί το άνοιγμα του `index.html` σε οποιονδήποτε σύγχρονο περιηγητή web (Chrome, Firefox, Edge, Safari).

---

## Ροή Δεδομένων Backend & Client (MEAN)

1. **Client Request**: Ο client καλεί τις συναρτήσεις του `/client/src/app/services/api.service.ts` για επικοινωνία με το REST API.
2. **Routing**: Στο `/server/src/app.js`, τα URLs δρομολογούνται στα αντίστοιχα routes.
3. **Validation Middleware**: Το `validateRequest.ts` ελέγχει και καθαρίζει τα input δεδομένα.
4. **Controllers & DB**: Ο αντίστοιχος controller εκτελεί τα queries στη MongoDB και επιστρέφει την απάντηση.
5. **Error Handling**: Τυχόν σφάλματα προωθούνται μέσω `next()` στο κεντρικό middleware `errorHandler.ts`.