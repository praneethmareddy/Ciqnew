import pandas as pd
import os

# File paths
mapping_xlsx_path = "./input/column_mapping.xlsx"       # Excel with standard/unstandard column pairs
unstandard_ciq_path = "./input/unstandard_ciq.xlsx"     # Raw input CIQ with inconsistent headers
standardized_output_path = "./output/standardized_ciq.xlsx"  # Final cleaned output
os.makedirs(os.path.dirname(standardized_output_path), exist_ok=True)

# 1. Read the column mapping from Excel
# It must have two columns: Standard_Column and Unstandard_Column
mapping_df = pd.read_excel(mapping_xlsx_path)
standard_cols = mapping_df["Standard_Column"].tolist()
unstandard_cols = mapping_df["Unstandard_Column"].tolist()

# 2. Create a mapping dictionary from unstandard to standard column names
column_mapping = dict(zip(unstandard_cols, standard_cols))

# 3. Load the unstandard CIQ Excel
df = pd.read_excel(unstandard_ciq_path)

# 4. Rename columns using the mapping
df_renamed = df.rename(columns=column_mapping)

# 5. Add any missing standard columns if they are not present
for col in standard_cols:
    if col not in df_renamed.columns:
        df_renamed[col] = None  # Fill with None/NaN

# 6. Reorder the columns to match the standard order
df_final = df_renamed[standard_cols]

# 7. Save the standardized DataFrame to Excel
df_final.to_excel(standardized_output_path, index=False)

print(f"Standardized CIQ saved to: {standardized_output_path}")
