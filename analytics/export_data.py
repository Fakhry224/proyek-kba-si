import mysql.connector
import csv

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="K@mbingbau1234",
  database="gravity_books_dwh"
)

cursor = db.cursor()

def monthly_sales():
    query1 = '''
            SELECT 
                t.year,
                t.month,
                
                COUNT(DISTINCT bsf.customer_sk) AS unique_customers,        
                COUNT(DISTINCT bsf.book_sk) AS total_books_sold,           
                AVG(sm.cost) AS avg_shipping_cost,                          
                COUNT(DISTINCT sm.method_name) AS shipping_method_variants, 
                COUNT(*) AS total_sales,
                
                SUM(bsf.revenue_book_sales) AS monthly_revenue
            
            FROM 
                book_sales_facts bsf
            JOIN 
                time t ON bsf.time_sk = t.time_sk
            JOIN 
                customer c ON bsf.customer_sk = c.customer_sk
            JOIN 
                shipping_method sm ON bsf.method_sk = sm.method_sk
            JOIN 
                book b ON bsf.book_sk = b.book_sk

            GROUP BY 
                t.year, 
                t.month
            ORDER BY 
                t.year, 
                t.month;
        '''

    cursor.execute(query1)

    result = cursor.fetchall()

    with open("monthly_revenue.csv", mode="w", newline="") as file:
        writer = csv.writer(file)

        writer.writerow(["Year", "Month", "Unique Customers", "Total Books Sold", 
                            "Average Shipping Cost", "Shipping Method Variants", "Total Sales", "Monthly Revenue"])

    for row in result:

        row = list(row)
        row[4] = float(row[4])  
        row[7] = float(row[7]) 
        writer.writerow(row)
        
    print("Data telah berhasil diekspor ke 'monthly_revenue.csv'")
    
def recommendation_data():
    query = '''
        SELECT 
            c.customer_id,
            c.customer_sk,
            c.name AS customer_name,
            c.country,
            c.city,
            c.street_name,
            c.street_number,
            
            b.book_id,
            b.book_sk,
            b.title,
            b.author,
            b.publisher,
            b.language,
            b.publication_date,
            
            t.year,
            t.month,
            t.day,
            
            bsf.revenue_book_sales
        FROM 
            book_sales_facts bsf
        JOIN 
            customer c ON bsf.customer_sk = c.customer_sk
        JOIN 
            book b ON bsf.book_sk = b.book_sk
        JOIN 
            time t ON bsf.time_sk = t.time_sk
        ORDER BY 
            c.customer_sk, 
            t.year, 
            t.month, 
            t.day;
    '''
    
    cursor.execute(query)
    result = cursor.fetchall()

    with open("recommendation_data.csv", mode="w", newline="") as file:
        writer = csv.writer(file)
        
        writer.writerow([
            "Customer ID", "Customer SK", "Customer Name", "Country", "City", 
            "Street Name", "Street Number", "Book ID", "Book SK", "Title", 
            "Author", "Publisher", "Language", "Publication Date", 
            "Year", "Month", "Day", "Revenue Book Sales"
        ])

        for row in result:
            writer.writerow(row)

    print("Data untuk sistem rekomendasi telah berhasil diekspor ke 'recommendation_data.csv'")
    
    
if __name__ == '__main__':
    # monthly_sales()
    recommendation_data()
    cursor.close()
    db.close()
    

