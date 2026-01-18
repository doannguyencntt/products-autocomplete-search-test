1. Functional Requirements
  List API
    - Product list (main page): https://fakestoreapi.com/products
    - Autocomplete suggestions: https://dummyjson.com/products/search?q=<query>
    Use returned product with titles as suggestions.
    
    Page UI
    - Render the products page in a responsive list/grid.
    - Provide a search input at the top.
    - Searching filters displayed products by title (client-side is fine).
    - Show loading and error states for the product list.

  Cách thực hiện: 
    Sử dụng thử viện tailwind css để tạo giao diện
    Sử dụng `fetch/axios` để gọi API ( ở bài test này mình dùng axios )

  Các chứng năng gồm có:
  - Hiển thị danh sách sản phẩm ( gọi API từ `https://fakestoreapi.com/products` )
  - Hiển thị trạng thái loading khi đang gọi API

  Cách thực hiện :
  - Sử dụng `tailwind` css để tạo giao diện dử dụng grid để tạo bố cục danh sách sản phẩm
  - Sử dụng `axios` để gọi API lấy danh sách sản phẩm
  - Sử dụng `axios` interceptors để xử lý lỗi common ( cho các lỗi chung và ko show lỗi liên quan đến code ) và cấu hình chung cho các request

2. Autocomplete Requirements
  Implement an autocomplete dropdown attached to the search input.
  
  a) Behavior
  - Start suggesting after ≥ 2 characters.
  - Use debounce 250–400ms.
  - Display up to 10 suggestions.
  - Selecting a suggestion (click or Enter):
            Fills the input
            Triggers the main product filter
            Closes the dropdown
  - Close dropdown on
            Pressing Esc
            Click outside
  
  b) Keyboard
  - ↑ / ↓ to navigate suggestions
  - Enter selects active suggestion
  - Esc closes
  - Tab behaves naturally (closes dropdown, doesn’t trap focus)
  
  c) Async correctness
  - Prevent stale results from overwriting newer queries.
  - Show loading indicator inside the dropdown during fetch.
  - Show an error state in the dropdown and allow retry.
  
  d) Performance
  - Cache suggestion results per query (in-memory Map is fine).
  - Avoid unnecessary re-renders (reasonable component split / memoization).

  Cách thực hiện:
  - Sử dụng hook `useDebounce` để debounce giá trị nhập vào ( có thể tuỳ chỉnh thời gian debounce )
  - Sử dụng hook `useAutoComplete` để xử lý các logic liên quan đến autocomplete ( gọi API, xử lý lỗi, caching kết quả, ...)
  - Tạo component `Autocomplete` để hiển thị dropdown gợi ý

  - Xử lý các sự kiện bàn phím và chuột để điều hướng và chọn gợi ý
    - Giới hạn tối đa 10 mục, case nếu user bấm mũi tên lên thì sẽ chuyển item active lên hoặc xuống theo thứ tự, nếu trường hợp user đang ở mục đầu tiên thì sẽ chỉ có action bầm xuống có thể thao tác còn bấm lên sẽ ko có tác dụng và ngược lại.
    - `Clickoutside` để đóng dropdown, hoặc bấm phím Esc để đóng dropdown
    - Nếu user bấm Enter thì sẽ chọn mục đang active và điền vào input, đồng thời đóng dropdown
    - Sự kiện Tab vẫn hoạt động bình thường ( đóng dropdown, ko trap focus )

  - Sự dùng `Map` để cache kết quả gợi ý theo từng query, tránh gọi API lại với những query đã từng tìm kiếm
    - Nếu có lỗi xảy ra khi gọi API thì sẽ hiển thị thông báo lỗi và có nút thử lại sẽ không cache kết quả lỗi đó


3. Accessibility
  Implement ARIA combobox semantics, and update to README.md all the items that have been done.

- Trên input search sẽ có các field ARIA sau:
  - `role="combobox"`: Khai báo đây là một combobox editable
  - `aria-expanded={isOpen ? "true" : "false"}`: Để biết trạng thái dropdown đang mở hay đóng
  - `aria-controls="autocomplete-list"`: Liên kết với ID của listbox (dropdown)
  - `aria-autocomplete="list"`: Nêu rõ kiểu gợi ý là list
  - `aria-activedescendant`: Trỏ đến ID của suggestion item đang được highlight khi dùng phím mũi tên lên/xuống

- Trên list dropdown:
  - `role="listbox"`: Khai báo đây là danh sách các lựa chọn
  - `id="autocomplete-list"`: ID duy nhất để input có thể trỏ đến qua `aria-controls`

- Trên mỗi item của list dropdown:
  - `role="option"`: Mỗi item là một option trong listbox
  - `id="suggestion-${index}"`: ID duy nhất để hỗ trợ `aria-activedescendant` index đc lấy từ array
  - `aria-selected={index === activeIndex ? "true" : "false"}`: Cho biết item đang được chọn
  - Các chức năng hoàn chỉnh: ArrowUp/ArrowDown để di chuyển highlight, Enter để chọn, Esc để đóng dropdown, Tab để đóng dropdown
  - Input luôn giữ focus sau khi chọn suggestion, đảm bảo user khi gõ bàn phím có thể tiếp tục mà không bị mất focus.
  - Hiển thị thông báo loading hoặc error trong dropdown, với text rõ ràng và thân thiện với user (ví dụ: "Lỗi: Không có kết quả ...").

Run source code

Node version v22.16.0

npm install

npm run dev
