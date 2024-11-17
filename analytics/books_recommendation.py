import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def setup(last_purchased_book):
    # Initialize cosine similarity matrix and indices
    cosine_sim, indices, book_data = initialize_tfid()
    
    # Recommend books based on the last purchased book
    recommended_books = recommend_books_based_on_last_purchase(last_purchased_book, cosine_sim, indices, book_data)
    print("Rekomendasi Buku Berdasarkan Pembelian Terakhir:")
    print(recommended_books)

def initialize_tfid():
    # 1. Baca Data CSV
    book_data = pd.read_csv('recommendation_data.csv')

    # 2. Gabungkan Fitur-Fitur Buku Menjadi Deskripsi
    book_data['description'] = (
        book_data['Title'] + ' ' +
        book_data['Author'] + ' ' +
        book_data['Publisher'] + ' ' +
        book_data['Language']
    )

    # 3. Inisialisasi TF-IDF Vectorizer
    tfidf = TfidfVectorizer(stop_words='english')

    # 4. Transformasi Deskripsi Buku ke Matriks TF-IDF
    tfidf_matrix = tfidf.fit_transform(book_data['description'])

    # 5. Hitung Cosine Similarity Antar-Buku
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Membuat DataFrame untuk mengakses buku berdasarkan indeks
    indices = pd.Series(book_data.index, index=book_data['Title']).drop_duplicates()
    
    return cosine_sim, indices, book_data

# 6. Fungsi untuk Merekomendasikan Buku Berdasarkan Pembelian Terakhir
def recommend_books_based_on_last_purchase(last_purchased_book, cosine_sim, indices, book_data):
    # Pastikan buku yang terakhir dibeli ada dalam data
    if last_purchased_book not in indices:
        raise ValueError(f"Buku '{last_purchased_book}' tidak ditemukan dalam data.")
    
    # Mendapatkan indeks buku terakhir yang dibeli
    idx = indices[last_purchased_book]

    # Mendapatkan skor kesamaan untuk semua buku terhadap buku yang terakhir dibeli
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Urutkan buku berdasarkan skor kesamaan (mulai dari yang paling mirip)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Ambil 5 buku teratas yang mirip (selain buku itu sendiri)
    sim_scores = sim_scores[1:6]

    # Mendapatkan indeks buku
    book_indices = [i[0] for i in sim_scores]

    # Mengembalikan judul buku yang direkomendasikan
    return book_data['Title'].iloc[book_indices].tolist()

if __name__ == '__main__':
    # Contoh Penggunaan
    last_purchased_book = "Der Prophet"
    setup(last_purchased_book)
