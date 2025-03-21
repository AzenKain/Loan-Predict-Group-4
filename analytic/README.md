# Báo cáo Quy trình Xử lý Dữ liệu và Xây dựng Mô hình Phân loại

## 1. Giảm chiều dữ liệu bằng PCA

### Mục tiêu
Sử dụng Phân tích thành phần chính (PCA) để giảm số chiều dữ liệu, giữ lại các thành phần chính giải thích được phần lớn phương sai (ví dụ: 95%).  

### Lợi ích
- Giảm nhiễu và loại bỏ những đặc trưng không cần thiết.  
- Giảm thời gian tính toán và cải thiện hiệu năng của mô hình.  
- Giúp trực quan hóa dữ liệu trong không gian có chiều thấp hơn.

### Lưu ý cần kiểm tra lại thông qua ma trận tương quan để tránh loại bỏ nhầm cột quan trọng.

## 2. Tiền xử lý dữ liệu

### Lấy dữ liệu số và loại bỏ giá trị thiếu
Chỉ sử dụng các cột có kiểu số và loại bỏ các dòng có giá trị thiếu để đảm bảo tính toàn vẹ dữ liệu.

### Loại bỏ ngoại lai bằng phương pháp tứ phân vị (IQR)
- Tính Q1 (phần tư thứ nhất) và Q3 (phần tư thứ ba), sau đó tính khoảng giữa IQR = Q3 - Q1.
- Loại bỏ các giá trị ngoài khoảng [Q1 - 1.5 * IQR, Q3 + 1.5 * IQR].

## 3. Chuẩn hóa dữ liệu
Sử dụng **StandardScaler** để đưa dữ liệu về cùng một thang đo, giúp các đặc trưng có độ quan trọng tương đương.

## 4. Cân bằng dữ liệu với SMOTE

### Vấn đề dữ liệu không cân bằng
Khi tập dữ liệu chênh lệch đáng kể giữa các lớp, mô hình sẽ thiên về lớp chiếm đa số.

### Giải pháp - SMOTE (Synthetic Minority Over-sampling Technique)
SMOTE tạo ra các mẫu tổng hợp cho lớp thiểu số, giúp mô hình học tốt hơn.

## 5. Chia tách dữ liệu
Tỷ lệ chia: 75% huấn luyện - 25% kiểm tra.

## 6. Xây dựng các mô hình phân loại

### Random Forest
- Thuật toán dựa trên các cây quyết định, giúp tăng độ ổn định và giảm overfitting.

### XGBoost
- Thuật toán boosting tối ưu hàm mất mát, xử lý tốt các mối quan hệ phi tuyến tính.

## 7. Đánh giá hiệu suất các mô hình

### Chỉ số đánh giá
- **Accuracy:** Tỷ lệ dự đoán đúng.
- **Precision:** Độ chính xác khi dự đoán lớp.
- **Recall:** Khả năng nhận diện lớp.
- **F1 Score:** Trung bình điều hòa giữa precision và recall.

### So sánh hiệu suất
- **Accuracy:** XGBoost nhẹ cao hơn Random Forest (0.8851 so với 0.8839).
- **Precision & F1 Score:** XGBoost tốt hơn một chút (0.8510 vs 0.8448, 0.8460 vs 0.8395).
- **Recall:** XGBoost nhỉnh hơn với lớp thiểu số (0.08 vs 0.05).

## 8. Kết luận
XGBoost cho kết quả tốt hơn về tất cả các chỉ số quan trọng. Tuy nhiên, cả hai mô hình còn gặp khó khăn với lớp thiểu số. Có thể cải thiện bằng các kỹ thuật khác như SMOTE hoặc tinh chỉnh siêu tham số.

