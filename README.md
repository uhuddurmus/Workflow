# Workflow
### Installation

After cloning the repository to your computer, make sure that the necessary packages for the backend are installed (dotnet, etc.). If you don't have a migration file, navigate to the Vk.Data directory in the terminal and run the following command:

```bash
dotnet ef migrations add Initial -s ../VkApi/
```

Then, go up one directory and run the following command to complete the migration process:

```bash
dotnet ef database update --project "./Vk.Data" --startup-project "./VkApi"
```

Ensure that the connection string and database are present.

In the frontend directory, run the following commands in the terminal to install the required libraries and start the application (Node.js is required):

```bash
npm install
npm start
```

To create an admin in the backend, post the following JSON data to "/vk/api/v1/Users":

```json
{
  "email": "admin@gmail.com",
  "password": "admin",
  "fullName": "Admin",
  "profit": 0,
  "role": "admin",
  "credit": 5000
}
{
  "email": "user@gmail.com",
  "password": "admin",
  "fullName": "user user",
  "profit": 0,
  "role": "user",
  "credit": 5000
}
```

This will make the first user an admin.

You can then log in with either:

Admin:
- Email: admin@gmail.com
- Password: admin

or

User:
- Email: user@gmail.com
- Password: admin

----------------------------------------------------------------------

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/f4b84fcb-5987-41fa-8996-49a18984f440)

The frontend file structure is as shown above.

Everything related to Redux in the project using Redux Toolkit is within the "redux" folder.

Users with the role 'admin' can view this page.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/cc7a9ecb-3c8a-49a1-8dbb-86873b135614)

Users with the roles 'user' and 'admin' can view this page.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/dc7429b7-133e-4f1f-88dc-a94267f5a64d)

Authorization is determined at the root level. Based on whether the user is an admin or not, the system returns true or false for admin access. Non-admin users cannot access the admin page.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/207bac20-e986-4dea-a5a3-4547ed0814c9)

Bootstrap is used as the CSS library.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/48d4c936-fa00-4843-bb5e-c2fb24852617)

Inside the "data" folder, there is a JSON data file for the e-commerce section generated from mockaroo.com. This data is used for the product list. Example product:

```json
{
  "id": 468,
  "name": "Edge",
  "brandName": "Ford",
  "price": 1487,
  "color": "Violet"
}
```

The product list can be filtered based on Name, Brand, Color, and Price.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/ba546d2b-bc66-4561-95fa-9ec8d8403fe5)

A Redux store is created for products, and items added to the cart are stored in the session storage.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/23009ad8-3574-44f8-8541-9e7425d73b09)

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/fe09a33a-5b5f-482d-bec7-fc050f4d2dba)

There are three reducers for the cart: `addToCart`, `removeFromCart`, and `clearCart`.

- `addToCart`: Adds the selected item from the list to the cart.
- `removeFromCart`: Locates and removes the item from the cart based on its ID.
- `clearCart`: Empties the entire cart.

File path for the cart slice:

`src\redux\slices\cartSlice.js`

For authentication processes, a slice is created:

`src\redux\slices\authSlice.js`

It contains login and logout reducers. Additionally, there are `selectUser`, `selectIsAuthenticated`, and `selectIsAdmin` functions for retrieving user data.

For authentication actions, the file `src\redux\authActions.js` is used. Axios is used to send login requests and perform login with a token. React-toastify is used for handling login failures.

Example screenshots:

Email verification is required during login. The login button is disabled if the email or password is incorrect. Pressing Enter triggers the login action. If the password is incorrect, a toast error is displayed.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/9a942504-0c7a-4994-9fea-08468804d42d)

When an admin logs in, the admin page is displayed, and when a user logs in, the user page is displayed. Users cannot access the admin page. The "Go to Admin Page" button in the menu is hidden based on the user's role.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/c1747c01-3674-4f2d-baf8-0be18e32bcf8)

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/ee9d8360-c464-4dfd-b38f-f567443e34aa)

On the product list screen, there is a multi-filter option and pagination. Hovering over an item highlights it. Clicking on the shopping cart icon in the top right corner of a product adds it to the cart.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/20b06e70-2494-420c-8ed7-037cd744c4e5)

The trash can icon on top of an item in the cart allows the user to remove the item if desired.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/42269c82-1143-4324-8cb0-26fcc59d6557)

The cart is stored in Redux and session storage. A separate cart page is created to prevent the user from losing their cart in the product list.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/accd327a-ef0c-4d95-ad03-905939ecb90f)
