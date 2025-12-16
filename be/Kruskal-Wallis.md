### BÀI TOÁN VÍ DỤ: So sánh hiệu quả của 3 quy trình làm việc

#### 1. Đề bài
Một công ty muốn cải thiện năng suất đóng gói sản phẩm. Họ thử nghiệm **3 quy trình đóng gói khác nhau** (gọi là Quy trình A, B, và C) cho các công nhân. Vì số lượng công nhân tham gia thử nghiệm ít và thời gian hoàn thành không đảm bảo tuân theo phân phối chuẩn (có thể bị lệch), chuyên gia thống kê quyết định dùng **Kruskal-Wallis**.

Dữ liệu thu được là **thời gian hoàn thành** (tính bằng phút) của các công nhân ở mỗi nhóm như sau:

*   **Quy trình A ($n_1 = 4$):** 25, 30, 45, 50
*   **Quy trình B ($n_2 = 5$):** 10, 15, 20, 40, 12
*   **Quy trình C ($n_3 = 4$):** 35, 42, 60, 55

**Yêu cầu:** Với mức ý nghĩa $\alpha = 0.05$, hãy kiểm định xem có sự khác biệt về thời gian hoàn thành trung vị giữa 3 quy trình này hay không?

---

#### 2. Thiết lập Giả thuyết

*   **Giả thuyết không ($H_0$):** Thời gian hoàn thành trung vị của 3 quy trình là như nhau ($M_A = M_B = M_C$).
*   **Giả thuyết đối ($H_1$):** Có ít nhất một quy trình có thời gian hoàn thành trung vị khác với các quy trình còn lại.

---

#### 3. Thực hiện kiểm định từng bước

Tổng số quan sát $N = 4 + 5 + 4 = 13$.

**Bước 1: Gộp và Xếp hạng (Ranking)**

Ta liệt kê tất cả 13 giá trị từ bé đến lớn và gán hạng cho chúng (số nhỏ nhất hạng 1).

| Giá trị (Phút) | Nhóm gốc | Hạng (Rank) |
| :--- | :---: | :---: |
| 10 | B | 1 |
| 12 | B | 2 |
| 15 | B | 3 |
| 20 | B | 4 |
| 25 | A | 5 |
| 30 | A | 6 |
| 35 | C | 7 |
| 40 | B | 8 |
| 42 | C | 9 |
| 45 | A | 10 |
| 50 | A | 11 |
| 55 | C | 12 |
| 60 | C | 13 |

*(Lưu ý: Trong ví dụ này tôi chọn số liệu không có giá trị trùng nhau để tính toán đơn giản. Nếu có trùng, ví dụ hai người cùng làm 25 phút ở hạng 5 và 6, thì cả hai sẽ nhận hạng $\frac{5+6}{2} = 5.5$).*

**Bước 2: Tính tổng hạng cho từng nhóm ($R_i$)**

Bây giờ ta cộng các con số ở cột "Hạng" cho từng nhóm riêng biệt:

*   **Nhóm A:** Hạng gồm $\{5, 6, 10, 11\}$
    *   $R_A = 5 + 6 + 10 + 11 = 32$
    *   $n_A = 4$
*   **Nhóm B:** Hạng gồm $\{1, 2, 3, 4, 8\}$
    *   $R_B = 1 + 2 + 3 + 4 + 8 = 18$
    *   $n_B = 5$
*   **Nhóm C:** Hạng gồm $\{7, 9, 12, 13\}$
    *   $R_C = 7 + 9 + 12 + 13 = 41$
    *   $n_C = 4$

*Kiểm tra nhanh: Tổng hạng phải bằng $N(N+1)/2 = 13(14)/2 = 91$. Ta có $32 + 18 + 41 = 91$ (Đúng).*

**Bước 3: Tính tiêu chuẩn kiểm định $H$**

Áp dụng công thức:
$$H = \left[ \frac{12}{N(N+1)} \sum \frac{R_i^2}{n_i} \right] - 3(N+1)$$

1.  Tính tổng bình phương hạng chia cho n:
    $$ \sum \frac{R_i^2}{n_i} = \frac{32^2}{4} + \frac{18^2}{5} + \frac{41^2}{4} $$
    $$ = \frac{1024}{4} + \frac{324}{5} + \frac{1681}{4} $$
    $$ = 256 + 64.8 + 420.25 = \mathbf{741.05} $$

