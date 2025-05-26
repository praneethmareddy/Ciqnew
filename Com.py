import pandas as pd

# Load both Excel files
df1 = pd.read_excel("file1.xlsx")
df2 = pd.read_excel("file2.xlsx")

# Get column names
cols1 = set(df1.columns)
cols2 = set(df2.columns)

# Find common and unique columns
common_cols = cols1 & cols2
unique_to_file1 = cols1 - cols2
unique_to_file2 = cols2 - cols1

# Print results
print("Common Columns:", list(common_cols))
print("Unique to file1:", list(unique_to_file1))
print("Unique to file2:", list(unique_to_file2))
