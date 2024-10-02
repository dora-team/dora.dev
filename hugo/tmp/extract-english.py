import pandas as pd

# Load the CSV file
df = pd.read_csv("/Users/nathenharvey/projects/dora-team/dora.dev/hugo/data/survey_questions/2024-05-09_SODR-all.csv")

# Keep only the first two columns (assuming they are the English ones)
df = df.iloc[:, :2]

# Save the cleaned CSV
df.to_csv("cleaned_survey_questions.csv", index=False)