2.  Thế vào công thức H:
    $$ H = \left[ \frac{12}{13(14)} \times 741.05 \right] - 3(14) $$
    $$ H = \left[ \frac{12}{182} \times 741.05 \right] - 42 $$
    $$ H = [0.06593 \times 741.05] - 42 $$
    $$ H = 48.86 - 42 $$
    $$ \mathbf{H_{tính} = 6.86} $$

**Bước 4: Xác định miền bác bỏ và Kết luận**

*   **Bậc tự do (df):** $k - 1 = 3 - 1 = 2$.
*   **Mức ý nghĩa:** $\alpha = 0.05$.
*   **Tra bảng Chi-bình phương ($\chi^2$):** Tại $df=2$ và $\alpha=0.05$, giá trị tới hạn là **5.991**.

**So sánh:**
$$ H_{tính} (6.86) > \chi^2_{bảng} (5.991) $$

$\rightarrow$ Giá trị kiểm định rơi vào miền bác bỏ.

---

#### 4. Kết luận cuối cùng

**Quyết định:** Bác bỏ giả thuyết không ($H_0$).

**Ý nghĩa thực tế:**
Với dữ liệu đã cho, chúng ta có đủ bằng chứng thống kê (độ tin cậy 95%) để khẳng định rằng **thời gian hoàn thành công việc giữa 3 Quy trình A, B và C là khác nhau**.

*Nhìn vào dữ liệu xếp hạng, ta có thể thấy Quy trình B có tổng hạng thấp nhất (thời gian ngắn nhất - nhanh nhất), trong khi Quy trình C có tổng hạng cao nhất (chậm nhất). Tuy nhiên, kiểm định này chỉ xác nhận sự khác biệt chung, muốn biết chắc chắn B nhanh hơn C hay A, ta cần làm thêm kiểm định hậu định (Post-hoc).*

Tuyệt vời! Nếu ví dụ trước là về **biến định lượng liên tục** (thời gian), thì ví dụ này tôi sẽ chọn **biến thứ bậc (ordinal data)** và có sự xuất hiện của các **giá trị trùng nhau (ties)**.

Đây là trường hợp rất hay gặp trong thực tế khi xử lý dữ liệu khảo sát (điểm chấm từ 1 đến 10).

---

### BÀI TOÁN VÍ DỤ 2: Khảo sát mức độ hài lòng về 3 loại đồ uống

#### 1. Đề bài
Một chuỗi cửa hàng cà phê muốn kiểm tra xem mức độ hài lòng của khách hàng đối với 3 loại đồ uống mới ra mắt (Trà đào, Cà phê muối, Trà sữa) có khác nhau hay không.

Họ khảo sát ngẫu nhiên một số khách hàng và yêu cầu chấm điểm trên thang điểm 10 (1 là rất tệ, 10 là tuyệt vời). Dữ liệu thu được như sau:

*   **Trà đào (Nhóm 1 - $n_1=4$):** Điểm số: 2, 3, 3, 4
*   **Cà phê muối (Nhóm 2 - $n_2=4$):** Điểm số: 5, 6, 6, 7
*   **Trà sữa (Nhóm 3 - $n_3=3$):** Điểm số: 8, 9, 10

**Yêu cầu:** Với mức ý nghĩa $\alpha = 0.05$, hãy kiểm định xem có sự khác biệt về mức độ hài lòng giữa 3 loại đồ uống này không?

---

#### 2. Thiết lập Giả thuyết

*   **$H_0$:** Mức độ hài lòng trung vị của 3 loại đồ uống là như nhau.
*   **$H_1$:** Có ít nhất một loại đồ uống có mức độ hài lòng khác biệt so với các loại còn lại.

---

#### 3. Thực hiện kiểm định từng bước

Tổng số quan sát $N = 4 + 4 + 3 = 11$.

**Bước 1: Gộp và Xếp hạng (Xử lý hạng trùng nhau)**

Đây là bước quan trọng nhất của ví dụ này. Khi có các giá trị bằng nhau, ta lấy **trung bình cộng** thứ hạng của chúng.

Sắp xếp 11 giá trị từ thấp đến cao:

| Điểm số | Nhóm | Vị trí (Thứ tự) | Cách tính hạng | Hạng (Rank) cuối cùng |
| :--- | :---: | :---: | :--- | :---: |
| 2 | Trà đào | 1 | Hạng 1 | **1** |
| **3** | Trà đào | 2 | *(Trùng)* (2 + 3)/2 | **2.5** |
| **3** | Trà đào | 3 | *(Trùng)* (2 + 3)/2 | **2.5** |
| 4 | Trà đào | 4 | Hạng 4 | **4** |
| 5 | CP Muối | 5 | Hạng 5 | **5** |
| **6** | CP Muối | 6 | *(Trùng)* (6 + 7)/2 | **6.5** |
| **6** | CP Muối | 7 | *(Trùng)* (6 + 7)/2 | **6.5** |
| 7 | CP Muối | 8 | Hạng 8 | **8** |
| 8 | Trà sữa | 9 | Hạng 9 | **9** |
| 9 | Trà sữa | 10 | Hạng 10 | **10** |
| 10 | Trà sữa | 11 | Hạng 11 | **11** |

