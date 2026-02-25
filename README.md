# Quizzical 🎯

A fun, interactive quiz app built with **React** — fetches questions from the [Open Trivia Database](https://opentdb.com/), decodes Base64 + HTML entities, and lets users test their knowledge.

This project was built as a **solo portfolio project** during a Scrimba Full Stack course.

---

## Demo

🌐 Live Demo: []

---

## Features

- Fetches **multiple-choice questions** from Open Trivia API
- Decodes Base64 and HTML entities for clean questions/answers
- Shuffle answers for random order
- Select answers, check results, and **play again**
- Tracks your **score** after each quiz
- Fully responsive UI with **interactive buttons**

---

## Technologies Used

- **React** (useState, useEffect)
- **nanoid** for unique question IDs
- **he** for decoding HTML entities
- **CSS** for styling (with blob background illustration)
- **Open Trivia API** with `encode=base64`

---

## Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
cd Quizzical
npm install
npm run dev
```
