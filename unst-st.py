import pandas as pd
import os

# File paths
unstandard_ciq_path = "./input/unstandard_ciq.xlsx"           # Raw CIQ file
standardized_output_path = "./output/standardized_ciq.xlsx"   # Final output
os.makedirs(os.path.dirname(standardized_output_path), exist_ok=True)

# 1. Define your column mapping as a dictionary
column_mapping = {
    "enb_name": "eNodeB Name",
    "cell_identifier": "Cell ID",
    "sector_id": "Sector ID",
    "physical_cell_id": "PCI",
    "dnarfce": "EARFCN"
}

# 2. Extract the list of standard columns from the mapping
standard_cols = list(column_mapping.values())

# 3. Load the unstandardized CIQ
df = pd.read_excel(unstandard_ciq_path)

# 4. Rename columns using your mapping
df_renamed = df.rename(columns=column_mapping)

# 5. Ensure all standard columns are present, fill missing ones with NaN
for col in standard_cols:
    if col not in df_renamed.columns:
        df_renamed[col] = None

# 6. Reorder columns to match standard format
df_final = df_renamed[standard_cols]

# 7. Save to Excel
df_final.to_excel(standardized_output_path, index=False)

print(f"Standardized CIQ saved to: {standardized_output_path}")
