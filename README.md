# up887818_pje40
 Online Discrete Mathematics Learning Resource

## For maintainability

### How to add new topic to system
- update client/topics/directory.json
- add new files in client/topics/*topic number*

### How to add lesson to topic
- lesson.json contains array of "paragraphs" in the format
  {"text" : "Lorem ipsum dolor sit amet...".
   "example": "examplename.js" *optional*}

### How to add quiz to topic (10 questions only)
- for each question add a seperate javascript file, q1.js - q10.js
