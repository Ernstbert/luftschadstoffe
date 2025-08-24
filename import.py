import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_excel("nox.xlsx")

# Select rows 3 to 15 (inclusive)
df_subset = df.iloc[3:16]

# Melt the DataFrame
df_long = df_subset.melt(
    id_vars=['Emission source categories', 'Zeitreihen-ID'],
    var_name='Year',
    value_name='NOx_kt'
)

# Plot each emission source as a separate line
plt.figure(figsize=(12, 8))
for source in df_long['Emission source categories'].unique():
    data = df_long[df_long['Emission source categories'] == source]
    plt.plot(data['Year'], data['NOx_kt'], marker='o', label=source)

plt.xlabel('Year')
plt.ylabel('NOx emissions (kt)')
plt.title('NOx Emissions by Source (Rows 3-15)')
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()