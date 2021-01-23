# up887818_pje40
 Online Discrete Mathematics Learning Resource

## For maintainability

### How to add new topic to system
- update client/topics/directory.json
- add new files in client/topics/*topic number*

### How to add lesson to topic
- lesson.json contains:
  - name (same as what is in directory.json, although this is not checked)
  - array of "paragraphs" in the format
    {"text" : "Lorem ipsum dolor sit amet...".
    "example": "functionName" *optional*}
- examples.js contains all the examples, given as functions

### How to add quiz to topic (10 questions only)
- questions are in questions.js
- each question gets its own function, q1() to q10()
