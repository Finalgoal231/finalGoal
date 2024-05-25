# API Design

## Auth

    	post: /api/signup

    	post: /api/signin

## Articles

    	post /api/article/create

    	put /api/article/:id

    	delete /api/article/:id

    	get /api/article/home

    	get /api/article/:id

    	put /api/article/comment/:id

    	put /api/article/favorite/:id

- sort by latest
- sort by cnt of comments
- sort by cnt of favourites
- search by title

## Admin

### User

- Manage

			get			/api/admin/user/all

			put			/api/admin/user/role/:id

			delete	/api/admin/user/:id

- Profile

			get			/api/admin/user/:id

			put			/api/admin/user/:id

			put			/api/admin/user/password/:id

			put			/api/admin/user/avatar/:id

### Category

			post		/api/admin/category/

			put			/api/admin/category/:id

			delete	/api/admin/category/:id

			get			/api/admin/category/all
