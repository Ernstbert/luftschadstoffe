import pandas as pd

df = pd.read_excel("nox.xlsx")
df_subset = df.iloc[3:16]  # Select rows 3 to 15

# Export to JSON (records format is best for React)
df_subset.to_json("nox.json", orient="records")