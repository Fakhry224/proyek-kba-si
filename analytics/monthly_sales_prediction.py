import pandas as pd
import chardet
import numpy as np
from sklearn.linear_model import LassoCV
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# Load data
file_path = 'monthly_revenue.csv'
with open(file_path, 'rb') as f:
    result = chardet.detect(f.read())

with open(file_path, 'r', encoding=result['encoding'], errors='ignore') as f:
    df = pd.read_csv(f)

# Simplified Feature Engineering
df['ORDERDATE'] = pd.to_datetime(df[['Year', 'Month']].assign(Day=1))

# Basic time features
df['Quarter'] = (df['Month'] - 1) // 3 + 1
df['Month_Sin'] = np.sin(2 * np.pi * df['Month'] / 12)
df['Month_Cos'] = np.cos(2 * np.pi * df['Month'] / 12)

# Simple lag features (only 1 month)
df['Previous_Month_Revenue'] = df['Monthly Revenue'].shift(1)
df['Previous_Month_Customers'] = df['Unique Customers'].shift(1)
df['Previous_Month_Books'] = df['Total Books Sold'].shift(1)

# Basic ratio features
df['Revenue_Per_Customer'] = df['Monthly Revenue'] / df['Unique Customers']
df['Books_Per_Customer'] = df['Total Books Sold'] / df['Unique Customers']

# Drop rows with NaN values
df = df.dropna()

# Feature selection
X = df[[
    'Year', 'Month', 'Quarter', 
    'Month_Sin', 'Month_Cos',
    'Unique Customers', 'Total Books Sold', 
    'Average Shipping Cost', 'Shipping Method Variants',
    'Previous_Month_Revenue', 'Previous_Month_Customers', 
    'Previous_Month_Books',
    'Revenue_Per_Customer', 'Books_Per_Customer'
]]
y = df['Monthly Revenue']

# Split data chronologically
train_size = int(len(df) * 0.8)
X_train = X[:train_size]
X_test = X[train_size:]
y_train = y[:train_size]
y_test = y[train_size:]

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Lasso Regression
lasso_model = LassoCV(alphas=np.logspace(-3, 3, 50), cv=5, max_iter=6300)
lasso_model.fit(X_train_scaled, y_train)

# Lasso predictions
lasso_pred = lasso_model.predict(X_test_scaled)

print(X_train.describe()) 

# Lasso metrics
lasso_mse = mean_squared_error(y_test, lasso_pred)
lasso_r2 = r2_score(y_test, lasso_pred)

print(f'\nLasso Regression Results:')
print(f'Mean Squared Error: {lasso_mse:,.2f}')
print(f'R2 Score: {lasso_r2:.4f}')
print(f'Optimal Alpha: {lasso_model.alpha_:.4f}')

# Visualization: Actual vs Predicted
test_dates = df.loc[X_test.index, 'ORDERDATE'].values

plt.figure(figsize=(15, 6))
plt.plot(test_dates, y_test.values, label='Actual', alpha=0.7)
plt.plot(test_dates, lasso_pred, label='Lasso Predicted', alpha=0.7)
plt.title('Actual vs Predicted Sales Over Time')
plt.xlabel('Date')
plt.ylabel('Sales')
plt.legend()
plt.show()

# Scatter Plot: Actual vs Predicted
plt.figure(figsize=(10, 6))
plt.scatter(y_test, lasso_pred, alpha=0.5, label='Lasso Predictions')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
plt.title('Actual vs Predicted Values')
plt.xlabel('Actual Values')
plt.ylabel('Predicted Values')
plt.legend()
plt.show()
