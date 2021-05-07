# up887818_pje40
 Online Discrete Mathematics Learning Resource
 
## Instructions
npm install - to install all dependancies required (express, fs)
npm start - to run server.js

Server will by default run on port 8080

## For maintainability

### How to add new topic to system
- update client/topics/directory.json with topic id & name
- add new files in client/topics/*topic id*
- topic id must be an integer!
- for both lesson and quiz, please remember to escape characters when necessary!

### How to add lesson to topic
- lesson.json contains:
  - name (same as what is in directory.json, although this is not checked)
  - array of "paragraphs" in the format
    {"text" : "Lorem ipsum dolor sit amet...".
    "example": {"imageFile": "example.png",
                "caption": "example"}}

### How to add quiz to topic (10 questions only)
- questions are in quiz.json
- available question formats:
  - written
  - single-select
  - multi-select
  - true-false
  (the latter 3 can also have -random variants)
- if the answer needs to be calculated add it into questions.js. The function name does not necessarily have to be the question number but it is recommended for ease of use.
