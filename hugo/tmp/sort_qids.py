import pandas as pd

# Load the CSV file
df = pd.read_csv("cleaned_survey_questions.csv")

# Create a list to store the sorted data
sorted_data = []

# Group by QID prefix
for qid, group in df.groupby(df[df.columns[0]].str[:5]):

    # Find the question text row
    question_text_row = group[group[group.columns[0]] == f"{qid}_QuestionText"]

    # Find the other rows for this QID
    other_rows = group[group[group.columns[0]] != f"{qid}_QuestionText"]

    # Concatenate the question text row and other rows
    sorted_group = pd.concat([question_text_row, other_rows])

    # Append the sorted group to the list
    sorted_data.append(sorted_group)

# Concatenate all the sorted groups into a single DataFrame
sorted_df = pd.concat(sorted_data)

# Save the sorted DataFrame to a new CSV file
sorted_df.to_csv("sorted_survey_questions.csv", index=False)
