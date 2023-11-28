This folder contains data files representing the questions used in each year's DORA research program. The fields of each file are as follows:

`categories` [top-level parent]
- `heading` [heading for a set of questions, like "Continuous Integration"]
- `question_groups` [some categories have multiple groups, where each group has a separate description]
  - `description` [the instructions for a set of questions]
  - `group_responses` [if all questions in a group share a response set, list them here (comma-delimited)]
  - `questions` [list of individual question texts]

For questions with a fixed set of multiple-choice options, those options can be appended to the question text as a comma-delimited list, after a pipe separator. E.g. `This is my question text|Option one,option two,option three`.