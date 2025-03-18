# Dự án Dự Đoán Khả Năng Trả Nợ Của Khách Hàng

## Giới thiệu
Dự án này sử dụng các mô hình học máy để dự đoán liệu một khách hàng có khả năng trả nợ hay không. Hai mô hình chính được sử dụng là **Random Forest** và **XGBoost**. Kết quả dự đoán giúp các tổ chức tài chính đánh giá rủi ro khi cấp tín dụng.

## Link Demo
[Truy cập ứng dụng tại đây](https://loan-predict-group-4.vercel.app/)

## Thành viên nhóm
- **A44519** - Đỗ Duy Khánh
- **A44639** - Phạm Huyền Trang
- **A44948** - Phan Thu Hiền

## Công nghệ sử dụng
- **Ngôn ngữ lập trình:** Python
- **Thư viện chính:** scikit-learn, XGBoost, Pandas, NumPy
- **Mô hình:** Random Forest, XGBoost
- **Triển khai web:** Vercel

## Cách sử dụng
1. Truy cập vào link demo để nhập thông tin khách hàng.
2. Hệ thống sẽ sử dụng mô hình học máy để phân tích và dự đoán.
3. Kết quả dự đoán sẽ hiển thị khách hàng có khả năng trả nợ hay không.

## Hướng dẫn chạy cục bộ
### Yêu cầu
- Python 3.10+
- Pipenv hoặc virtualenv để quản lý môi trường

### Cài đặt
### 1, backend
Cài đặt thông qua docker-compose.yml
```bash

services:
  loanpredict:
    image: azenkain/loanpredict:latest
    container_name: loanpredict_app
    ports:
      - "3346:8000"
    volumes:
      - ./data:/app/data
    environment:
      - PYTHONUNBUFFERED=1
    restart: unless-stopped

```
## Kết quả & Đánh giá
Mô hình được đánh giá dựa trên các chỉ số:
- **Độ chính xác (Accuracy)**
- **Độ nhạy (Recall)**
- **Độ đặc hiệu (Specificity)**
- **F1-score**


