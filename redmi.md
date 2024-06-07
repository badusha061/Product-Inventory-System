# Product Inventory System




## Product Inventory System with Stock Management

## Key Features

### User Authentication and Authorization
- **User Authentication Using JWT Token**,  Users can authenticate using their username and password.
- **SMTP Verification**  Users can verify their accounts via email OTP.


### Admin Dashboard
- **Create Product**
- **List Product**
- **Add Stock (Purchase)**
- **Remove Stock (Sale)**




### API Documentation
- **Comprehensive documentation of API endpoints**: [View API Documentation](https://documenter.getpostman.com/view/31242747/2sA3XJkQZt)


## Getting Started



### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/badusha061/Product-Inventory-System.git
    ```

2. **Navigate to the project folder for backend:**
    ```sh
    cd server
    ```

3. **Configure environment variables** as instructed in the provided `.env.example` file.

4. **set up venvr:**
    ```sh
    Python -m venv venv 
    venv\Scripts\activate
    ```


5. **Install All dependies for Server:**
    ```sh
    pip install -r requirements.txt
    python manage.py migrate 
    python manage.py runserver
    ```


6. **Navigate to the project folder for fronend:**
    ```sh
    cd client
    ```
7. **Navigate to the project folder for fronend:**
    ```sh
    npm i 
    npm run dev 
    ```


## Technology Stack


- **Backend Development**: Pythn, Django REST framework, ORM
- **Databases**:  PostgreSQL, 
- **Frontend Development**: React, TypeScripts, Tailwind CSS,   shadcn ui
- **Integrations**: JWT Authentication
