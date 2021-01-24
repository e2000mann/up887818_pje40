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
    "example": {"imageFile": "example.png",
                "caption": "example"}}

### How to add quiz to topic (10 questions only)
- questions are in questions.mjs (mjs being a module javascript file)
- each question gets its own function, q1() to q10(), as well as a CheckAnswer function
  q1CheckAnswer(input) to q10CheckAnswer(input)
