## Features
### Basic
1. Calculate & Show amount after divide. - done
2. Tweak the amount & auto re-calc percent of other part. - done
3. Responsive - done
- add more options for budget.

4. Login by Google || Facebook to save data.!! - done
5. Error boundary
### Advance
1. Visualize with chart
3. Suggesting when user enter the number.
2. Save & Check again follow month
3. Suggest where to put money.
4. hỗ trợ đa ngôn ngữ
## Logics
### Calculate & show amount after divide
WHAT:
1. This feature help user divide their money into many parts.

HOW
1. Get data - From Input.
2. Divide by percent of each part
  ```js
  const {
    food: 50,
    gas: 10,
    invest: 20,
    save: 20;
  }
  ```
3. Show.

### Object data Expenses
```js
const expense = {
  id: generateId(),
  name: String,
  data: Object
}
```

## Keywords
1. Expense
2. Percent
3. Category
4. Income
5. Budget Rule
6. Allocate

TODO 2022 04 04
1. Fix the direction of menu popup.
2. Them chuc nang add more custom field.
3. 

TODO 2022 04 06
1. Thêm chức năng add more custom field.
2. Thêm Chart

- Create dashboard
- View & edit saved Budget.

TODO
2022 04 13
1. edit mode for budget options
2. update the budget (still not handle save & update).
3. Update title when 

- sign out
+ dashboard hiển thị những gì?
+ đang ở dashboard thì như thế nào?
- thêm budget options
+ có nên để user thêm hơn 10 options?
+ ở mobile thì nên hiển thị thế nào cho hợp lí?

## Bugs
- Have warning when open the popup menu.
- Không thể lấy uid khi reload - vì cần thời gian để sign in