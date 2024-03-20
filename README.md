# Waizly Backend Implementation Test 1
Backend Implementation Test 2: test2.txt

Steps to run this project:

1. Run `npm i` command
2. Setup database and jwt settings inside `.env` file
3. Run `npm start` command

Available Endpoints:

`GET` `/api/login` `{ username: string, password: string }`

`GET` `/api/user/get`

`POST` `/api/user/add`
`{ name: string, username: string, password: string, role: 'admin' | 'user' }`

`PATCH` `/api/user/update`
`{ id: number | string, name?: string, username?: string, password?: string, role?: 'admin' | 'user' }`

`DELETE` `/api/user/delete`
`{ id: number | string }`

`GET` `/api/post/get`

`POST` `/api/post/add`
`{ title: string, content: string, created_by: number }`

`PATCH` `/api/post/update`
`{ id: number | string, title?: string, content?: string, created_by?: number }`

`DELETE` `/api/post/delete`
`{ id: number | string }`

`GET` `/api/comment/get`

`POST` `/api/comment/add`
`{ comment: string, postId: number, created_by: number }`

`PATCH` `/api/comment/update`
`{ id: number | string, comment?: string, postId?: number, created_by?: number }`

`DELETE` `/api/comment/delete`
`{ id: number | string }`