**Bước 2: Tính tổng hạng cho từng nhóm ($R_i$)**

*   **Nhóm Trà đào ($n_1=4$):** $\{1, 2.5, 2.5, 4\}$
    *   $R_1 = 1 + 2.5 + 2.5 + 4 = \mathbf{10}$
*   **Nhóm CP Muối ($n_2=4$):** $\{5, 6.5, 6.5, 8\}$
    *   $R_2 = 5 + 6.5 + 6.5 + 8 = \mathbf{26}$
*   **Nhóm Trà sữa ($n_3=3$):** $\{9, 10, 11\}$
    *   $R_3 = 9 + 10 + 11 = \mathbf{30}$

*Kiểm tra:* Tổng $R = 10 + 26 + 30 = 66$. Công thức $N(N+1)/2 = 11(12)/2 = 66$. (Chính xác).

**Bước 3: Tính tiêu chuẩn kiểm định $H$**

*Lưu ý: Mặc dù có hạng trùng nhau, nhưng số lượng ít nên ta có thể dùng công thức chuẩn (sai số sẽ rất nhỏ, không đáng kể). Nếu làm nghiên cứu khoa học chính xác tuyệt đối thì cần chia cho hệ số hiệu chỉnh, nhưng trong ví dụ này tôi sẽ dùng công thức chuẩn để bạn dễ theo dõi.*

$$H = \left[ \frac{12}{N(N+1)} \sum \frac{R_i^2}{n_i} \right] - 3(N+1)$$

1.  Tính tổng bình phương hạng chia cho $n$:
    $$ \sum \frac{R_i^2}{n_i} = \frac{10^2}{4} + \frac{26^2}{4} + \frac{30^2}{3} $$
    $$ = \frac{100}{4} + \frac{676}{4} + \frac{900}{3} $$
    $$ = 25 + 169 + 300 = \mathbf{494} $$

2.  Thế vào công thức H:
    $$ H = \left[ \frac{12}{11 \times 12} \times 494 \right] - 3(12) $$
    $$ H = \left[ \frac{12}{132} \times 494 \right] - 36 $$
    $$ H = \left[ \frac{1}{11} \times 494 \right] - 36 $$
    $$ H = 44.909 - 36 $$
    $$ \mathbf{H_{tính} \approx 8.91} $$

**Bước 4: Tra bảng và Kết luận**

*   **Bậc tự do (df):** $k - 1 = 3 - 1 = 2$.
*   **Mức ý nghĩa:** $\alpha = 0.05$.
*   **Giá trị tới hạn ($\chi^2_{table}$):** Tra bảng phân phối Chi-bình phương với $df=2, \alpha=0.05$ là **5.991**.

**So sánh:**
$$ H_{tính} (8.91) > \chi^2_{table} (5.991) $$

$\rightarrow$ **Kết quả:** Rơi vào miền bác bỏ.

---

#### 4. Kết luận và Phân tích sâu hơn

**Quyết định:** Bác bỏ giả thuyết $H_0$.

**Ý nghĩa:**
Có sự khác biệt có ý nghĩa thống kê về mức độ hài lòng của khách hàng đối với 3 loại đồ uống.

**Nhận định nhanh từ dữ liệu:**
Dựa vào tổng hạng trung bình ($\bar{R}_i = R_i / n_i$):
*   Trà đào: $10 / 4 = 2.5$ (Hạng thấp nhất $\rightarrow$ Điểm thấp nhất)
*   CP Muối: $26 / 4 = 6.5$ (Hạng trung bình)
*   Trà sữa: $30 / 3 = 10$ (Hạng cao nhất $\rightarrow$ Điểm cao nhất)

$\rightarrow$ Ta có thể thấy xu hướng rõ ràng là khách hàng thích **Trà sữa** nhất và ít hài lòng với **Trà đào** nhất. Tuy nhiên, Kruskal-Wallis chỉ bảo "chúng khác nhau", còn việc khẳng định Trà sữa > CP Muối hay CP Muối > Trà đào một cách chắc chắn về mặt thống kê thì cần làm thêm các kiểm định so sánh cặp (Pairwise comparisons).